Posts = new Mongo.Collection('posts');

Meteor.methods({
  addPost(title, content) {
    check(title, String);
    check(content, String);

    if (! this.userId) {
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

  getTotalPostsCount() {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized', 'Must sign in to read posts');
    }

    return {
      totalPostsCount: Posts.find().count()
    };
  }
});
