var tiModel = require('tiModel');
var moment = require('alloy/moment');

exports.definition = {
	config: {
		columns : {
			title 		: 'TEXT',
			created 	: 'DATETIME',
			modified 	: 'DATETIME',
			// Foreign Keys
			userID		: 'TEXT',
			listID 		: 'TEXT'
		},
		defaults : {
			title 		: 'New List',
			created 	: new moment(),
			modified 	: null,
			isList 		: true
		},
		relations : {
			'notes' : {
				type 	: '1:n',
				model 	: 'note',
				foreignKey : 'listID'
			},
			'lists' : {
				type 	: '1:n',
				model 	: 'list',
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