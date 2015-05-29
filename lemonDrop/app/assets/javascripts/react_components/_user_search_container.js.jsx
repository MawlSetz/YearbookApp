var UserSearchContainer = React.createClass({
	getInitialState: function(){
		debugger
		return JSON.parse(this.props.userSearch)
	},
	render: function(){
		debugger
		return(
			<div id="user-search">
				<SearchBar />
				<UserList users={this.state.users} /> 
			</div>
		)
	}
});

var SearchBar = React.createClass({
	getInitialState: function(){
		return {value: ""}	
	},
	handleChange: function(event){
		this.setState({value: event.target.value})
	},
	render: function(){
		var value = this.state.value
		return <input type="text" value={value} onChange={this.handleChange} />
	}
});

var UserList = React.createClass({
	render: function(){
		userNodes = this.props.users.map(function(user){
			<User user={user} />
		})
		return (
			<div>{userNodes}</div>
		)
	}
});

var User = React.createClass({
	render: function(){
		var link = "/users/" + this.props.user.id
		return (
			<div className="user">
				<img src={this.props.user.picture} />
				<p><a href={link}>{this.props.user.first} {this.props.user.last}</a></p>
			</div>
		)
	}
});