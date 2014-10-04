var tiModel = require('tiModel');
var moment = require('alloy/moment');

exports.definition = {
	config: {
		columns : {
			'username' 	: 'TEXT UNIQUE',
			'password' 	: 'TEXT',
			'firstName' : 'TEXT',
			'lastName' 	: 'TEXT',
			'bornDate' 	: 'DATE',
			'lastLogin' : 'DATE',
			// Foreing Keys
			'addressID' : 'TEXT'
		},
		defaults : {
			'username' 	: null,
			'password'	: '',
			'firstName' : '',
			'lastName' 	: '',
			'lastLogin' : null,
			'bornDate' 	: null,
			'loggedIn' 	: false
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
			collection_name	: "user"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, tiModel.modelBase, {
			ERROR_UNKNOWN_ERROR : 0,
			ERROR_NO_USER : 1,
			ERROR_WRONG_LOGIN : 2,
			login : function(params) {
				params = params || {};
				var _username = params.username;
				var _password = params.password;
				var _code = this.ERROR_UNKNOWN_ERROR;
				
				this.clear();
				
				if (_username && _password) {
					this
						.query()
						.where('username = ?', _username)
						.where('password = ?', _password)
						.fetch();
				}
				
				if (this.id) {
					this.set({
						lastLogin : new moment(),
						loggedIn : true
					});
					params.success && params.success();
				} else {
					this
						.clear()
						.query()
						.select('count(*) as count')
						.where('username = ?', _username)
						.fetch();

					if(this.get('count') > 0){
						_code = this.ERROR_WRONG_LOGIN;
					} else {
						_code = this.ERROR_NO_USER;
					}

					this.clear();

					params.failure && params.failure({
						code : _code
					});
				}
			},
			logout : function (params){
				params = params || {};
				this.clear();
			},
			createNew : function(params){
				params = params || {};
				var _username = params.username;
				var _password = params.password;

				if(_username && _password){
					this.set({
						username : _username,
						password : _password,
						lastLogin : new moment(),
						loggedIn : true
					}).save();
				}
			}
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