var args = arguments[0] || {};
var noteModel;
var onChange;

$.getView = function(){
	return {
		properties : {
			title : noteModel.get('title'),
			accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DETAIL
		}
	};
};

function init () {
	noteModel = args.noteModel;
	onChange = args.onChange;
	$.index = args.index;
	noteModel && noteModel.on('change', changeEvt);
};
function changeEvt (model) {
	onChange && onChange({
		index : $.index,
		source : $
	});
};

init();