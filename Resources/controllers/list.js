/*
 * List.js
 * List view controller.
 */

var view, lists;

function ListCtrl() {
	view = app.loadView('list');
	lists = app.loadModel('lists');
	this.view = view;
	this.init();
}

// Controller initiation point.
ListCtrl.prototype.init = function() {

	var self = this;

	self.addListItemClickEvent = function(e) {
		textEntryDialog = app.loadComponent('textEntryDialog', {
			parentView: view.window,
			closeButtonText: 'Done'
		});
		textEntryDialog.open(function (newToDoText) {
			console.log(newToDoText);
		});
	};

	view.addNewToDoButton.addEventListener('click', self.addListItemClickEvent);

};

// Used to show the corresponding view.
ListCtrl.prototype.open = function(callback) {
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
ListCtrl.prototype.close = function(callback) {
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
ListCtrl.prototype.populate = function(list) {

	var self = this;

	view.navBar.setTitle(list.title);

	var tableRows = [];
	var count = 0;
	while (list.items[count]) {
		tableRows[count] = view.generateToDoRow(list.items[count].content);
		tableRows[count].item = list.items[count];
		count++;
	}

	return view.tableOfToDos.setData(tableRows);

};

module.exports = ListCtrl;