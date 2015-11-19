const {
  History
} = ReactRouter;

AddPost = React.createClass({
  mixins: [History],

  getInitialState() {
    return {
      title: '',
      content: ''
    }
  },

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  },

  handleContentChange(event) {
    this.setState({
      content: event.target.value
    });
  },

  handleAddPost(event) {
    event.preventDefault();
    let {title, content} = this.state;
    if (title && content) {
      Meteor.call('addPost', title, content, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          this.history.pushState(null, `/post/${result}`);
        }
      });
    } else {
      return;
    }
  },

  render() {
    return (
      <div>
        <div>写文章</div>
        <form onSubmit={this.handleAddPost}>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleTitleChange}
            placeholder="用户名"/>
          <textarea
            value={this.state.content}
            onChange={this.handleContentChange}
            name="content"/>
          <input
            type="submit"
            value="确定"/>
        </form>
      </div>
    );
  }
});
