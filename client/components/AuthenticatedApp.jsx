const {
    History
    } = ReactRouter;
ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

AuthenticatedApp = React.createClass({
  mixins: [ReactMeteorData, History],
  getMeteorData() {
    // Reactively know if the user is authenticated
    return {
      isAuthenticated: Meteor.userId() !== null,
      isLoggingIn: Meteor.loggingIn()
    };
  },
  getInitialState: function () {
    return {menuOpen: false};
  },

  signOut(e) {
    e.preventDefault();

    Meteor.logout(this.signOutCallback);
  },

  signOutCallback(error) {
    if (error === undefined) {
      this.history.pushState(null, "/");
    }
  },

  componentWillMount() {
    if (!this.data.isAuthenticated) {
      this.history.pushState(null, '/sign-in');
    } else {
      this.history.pushState(null, '/posts');
    }
  },

  componentDidUpdate(prevProps, prevState) {
    if (!this.data.isAuthenticated) {
      this.history.pushState(null, '/sign-in');
    }
    var controller = new ScrollMagic.Controller();

    var scene = new ScrollMagic.Scene({triggerElement: "#trigger2", duration: 50})
    // animate color and top border in relation to scroll position
        .setTween(".authenticated-app-container", {
          backgroundColor: "#FBFBFB",
          //boxShadow: " -2px -2px 2px  rgba(0, 0, 0, 0.25)"
        }) // the tween durtion can be omitted and defaults to 1
        //.addIndicators({name: "2 (duration: 100)"}) // add indicators (requires plugin)
        .addTo(controller);
  },
  handleMenu: function () {
    this.setState({menuOpen: !this.state.menuOpen})
  },
  render() {
    let style = {zIndex: this.state.menuOpen ? "100" : "-100"};
    return (
        <div className="height100">
          {this.data.isLoggingIn ? (
          <LoggingIn />
              ) : (
          <div className="height100">
            <NavBar signOut={this.signOut} classes="TopNav2"/>
            <NavBar signOut={this.signOut} style={style} handleMenu={this.handleMenu} classes="TopNav"/>
            <div className="Menu" onClick={this.handleMenu}>Menu</div>
            <div className="Logo">
              <Link to="/posts">
                <div className="nanshan fontWeightBold color666 size13 marginBottom20">
                  Nanshan North
                  <p className="nanshanIntro color999">The development process of Nanshan North Project</p>
                </div>
              </Link>
            </div>
            <div className="authenticated-app-container">
              {this.props.children}
            </div>
          </div>
              )}
        </div>
    );
  }
});
