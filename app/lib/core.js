var App = {
	navWindow : {},
	navigationOpen : function(tiWindow){
		if(OS_IOS){
			App.navWindow.openWindow(tiWindow);
		} else {
			tiWindow.open();
		}
	}
};

module.exports = App;