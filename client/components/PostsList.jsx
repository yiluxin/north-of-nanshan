PostsList = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired,
    incrementLimit: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    let self = this;
    $(window).on('scroll', function(){
      if( $(window).scrollTop() == $(document).height() - $(window).height() ) {
        self.props.incrementLimit();
      }
    }).scroll();
  },

  render() {
    var createItem = function(itemText, index) {
      return <li key={index + itemText}>{itemText}</li>;
    };


    let postsList = this.props.posts.map((post) => {
      return <Post key={post._id} post={post}/>
    });

    return (
      <ul>
        {postsList}
      </ul>
    );
  }
});
