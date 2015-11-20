Meteor.methods({
  getTotalPostsCount() {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized', 'Must sign in to read posts');
    }

    return {
      totalPostsCount: Posts.find().count()
    };
  }
});
