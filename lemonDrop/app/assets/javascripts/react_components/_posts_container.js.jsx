
var PostsContainer = React.createClass ({

	getInitialState: function(){
		return JSON.parse(this.props.controller);
	},

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
		);
	}
});

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