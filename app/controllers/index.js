var App = require('core');

$.loginButton.addEventListener('click', loginEvent);

function init(){
	if(OS_IOS){
		App.navWindow = $.navigationWindow;
		$.navigationWindow.open();
	} else {
		//TODO: open main android window
	}
};
function loginEvent(){
	var username = $.usernameField.value;
	var userModel = Alloy.Models.instance('user');

	userModel
		.set('username', username)
		.fetch();

	userModel.save();

	App.openWindow('list');

};
init();