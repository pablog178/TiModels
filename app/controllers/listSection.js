var args = arguments[0] || {};
var collection = args.collection;
var sectionData = [];

function init () {
	collection && collection.on('add', addItemEvent);
	collection.each(function(model, index){
		var item = Alloy.createController('item', {
			noteModel : model,
			index : index,
			onChange : refreshItemEvent
		});
		sectionData.push(item.getView());
	});
	$.section.headerTitle = args.name;
	$.section.isList = args.isList;
	$.section.items = sectionData;
};
function addItemEvent (model, index) {
	var item = Alloy.createController('item', {
		noteModel : model,
		index : index,
		onChange : refreshItemEvent
	});
	$.section.appendItems([ item.getView() ]);
};
function refreshItemEvent (evt) {
	$.section.updateItemAt(evt.index, evt.source.getView());
};

init();