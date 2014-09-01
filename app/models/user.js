var tiModel = require('tiModel');
var moment = require('alloy/moment');

exports.definition = {
	config: {
		columns : {
			'firstName' : 'TEXT',
			'lastName' 	: 'TEXT',
			'bornDate' 	: 'DATE'
		},
		defaults : {
			'firstName' : '',
			'lastName' 	: '',
			'bornDate' 	: new moment()
		},
		adapter: {
			type: "tiModelSync",
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