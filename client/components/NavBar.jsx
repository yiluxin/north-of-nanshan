NavBar = React.createClass({
  handleLogOut() {
    Meteor.logout();
  },

  render() {
    let navBarStyle={
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 999,
      width: "100%",
      height: "125px",
      backgroundColor: 'grey'
    }

    const username = Meteor.user() && Meteor.user().username;
    const pathToMyPosts = `/${username}/posts`;
    return (
      <nav className="nav-bar-container" style={navBarStyle}>
        <div>导航栏</div>
        <ul>
          <li><Link to="/">所有文章</Link></li>
          <li><Link to={pathToMyPosts}>我的文章</Link></li>
          <li><Link to="/new">写文章</Link></li>
          <li><button onClick={this.handleLogOut}>登出</button></li>
        </ul>
      </nav>
    );
  }
});
