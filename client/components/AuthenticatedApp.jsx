const {
  History
} = ReactRouter;

AuthenticatedApp = React.createClass({
  mixins: [ReactMeteorData, History],
  getMeteorData() {
    // Reactively know if the user is authenticated
    return {
      isAuthenticated: Meteor.userId() !== null,
      isLoggingIn: Meteor.loggingIn()
    };
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
  },

  render() {
    let containerStyle = {
      marginTop: '150px'
    };

    return (
      <div>
        {this.data.isLoggingIn ? (
          <LoggingIn />
        ) : (
          <div>
            <NavBar signOut={this.signOut}/>
            <div className="authenticated-app-container" style={containerStyle}>
              {this.props.children}
            </div>
          </div>
        )}
      </div>
    );
  }
});
