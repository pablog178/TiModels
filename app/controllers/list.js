var App = require('core');
var args = arguments[0] || {};
var userModel = Alloy.Models.instance('list');

var sections = [];
var collections = [];

$.notesList.addEventListener('itemclick', notesListClickEvent);

function init () {
	if(args.notesCollection){
		loadSection(args.notesCollection, args.notesName || '');
	} else {
		var listCollection = userModel.get('list');
		loadSection(listCollection, 'Lists', true);

		var notesCollection = userModel.get('notes');
		loadSection(notesCollection, 'Notes');
	}
};
function loadSection(collection, name, isList){
	var sectionData = [];
	collection.each(function(model){
		sectionData.push({
			title : model.get('title'),
			accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DETAIL
		});
	});
	var listSection = Ti.UI.createListSection({
		headerTitle : name,
		items : sectionData,
		isList : isList || false
	});

	sections.push(listSection);
	collections.push(collection);

};
function notesListClickEvent(evt){
	var sectionIndex = evt.sectionIndex;
	var itemIndex = evt.itemIndex;
	var modelSelected = collections[sectionIndex].at(itemIndex);
	
	if(sections[sectionIndex].isList){
		App.openWindow('list', {
			notesCollection : modelSelected
		});
	} else {
		App.openWindow('note', {
			noteModel : modelSelected
		});
	}
};

init();