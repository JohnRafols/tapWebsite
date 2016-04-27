<?php

function validateCommissionedFreelancer($form, $form_state){
	$username=$form_state['values']['field_freelancer_to_commission'];

	if(empty($username)){
		form_set_error('field_freelancer_to_commission', t('Enter the username of the Creative Pro you want to commission.'));
	}else{ //Determine if entered username is an ApprovedFreelancer
		$freelancer=user_load_by_name($username);

		if($freelancer==false){
			form_set_error('field_freelancer_to_commission', t('Invalid username'));

		}else if(isset($freelancer->roles[array_search('approvedFreelancer', user_roles())])){			
			//Add freelancer to field_final_candidate.
			//Email freelancer.
			// //Make the selected freelancer the final candidate i.e. the person for the job.
			// debugLong($node, 'node_validate_node');
			// debugLong($freelancer, 'node_validate_Freelancer');
			
		}else{
			if(isset($freelancer->roles[array_search('freelancer', user_roles() ) ] ) ){
				form_set_error('field_freelancer_to_commission', t('Freelancer not yet approved by Tap.'));
			}else{
				form_set_error('field_freelancer_to_commission', t('The username is not one of a freelancer.'));
			}
		}
	}
}

function validateInvitedFreelancers($form, $form_state){
	if(!isset($form['field_freelancers_to_invite'])){
		form_set_error('field_freelancers_to_invite', 'Please enter at least one Creative Pro to invite');
	}

	debugLong($form_state['values']['field_freelancers_to_invite'], '_validate_freelancers_to_invite');
	$freelancers_to_invite=explode(',', $form_state['values']['field_freelancers_to_invite']);
	debugLong($freelancers_to_invite, '_validate_freelancers_to_invite_exploded');

	if(empty($freelancers_to_invite[0])){
		form_set_error('field_freelancers_to_invite', 'Enter at least one Creative Pro');
	}

	$invalid=array();
	$notApproved=array();
	foreach($freelancers_to_invite as $name){
		$f=user_load_by_name(trim($name));
		if($f==false){
			array_push($invalid, $name);
		}else if(!isset($f->roles[array_search('approvedFreelancer', user_roles())])){
			array_push($notApproved, $name);
		}
	}
	
	if(!empty($invalid)){
		$invalidInStr=implode(', ', $invalid);
		$errorMessage='Not creative pros: '.$invalidInStr;
	}

	if(!empty($notApproved)){
		$notApprovedInStr=implode(', ', $notApproved);
		if(isset($errorMessage)) $errorMessage.="<br>Freelancers not yet approved by Tap: ".$notApprovedInStr;
		else $errorMessage="Freelancers not yet approved by Tap: ".$notApprovedInStr;
		
	}

	if(!empty($errorMessage)){
		form_set_error('field_freelancers_to_invite', $errorMessage);
	}
	
	$trimmed=array_map('trim', $freelancers_to_invite);
	$form_state['values']['field_freelancers_to_invite']=implode(',', $trimmed);
}


function emailFreelancers($freelancers){
	// drupal_mail('tap_job_mgmt', 'notice', $u->mail, user_preferred_language($u), $params);
}

function addMatchedFreelancersToJob($freelancers, $job){

	foreach($freelancers as $f){
		$data =array('target_id'=>$f->uid);
		array_push($job->field_matched_candidates['und'], $data);		
	}
}

function addCommissionedFreelancerToJob($freelancer, $job){

	$data =array('target_id'=>$freelancer->uid);
	array_push($job->field_commissioned_candidate['und'], $data);			
}


function sortTopFreelancersByScore(&$comments, $props)
{
    usort($comments, function($a, $b) use ($props) {
        if($a->$props[0] == $b->$props[0])
            return $a->$props[1] < $b->$props[1] ? 1 : -1;
        return $a->$props[0] < $b->$props[0] ? 1 : -1;
    });
}

// -----------Pseudo code for Matching candidates to jobs based on their skillset----------------//
// 1.Get the service type (X) of the job.
// 2.Get all freelancers.
// 3.For each freelancer f, get a count:
// 		jobs tagged X.
//		projects tagged X. 		
// 4.Maintain a collection of top freelancers i.e. highest score (jobCount+projectCount)
// 5.Return top freelancers.
// ----------------------------------END--------------------------------------------------------//
function getMatchedFreelancers($node){
	// 1.Get service type X.
	if($skill=$node->field_service_type['und']!=null){
		$skill=$node->field_service_type['und'][0]['tid'];
	}

	// 2.Get all Freelancers.
	$query = new EntityFieldQuery;
	$query
		->entityCondition('entity_type', 'user')
		->addTag('role_filter');
	$results = $query->execute();

	$results=$results['user'];


	define('TOP_THRESHOLD_COUNT', 20);
	$topFreelancers=array(); //User objects with jobCountWithSkill property.

	foreach($results as $freelancer){
		$freelancerid=$freelancer->uid;


		//3a. Get a count of freelancer's jobs that have $skill.
		$jobCount=db_query(
			'SELECT COUNT(nid) FROM {node} AS n ' .
			'JOIN {field_data_field_final_candidate} AS f ' .
			'ON f.entity_id = n.nid AND f.entity_type = :node '.
			'JOIN {field_data_field_service_type} AS s ' .
			'ON s.entity_id = n.nid ' .
			'WHERE n.type = :type AND f.field_final_candidate_target_id = :uid AND s.field_service_type_tid = :tid',
			array(
				':node' => 'node',
				':uid' => $freelancerid,
				':type' => 'job',
				':tid' => $skill,
			)
		)->fetchField();
		
		debugShort('jobCount '.$jobCount);

		// 3b.Get a count of freelancer's projects that have $skill.
		$projectCount=db_query(
			'SELECT COUNT(nid) FROM {node} AS n ' .
			'JOIN {field_data_field_portfolio_project_skills} AS s ' .
			'ON s.entity_id = n.nid AND s.entity_type = :node ' .
			'WHERE n.uid = :uid AND n.type = :type AND s.field_portfolio_project_skills_tid = :tid',
			array(
				':node' => 'node',
				':uid' => $freelancerid,
				':type' => 'portfolio',
				':tid' => $skill,
			)
		)->fetchField();

		debugShort('projectCount '.$projectCount);	

		//Score calculated for a freelancer, the higher the better.
		$score = $jobCount*3 + $projectCount;

		//Asigning the score to the User object.
		$u=user_load($freelancerid);
		$u->score=$score;


		//4.Maintain a collection of top freelancers.
		//Already have top freelancers, now find if the current freelancer is stronger that the weakest in topFreelancers.
		if(count($topFreelancers)>=TOP_THRESHOLD_COUNT){ 
			//Find weakest.
			$minScore=PHP_INT_MAX;
			$weakest;
			foreach($topFreelancers as $f){
				if($f->score<$minScore){
					$minScore=$f->score;
					$weakest=$f;
				}
			}

			//Replace only if the current freelancer is stronger than the weakest in topFreelancers.
			if($u->score>$minScore){
				//Remove weakest.
				if(($key = array_search($weakest, $topFreelancers)) !== false) {
				   unset($messages[$key]);
				}		

				//Add the stronger freelancer.
				array_push($topFreelancers, $u);
			}
		}else{
			//Simply add if $topFreelancers array is not yet filled.
			array_push($topFreelancers, $u);
		}
	}
	
	return $topFreelancers;
}

?>