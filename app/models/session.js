exports.definition = {
	config: {
		adapter: {
			type: "properties",
			collection_name: "session",
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			idAttribute : 'id',
			defaults : {
				'id' : 'session'
			}
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};