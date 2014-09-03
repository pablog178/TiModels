var args = arguments[0] || {};
var noteModel = args.noteModel;
var editMode = false;

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
	var children = $.window.children;
	for(var i = 0, j = children.length; i < j; i++){
		var uiElement = children[i];
		if(uiElement.bindName){
			noteModel.set(uiElement.bindName, uiElement.value);
		}
	}
};
function refreshUI(){
	var children = $.window.children;
	for(var i = 0, j = children.length; i < j; i++){
		var uiElement = children[i];
		if(uiElement.bindName){
			var value = noteModel.get(bindName);
			uiElement.value = uiElement.format ? value.format(uiElement.format) : value;
		}
	}
};

init();