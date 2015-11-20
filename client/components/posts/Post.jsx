Post = React.createClass({
  mixins: [ReactMeteorData],

  //propTypes: {
    //params.postId: React.PropTypes.string.isRequired
  //},

  getMeteorData() {
    let postSub = Meteor.subscribe('singlePost', this.props.params.postId);
    let post = Posts.findOne({_id: this.props.params.postId});
    let author = post && Meteor.users.findOne({ _id: post.authorId });
    return {
      postReady: postSub.ready(),
      post: post,
      author: author
    };
  },

  render() {
    return (
      <div>
        {this.data.postReady ? (
          <div className="post">
            <h1>{this.data.post.title}</h1>
            <p>{this.data.post.content}</p>
            <p>作者：{this.data.author.username}</p>
            <p>创作时间：{this.data.post.createdAt.toDateString()}</p>
          </div>
        ) : (
          <p>文章正在加载中</p>
        )}
      </div>
    );
  }
});
