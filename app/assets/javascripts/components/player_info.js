this.PlayerInfo = React.createClass({
	render: function() {
		return React.DOM.div({className:"w100fl"},
				React.createElement("h3", {className:"w100fl"}, "Player Info"),
				React.createElement("div", {className:"w100fl"},
					React.createElement("div", {style:{float:"left", width:"172px", height:"172px", display:"block"}},
						React.createElement("img", {src:this.props.headshot, alt:this.props.name, style:{float:"left", width:"172px", height:"172px", visibility:this.props.img_visibility}})),
					React.createElement("div", {id:"profile_wrapper", style:{float:"left", width:"calc(100% - 175px)", height:"90px"}},
						React.createElement("div", {id:"profile_row1", style:{float:"left", width:"100%", height:"45px"}},
							React.createElement("h4", {style:{float:"left", marginLeft:"20px", fontSize:"22px"}, id:"player_name"}, this.props.name)),
						React.createElement("div", {id:"profile_row2", style:{float:"left", width:"100%", height:"45px"}},
							React.createElement("div", {style:{width:"50%", float:"left"}}, this.props.country),
							React.createElement("div", {style:{width:"50%", float:"left"}}, this.props.height + ", " + this.props.weight)),
						React.createElement("div", {id:"profile_row3", style:{float:"left", width:"100%", height:"45px"}},
							React.createElement("div", {style:{width:"50%", float:"left"}}, this.props.country),
							React.createElement("div", {style:{width:"50%", float:"left"}}, this.props.country)),
						React.createElement("div", {id:"profile_row4", style:{float:"left", width:"100%", height:"45px"}},
							React.createElement("div", {style:{width:"50%", float:"left"}}, this.props.country),
							React.createElement("div", {style:{width:"50%", float:"left"}}, this.props.country))),
					React.createElement("div", {className:"w100fl", id:"total_money"}, this.props.money)));
	}
});