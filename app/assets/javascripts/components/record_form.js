
this.RecordForm = React.createClass({

	getInitialState: function() {
		return {
			title: '',
			date: '',
			amount: ''
		};
	},

	handleChange: function(e) {
		var name, obj;
		name = e.target.name;
		return this.setState((
			obj = {},
			obj["" + name] = e.target.value,
			obj
		));
	},

	valid: function() {
		return this.state.title && this.state.date && this.state.amount;
	},

	handleSubmit: function(e) {
		e.preventDefault();
		$.ajaxSetup({
			beforeSend: function(xhr) {
				xhr.setRequestHeader("X-CSRF-Token", jQuery('meta[name="csrf-token"]').attr('content'));
				xhr.setRequestHeader("Accept", "text/html");
			}
		});
		return $.post('', {
			record: this.state
		}, (function(_this) {
			return function(data) {
				_this.props.handleNewRecord(data);
				return _this.setState(_this.getInitialState());
			};
		})(this), 'JSON');
	},

	render: function() {
		return React.DOM.form({
			onSubmit: this.handleSubmit,
			className: 'form-inline'
		}, React.DOM.div({
			className: 'form-group'
		}, React.DOM.input({
			type: 'text',
			className: 'form-control',
			placeholder: 'Date',
			name: 'date',
			value: this.state.date,
			onChange: this.handleChange
		})), React.DOM.div({
			className: 'form-group'
		}, React.DOM.input({
			type: 'text',
			className: 'form-control',
			placeholder: 'Title',
			name: 'title',
			value: this.state.title,
			onChange: this.handleChange
		})), React.DOM.div({
			className: 'form-group'
		}, React.DOM.input({
			type: 'number',
			className: 'form-control',
			placeholder: 'Amount',
			name: 'amount',
			value: this.state.amount,
			onChange: this.handleChange
		})), React.DOM.button({
			type: 'submit',
			className: 'btn btn-primary',
			disabled: !this.valid()
		}, 'Create record'));
	}
});