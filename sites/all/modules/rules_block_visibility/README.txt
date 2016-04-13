INTRODUCTION
------------
The Rules block visibility module allows Rules
(https://drupal.org/project/rules) components to be used to control
block visibility. This provides Drupal administrators and developers
extreme flexibility in controling block visibility.


REQUIREMENTS
------------
This module requires the following modules:

 * Rules (https://drupal.org/project/rules)


INSTALLATION
------------
Install as you would normally install a contributed Drupal
module. See:
https://drupal.org/documentation/install/modules-themes/modules-7 for
further information.


CONFIGURATION
-------------
Configuration is done on a per-block basis. To control a block
visibility using a rule component, go to the block settings page,
scroll down to the "Rules" tab, and select the Rules component that
you want to use.

Notice that to be able to be used by this module, a Rules component
*must* be constructed in a very specific way. See the next section for
more information.


CREATING RULES COMPONENTS
-------------------------
To create a Rules component to control block visibility, follow the
steps below:

 1. Go to the add Rules component page in Administration >>
    Configuration >> Workflow >> Rules >> Components >> Add new
    component (admin/config/workflow/rules/components/add)

 2. Select "Action set", "Rule", or "Rule set". Each component type
    limits what can be done using Rules. See
    https://www.drupal.org/node/1582182 for more details about Rules
    components.

 3. After giving a name and optional tags to your component, you must
    setup the "Variables" table with the values below:

    * Variable 1:
      - Data Type: "Text"
      - Label: "Module"
      - Machine name: "module"
      - Usage: "Parameter"

    * Variable 2:
      - Data Type: "Text"
      - Label: "Delta"
      - Machine name: "delta"
      - Usage: "Parameter"

    * Variable 3:
      - Data Type: "Truth value"
      - Label: "Result"
      - Machine name: "result"
      - Usage: "Provided"

 4. After clicking "Continue", you will be present with the component
    edit page, where you can add your logic to determine if a block
    should be displayed or not.

    The block name being checked is available in the rule variable
     "module", and the module delta in "delta", so you can use the
     same component to control different blocks.

    To control if a module should be visible or not, your component
    *must* set the "result" provided (output) variable to a "True"
    value. The "result" variable defauls to "False", so if you do not
    set a "True" value explicitly, the block will be hidden by
    default.


FAQ
---

Q: My component is not listed in the Rules visibility vertical tab...

R: Check the "Variables" section of your component in the Rules
   UI. Your component must strictly use the variables/machine names as
   specified in the "CREATING RULES COMPONENTS" section above.
