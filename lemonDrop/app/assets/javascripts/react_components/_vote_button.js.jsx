var VoteButton = React.createClass({
  handleVote: function(event) {
    event.preventDefault()
    if ($(event.target).children("button").text() === "UpVote") {
      $(event.target).children("button").text("DownVote")
    } else {
      $(event.target).children("button").text("UpVote")
    }
    formData = $(this.getDOMNode()).serialize()
    this.props.onVote(formData)
  },

  render: function() {
    if (this.props.comment) {
      console.log(this.props.comment.user_voted)
      if (this.props.comment.user_voted) {
        return (
          <form onSubmit={this.handleVote}>
            <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
            <button>DownVote</button>
          </form>
        )
      } else {
        return (
          <form onSubmit={this.handleVote}>
            <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
            <button>UpVote</button>
          </form>
        )
      }
    } else {
      console.log(this.props.post.post.user_voted)
      if (this.props.post.post.user_voted) {
        return (
          <form onSubmit={this.handleVote}>
            <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
            <button>DownVote</button>
          </form>
        )
      } else {
        return (
          <form onSubmit={this.handleVote}>
            <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
            <button>UpVote</button>
          </form>
        )
      }
    }
  }
});

