var tiModel = require('tiModel');
var moment = require('alloy/moment');

exports.definition = {
	config: {
		columns : {
			title 		: 'TEXT',
			created 	: 'DATETIME',
			modified 	: 'DATETIME',
			title 		: 'TEXT',
			// Foreign Keys
			userID		: 'TEXT'
		},
		defaults : {
			title 		: '',
			created 	: new moment(),
			modified 	: null,
			title 		: ''
		},
		relations : {
			'notes' : {
				type 	: '1:n',
				model 	: 'note',
				foreignKey : 'listID'
			}
		},
		adapter: {
			type 			: "tiModelSync",
			collection_name	: "list"
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