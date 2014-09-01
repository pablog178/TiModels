/*
 * tiModel.js
 * Defines extra functions for models and collections, such as nested models, automatic data type translation
 * and extra SQL functions
 */

var tiModel = {
	modelBase : {
		/**
		 * Sets the data based on the model's config.columns info.
		 * current data types supported:
		 * TYPE 									- JS data type 			- SQL data type
		 * =========================================================================================
		 * TEXT/VARCHAR/CHAR						- string				- TEXT
		 * INTEGER/INT/TINYINT/SMALLINT/BIGINT 		- number 				- INTEGER
		 * REAL/FLOAT/DECIMAL/NUMBER				- number 				- REAL
		 * BOOL/BOOLEAN 							- boolean 				- INTEGER
		 * DATE/DATETIME 							- moment.js 			- INTEGER (unix time)
		 * BLOB 									- Ti.Blob 				- BLOB
		 *
		 * Other type not named here 				- unchanged				- TEXT (JSON.stringify)
		 */
		set : function(values, opts){
			console.log("[modelBase] - model.set - values: " + JSON.stringify(values) + ' - opts: ' + JSON.stringify(opts));
			for(var name in values){
				var type = this.config.columns[name] ? this.config.columns[name] : '';
				switch(type){
					case 'TEXT':
					case 'VARCHAR':
					case 'CHAR':
						values[name] = '' + (values[name] || '');
						break;
					case 'INTEGER':
					case 'INT':
					case 'TINYINT':
					case 'SMALLINT':
					case 'BIGINT':
						values[name] = parseInt(values[name]) || 0;
						break;
					case 'REAL':
					case 'FLOAT':
					case 'DECIMAL':
					case 'NUMBER':
						values[name] = parseFloat(values[name]) || 0;
						break;
					case 'BOOL':
					case 'BOOLEAN':
						values[name] = Boolean(values[name]);
						break;
					case 'DATE':
					case 'DATETIME':
						if(!moment.isMoment(values[name])){
							values[name] = new moment(values[name]);
						}
						break;
				}

				if(this.get(name) !== values[name] && name !== '_updated'){
					values._updated = 1;
				}
			}
			return Backbone.Model.prototype.set.call(this, values, opts);
		},
		/**
		 * Sets default vaules based on the model's config.relations info
		 * Current relation types supported:
		 * 1:1 - defines a new Alloy Model inside this one
		 * 1:n - defines a new Alloy Collection inside this one
		 */
		defaults : function(){
			var defaultValues = {
				'_updated' : 0
			};
			var values = this.config.defaults || {};
			for(var name in values){
				defaultValues[name] = values[name];
			}

			var defaultRelations = {};
			var relations = this.config.relations || {};
			for(var name in relations){
				var relation = relations[name];
				var modelName = relation.model;
				var create;
				switch(relation.type){
					case '1:1':
						create = Alloy.createModel;
						break;
					case '1:n':
						create = Alloy.createCollection;
						break;
				}
				defaultRelations[name] = create(modelName);
			}

			_.extend(defaultValues, defaultRelations);

			return defaultValues;
		},
		/**
		 * Transforms the current's model data to be saved into an SQLite DB. based on the 
		 * same data types as defined in {@function set set}
		 */
		save : function(attrs, opts){
			var attrs = attrs || this.toJSON();
			var columns = this.config.columns || {};

			for(var name in attrs){
				var columnType = columns[name];
				switch(columnType){
					case 'BOOL':
					case 'BOOLEAN':
						attrs[name] = 0 + attrs[name];
						break;
					case 'DATE':
					case 'DATETIME':
						attrs[name] = attrs[name].unix();
				}
				
			}

			console.log("[modelBase] - model.save - attrs: " + JSON.stringify(attrs));

			return Backbone.Model.prototype.save.call(this, attrs, opts);

		}
	},
	collectionBase : {
		// TODO: Add collectin basics here
	}
};

module.exports = tiModel;