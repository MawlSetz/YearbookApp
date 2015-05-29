var SkillSearchContainer = React.createClass ({

  getInitialState: function(){
    return {
      users: []
    };
  },

  skillSearch: function(query){
    $.ajax({
      data: query,
      url: "/users",
      type: "GET",
      success: function(data){
        this.setState({users: data.users});
      }.bind(this)
    });
  },

  resetSkillSearch: function(){
    this.setState({
      users: []
    })
  },

  render: function(){
    return (
      <div className = "user-search">
        <SkillForm users={this.state.users} skillSearch={this.skillSearch} resetSkillSearch={this.resetSkillSearch}/>
        <UserList users={this.state.users} />
      </div>
    );
  }
});

var SkillForm = React.createClass ({
  getInitialState: function(){
    return {value: ""}
  },

  handleChange: function(event){
    this.setState({value: event.target.value})
    if (event.target.value.length == 0) {
      this.props.resetSkillSearch()
    }
    else {
      this.props.skillSearch($(this.getDOMNode()).serialize())
    }
    $("input[name='skill_search']").eq(0).val("");
  },

  render: function() {
    var value = this.state.value
    return (
      <input type="skill-text" name="skill_search" value={value} placeholder="Search Users by Skills" onChange={this.handleChange} />
    );
  }
});

var UserList = React.createClass({
  render: function(){
    var userNodes = this.props.users.map(function(user){
      return <User user={user} />
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