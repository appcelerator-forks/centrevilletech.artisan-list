/*
 * lists.js
 */

function Lists() {
	// Add a jobs object to storage if none is present.
	if (!storage.get('lists')) {
		this.new();
	}
}

// Used to save available lists.
Lists.prototype.save = function(lists) {
	return storage.set('lists', lists);
};

// Returns the current available lists stored in memory.
Lists.prototype.get = function() {
	return storage.get('lists');
};

// Adds an available lists object to memory.
Lists.prototype.new = function () {
	this.save([]);
};

// Returns a new empty list object.
Lists.prototype.createList = function (title) {
	return {
		title: title,
		id: util.generateGuid(),
		items: []
	}
};

// Used to add a list object to the stored lists array.
Lists.prototype.addList = function (list) {
	var currentLists = this.get();
	currentLists.push(list);
	return this.save(currentLists);
};

// Returns a new empty list item object.
Lists.prototype.createListItem = function (content) {
	return {
		content: content,
		lastModifiedDate: new Date(),
		status: false,
		image: '',
		id: util.generateGuid()
	}
};

// Used to add a new item to a list.
Lists.prototype.addItemToList = function (listItem, listId) {
	var list = this.getListBasedOnId(listId);
	list.items.push(listItem);
	return this.updateListBasedOnId(list);
};

// Update list based on its ID.
Lists.prototype.updateListBasedOnId = function (list) {
	var currentLists = this.get();
	var count = 0;
	while (currentLists[count]) {
		if (currentLists[count].id === list.id) {
			currentLists[count] = list;
			return this.save(currentLists);
		}
		count++;
	}
	return;
};

// Returns a list based on its ID.
Lists.prototype.getListBasedOnId = function (listId) {
	var currentLists = this.get();
	var count = 0;
	while (currentLists[count]) {
		if (currentLists[count].id === listId) {
			return currentLists[count];
		}
		count++;
	}
	return;
};

module.exports = Lists;

/*
 * EOF
 */