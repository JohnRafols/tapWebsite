<?php

function emailCollaborators($new_ids, $node){
    $query=db_select('users', 'u')    
        ->condition('uid', $new_ids)
        ->fields('u', array('name', 'mail'));

    $result=$query->execute();

    foreach($result as $row){

        $options = array('absolute' => TRUE);
        $jobPath=url('node/' . $node->nid, $options);
        $jobTitle=$node->title;

        global $user;
        $inviter=$user->name;

        $module = 'tap_job_invite';
        $key = 'key';
        $email = $row->mail;
        $language = language_default();
        $params = array();
        $from = NULL;
        $send = FALSE;
        $message = drupal_mail($module, $key, $email, $language, $params, $from, $send);

        $message['headers']['Content-Type'] = 'text/html; charset=UTF-8; format=flowed';

        $message['subject'] = "Collaborator invitation at Tap";
        $message['body'] = array();
        $message['body'][] = "You have invited as a Collaborator by {$inviter} to the job <a href=\"{$jobPath}\">{$jobTitle}</a>. ";
        $message['body'][] = "Log in to join the workroom.";

        // Retrieve the responsible implementation for this message.
        $system = drupal_mail_system($module, $key);

        // Format the message body.
        $message = $system->format($message);

        // Send e-mail.
        $message['result'] = $system->mail($message);

    }
}

?>