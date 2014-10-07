var App = require('core');
var args = arguments[0] || {};
var note;

$.open = function () {
	App.openNavigation($.window);
};

function init () {
	note = args.note;
	refreshUI();
};
function refreshUI () {
	for(var i = 0, j = $.window.children.length; i < j; i++){
		var uiElement = $.window.children[i];
		if(uiElement.tag){
			uiElement.value = note.get(uiElement.tag);
		}
	}	
};
function updateModel () {
	for(var i = 0, j = $.window.children.length; i < j; i++){
		var uiElement = $.window.children[i];
		if(uiElement.tag){
			note.set(uiElement.tag, uiElement.value);
		}
	}
	note.save();
};

init();