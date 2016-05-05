this.Players = React.createClass({

	getInitialState: function() {
		return {
			players: this.props.data
		};
	},

	getDefaultProps: function() {
		return {
			players: []
		};
	},

	render: function() {
		var player;
		return React.DOM.div({
			className: 'players'},
			React.DOM.h2({
				className: 'title'},
				'All Players'),
			React.DOM.hr(null),
			React.DOM.table({
				className: 'table table-bordered'},
				React.DOM.thead(null,
					React.DOM.tr(null,
						React.createElement("th", {
							style:{width:"300px", textAlign:"left"}},
							'Player Name'),
						React.createElement("th", {
							style:{width:"300px"}},
							"Country"))),
				React.DOM.tbody(null, (function() {
					var i, len, ref, results;
					ref = this.state.players;
					results = [];
					for (i = 0, len = ref.length; i < len; i++) {
						player = ref[i];
						results.push(React.createElement(Player, {
							key: player.id,
							player: player,
							handleDeletePlayer: this.deletePlayer,
							handleEditPlayer: this.updatePlayer
						}));
					}
					return results;
				}).call(this))
			)
		);
	}

});