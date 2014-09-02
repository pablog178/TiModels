var args = arguments[0] || {};
var editMode = false;

$.editButton.addEventListener('click', function(evt){
	Ti.API.info("click");
	editMode = !editMode;
	$.titleField.editable = editMode;
	$.messageField.editable = editMode;
	$.createdField.editable = editMode;
	$.editButton.title = editMode ? 'Done' : 'Edit';
});