var App 		= require('core');
var args 		= arguments[0] || {};
var session 	= Alloy.Models.instance('session');
var userModel 	= Alloy.Models.instance('user');

var sectionsControllers = [];
var sectionsViews 		= [];

$.notesList.addEventListener('itemclick', notesListClick);
$.notesList.addEventListener('delete', notesListDelete);
$.logoutButton.addEventListener('click', handleLogoutClick);
$.addNoteButton.addEventListener('click', handleAddNoteClick);
userModel.on('change:loggedIn', onUserModelLoggedInChange);

$.refresh = function(){
	console.log('[mainScreen] - refresh()');
	loadSection(userModel.get('notes'), 'Notes');
	userModel.get('lists').each(function(listModel){
		loadSection(listModel.get('notes'), listModel.get('title'));
	});
	$.notesList.sections = sectionsViews;
};

function init () {

};
function loadSection(collection, name){
	console.log('[mainScreen] - loadSection() - name - ' + name);
	var listSection = Alloy.createController('listSection', {
		name : name,
		collection : collection
	});

	sectionsControllers.push(listSection);
	sectionsViews.push(listSection.getView());
};
function notesListClick(evt){
	console.log('[mainScreen] - notesListClick()');
	var sectionIndex = evt.sectionIndex;
	var itemIndex = evt.itemIndex;

	Alloy.createController('note', {
		noteModel : sectionsControllers[sectionIndex].collection.at(itemIndex)
	}).open();
};
function handleLogoutClick (_evt) {
	session.stop();
	userModel.logout();
};
function handleAddNoteClick(){
	console.log('[mainScreen] - handleAddNoteClick()');
	var newNoteModel = Alloy.createModel('note');
	userModel.get('notes').add(newNoteModel);
	newNoteModel.save();
};
function notesListDelete (evt) {
	console.log('[mainScreen] - notesListDelete()');
	var sectionIndex = evt.sectionIndex;
	var itemIndex = evt.itemIndex;

	sectionsControllers[sectionIndex].removeItem(itemIndex);
};
function onUserModelLoggedInChange (model) {
	if(userModel.get('loggedIn')){
		$.refresh();
	} else {
		
	}
}

init();