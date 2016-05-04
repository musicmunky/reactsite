this.Records = React.createClass({

	getInitialState: function() {
		return {
			records: this.props.data
		};
	},

	getDefaultProps: function() {
		return {
			records: []
		};
	},

	addRecord: function(record) {
		var records;
		records = React.addons.update(this.state.records, {
			$push: [record]
		});
		return this.setState({
			records: records
		});
	},

	updateRecord: function(record, data) {
		var index, records;
		index = this.state.records.indexOf(record);
		records = React.addons.update(this.state.records, {
			$splice: [[index, 1, data]]
		});
		return this.replaceState({
			records: records
		});
	},

	deleteRecord: function(record) {
		var index, records;
		index = this.state.records.indexOf(record);
		records = React.addons.update(this.state.records, {
			$splice: [[index, 1]]
		});
		return this.replaceState({
			records: records
		});
	},

	credits: function() {
		var credits;
		credits = this.state.records.filter(function(val) {
			return val.amount >= 0;
		});
		return credits.reduce((function(prev, curr) {
			return prev + parseFloat(curr.amount);
		}), 0);
	},

	debits: function() {
		var debits;
		debits = this.state.records.filter(function(val) {
			return val.amount < 0;
		});
		return debits.reduce((function(prev, curr) {
			return prev + parseFloat(curr.amount);
		}), 0);
	},

	balance: function() {
		return this.debits() + this.credits();
	},

	render: function() {
		var record;
		return React.DOM.div({
			className: 'records'},
			React.DOM.h2({
				className: 'title'},
				'Records'),
			React.DOM.div({
				className: 'row'},
				React.createElement(AmountBox, {
					type: 'success',
					amount: this.credits(),
					text: 'Credit'}),
				React.createElement(AmountBox, {
					type: 'danger',
					amount: this.debits(),
					text: 'Debit'}),
				React.createElement(AmountBox, {
					type: 'info',
					amount: this.balance(),
					text: 'Balance'})
			),
			React.createElement(RecordForm, {
				handleNewRecord: this.addRecord}),
			React.DOM.hr(null),
			React.DOM.table({
				className: 'table table-bordered'},
				React.DOM.thead(null,
					React.DOM.tr(null,
						React.createElement("th", {
							style:{width:"150px", textAlign:"center"}},
							'Date'),
						React.createElement("th", {
							style:{width:"300px"}},
							"Title"),
						React.createElement("th", {
							style:{width:"150px", textAlign:"center"}},
							"Amount"),
						React.createElement("th", {
							style:{textAlign:"center"}},
							"Actions"))),
				React.DOM.tbody(null, (function() {
					var i, len, ref, results;
					ref = this.state.records;
					results = [];
					for (i = 0, len = ref.length; i < len; i++) {
						record = ref[i];
						results.push(React.createElement(Record, {
							key: record.id,
							record: record,
							handleDeleteRecord: this.deleteRecord,
							handleEditRecord: this.updateRecord
						}));
					}
					return results;
				}).call(this))
			)
		);
	}
});

/*

Javascript converted from coffee:

@Records = React.createClass
    addRecord: (record) ->
      records = React.addons.update(@state.records, { $push: [record] })
      @setState records: records
    updateRecord: (record, data) ->
      index = @state.records.indexOf record
      records = React.addons.update(@state.records, { $splice: [[index, 1, data]] })
      @replaceState records: records
    deleteRecord: (record) ->
      index = @state.records.indexOf record
      records = React.addons.update(@state.records, { $splice: [[index, 1]] })
      @replaceState records: records
    render: ->
      React.DOM.div
        className: 'records'
        React.DOM.h2
          className: 'title'
          'Records'
        React.DOM.div
          className: 'row'
          React.createElement AmountBox, type: 'success', amount: @credits(), text: 'Credit'
          React.createElement AmountBox, type: 'danger', amount: @debits(), text: 'Debit'
          React.createElement AmountBox, type: 'info', amount: @balance(), text: 'Balance'
        React.createElement RecordForm, handleNewRecord: @addRecord
        React.DOM.hr null
        React.DOM.table
          className: 'table table-bordered'
          React.DOM.thead null,
            React.DOM.tr null,
              React.DOM.th null, 'Date'
              React.DOM.th null, 'Title'
              React.DOM.th null, 'Amount'
              React.DOM.th null, 'Actions'
          React.DOM.tbody null,
            for record in @state.records
              React.createElement Record, key: record.id, record: record, handleDeleteRecord: @deleteRecord, handleEditRecord: @updateRecord


*/