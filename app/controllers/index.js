function init(){
	var user = Alloy.createModel('user');

	user.save();

	$.window.open();
};
init();