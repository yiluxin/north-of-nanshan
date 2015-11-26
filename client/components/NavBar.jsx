NavBar = React.createClass({
  handleLogOut() {
    Meteor.logout();
  },

  render() {


    const username = Meteor.user() && Meteor.user().username;
    const pathToMyPosts = `/${username}/posts`;
    return (

        <ul className={this.props.classes} style={this.props.style} onClick={this.props.handleMenu}>
          <Link to="/posts">
            <li>所有文章</li>
          </Link>
          <Link to={pathToMyPosts}>
            <li>我的文章</li>
          </Link>
          <Link to="/new">
            <li>写文章</li>
          </Link>
          <li onClick={this.handleLogOut}>
            登出
          </li>
        </ul>

    );
  }
});

