const {
  Router,
  Route,
  IndexRoute,
  history
} = ReactRouter;

Link = ReactRouter.Link;

const browserHistory = history.createHistory();

Routes = React.createClass({
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={AuthenticatedApp}>
          <IndexRoute component={PostsListContainer}/>
          <Route path="post/:postId" component={Post}/>
          <Route path="new" component={AddPost}/>
          <Route path="authors" component={Authors}/>
        </Route>
        <Route path="sign-in" component={Authentication}/>
        <Route path="sign-up" component={Authentication}/>
      </Router>
    );
  }
});

Meteor.startup(function () {
  ReactDOM.render(<Routes />, document.getElementById("app"));
});
