this.Record = React.createClass({

	getInitialState: function() {
		return {
			edit: false
		};
	},

	handleToggle: function(e) {
		e.preventDefault();
		return this.setState({
			edit: !this.state.edit
		});
	},

	handleEdit: function(e) {
		var data;
		e.preventDefault();
		data = {
			title: this.refs.title.value,
			date: this.refs.date.value,
			amount: this.refs.amount.value
		};
		return $.ajax({
			method: 'PUT',
			beforeSend: function(xhr) {
				xhr.setRequestHeader("X-CSRF-Token", jQuery('meta[name="csrf-token"]').attr('content'));
				xhr.setRequestHeader("Accept", "text/html");
			},
			url: "/records/" + this.props.record.id,
			dataType: 'JSON',
			data: {
				record: data
			},
			success: (function(_this) {
				return function(data) {
					_this.setState({
						edit: false
					});
					return _this.props.handleEditRecord(_this.props.record, data);
				};
			})(this)
		});
	},

	handleDelete: function(e) {
		e.preventDefault();
		return $.ajax({
			method: 'DELETE',
			beforeSend: function(xhr) {
				xhr.setRequestHeader("X-CSRF-Token", jQuery('meta[name="csrf-token"]').attr('content'));
				xhr.setRequestHeader("Accept", "text/html");
			},
			url: "/records/" + this.props.record.id,
			dataType: 'JSON',
			success: (function(_this) {
				return function() {
					return _this.props.handleDeleteRecord(_this.props.record);
				};
			})(this)
		});
	},

	recordRow: function() {
		var dt = new Date(this.props.record.date);
		var dstr = (dt.getMonth() + 1) + "/" + (dt.getDate() + 1) + "/" + dt.getFullYear();
		return React.DOM.tr(null,
			React.DOM.td(null, dstr),
			React.DOM.td(null, this.props.record.title),
			React.DOM.td(null, amountFormat(this.props.record.amount)),
			React.DOM.td(null,
				React.DOM.a({
					className: 'btn btn-default',
					onClick: this.handleToggle
				}, 'Edit'),
				React.DOM.a({
					className: 'btn btn-danger',
					onClick: this.handleDelete
				}, 'Delete')
			)
		);
	},

	recordForm: function() {
		return React.DOM.tr(null, React.DOM.td(null, React.DOM.input({
			className: 'form-control',
			type: 'text',
			defaultValue: this.props.record.date,
			ref: 'date'
		})), React.DOM.td(null, React.DOM.input({
			className: 'form-control',
			type: 'text',
			defaultValue: this.props.record.title,
			ref: 'title'
		})), React.DOM.td(null, React.DOM.input({
			className: 'form-control',
			type: 'number',
			defaultValue: this.props.record.amount,
			ref: 'amount'
		})), React.DOM.td(null, React.DOM.a({
			className: 'btn btn-default',
			onClick: this.handleEdit
		}, 'Update'), React.DOM.a({
			className: 'btn btn-danger',
			onClick: this.handleToggle
		}, 'Cancel')));
	},

	render: function() {
		if (this.state.edit) {
			return this.recordForm();
		} else {
			return this.recordRow();
		}
	}
});


/*

Javascript converted from coffee:

  @Record = React.createClass
    getInitialState: ->
      edit: false
    handleToggle: (e) ->
      e.preventDefault()
      @setState edit: !@state.edit
    handleEdit: (e) ->
      e.preventDefault()
      data =
        title: React.findDOMNode(@refs.title).value
        date: React.findDOMNode(@refs.date).value
        amount: React.findDOMNode(@refs.amount).value
      # jQuery doesn't have a $.put shortcut method either
      $.ajax
        method: 'PUT'
        url: "/records/#{ @props.record.id }"
        dataType: 'JSON'
        data:
          record: data
        success: (data) =>
          @setState edit: false
          @props.handleEditRecord @props.record, data
    handleDelete: (e) ->
      e.preventDefault()
      # yeah... jQuery doesn't have a $.delete shortcut method
      $.ajax
        method: 'DELETE'
        url: "/records/#{ @props.record.id }"
        dataType: 'JSON'
        success: () =>
          @props.handleDeleteRecord @props.record
    recordRow: ->
      React.DOM.tr null,
        React.DOM.td null, @props.record.date
        React.DOM.td null, @props.record.title
        React.DOM.td null, amountFormat(@props.record.amount)
        React.DOM.td null,
          React.DOM.a
            className: 'btn btn-default'
            onClick: @handleToggle
            'Edit'
          React.DOM.a
            className: 'btn btn-danger'
            onClick: @handleDelete
            'Delete'
    recordForm: ->
      React.DOM.tr null,
        React.DOM.td null,
          React.DOM.input
            className: 'form-control'
            type: 'text'
            defaultValue: @props.record.date
            ref: 'date'
        React.DOM.td null,
          React.DOM.input
            className: 'form-control'
            type: 'text'
            defaultValue: @props.record.title
            ref: 'title'
        React.DOM.td null,
          React.DOM.input
            className: 'form-control'
            type: 'number'
            defaultValue: @props.record.amount
            ref: 'amount'
        React.DOM.td null,
          React.DOM.a
            className: 'btn btn-default'
            onClick: @handleEdit
            'Update'
          React.DOM.a
            className: 'btn btn-danger'
            onClick: @handleToggle
            'Cancel'
    render: ->
      if @state.edit
        @recordForm()
      else
        @recordRow()

*/