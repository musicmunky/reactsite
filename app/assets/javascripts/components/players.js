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

	addPlayer: function(player) {
		var players;
		players = React.addons.update(this.state.players, {
			$push: [player]
		});
		return this.setState({
			players: players
		});
	},

	handleSearch: function() {
		var pname = FUSION.get.node("player_search_box").value;
		if(!FUSION.lib.isBlank(pname) && pname.length > 2) {

			this.setState({ players: [] });

			//console.log("PLAYERS: " + this.state.players);


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
							var results = data['content']['players'];
							var tbl = FUSION.get.node("player_search_table");
							//tbl.tBodies[0].innerHTML = "";
							if(results.length > 0) {
								var i, len, ref, results;
								ref = _this.state.players;
// 								results = [];
								var player;
								for (i = 0, len = results.length; i < len; i++) {
									player = results[i];
									results.push(React.createElement(Player, {
										key: results[i].id,
										player: player,
										//handleDeleteRecord: this.deletePlayer,
										//handleEditRecord: this.updateRecord
									}));
								}
								//console.log("RESULTS: " + results);
								return results;
								//this.setState({ players: results });
								//for(var i = 0; i < results.length; i++) {

									/*React.createElement(Player, {
										key: player.id,
										player: player,
										handleDeletePlayer: this.deletePlayer,
										handleEditPlayer: this.updatePlayer
									});*/
								//}
							}
							else
							{}
							//_this.setState({
							//	edit: false
							//});
							//return _this.props.handleEditRecord(_this.props.record, data);
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
			React.DOM.table({
				className: 'table table-bordered', id: "player_search_table"},
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