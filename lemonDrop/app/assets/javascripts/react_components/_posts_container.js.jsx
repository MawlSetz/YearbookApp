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
				this.setState({posts: data.posts})
			}.bind(this)
		});
	},
	// renders posts
	render: function() {
		return (
			<div className = "posts">
        <div className="form-field">
				  <PostTagSearchContainer onTagSearch={this.handleTagSearch} />
				  <PostCreateContainer form={this.state.form} posts={this.state.posts} onUpdate={this.onUpdate} />
        </div>
				<PostInfo users={this.state.users} posts={this.state.posts} session={this.state.session} form={this.state.form} onDelete={this.handlePostDelete} />
			</div>
		)
	},

	onUpdate: function(val) {
		this.setState({posts: val.posts})
	}
});
// loops through posts one by one and creates an object with all post divs
var PostInfo = React.createClass({
	render: function() {
		var postNodes = this.props.posts.map(function(post){
			if (this.props.session == post.post.user_id) {
				return <PostsWithDelete users={this.props.users} post={post} form={this.props.form} session={this.props.session} onDelete={this.props.onDelete} />
			} else {
				return <Posts users={this.props.users} post={post} session={this.props.session} form={this.props.form} />
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
    var action = $(event.target).attr("action")
    this.props.onDelete(formData, action);
	},

	render: function() {
		var path = "/posts/"+ this.props.post.post.id
		return (
			<form ref="form" action={path} method="POST" onSubmit={this.handleDelete}>
				<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
				<input type="hidden" name="_method" value="delete" />
				<button className="button delete-button btn btn-sm btn-danger">Delete</button>
			</form>
		);
	}
});
// renders individual posts
var Posts = React.createClass({
  getInitialState: function() {
    return {vote: this.props.post.post.vote, comments: this.props.post.comments}
  },

  handleVote: function(formData) {
    var path = "/posts/" + this.props.post.post.id
    $.ajax({
      data: formData,
      url: path,
      type: "PUT",
      success: function(data) {
        this.setState({vote: data.vote, comments: data.comments});
      }.bind(this)
    })
  },

	render: function() {
    var postUser
    var post = this.props.post.post
    this.props.users.forEach(function(user) {
      if (post.user_id === user.id) {
        postUser = user
      }
    })
		return (
		<div className="each-post">
			<div className="img_vote posts_stuff">
        <img className="user_post_image" src={postUser.picture} />
				<b className="user-name">{postUser.first} {postUser.last}</b>
				<p className="vote">Vote: {this.state.vote}</p>
        <VoteButton post={this.props.post} form={this.props.form} onVote={this.handleVote} />
      </div>
      <div className="content_tag posts_stuff">
        <i className="post-time">Created at: {this.props.post.post.created_at}</i>
        <p className="post_content">{this.props.post.post.content}</p>
        <p className="post_tags">Tag: {this.props.post.post.tags}</p>
			</div>
      <CommentsList users={this.props.users} session={this.props.session} post={this.props.post.post} comments={this.props.post.comments} form={this.props.form} />
		</div>
		);
	}
});
// when logged in, able to delete
var PostsWithDelete = React.createClass({
   getInitialState: function() {
    return {vote: this.props.post.post.vote, comments: this.props.post.comments}
  },

  handleVote: function(formData) {
    var path = "/posts/" + this.props.post.post.id
    $.ajax({
      data: formData,
      url: path,
      type: "PUT",
      success: function(data) {
        this.setState({vote: data.vote, comments: data.comments});
      }.bind(this)
    })
  },

	render: function() {
    var postUser
    var post = this.props.post.post
    this.props.users.forEach(function(user) {
      if (post.user_id === user.id) {
        postUser = user
      }
    })
		return (
		<div className="each-post">
			<div className="img_vote posts_stuff">
        <img className="user_post_image" src={postUser.picture} />
				<b className="user-name">{postUser.first} {postUser.last}</b>
				<p className="vote">Vote: {this.state.vote}</p>
        <VoteButton post={this.props.post} form={this.props.form} onVote={this.handleVote} />
      </div>
      <div className="content_tag posts_stuff">
        <i className="post-time">Created at: {this.props.post.post.created_at}</i>
        <p className="post_content">{this.props.post.post.content}</p>
        <p className="post_tags">Tag: {this.props.post.post.tags}</p>
			</div>
			<PostDeleteForm post={this.props.post} form={this.props.form} onDelete={this.props.onDelete} />
      <CommentsList users={this.props.users} session={this.props.session} form={this.props.form} post={this.props.post.post} comments={this.props.post.comments} form={this.props.form} />
		</div>
		);
	}
});
