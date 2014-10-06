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
			},
			start : function(){
				var userModel = Alloy.Models.instance();
				this.set({
					username : userModel.get('username'),
					password : userModel.get('password'),
					stayActive : true
				}).save();
			},
			stop : function(){
				this
					.clear()
					.set(this.defaults)
					.save();
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