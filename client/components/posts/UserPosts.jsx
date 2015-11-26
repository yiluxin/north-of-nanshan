UserPosts = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const username = this.props.params.username;
    let userPostsSub = Meteor.subscribe('userPosts', username);
    let posts = Posts.find().fetch();
    return {
      subReady: userPostsSub.ready(),
      posts: posts
    };
  },

  render() {
    return (
      <PostsList posts={this.data.posts}/>
    );
  }
});
