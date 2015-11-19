Meteor.publish('postsWithinLimit', (postsLimit) => {
  return Posts.find({}, {sort: {createdAt: -1}, limit: postsLimit});
});

Meteor.publish('totalPostsCount', function() {
  Counts.publish(this, 'posts', Posts.find());
});
