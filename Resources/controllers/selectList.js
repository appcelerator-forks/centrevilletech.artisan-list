/*
 * selectList.js
 * Select list controller.
 */

var view = app.loadView('selectList'),
	lists = app.loadModel('lists');

function SelectListCtrl() {
	this.view = view;
	this.init();
}

// Controller initiation point.
SelectListCtrl.prototype.init = function() {
	var self = this;
};

// Used to show the corresponding view.
SelectListCtrl.prototype.open = function(callback) {
	if (typeof callback !== 'function') {
		var callback = function () {};
	}
	if (util.isIos()) {
		view.window.opacity = 0;
		view.window.open();
		view.window.animate({
			opacity: 1,
			duration: 500
		}, function () {
			callback();
		});
	} else {
		view.window.open();
		callback();
	}
};

// Used to close the corresponding view.
SelectListCtrl.prototype.close = function(callback) {
	if (typeof callback !== 'function') {
		var callback = function () {};
	}
	if (util.isIos()) {
		view.window.animate({
			opacity: 0,
			duration: 500
		}, function () {
			view.window.close();
		});
	} else {
		view.window.close();
	}
};

// Used to populate the view.
SelectListCtrl.prototype.populate = function() {

};

module.exports = SelectListCtrl;