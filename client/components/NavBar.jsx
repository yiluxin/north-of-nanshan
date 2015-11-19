const { Link } = ReactRouter;

NavBar = React.createClass({
  handleLogOut() {
    Meteor.logout();
  },

  render() {
    return (
      <div className="nav-bar-container">
        <div>导航栏</div>
        <ul>
          <li><Link to="/authors">所有作者</Link></li>
          <li><button onClick={this.handleLogOut}>登出</button></li>
        </ul>
      </div>
    );
  }
});
