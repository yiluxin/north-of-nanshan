Accounts.onCreateUser((options, user) => {
  const invitationCode = Meteor.settings.invitationCode;
  if (options.invitationCode !== invitationCode) {
    throw new Meteor.Error('wrong-invitation-code', '邀请码错误');
  }
  if (options.profile)
    user.profile = options.profile;
  return user;
});
