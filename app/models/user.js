var tiModel = require('tiModel');

exports.definition = {
	config: {
		columns : {
			'firstName' : 'TEXT',
			'lastName' : 'TEXT'
		},
		adapter: {
			type: "sql",
			collection_name: "user"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, tiModel.modelBase, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, tiModel.collectionBase, {
			// extended functions and properties go here
		});

		return Collection;
	}
};