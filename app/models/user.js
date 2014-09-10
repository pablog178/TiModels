var tiModel = require('tiModel');
var moment = require('alloy/moment');

exports.definition = {
	config: {
		columns : {
			'username' 	: 'TEXT UNIQUE',
			'firstName' : 'TEXT',
			'lastName' 	: 'TEXT',
			'bornDate' 	: 'DATE',
			// Foreing Keys
			'addressID' : 'TEXT'
		},
		defaults : {
			'username' 	: null,
			'firstName' : '',
			'lastName' 	: '',
			'bornDate' 	: new moment()
		},
		relations : {
			'notes' : {
				type 	: '1:n',
				model 	: 'note',
				foreignKey : 'userID'
			},
			'lists' : {
				type 	: '1:n',
				model 	: 'list',
				foreignKey : 'userID'
			}
		},
		adapter: {
			type 			: "tiModelSync",
			collection_name	: "user",
			idAttribute 	: 'username'
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