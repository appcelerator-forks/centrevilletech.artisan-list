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
	this.save([
		this.createList('Groceries To Buy'),
		this.createList('Movies To Watch'),
		this.createList('ToDo')
	]);
};

// Returns a new empty list object.
Lists.prototype.createList = function (title) {
	return {
		title: title,
		items: []
	}
};

module.exports = Lists;

/*
 * EOF
 */