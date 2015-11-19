const {
  History
} = ReactRouter;

Authentication = React.createClass({
  mixins: [ReactMeteorData, History],

  /*
   * Really puzzled by this. Right now it seems there is no easy way to pass
   * selective props or state to children component with React Router. I have to
   * get Meter.loggingIn() again. Need a better solution;
   */
  getMeteorData() {
    return {
      isLoggingIn: Meteor.loggingIn(),
      isAuthenticated: Meteor.userId() !== null
    };
  },

  getInitialState() {
    return {
      signInOrSignUp: window.location.pathname.substring(1),
      username: '',
      password: '',
      passwordConfirmation: '',
      invitationCode: ''
    }
  },

  componentWillMount() {
    if (this.data.isAuthenticated) {
      this.history.pushState(null, '/');
    }
  },

  switchToSignUp() {
    this.setState({
      signInOrSignUp: 'sign-up'
    });
    this.history.pushState(null, "/sign-up");
  },

  switchToSignIn() {
    this.setState({
      signInOrSignUp: 'sign-in'
    });
    this.history.pushState(null, "/sign-in");
  },

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  },

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  },

  handlePasswordConfirmationChange(event) {
    this.setState({
      passwordConfirmation: event.target.value
    });
  },

  handleInvitationCodeChange(event) {
    this.setState({
      invitationCode: event.target.value
    });
  },

  // simplified version
  handleSignIn(event) {
    event.preventDefault();

    let {username, password} = this.state;
    if (username && password) {
      Meteor.loginWithPassword(username, password, (error) => {
        if (error) {
          console.log(error);
        } else {
          this.history.pushState(null, "/");
        }
      });
    } else {
      return;
    }
  },

  // simplified version
  handleSignUp(event) {
    event.preventDefault();

    let {username, password, passwordConfirmation, invitationCode} = this.state;
    if (username && password && passwordConfirmation && password === passwordConfirmation && invitationCode) {
      Accounts.createUser({ username: username, password: password, invitationCode: invitationCode }, (error) => {
        if (error) {
          console.log(error);
        } else {
          this.history.pushState(null, '/');
        }
      });
    } else {
      alert('缺少必要信息');
      return;
    }

  },

  render() {
    return (
      <div className="authentication-container">
      <div>Authentication</div>
      {this.state.signInOrSignUp === 'sign-in' ? (
        <SignIn
          isLoggingIn={this.data.isLoggingIn}
          username={this.state.username}
          password={this.state.password}
          handleUsernameChange={this.handleUsernameChange}
          handlePasswordChange={this.handlePasswordChange}
          handleSignIn={this.handleSignIn}
          switchToSignUp={this.switchToSignUp}/>
      ) : (
        <SignUp
          isLoggingIn={this.data.isLoggingIn}
          username={this.state.username}
          password={this.state.password}
          passwordConfirmation={this.state.passwordConfirmation}
          invitationCode={this.state.invitationCode}
          handleUsernameChange={this.handleUsernameChange}
          handlePasswordChange={this.handlePasswordChange}
          handlePasswordConfirmationChange={this.handlePasswordConfirmationChange}
          handleInvitationCodeChange={this.handleInvitationCodeChange}
          handleSignUp={this.handleSignUp}
          switchToSignIn={this.switchToSignIn}/>
      )}
      </div>
    );
  }
});

let SignIn = React.createClass({
  propTypes: {
    isLoggingIn: React.PropTypes.bool.isRequired,
    username: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
    handleUsernameChange: React.PropTypes.func.isRequired,
    handlePasswordChange: React.PropTypes.func.isRequired,
    handleSignIn: React.PropTypes.func.isRequired,
    switchToSignUp: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="sign-in-container">
        <div>SignIn</div>
        <form onSubmit={this.props.handleSignIn}>
          <input
            type="text"
            value={this.props.username}
            onChange={this.props.handleUsernameChange}
            placeholder="用户名"/>
          <input
            type="password"
            value={this.props.password}
            onChange={this.props.handlePasswordChange}
            placeholder="密码"/>
          <input
            type="submit"
            disabled={this.props.isLoggingIn}
            value={this.props.isLoggingIn ? '正在登录' : '登陆'}/>
        </form>
        <div>没有账号？<button onClick={this.props.switchToSignUp}>点击注册</button></div>
      </div>
    );
  }
});

let SignUp = React.createClass({
  propTypes: {
    isLoggingIn: React.PropTypes.bool.isRequired,
    username: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
    passwordConfirmation: React.PropTypes.string.isRequired,
    invitationCode: React.PropTypes.string.isRequired,
    handleUsernameChange: React.PropTypes.func.isRequired,
    handlePasswordChange: React.PropTypes.func.isRequired,
    handlePasswordConfirmationChange: React.PropTypes.func.isRequired,
    handleInvitationCodeChange: React.PropTypes.func.isRequired,
    handleSignUp: React.PropTypes.func.isRequired,
    switchToSignIn: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="sign-up-container">
        <div>SignUp</div>
        <form onSubmit={this.props.handleSignUp}>
          <input
            type="text"
            value={this.props.username}
            onChange={this.props.handleUsernameChange}
            placeholder="用户名"/>
          <input
            type="password"
            value={this.props.password}
            onChange={this.props.handlePasswordChange}
            placeholder="密码"/>
          <input type="password"
            value={this.props.passwordConfirmation}
            onChange={this.props.handlePasswordConfirmationChange}
            placeholder="确认密码"/>
          <input
            type="text"
            value={this.props.invitationCode}
            onChange={this.props.handleInvitationCodeChange}
            placeholder="邀请码"/>
          <input
            type="submit"
            disabled={this.props.isLoggingIn}
            value={this.props.isLoggingIn ? '正在注册' : '注册'}/>
        </form>
        <div>已有账号？<button onClick={this.props.switchToSignIn}>点击登陆</button></div>
      </div>
    );
  }
});
