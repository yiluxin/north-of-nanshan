Meteor.publish('postsWithinLimit', function (postsLimit) {
  check(postsLimit, Number);
  return Posts.find({}, {sort: {createdAt: -1}, limit: postsLimit});
});

Meteor.publish('singlePost', function (postId) {
  check(postId, String);
  let authorId = Posts.findOne({_id: postId}).authorId;
  return [Posts.find({_id: postId}), Meteor.users.find({_id: authorId})];
});

Meteor.publish('userPosts', function (username) {
  check(username, String);
  let userId = Meteor.users.findOne({username: username})._id;
  return Posts.find({authorId: userId}, {sort: {createdAt: -1}});
});
