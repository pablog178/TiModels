var tiModel = require('tiModel');
exports.definition = {
	config: {
		columns : {
			'street' : 'TEXT'
		},
		defaults : {
			'street' : ''
		},
		adapter: {
			type 			: "tiModelSync",
			collection_name : "address"
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