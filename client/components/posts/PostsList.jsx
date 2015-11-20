PostsList = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired,
    incrementLimit: React.PropTypes.func
  },

  componentDidMount() {
    if (this.props.incrementLimit) {
      let self = this;
      $(window).on('scroll', function(){
        if( $(window).scrollTop() > $(document).height() - $(window).height() - 200 ) {
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
    var createItem = function(itemText, index) {
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
