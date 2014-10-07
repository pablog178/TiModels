var App = require('core');
var args = arguments[0] || {};
var rows = [];
var list;

$.getList = function () {
	return list;
};
$.open = function(){
	App.openNavigation($.window);
};

function init () {
	if(args.list){
		list = args.list;
	} else {
		var _user = Alloy.Models.instance('user');
		_user.set({
			username : 'default'
		});
		_user.fetch();
		_user.save();
		
		list = _user;
	}

	$.tableView.addEventListener('click', handleTableClick);
	$.addButton.addEventListener('click', function(){
		$.optionDialog.show();
	});
	$.optionDialog.addEventListener('click', handleOptionDialogClick);
	list.get('notes').on('add', addListRow);
	list.get('lists').on('add', addListRow);

	$.window.title = list.get('title');
	list.get('notes').each(addListRow);
	list.get('lists').each(addListRow);
};
function addListRow (_model) {
	var _row = Alloy.createController('listRow', {
		model : _model
	});
	rows.push(_row);
	$.tableView.appendRow( _row.getView() );
};
function handleTableClick (_evt) {
	if(_evt.row){
		var _model = rows[_evt.index].getModel();
		if(_model.get('isList')){
			Alloy.createController('list', {
				list : _model
			}).open();
		} else {
			Alloy.createController('note', {
				note : _model
			}).open();
		}
	}
};
function handleOptionDialogClick (_evt) {
	var _index = _evt.index;

	if((OS_ANDROID && _evt.cancel) || _evt.cancel === _index){
		return;
	}

	var _newModel;
	
	switch(_index){
		case 0:
			_newModel = Alloy.createModel('note');
			list.get('notes').add(_newModel);
			break;
		case 1:
			_newModel = Alloy.createModel('list');
			list.get('lists').add(_newModel);
	}

	_newModel.save();
};


init();