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
	var lists = {};
	return storage.set('lists', lists);
};

module.exports = Lists;

/*
 * EOF
 */