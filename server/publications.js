Meteor.publish('postsWithinLimit', (postsLimit) => {
  return Posts.find({}, {sort: {createdAt: -1}, limit: postsLimit});
});

Meteor.publish('singlePost', (postId) => {
  check(postId, String);
  let authorId = Posts.findOne({ _id: postId }).authorId;
  return [Posts.find({ _id: postId}), Meteor.users.find({ _id: authorId })];
});
