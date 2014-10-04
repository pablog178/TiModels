var App 		= require('core');
var args 		= arguments[0] || {};
var editMode 	= false;
var FORM_ELEMENTS = [
	$.titleField,
	$.messageField,
	$.createdField
];

$.editButton.addEventListener('click', editButtonClick);
$.window.addEventListener('close', windowClose);

$.open = function(){
	App.navigationOpen($.window);
};

function init(){
	$.noteModel = args.noteModel;
	refreshUI();
};
function editButtonClick(){
	editMode = !editMode;
	$.titleField.editable = editMode;
	$.messageField.editable = editMode;
	$.createdField.editable = editMode;
	$.editButton.title = editMode ? 'Done' : 'Edit';

	if(!editMode){
		updateModel();
	}
};
function windowClose () {
	editMode && updateModel();
};
function updateModel(){
	var updatedValues = {};
	for(var i = 0, j = FORM_ELEMENTS.length; i < j; i++){
		var uiElement = FORM_ELEMENTS[i];
		if(uiElement.bindField){
			updatedValues[uiElement.bindField] = uiElement.value;
		}
	}
	$.noteModel
		.set(updatedValues)
		.save();
};
function refreshUI(){
	for(var i = 0, j = FORM_ELEMENTS.length; i < j; i++){
		var uiElement = FORM_ELEMENTS[i];
		if(uiElement.bindField){
			var value = $.noteModel.get(uiElement.bindField);
			uiElement.value = uiElement.format ? value.format(uiElement.format) : value;
		}
	}
};

init();