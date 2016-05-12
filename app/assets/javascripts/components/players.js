this.Players = React.createClass({

	getInitialState: function() {
		return {
			players: this.props.data,
			selectedPlayer: null
		};
	},

	getDefaultProps: function() {
		return {
			players: []
		};
	},

	addPlayer: function(player) {
		var players;
		players = React.addons.update(this.state.players, {
			$push: [player]
		});
		return this.setState({
			players: players
		});
	},

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
// 							console.log("PLAYER INFO: " + JSON.stringify(bio));
// 							console.log("CAREER INFO: " + JSON.stringify(career));

							var pname = bio['plrs'][0]['personalInfo']['name']['first'] + " " + bio['plrs'][0]['personalInfo']['name']['last'];
							//_this.refs.player_name.innerText = pname;
							//_this.setState({players: data['content']['players']});
							_this.setState({selectedPlayer: {name: pname, money: 0}});
						}
					};
				})(this)
			});
		}

		return false;
	},

	handleSearch: function(e) {
		var pname = e.target.value;
		this.setState({ players: [] });
		if(!FUSION.lib.isBlank(pname) && pname.length > 2) {
			return $.ajax({
				method: 'GET',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("X-CSRF-Token", jQuery('meta[name="csrf-token"]').attr('content'));
					xhr.setRequestHeader("Accept", "text/html");
				},
				url: "/players/1/searchPlayerNames",
				dataType: 'JSON',
				data: {
					player_name: pname
				},
				success: (function(_this) {
					return function(data) {
						if(data['status'] == "success") {
							_this.setState({players: data['content']['players']});
						}
					};
				})(this)
			});
		}
	},

	render: function() {
		var player;
		return React.DOM.div({
			className: 'players'},
			React.DOM.h2({
				className: 'title'},
				React.createElement("input", {style:{float:"right", fontSize:"18px", lineHeight:"18px", height:"28px", padding:"5px"},
											  id:"player_search_box",
											  type:"text",
											  placeholder:"Search Players",
											  onChange: this.handleSearch}),
				'Search Players'),
			React.DOM.hr(null),
			React.DOM.div({style:{float:"left", width:"100%"}},
				React.createElement("span", {style:{float:"left", marginRight:"10px"}}, "Results: "),
				React.createElement("span", {id:"num_player_results", style:{float:"left"}}, this.state.players.length)),
			React.DOM.table({
				className: 'table table-bordered', id: "player_search_table", style: { width: "100%", marginBottom:"20px" }},
				React.DOM.thead(null,
					React.DOM.tr(null,
						React.createElement("th", {
							style:{textAlign:"left"}},
							'Player Name'),
						React.createElement("th", {
							style:{}},
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
							handleEditPlayer: this.updatePlayer,
							playerSelected: this.getPlayerInfo.bind(this, player.id)
						}));
					}
					return results;
				}).call(this))
			),
			React.createElement(PlayerInfo, this.state.selectedPlayer)
		);
	}

});