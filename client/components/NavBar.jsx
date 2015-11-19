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
    return (
      <nav className="nav-bar-container" style={navBarStyle}>
        <div>导航栏</div>
        <ul>
          <li><Link to="/">所有文章</Link></li>
          <li><Link to="/authors">所有作者</Link></li>
          <li><Link to="/new">写文章</Link></li>
          <li><button onClick={this.handleLogOut}>登出</button></li>
        </ul>
      </nav>
    );
  }
});
