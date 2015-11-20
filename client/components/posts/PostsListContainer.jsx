const initialPostsLimit = 20;
const postsLimitIncrementer = 15;

PostsListContainer = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      postsLimit: initialPostsLimit,
      totalPostsCount: 0
    }
  },

  componentDidMount() {
    let self = this;
    let handle = Meteor.setInterval(function() {
      Meteor.call('getTotalPostsCount', (error, result) => {
        if (error) {
          console.log(error);
        }
        self.setState({
          totalPostsCount: result.totalPostsCount
        });
      });
    }, 1000 * 2);
    self.setState({
      handle: handle
    });
  },

  componentWillUnmount() {
    debugger;
    Meteor.clearInterval(this.state.handle);
  },

  getMeteorData() {
    let postsSub = Meteor.subscribe('postsWithinLimit', this.state.postsLimit);
    let posts = Posts.find({}, {sort: {createdAt: -1}}).fetch();
    return {
      subsReady: postsSub.ready(),
      posts: posts
    };
  },

  incrementLimit() {
    let limit = this.state.postsLimit;
    let totalPostsCount = this.state.totalPostsCount;
    if (limit >= totalPostsCount) {
      return;
    } else if (limit > totalPostsCount - postsLimitIncrementer) {
      this.setState({
        postsLimit: totalPostsCount
      });
    } else {
      this.setState({
        postsLimit: limit + postsLimitIncrementer
      });
    }
  },

  render() {
    return (
      <div>
        <PostsList
          posts={this.data.posts}
          incrementLimit={this.incrementLimit}/>
        {this.data.postsReady || (this.state.postsLimit >= this.state.totalPostsCount) ? null :<p>正在加载文章，请稍候</p>}
      </div>
    );
  }
});
