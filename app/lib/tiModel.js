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
			for(var fieldName in values){
				var type = this.config.columns[fieldName] ? this.config.columns[fieldName] : '';
				type = type.split(/\s+/)[0];
				var newValue = values[fieldName];
				switch(type.toLowerCase()){
					case 'text':
					case 'varchar':
					case 'char':
						values[fieldName] = '' + (newValue || '');
						break;
					case 'integer':
					case 'int':
					case 'tinyint':
					case 'smallint':
					case 'bigint':
						values[fieldName] = parseInt(newValue) || 0;
						break;
					case 'real':
					case 'float':
					case 'decimal':
					case 'number':
						values[fieldName] = parseFloat(newValue) || 0;
						break;
					case 'bool':
					case 'boolean':
						values[fieldName] = Boolean(newValue);
						break;
					case 'date':
					case 'datetime':
						if(!moment.isMoment(newValue)){
							values[fieldName] = new moment(newValue || undefined);
						}
						break;
				}

				if(this.get(fieldName) !== newValue && fieldName !== '_updated'){
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
		}
	},
	collectionBase : {
		// TODO: Add collectin basics here
	}
};

module.exports = tiModel;