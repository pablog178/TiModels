var args = arguments[0] || {};
var model;

$.getModel = function () {
	return model;
};

function init () {
	model = args.model;
	$.row.hasChild = model.get('isList');
	$.row.title = model.get('title');
};

init();