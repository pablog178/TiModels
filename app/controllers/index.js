var App 		= require('core');
var session 	= Alloy.Models.instance('session');
var userModel 	= Alloy.Models.instance('user');
var login;

userModel.on('change:loggedIn', handleLoggedInChange);

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
function handleLoggedInChange () {
	console.log('userModel: ' + JSON.stringify(userModel, null, '\t'));
	if(userModel.get('loggedIn')){
		closeLogin();
	} else {
		openLogin();
	}
}
function openLogin(){
	!login && (login = Alloy.createController('login'));
	login.open();
};
function closeLogin () {
	login && login.close();
	login = null;
}

init();