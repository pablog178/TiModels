var args = arguments[0] || {};
var noteModel = args.noteModel;
var editMode = false;
var formElements = [
	$.titleField,
	$.messageField,
	$.createdField
];

$.editButton.addEventListener('click', editClickEvent);

function init(){
	refreshUI();
};
function editClickEvent(){
	editMode = !editMode;
	$.titleField.editable = editMode;
	$.messageField.editable = editMode;
	$.createdField.editable = editMode;
	$.editButton.title = editMode ? 'Done' : 'Edit';

	if(!editMode){
		updateModel();
		noteModel.save();
	}
};
function updateModel(){
	for(var i = 0, j = formElements.length; i < j; i++){
		var uiElement = formElements[i];
		if(uiElement.bindField){
			noteModel.set(uiElement.bindField, uiElement.value);
		}
	}
};
function refreshUI(){
	for(var i = 0, j = formElements.length; i < j; i++){
		var uiElement = formElements[i];
		if(uiElement.bindField){
			var value = noteModel.get(uiElement.bindField);
			uiElement.value = uiElement.format ? value.format(uiElement.format) : value;
		}
	}
};

init();