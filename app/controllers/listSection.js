var args = arguments[0] || {};
var collection = args.collection;
var sectionData = [];

function init () {
	collection && collection.on('add', addItemEvent);
	collection.each(function(model){
		sectionData.push({
			properties : {
				title : model.get('title'),
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DETAIL
			}
		});
	});
	$.section.headerTitle = args.name;
	$.section.isList = args.isList;
	$.section.items = sectionData;
};
function addItemEvent (model, index) {
	$.section.appendItems([{
		properties : {
			title : model.get('title'),
			accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DETAIL
		}
	}]);
};

init();