
var PostsContainer = React.createClass ({
	// sets initial state
	getInitialState: function(){
		return JSON.parse(this.props.controller);
	},

	handlePostUpdate: function(formData, action){
		$.ajax({
			data: formData,
			url: action,
			type: "PUT",
			success: function(data){
				this.setState({posts: data})
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
				return <PostsWithDelete post={post} form={this.props.form} onDelete={this.props.onDelete} />
			}
			else {
				return <Posts post={post} form={this.props.form} />
			}

		}.bind(this));
		return (
			<div id="postNode">
				{postNodes}	
			</div>
		)
	}
});
// post fields
var PostFields = React.createClass({
	render: function() {
		return (
			<div>
				<div id="user-id-form">
					<form action={action}>
						<input name="user-id" />
					</form>
				</div>
				<div id="content-form">
					<form action={action}>
						<input name="content" placeholder="Share something" />
					</form>
				</div>
				<div id="vote-form">
					<form action={action}>
						<input name="vote" placeholder="2" />
					</form>
				</div>
				<div id="tags-form">
					<form action={action}>
						<input name="tags" placeholder="tag" />
					</form>
				</div>
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
			<p>User: {this.props.post.user_id}</p>
			<p>{this.props.post.content}</p>
			<p>Vote: {this.props.post.vote}</p>
			<p>Tag: {this.props.post.tags}</p>
		</div>
		);
	}
});
// when logged in, able to delete
var PostsWithDelete = React.createClass({
	render: function() {
		return (
		<div>
			<p>User: {this.props.post.user_id}</p>
			<p>{this.props.post.content}</p>
			<p>Vote: {this.props.post.vote}</p>
			<p>Tag: {this.props.post.tags}</p>
			<PostDeleteForm post={this.props.post} onDelete={this.props.onDelete} />
		</div>
		);
	}
});