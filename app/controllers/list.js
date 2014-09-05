var App = require('core');
var args = arguments[0] || {};
var userModel = Alloy.Models.instance('user');

var sections = [];
var collections = [];

$.notesList.addEventListener('itemclick', notesListClickEvent);
$.addNoteButton.addEventListener('click', addNoteEvent);

function init () {
	console.log('[list] - init()');
	if(args.notesCollection){
		loadSection(args.notesCollection, args.notesName || '');
	} else {
		var listCollection = userModel.get('lists');
		loadSection(listCollection, 'Lists', true);

		var notesCollection = userModel.get('notes');
		loadSection(notesCollection, 'Notes');
	}
	$.notesList.sections = sections;
};
function loadSection(collection, name, isList){
	console.log('[list] - loadSection() - name - ' + name);
	var listSection = Alloy.createController('listSection', {
		collection : collection
	});

	sections.push(listSection.getView());
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
function addNoteEvent(){
	var newNoteModel = Alloy.createModel('note');
	if(args.notesCollection){
		args.notesCollection.add(newNoteModel);
	} else {
		userModel.get('notes').add(newNoteModel);
	}
};

init();