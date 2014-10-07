var App = require('core');

function init(){
	if(OS_IOS){
		App.navWindow = $.navigationWindow;
		$.navigationWindow.open();
	} else {
		$.list.open();
	}
};

init();