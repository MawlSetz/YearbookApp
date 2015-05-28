//This is containing everything
var ProfileContainer = React.createClass ({
  //This initializing base state. State is reacts way of knowing when it needs to render
  getInitialState: function(){
    //Feeding our page all updates of current state. Props is properties of the element. Element is the ProfileContainer 
    return JSON.parse(this.props.controller);
  },


  //this is where we're sending request to server at user#update via form data
  //ajax is a function that takes an object
  // Triggers the change of the information via render function
  // Binds the element to the function so it knows what to set the state to.

  handleUserUpdate: function(formData, action){
    $.ajax({
      data: formData,
      url: action,
      type: "PUT",
      success: function(data){
        this.setState({user: data})
        }.bind(this)
    });
  },

  // This renders the html with the provided updates
  render: function() {
    return (
      <div className = "profile">
        <UserInfo user={this.state.user} form={this.state.form} />
      </div>
    )
  }
});

// This is creating our information and making it all a property
var UserInfo = React.createClass({
  render: function() {
    return (
      <div>
        <div id="name">
          <h1>{this.props.user.first} {this.props.user.last}</h1>
        </div>
        <div id="basic-info">
          <h3>{this.props.user.email}</h3>
          <h3>{this.props.user.location}</h3>
          <h3>{this.props.user.personal_link}</h3>
        </div>
        <div id="social">
          <a href={this.props.user.github}>Github</a>
          <a href={this.props.user.facebook}>Facebook</a>
          <a href={this.props.user.linkedin}>LinkedIn</a>
        </div>
        <div id="bio">
          <p>{this.props.user.bio}</p>
        </div>
      </div>
    )
  }
});

// This is linking the properties as an action which is an argument in handleUserUpdate
var UserFields = React.createClass({
  render: function(){
    return (
      <div>
        <div id="name-form">
          <form action={action}>
            <input name="first" placeholder="First Name" />
            <input name="last" placeholder="Last Name" />
          </form>
        </div>
        <div id="picture-form">
          <form action={action}>
            <input name="picture" placeholder="Your Yearbook photo" />
          </form>
        </div>
        <div id="basic-info-form">
          <form action={action}>
            <input name="email" placeholder="email" />
            <input name="location" placeholder="location" />
            <input name="personal_link" placeholder="personal website" />
          </form>
        </div>
        <div id="social-form">
          <form action={action}>
            <input name="github" placeholder="Github" />
            <input name="linkedin" placeholder="LinkedIn" />
            <input name="facebook" placeholder="Facebook" />
          </form>
        </div>
        <div id="bio-form">
          <form action={action}>
            <input name="bio" placeholder="Tell us about yourself" />
          </form>
        </div>
        <div id="quote-form">
          <form action={action}>
            <input name="quote" placeholder="Your yearbook quote" />
          </form>
        </div>
        <div id="skills-form">
          <form action={action}>
            <input name="skill_primary" placeholder="What is your top tech skill?" />
            <input name="skill_secondary" placeholder="What is your second top tech skill?" />
          </form>
        </div>
      </div>
    )
  }
});
