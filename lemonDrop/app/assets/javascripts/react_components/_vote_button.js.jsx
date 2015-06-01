var VoteButton = React.createClass({
  // handleVote calls the vote function passed down from either the post or the comment element
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
      if (this.props.comment.user_voted) {
        return (
          <form onSubmit={this.handleVote}>
            <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
            <button className="vote-button vote btn btn-sm btn-warning">DownVote</button>
          </form>
        )
      } else {
        return (
          <form onSubmit={this.handleVote}>
            <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
            <button className="vote-button vote btn btn-sm btn-warning">UpVote</button>
          </form>
        )
      }
    } else {
      if (this.props.post.post.user_voted) {
        return (
          <form onSubmit={this.handleVote}>
            <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
            <button className="vote-button vote btn btn-sm btn-warning">DownVote</button>
          </form>
        )
      } else {
        return (
          <form onSubmit={this.handleVote}>
            <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
            <button className="vote-button vote btn btn-sm btn-warning">UpVote</button>
          </form>
        )
      }
    }
  }
});

