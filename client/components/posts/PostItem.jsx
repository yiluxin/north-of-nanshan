PostItem = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <li className="post">
        <h2>{this.props.post.title}</h2>
        <p>{this.props.post.content}</p>
        <Link to={`/post/${this.props.post._id}`}>更多</Link>
      </li>
    );
  }
});
