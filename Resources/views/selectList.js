/*
 * selectList.js
 * Select list view file.
 */

function SelectListView() {

	console.log('Creating new SelectListView().');

	var $ = {};

	$.window = Ti.UI.createWindow({
		title: 'Select List',
		top: util.isIos7OrGreater() ? 20 : 0,
		bottom: 0,
		orientationModes: [
			Ti.UI.PORTRAIT
		]
	});

	// Add the navBar with a menu button.
	var navBar = app.loadComponent('navBar', {
		barAction: 'menu'
	});
	navBar.addToView($.window, 'Select List');

	return $;

}

module.exports = SelectListView;

/*
 * EOF
 */