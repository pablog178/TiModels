var App = {
	navWindow : {},
	openWindow : function(controllerName, params){
		params = params || {};
		var controller = Alloy.createController(controllerName, params);
		var tiWindow = controller.getView();
		if(OS_IOS){
			App.navWindow.openWindow(tiWindow);
		} else {
			tiWindow.open();
		}

		return controller;
	}
};

module.exports = App;