var tiModel = require('tiModel');
var moment = require('alloy/moment');

exports.definition = {
	config: {
		columns : {
			title 		: 'TEXT',
			message 	: 'TEXT',
			created 	: 'DATETIME',
			modified 	: 'DATETIME',
			// Foreign Keys
			userID		: 'TEXT',
			listID 		: 'TEXT'
		},
		defaults : {
			title 		: '',
			message 	: '',
			created 	: new moment(),
			modified 	: null
		},
		adapter: {
			type 			: "tiModelSync",
			collection_name	: "note"
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