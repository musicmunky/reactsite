this.PlayerInfo = React.createClass({
	render: function() {
		return React.DOM.div({className:"w100fl"},
				React.createElement("h3", {className:"w100fl"}, "Player Info"),
				React.createElement("div", {className:"w100fl"},
					React.createElement("div", {className:"w100fl", id:"player_name"}, this.props.name),
					React.createElement("div", {className:"w100fl", id:"total_money"}, this.props.money)));
	}
});