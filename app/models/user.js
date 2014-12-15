var tiModel = require('tiModel');
var moment = require('alloy/moment');

exports.definition = {
	config: {
		columns : {
			'username' 	: 'TEXT UNIQUE',
			'firstName' : 'TEXT',
			'lastName' 	: 'TEXT',
			'bornDate' 	: 'DATE',
			'lastLogin' : 'DATE',
			'bornID'	: 'TEXT'
		},
		defaults : {
			'username' 	: 'default',
			'firstName' : '',
			'lastName' 	: '',
			'lastLogin' : new moment(),
			'bornDate' 	: null
		},
		relations : {
			'notes' : {
				type	: '1:n',
				model	: 'note',
				foreignKey : 'userID'
			},
			'lists' : {
				type	: '1:n',
				model	: 'list',
				foreignKey : 'userID'
			},
			'bornAddr' : {
				type	: '1:1',
				model	: 'address',
				foreignKey	: 'bornID'
			}
		},
		adapter: {
			type 			: "tiModelSync",
			collection_name	: "user"
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