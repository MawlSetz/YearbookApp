var PostsContainer = React.createClass ({
	// sets initial state
	getInitialState: function(){
		return JSON.parse(this.props.controller);
	},

	handleTagSearch: function(query){
    $.ajax({
      data: query,
      url: "/posts",
      type: "GET",
      success: function(data){
        this.setState({posts: data.posts});
      }.bind(this)
    });
  },

	// sends a call to posts#delete
	handlePostDelete: function(formData, action){
		$.ajax({
			data: formData,
			url: action,
			type: "DELETE",
			success: function(data){
				this.setState({posts: data})
			}.bind(this)
		});
	},
	// renders posts
	render: function() {
		return (
			<div className = "posts">
				<PostTagSearchContainer onTagSearch={this.handleTagSearch} />
				<PostCreateContainer form={this.state.form} posts={this.state.posts} onUpdate={this.onUpdate} />
				<PostInfo posts={this.state.posts} session={this.state.session} form={this.state.form} onDelete={this.handlePostDelete} />
			</div>
		)
	},

	onUpdate: function(val) {
		this.setState({
			posts: val
		})
	}
});
// loops through posts one by one and creates an object with all post divs
var PostInfo = React.createClass({
	render: function() {
		var postNodes = this.props.posts.map(function(post){
			if (this.props.session == post.user_id) {
				return <PostsWithDelete post={post} form={this.props.form} session={this.props.session} onDelete={this.props.onDelete} />
			} else {
				return <Posts post={post} session={this.props.session} form={this.props.form} />
			}
		}.bind(this));
		return (
			<div id="postNode">
				{postNodes}
			</div>
		)
	}
});

// form for delete
var PostDeleteForm = React.createClass({
	handleDelete: function(event) {
		event.preventDefault();
		var formData = $(this.refs.form.getDOMNode()).serialize()
		this.props.onDelete(formData, this.refs.form.props.action);
	},

	render: function() {
		var path = "/posts/"+ this.props.post.id
		return (
			<form ref="form" action={path} method="POST" onSubmit={this.handleDelete}>
				<input type="hidden" name={this.props.post.csrf_param} value={this.props.post.csrf_token} />
				<input type="hidden" name="_method" value="delete" />
				<button>Delete</button>
			</form>
		);
	}
});
// renders individual posts
var Posts = React.createClass({
	render: function() {
		return (
		<div>
			<p>User: {this.props.post.post.user_id}</p>
			<p>{this.props.post.post.content}</p>
			<p>Vote: {this.props.post.post.vote}</p>
			<p>Tag: {this.props.post.post.tags}</p>
      <CommentsList session={this.props.session} post={this.props.post.post} comments={this.props.post.comments} form={this.props.form} />
		</div>
		);
	}
});
// when logged in, able to delete
var PostsWithDelete = React.createClass({
	render: function() {
		return (
		<div>
			<p>User: {this.props.post.post.user_id}</p>
			<p>{this.props.post.post.content}</p>
			<p>Vote: {this.props.post.post.vote}</p>
			<p>Tag: {this.props.post.post.tags}</p>
			<PostDeleteForm post={this.props.post} onDelete={this.props.onDelete} />
      <CommentsList session={this.props.session} post={this.props.post.post} comments={this.props.post.comments} form={this.props.form} />
		</div>
		);
	}
});

var CommentsList = React.createClass({
  getInitialState: function() {
    return {comments: this.props.comments}
  },

  handleCommentDelete: function(formData, action) {
    $.ajax({
			data: formData,
			url: action,
			type: "DELETE",
			success: function(data){
				this.setState({comments: data.comments})
			}.bind(this)
		});
  },

  handleCommentSubmit: function(formData, action) {
    $.ajax({
      data: formData,
      url: "/comments",
      type: "POST",
      success: function(data){
        this.setState({comments: data.comments});
      }.bind(this)
    });
  },

  render: function() {
    var commentNodes = this.state.comments.map(function(comment) {
      if (this.props.session == comment.user_id) {
        return <CommentWithDelete comment={comment} form={this.props.form} onDelete={this.handleCommentDelete} />
      } else {
        return <Comment comment={comment} />
      }
    }.bind(this));
    return (
      <div id="comments-list">
        {commentNodes}
        <CommentField form={this.props.form} post={this.props.post} onCommentSubmit={this.handleCommentSubmit} />
      </div>
    )
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <p>{this.props.comment.text}</p>
      </div>
    )
  }
});

var CommentWithDelete = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <p>{this.props.comment.text}</p>
        <CommentDeleteButton comment={this.props.comment} form={this.props.form} onDelete={this.props.onDelete} />
      </div>
    )
  }
});

var CommentDeleteButton = React.createClass({
	handleDelete: function(event) {
		event.preventDefault();
		var formData = $(this.refs.form.getDOMNode()).serialize()
		this.props.onDelete(formData, this.refs.form.props.action);
	},

	render: function() {
		var path = "/comments/"+ this.props.comment.id
		return (
			<form ref="form" action={path} method="POST" onSubmit={this.handleDelete}>
				<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
				<input type="hidden" name="_method" value="delete" />
				<button>Delete</button>
			</form>
		);
	}
})

var CommentField = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    var formData = $(this.getDOMNode()).children().eq(1).serialize()
    this.props.onCommentSubmit(formData, this.props.form.action);
    $(event.target).children().eq(2).val("");
  },

  render: function() {
    return (
      <div id="comment-field">
        <h5>Comments</h5>
        <form action={this.props.form.action} method="post" onSubmit={this.handleSubmit} >
          <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
          <input type="hidden" name="comment[post_id]" value={this.props.post.id} />
          <input type="post-text" name="comment[text]" placeholder="Post" />
          <button>Comment</button>
        </form>
      </div>
    )
  }
});
