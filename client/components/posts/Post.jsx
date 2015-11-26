const {
    History
    } = ReactRouter;

Post = React.createClass({
  mixins: [ReactMeteorData, History],

  //propTypes: {
  //params.postId: React.PropTypes.string.isRequired
  //},

  getMeteorData() {
    let postSub = Meteor.subscribe('singlePost', this.props.params.postId);
    let post = Posts.findOne({_id: this.props.params.postId});
    let author = post && Meteor.users.findOne({_id: post.authorId});
    return {
      postReady: postSub.ready(),
      post: post,
      author: author
    };
  },

  handleRemovePost() {
    if (window.confirm('你确定？')) {
      Meteor.call('removePost', this.data.post._id, (error, result) => {
        if (error) {
          console.log(error);
        }
      });
      this.history.pushState(null, '/posts');
    }
  },

  render() {
    return (
        <div>
          {this.data.postReady? <div className="post">
            <h1>{this.data.post.title}</h1>
            <p>{this.data.post.content}</p>
            <p>作者：{this.data.author.username}（<Link to={`/${this.data.author.username}/posts`}>他的所有文章</Link>）</p>
            <p>创作时间：{this.data.post.createdAt.toDateString()}</p>
            <div>
              {this.data.post.authorId === Meteor.userId() ? (
              <button onClick={this.handleRemovePost}>删除</button>
                  ) : (
                  null
                  )}
            </div>
          </div>:<div>正在加载</div>}
        </div>
    );
  }
});
