var PostTagSearchContainer = React.createClass ({
  render: function() {
    return (
      <div className = "posts-tag-search">
        <TagForm form={this.props.form} onTagSearch={this.props.onTagSearch} resetTagSearch={this.props.resetTagSearch} />
      </div>
    );
  }
});

var TagForm = React.createClass ({
  getInitialState: function(){
    return {value: ""}
  },

  handleChange: function(event){
    this.setState({value: event.target.value})
    this.props.onTagSearch($(this.getDOMNode()).serialize())
  },

  render: function() {
    var value = this.state.value
    return (
      <input type="tags-text" name="search" value={value} placeholder="Search by Tags" onChange={this.handleChange} />
    );
  }
});
