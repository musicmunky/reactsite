this.Player = React.createClass({

	playerRow: function() {
		var pname = this.props.player.nameF + " " + this.props.player.nameL
		return React.DOM.tr(null,
			React.DOM.td(null, pname),
			React.DOM.td(null, this.props.player.ct)
		);
	},

	render: function() {
// 		if (this.state.edit) {
// 			return this.recordForm();
// 		} else {
			return this.playerRow();
// 		}
	}
});

