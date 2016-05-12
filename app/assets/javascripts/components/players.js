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
							_this.refs.num_player_results.innerText = data['content']['players'].length;
						}
					};
				})(this)
			});
		}
		else {
			FUSION.get.node("num_player_results").innerHTML = 0;
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
				React.createElement("span", {id:"num_player_results", ref:"num_player_results", style:{float:"left"}}, "0")),
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
							handleEditPlayer: this.updatePlayer
						}));
					}
					return results;
				}).call(this))
			),
			React.DOM.div({className:"w100fl"},
				React.createElement("h3", {className:"w100fl"}, "Player Info"),
				React.createElement("div", {className:"w100fl"},
					React.createElement("div", {className:"w100fl", id:"player_name"}),
					React.createElement("div", {className:"w100fl", id:"total_money"})))
		);
	}

});