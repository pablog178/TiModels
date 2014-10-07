var App = {
	openNavigation : function (tiWindow) {
		if(tiWindow){
			if(OS_IOS && App.navWindow){
				App.navWindow.openWindow(tiWindow);
			} else {
				tiWindow.open();
			}
		}
	}
};

module.exports = App;