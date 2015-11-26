Posts = new Mongo.Collection('posts');

Meteor.methods({
  addPost(title, content) {
    check(title, String);
    check(content, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Must sign in to post');
    }

    let post = {
      authorId: this.userId,
      createdAt: new Date(),
      title,
      content
    };

    return Posts.insert(post);
  },

  removePost(postId) {
    check(postId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Must sign in to remove post');
    }

    let postToRemove = Posts.findOne({_id: postId});

    if (this.userId !== postToRemove.authorId) {
      throw new Meteor.Error('not-authorized', 'Must be the author to remove a post');
    }

    Posts.remove({_id: postId});
  }
});
