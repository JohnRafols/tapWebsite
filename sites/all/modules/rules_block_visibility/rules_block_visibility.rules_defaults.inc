<?php
/**
 * @file
 * Default (example) rules for the Block visibility rules module.
 */

/**
 * Implements hook_default_rules_configuration().
 */
function rules_block_visibility_default_rules_configuration() {

  // CodeSniffer is not able to tell that the "wrong" indentation
  // below is actually inside a string, so we shut up it here.
  // @codingStandardsIgnoreStart
  $exported_rules = array(

    'example_1' => '
{ "rules_block_visibility_example_1" : {
    "LABEL" : "Example: display block only for users registered for more than a year",
    "PLUGIN" : "rule",
    "OWNER" : "rules",
    "TAGS" : [ "block visibility example" ],
    "REQUIRES" : [ "rules" ],
    "USES VARIABLES" : {
      "module" : { "label" : "Module", "type" : "text" },
      "delta" : { "label" : "Delta", "type" : "text" },
      "result" : { "label" : "Result", "type" : "boolean", "parameter" : false }
    },
    "IF" : [
      { "user_has_role" : {
          "account" : [ "site:current-user" ],
          "roles" : { "value" : { "2" : "2" } }
        }
      },
      { "data_is" : {
          "data" : [ "site:current-user:created" ],
          "op" : "\u003C",
          "value" : {
            "select" : "site:current-date",
            "date_offset" : { "value" : -31104000 }
          }
        }
      }
    ],
    "DO" : [ { "data_set" : { "data" : [ "result" ], "value" : "1" } } ],
    "PROVIDES VARIABLES" : [ "result" ]
  }
}
',
    'example_2' => '
{ "rules_block_visibility_example_2" : {
    "LABEL" : "Example: display block between 6 pm and 11 pm on weekdays",
    "PLUGIN" : "rule set",
    "OWNER" : "rules",
    "TAGS" : [ "block visibility example" ],
    "REQUIRES" : [ "rules" ],
    "USES VARIABLES" : {
      "module" : { "label" : "Module", "type" : "text" },
      "delta" : { "label" : "Delta", "type" : "text" },
      "result" : { "label" : "Result", "type" : "boolean", "parameter" : false }
    },
    "RULES" : [
      { "RULE" : {
          "DO" : [ { "data_set" : { "data" : [ "result" ], "value" : "1" } } ],
          "LABEL" : "Show block by default"
        }
      },
      { "RULE" : {
          "PROVIDE" : { "variable_added" : {
              "start_time" : "Start time",
              "end_time" : "End time",
              "start_dow" : "Start day of week",
              "end_dow" : "Stop day of week"
            }
          },
          "DO" : [
            { "variable_add" : {
                "USING" : { "type" : "date", "value" : "6pm" },
                "PROVIDE" : { "variable_added" : { "start_time" : "Start time" } }
              }
            },
            { "variable_add" : {
                "USING" : { "type" : "date", "value" : "11pm" },
                "PROVIDE" : { "variable_added" : { "end_time" : "End time" } }
              }
            },
            { "variable_add" : {
                "USING" : { "type" : "date", "value" : "This week Monday" },
                "PROVIDE" : { "variable_added" : { "start_dow" : "Start day of week time" } }
              }
            },
            { "variable_add" : {
                "USING" : { "type" : "date", "value" : "This week Saturday midnight" },
                "PROVIDE" : { "variable_added" : { "end_dow" : "End day of week time" } }
              }
            }
          ],
          "LABEL" : "Setup variables"
        }
      },
      { "RULE" : {
          "IF" : [
            { "data_is" : {
                "data" : [ "site:current-date" ],
                "op" : "\u003E",
                "value" : [ "end-dow" ]
              }
            },
            { "data_is" : {
                "data" : [ "site:current-date" ],
                "op" : "\u003C",
                "value" : [ "start-dow" ]
              }
            }
          ],
          "DO" : [ { "data_set" : { "data" : [ "result" ], "value" : "0" } } ],
          "LABEL" : "Hide if not on weekends"
        }
      },
      { "RULE" : {
          "IF" : [
            { "OR" : [
                { "data_is" : {
                    "data" : [ "site:current-date" ],
                    "op" : "\u003C",
                    "value" : [ "start-time" ]
                  }
                },
                { "data_is" : {
                    "data" : [ "site:current-date" ],
                    "op" : "\u003E",
                    "value" : [ "end-time" ]
                  }
                }
              ]
            }
          ],
          "DO" : [ { "data_set" : { "data" : [ "result" ], "value" : "0" } } ],
          "LABEL" : "Hide if not between the time of day interval"
        }
      }
    ],
    "PROVIDES VARIABLES" : [ "result" ]
  }
}
',
  );
  // @codingStandardsIgnoreEnd

  $default_rules = array();

  foreach ($exported_rules as $name => $json) {
    $default_rules["rules_block_visibility_$name"] = rules_import($json);
  }

  return $default_rules;
}
