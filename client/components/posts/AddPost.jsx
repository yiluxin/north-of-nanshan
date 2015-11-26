const {
  History
  } = ReactRouter;

AddPost = React.createClass({
  mixins: [History],

  getInitialState() {
    return {
      title: '',
      content: '',
      isWaiting: false
    }
  },

  handleTitleChange(event) {
    console.log(event.target.value);
    this.setState({
      title: event.target.value
    });
  },

  handleContentChange(event) {
    console.log(event.target.value);
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
      this.setState({isWaiting: true});
    } else {
      console.log("没有state");
      return;
    }
  },

  render() {
    let buttonText = this.state.isWaiting ? "正在插" : "确定";
    return (
      <form onSubmit={this.handleAddPost}>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleTitleChange}
          placeholder="标题"/>
          <textarea
            className="marginBottom20"
            value={this.state.content}
            onChange={this.handleContentChange}
            name="content"
            placeholder="正文"/>
        <button className="width100" onClick={this.handleAddPost}
                disabled={this.state.isWaiting}>{buttonText}</button>
      </form>
    );
  }
});
