this.Player = React.createClass({

	getPlayerInfo: function(pid) {
		if(!FUSION.lib.isBlank(pid)) {
			return $.ajax({
				method: 'POST',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("X-CSRF-Token", jQuery('meta[name="csrf-token"]').attr('content'));
					xhr.setRequestHeader("Accept", "text/html");
				},
				url: "/players/1/getPlayerInfo",
				dataType: 'JSON',
				data: {
					player_id: pid
				},
				success: (function(_this) {
					return function(data) {
						if(data['status'] == "success") {
							var career = data['content']['player']['career'];
							var bio = data['content']['player']['bio'];
							console.log("PLAYER INFO: " + JSON.stringify(bio));
							console.log("CAREER INFO: " + JSON.stringify(career));
							//_this.setState({players: data['content']['players']});
						}
					};
				})(this)
			});
		}

		return false;
	},

	playerRow: function() {
		var pname = this.props.player.nameF + " " + this.props.player.nameL
		return React.DOM.tr(null,
			React.DOM.td(null,
				React.createElement("a", {
					style:{textAlign:"left"},
					onClick:this.getPlayerInfo.bind(this, this.props.player.id),
					href:"javascript:void(0);"}, pname)),
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

