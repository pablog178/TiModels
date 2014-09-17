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
	var updatedValues = {};
	for(var i = 0, j = formElements.length; i < j; i++){
		var uiElement = formElements[i];
		if(uiElement.bindField){
			updatedValues[uiElement.bindField] = uiElement.value;
		}
	}
	noteModel.set(updatedValues);
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