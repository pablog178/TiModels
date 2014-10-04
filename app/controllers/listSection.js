var args 					= arguments[0] || {};
var listItemsControllers 	= [];
var listItemsViews 			= [];

function init () {
	$.collection = args.collection;
	
	$.collection && $.collection.on('add', onCollectionAdd);
	$.collection && $.collection.on('remove', onCollectionRemove);
	
	$.collection.each(createItem);
	
	$.section.headerTitle = args.name;
	$.section.items = listItemsViews;
};
function onCollectionAdd (model) {
	var item = createItem(model, listItemsControllers.length);
	$.section.appendItems([ item.getView() ]);
};
function onCollectionRemove (model, index) {
	if(listItemsControllers[index].noteModel === model){
		$.section.deleteItemsAt(index, 1);
		listItemsControllers.splice(index, 1);
		listItemsViews.splice(index, 1);
		updateIndexes();
	}
};
function createItem (model, index) {
	var item = Alloy.createController('item', {
		noteModel : model,
		index : index,
		onNoteModelChange : refreshItemEvent
	});

	listItemsControllers.push(item);
	listItemsViews.push(item.getView());

	return item;
};
function updateIndexes(){
	_.each(listItemsControllers, function(itemController, index){
		itemController.index = index;
	});
};
function refreshItemEvent (evt) {
	console.log("[listSection] - refreshItemEvent()");
	$.section.updateItemAt(evt.controller.index, evt.controller.getView());
};

init();