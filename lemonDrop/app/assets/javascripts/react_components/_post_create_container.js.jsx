var PostCreateContainer = React.createClass ({

  handlePostSubmit: function(formData, action){
    $.ajax({
      data: formData,
      url: action,
      type: "POST",
      success: function(data){
        this.props.onUpdate(data);
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className = "posts-create-form">
        <PostForm form={this.props.form} onPostSubmit={this.handlePostSubmit} />
      </div>
    );
  }
});

var PostForm = React.createClass ({
  //pass along form info to an ajax call, when click submit button
  handleSubmit: function(event){
    //prevent submit button from refreshing page
    event.preventDefault();
    var formData = $(this.getDOMNode()).serialize();
    this.props.onPostSubmit(formData, this.props.form.action);
    $(event.target).children().eq(1).val("");
    $(event.target).children().eq(2).val("")
  },

  render: function() {
    return (
      <form action={this.props.form.action} method="post" onSubmit={this.handleSubmit} >
      <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
      <input type="post-text" name="text" name="post[content]" placeholder="Post" />
      <input type="post-tags" name="text" name="post[tags]" placeholder="Tags" />
      <button>Create</button>
      </form>
    );
  }
});
