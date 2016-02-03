To use this module, you will first need to add name fields to user profiles,
and then configure this module to use them to generate a Drupal user name (the
internal "machine name"). Fields can be added using the contrib module
Profile2, or with the core profile fields. You will need at least two fields
for the first and last name, and optionally a third field for a middle name.
Each field used must be mandatory and be include on the user registration
form.

If you delete these fields, or change them to no longer be required and
included on the user registration form, you will need to also update the
settings for this module to choose new fields.

You may also be interested in using the Realname module, which controls how
usernames are displayed publicly, which is a related but independent use case
to the one addressed by this module.

To add core profile fields:
Home » Administration » Configuration » People » Account settings » Manage fields
(/admin/config/people/accounts/fields)

To add Profile2 fields::
Home » Administration » Structure » Profile types
(/admin/structure/profiles)
Edit the profile type you wish to use and ensure that "Show during user
account registration" is selected, then select "manage fields" for that type
and add new required fields.

To tell this module which fields to use for first, middle, and last names:
Home » Administration » Configuration » People » Realname Registration
/admin/config/people/realname_registration

If the field you've selected is from a Profile2 profile type, you will need to
indicate that, and enter the machine name of the profile type (such as "main"
for the default profile type).

The "Create new account" form at /user/register and the "Add user" form at
/admin/people/create will now present the configured fields instead of the core
username field.  The username will be determined automatically based on the
rules selected on this module's configuration page.

TODO
====

Higher priority:
 - show available field and profile type options as a dropdown box instead of
   making users type the machine name!
 - check for username length during form validation
 - provide option to update existing usernames when names are updated
 - improve how strings with placeholders are translated

Lower priority:
 - provide an action to bulk update existing usernames when
   realname_registration is enabled or its configuration has changed
 - handle multiple middle names
 - integrate with the name module
 - handle the case where name fields are translated (do people really do this?)

