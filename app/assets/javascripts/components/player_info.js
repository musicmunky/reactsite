this.PlayerInfo = React.createClass({
	render: function() {
		return React.DOM.div({className:"w100fl"},
				React.createElement("h3", {className:"w100fl"}, "Player Info"),
				React.createElement("div", {className:"w100fl"},
					React.createElement("div", {style:{float:"left", width:"172px", height:"172px", display:"block"}},
						React.createElement("img", {src:this.props.headshot, alt:this.props.name, style:{float:"left", width:"172px", height:"172px", visibility:this.props.img_visibility}})),
					React.createElement("h4", {style:{float:"left", marginLeft:"20px", fontSize:"22px"}, id:"player_name"}, this.props.name),
					React.createElement("div", {className:"w100fl", id:"total_money"}, this.props.money)));
	}
});