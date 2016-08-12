TODOS
*********************
Add hook_help()
add quick demo video


Usage:
----------------------
- Create a profile as usual (eg. personal_data)
- Edit the profile (admin/structure/profiles/manage/personal_data) and check
  "Show this profile as part of user account form" option.
  [Tip]: weights matter if you want assign more than one profile.
- Dont forget to give the user proper permissions to edit his own profiles
  in admin/people/permissions:
  "Personal data: Edit own profile" in our example.

That's all, login as the target user and enjoy it ;)

By UX friendly
----------------------
When you merge profiles into the user account, all fields are together,
and that's fine if is what you want.
But if you want split each profile into separate "blocks" go to
admin/config/people/accounts and check "Wrap account form in a fieldset.".
To finish use http://drupal.org/project/field_group
to wrap each profile's fields.
