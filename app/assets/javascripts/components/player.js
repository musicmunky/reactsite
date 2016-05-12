this.Player = React.createClass({
	render: function() {
		var pname = this.props.player.nameF + " " + this.props.player.nameL
		return React.DOM.tr(null,
			React.DOM.td(null,
				React.createElement("a", {
					style:{textAlign:"left"},
					onClick: this.props.playerSelected,
					href:"javascript:void(0);"}, pname)),
			React.DOM.td(null, this.props.player.ct)
		);
	}
});

