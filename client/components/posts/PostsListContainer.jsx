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
    let handle = Meteor.setInterval(function () {
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
      <PostsList posts={this.data.posts}
                 incrementLimit={this.incrementLimit}/>
    );
  }
});

PostsList = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired,
    incrementLimit: React.PropTypes.func
  },

  componentDidMount() {
    if (this.props.incrementLimit) {
      let self = this;
      $(window).on('scroll', function () {
        if ($(window).scrollTop() > $(document).height() - $(window).height() - 200) {
          self.props.incrementLimit();
        }
      }).scroll();
    }
  },

  componentWillUnmount() {
    if (this.props.incrementLimit) {
      $(window).off('scroll');
    }
  },

  render() {
    var createItem = function (itemText, index) {
      return <li key={index + itemText}>{itemText}</li>;
    };
    let postsList = this.props.posts.map((post) => {
      return <PostItem key={post._id} post={post}/>
    });
    return (

      <ul>
        {postsList}
      </ul>
    );
  }
});

PostItem = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <Link to={`/post/${this.props.post._id}`}>
        <li className="post">
          <p className="h2">{this.props.post.title}</p>
          <p>{this.props.post.content}</p>
        </li>
      </Link>
    );
  }
});
