var UserSearchContainer = React.createClass({
	getInitialState: function(){
		return JSON.parse(this.props.users)
	},

	search: function(query) {
		$.ajax({
			data: query,
			type: "GET",
			url: "/users",
			success: function(data) {
				this.setState({users: data.users})
			}.bind(this)
		})
	},

	resetSearch: function() {
		$.ajax({
			type: "GET",
			url: "/users",
			success: function(data) {
				this.setState({users: data.users})
			}.bind(this)
		})
	},

	render: function(){
		return (
			<div id="user-search">
				<SearchBar users={this.state.users} search={this.search} resetSearch={this.resetSearch} />
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
		if (event.target.value.length == 0) {
			this.props.resetSearch()
		}
		else{
			this.props.search($(this.getDOMNode()).serialize())
		}
	},
	render: function(){
		var value = this.state.value
		return <input id="user-search-field" type="text" name="search" value={value} placeholder="Search Users by Name" onChange={this.handleChange} />
	},

});

var UserList = React.createClass({
	render: function(){
		var userNodes = this.props.users.map(function(user){
			return <User user={user} />
		})
		return (
			<div className="all-users">{userNodes}</div>
		)
	}
});

var User = React.createClass({
	render: function(){
		var link = "/users/" + this.props.user.id
		return (
			<div className="user">
        <div className="user-picture">
  				<img src={this.props.user.picture} />
        </div>
				<p><a href={link}>{this.props.user.first} {this.props.user.last}</a></p>
			</div>
		)
	}
});
