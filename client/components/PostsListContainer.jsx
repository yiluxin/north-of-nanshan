const initialPostsLimit = 20;
const postsLimitIncrementer = 15;

PostsListContainer = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      postsLimit: initialPostsLimit,
    }
  },

  getMeteorData() {
    let postsSub = Meteor.subscribe('postsWithinLimit', this.state.postsLimit);
    let postsCountSub = Meteor.subscribe('totalPostsCount');
    let posts = Posts.find({}, {sort: {createdAt: -1}}).fetch();
    return {
      postsReady: postsSub.ready() && postsCountSub.ready(),
      posts: posts,
      totalPostsCount: Counts.get('posts')
    };
  },

  incrementLimit() {
    let limit = this.state.postsLimit;
    let total = this.data.totalPostsCount;
    if (limit >= total) {
      return;
    } else if (limit > total - postsLimitIncrementer) {
      this.setState({
        postsLimit: total
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
        {this.data.postsReady ? null :<p>正在加载文章，请稍候</p>}
      </div>
    );
  }
});
