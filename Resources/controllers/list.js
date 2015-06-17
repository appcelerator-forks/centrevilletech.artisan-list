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
	self.closeEvent = function () {};

	self.addListItemClickEvent = function(e) {
		textEntryDialog = app.loadComponent('textEntryDialog', {
			parentView: view.window,
			closeButtonText: 'Done',
			hintText: 'Enter list item.'
		});
		textEntryDialog.open(function (newToDoText) {
			if (newToDoText === '') {
				return;
			}
			// Add a new list item based on the text returned.
			var newListItem = lists.createListItem(newToDoText);
			lists.addItemToList(newListItem, self.listId);
			self.populate(self.listId);
			// Scroll the table to the bottom.
			setTimeout(function() {
				view.tableOfToDos.scrollToIndex(view.tableOfToDos.tableData.length-1, {
					animated: Titanium.UI.ANIMATION_CURVE_EASE_OUT,
					position: Titanium.UI.iPhone.TableViewScrollPosition.TOP
				});
			}, 0);
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
			self.closeEvent();
		});
	} else {
		view.window.close();
		self.closeEvent();
	}
};

// Used to populate the view.
ListCtrl.prototype.populate = function(listId) {

	var self = this;
	var list = lists.getListBasedOnId(listId);
	self.listId = listId;

	view.navBar.setTitle(list.title);

	var tableRows = [];
	var count = 0;
	while (list.items[count]) {
		tableRows[count] = view.generateToDoRow(list.items[count].content);
		tableRows[count].item = list.items[count];
		count++;
	}

	view.tableOfToDos.tableData = tableRows;
	return view.tableOfToDos.setData(tableRows);

};

module.exports = ListCtrl;