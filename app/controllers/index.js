var userModel 	= Alloy.Models.instance('user');

function init(){
	userModel.fetch();
	if(OS_IOS){
		App.navWindow = $.navigationWindow;
		$.navigationWindow.open();
	} else {
		$.main.open();
	}
};

init();