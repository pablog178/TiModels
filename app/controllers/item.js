var args = arguments[0] || {};
var onNoteModelChange;

$.getView = function(){
	return {
		properties : {
			canEdit : true,
			title : $.noteModel.get('title'),
			accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
		}
	};
};
$.destroy = function(){
	$.noteModel && $.noteModel.off();
	$.noteModel = null;
	onNoteModelChange = null;
};

function init () {
	$.noteModel = args.noteModel;
	onNoteModelChange = args.onNoteModelChange;
	$.index = args.index || 0;
	$.noteModel && $.noteModel.on('change', noteModelChange);
	$.noteModel && $.noteModel.on('destroy', $.destroy);
};
function noteModelChange (model) {
	console.log("[item] - noteModelChange()");
	onNoteModelChange && onNoteModelChange({
		controller : $
	});
};

init();