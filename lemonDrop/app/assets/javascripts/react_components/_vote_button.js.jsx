var VoteButton = React.createClass({
  handleVote: function(event) {
    event.preventDefault()
    if ($(event.target).children("button").text() === "UpVote") {
      $(event.target).children("button").text("DownVote")
    } else {
      $(event.target).children("button").text("UpVote")
    }
    this.props.onVote()
  },

  render: function() {
    if (this.props.comment) {
      if (this.props.comment.user_voted) {
        return (
          <form onSubmit={this.handleVote}>
            <button>DownVote</button>
          </form>
        )
      } else {
        return (
          <form onSubmit={this.handleVote}>
            <button>UpVote</button>
          </form>
        )
      }
    } else {
      if (this.props.post.post.user_voted) {
        return (
          <form onSubmit={this.handleVote}>
            <button>DownVote</button>
          </form>
        )
      } else {
        return (
          <form onSubmit={this.handleVote}>
            <button>UpVote</button>
          </form>
        )
      }
    }
  }
});

