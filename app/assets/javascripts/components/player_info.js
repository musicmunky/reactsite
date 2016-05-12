this.PlayerInfo = React.createClass({

	getInitialState: function() {
		return {
			name: '',
			id: ''
		};
	},

	handleChange: function(e) {
/*		var name, obj;
		name = e.target.name;
		return this.setState((
			obj = {},
			obj["" + name] = e.target.value,
			obj
		));*/
	},

	render: function() {
		return React.DOM.div({className:"w100fl"},
				React.createElement("h3", {className:"w100fl"}, "Player Info"),
				React.createElement("div", {className:"w100fl"},
					React.createElement("div", {className:"w100fl", ref:"player_name", id:"player_name"}),
					React.createElement("div", {className:"w100fl", ref:"total_money", id:"total_money"})));
	}
});