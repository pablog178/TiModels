var App 		= require('core');
var session 	= Alloy.Models.instance('session');
var userModel 	= Alloy.Models.instance('user');

function init(){
	if(OS_IOS){
		App.navWindow = $.navigationWindow;
		$.navigationWindow.open();
	} else {
		$.mainScreen = Alloy.createController('mainScreen');
		$.mainScreen.open();
	}

	session.fetch();
	if(session.get('stayActive')){
		userModel.login({
			username : session.get('username'),
			password : session.get('password'),
			failure : openLogin
		});
	} else {
		openLogin();
	}
};
function openLogin(){
	Alloy.createController('login').open();
};

init();