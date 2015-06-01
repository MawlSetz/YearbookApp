//This is containing everything
var ProfileContainer = React.createClass ({
  //This initializing base state. State is reacts way of knowing when it needs to render
  getInitialState: function(){
    //Feeding our page all updates of current state. Props is properties of the element. Element is the ProfileContainer
    return JSON.parse(this.props.controller);
  },

  handleUpdateForm: function(formData, action){
    $.ajax({
      data: formData,
      url: action,
      type: "GET",
      success: function(data){
        this.setState({form: data.form})
      }.bind(this)
    });
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

  handleOkayPress: function(){
    var form = {}
    this.setState({form: form});
  },

  // This renders the html with the provided updates
  render: function() {
    if (this.state.form.csrf_token){
      return (
        <div className = "profile">
          <UserFields user={this.state.user} form={this.state.form} onOkayPress={this.handleOkayPress} onUserUpdate={this.handleUserUpdate} />
        </div>
      )
    } else {
      return (
        <div className = "profile">
          <UserInfo user={this.state.user} form={this.state.form} session={this.state.session} onUpdateButtonSubmit={this.handleUpdateForm} />
        </div>
      )
    }
  }
});

var UpdateButton = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault()
    this.props.onUpdateButtonSubmit()
  },

  render: function() {
    if (this.props.session === this.props.user.id){
      return (
        <form action={this.props.form.action} method="get" onSubmit={this.handleSubmit}>
          <button>Update Info</button>
        </form>
      )
    } else {
      return <div></div>
    }
  }
});

var OkayButton = React.createClass({
  handlePress: function(event){
    event.preventDefault()
    this.props.onOkayPress()
  },

  render: function() {
    return (
      <form onSubmit={this.handlePress}>
        <button>Done</button>
      </form>
    )
  }
})

// This is creating our information and making it all a property
var UserInfo = React.createClass({
  render: function() {
    return (
      <div>
        <div id="picture">
          <img id="pic" src={this.props.user.picture} />
        </div>
        <div id="name">
          <UpdateButton user={this.props.user} form={this.props.form} session={this.props.session} onUpdateButtonSubmit={this.props.onUpdateButtonSubmit} />
          <h1>{this.props.user.first} {this.props.user.last}</h1>
        </div>
        <div id="basic-info">
          <h3>{this.props.user.email}</h3>
          <h3><a href={this.props.user.personal_link}>{this.props.user.personal_link}</a></h3>
          <h3>current city: {this.props.user.location}</h3>
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
  onUpdate: function(event){
    event.preventDefault()
    var formData = $(event.target).serialize()
    var action = this.props.form.action
    this.props.onUserUpdate(formData, action)
    $(event.target).parent().toggle()
    $(event.target).parent().prev().children("button").text("Edit")
  },

  handleShowField: function(event) {
    event.preventDefault();
    var text = $(event.target[0]).text()
    if (text === "Edit") {
      $(event.target[0]).text("Cancel");
    } else {
      $(event.target[0]).text("Edit");
    }
    $(event.target).next().toggle()
  },

  render: function(){
    var user = this.props.user;
    return (
      <div>
        <OkayButton onOkayPress={this.props.onOkayPress} />
        <p>{user.first} {user.last}</p>
        <form onSubmit={this.handleShowField}>
          <button>Edit</button>
        </form>
        <div id="name-form" className="form" style={{display: "none"}}>
          <form action={this.props.action} onSubmit={this.onUpdate}>
            <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
            <input name="user[first]" placeholder="First Name" />
            <input name="user[last]" placeholder="Last Name" />
            <button>Update</button>
          </form>
        </div>
        <img src={user.picture} />
        <form onSubmit={this.handleShowField}>
          <button>Edit</button>
        </form>
        <div id="picture-form" className="form" style={{display: "none"}} onSubmit={this.onUpdate}>
          <form action={this.props.action} onSubmit={this.onUpdate}>
            <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
            <input name="user[picture]" placeholder="Your Yearbook photo" />
            <button>Update</button>
          </form>
        </div>
        <p>{user.email}<br />{user.location}<br />{user.personal_link}</p>
        <form onSubmit={this.handleShowField}>
          <button>Edit</button>
        </form>
        <div id="basic-info-form" className="form" style={{display: "none"}}>
          <form action={this.props.action} onSubmit={this.onUpdate}>
            <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
            <input name="user[email]" placeholder="email" />
            <input name="user[location]" placeholder="location" />
            <input name="user[personal_link]" placeholder="personal website" />
            <button>Update</button>
          </form>
        </div>
        <p>{user.github}<br />{user.linkedin}<br />{user.facebook}<br />{user.twitter_handle}</p>
        <form onSubmit={this.handleShowField}>
          <button>Edit</button>
        </form>
        <div id="social-form" className="form" style={{display: "none"}}>
          <form action={this.props.action} onSubmit={this.onUpdate}>
            <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
            <input name="user[github]" placeholder="Github" />
            <input name="user[linkedin]" placeholder="LinkedIn" />
            <input name="user[facebook]" placeholder="Facebook" />
            <input name="user[twitter_handle]" placeholder="Twitter Handle" />
            <button>Update</button>
          </form>
        </div>
        <p>{user.bio}</p>
        <form onSubmit={this.handleShowField}>
          <button>Edit</button>
        </form>
        <div id="bio-form" className="form" style={{display: "none"}}>
          <form action={this.props.action} onSubmit={this.onUpdate}>
            <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
            <input name="user[bio]" placeholder="Tell us about yourself" />
            <button>Update</button>
          </form>
        </div>
        <p>{user.quote}</p>
        <form onSubmit={this.handleShowField}>
          <button>Edit</button>
        </form>
        <div id="quote-form" className="form" style={{display: "none"}}>
          <form action={this.props.action} onSubmit={this.onUpdate}>
            <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
            <input name="user[quote]" placeholder="Your yearbook quote" />
            <button>Update</button>
          </form>
        </div>
        <p>{user.skill_primary} {user.skill_secondary}</p>
        <form onSubmit={this.handleShowField}>
          <button>Edit</button>
        </form>
        <div id="skills-form" className="form" style={{display: "none"}}>
          <form action={this.props.action} onSubmit={this.onUpdate}>
            <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
            <input name="user[skill_primary]" placeholder="What is your top tech skill?" />
            <input name="user[skill_secondary]" placeholder="What is your second top tech skill?" />
            <button>Update</button>
          </form>
        </div>
      </div>
    )
  }
});
