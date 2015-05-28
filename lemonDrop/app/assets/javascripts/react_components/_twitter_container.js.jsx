var TwitterContainer = React.createClass ({
	getInitialState: function(){
		return JSON.parse(this.props.controller);
	},

	render: function() {
		return (
			<div className = "tweets">
				<UserTweets tweets={this.state.tweets} />
			</div>
		);
	}
});

var UserTweets = React.createClass({
	render: function() {
		tweetNodes = this.props.tweets.map(function(tweet){

			return <Tweet tweet={tweet} />

		});

		return (
			<div>
			{tweetNodes}
			</div>
			);
	}
});

var Tweet = React.createClass({
	render: function() {
		return (
			<div>
			<p>{this.props.tweet.text}</p>
			<i>{this.props.tweet.created_at}</i>
			</div>
			);
	}
});
