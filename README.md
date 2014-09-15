This library is still on development, please use with caution.

#TiModels

A CommonJS library for adding extra functions to default Alloy models.

##Overview
---
Extends the basic functionality from Backbone's models and collections, adding extra data types support, nested models and functions for building SQL statements.

##Quick Start
---
* Copy the files from app/lib
	* tiModel.js
	* alloy/sync/tiModelSync.js
* `require('tiModel')` into every model you create with alloy.
* Extend the functions from `tiModel.baseModel` and `tiModel.collectionBase`, besides Model.prototype and Collection.prototype.
* Change the model's adapter.type to `tiModelSync`.

##Data types
---
Data types are declared into the  `config.columns` part of every model, so the field will always return with the specified data type using the `get()` function, even if at some moment another data type is given via the `set()` function and will be saved into the SQLite DB with the given data:

| Declared data type | JavaScript | SQLite DB |
| ------------------ | ---------- | --------- |
| text/varchar/char | string | TEXT |
| integer/int/tinyint/bigint/smallint | number | INTEGER |
| real/float/decimal/number | number | REAL |
| bool/boolean | boolean | INTEGER |
| date/datetime | moment.js object | INTEGER (Unix Time) |
| blob | Ti.Blob object | BLOB |

###Example

	config: {
		columns : {
			'username' 	: 'TEXT UNIQUE',
			'firstName' : 'TEXT',
			'lastName' 	: 'TEXT',
			'bornDate' 	: 'DATE',
			'height' : 'REAL',
			// Foreing Keys
			'addressID' : 'TEXT'
		},
		defaults : {
			'username' 	: null,
			'firstName' : '',
			'lastName' 	: '',
			'bornDate' 	: new moment(),
			'height' : 0
		},
		...
	}

##Nested Models
---
Models can have relationships declared via the `config.relations` object. It will create nested models that can be retrieved using the `get()` function and the model will make sure to stay updated by itself on the DB on every `save()` call. Additionally, `fetch()` call will retrieve all the info for the model and all its nested models.

Please note these models, as every other JS object, will not trigger a `change` event on the parent model, so you must add the listener directly on the nested model:
		
	myModel.get('nestModel').on('change', changeEvent);
	
So far the supported relation types are 

Relation | Description
--- | ---
1:1 | Creates a nested model and manages the foreign key in the parent's table
1:n | Creates a nested collection, managin teh foreing key into every dependent record 

	
###Example

	config: {
		...
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
		...
	}
	
##SQL Statement Builder
---
Includes functions for most of the options in the `SELECT` statement

TBD
##Example Project
---
Please refer to the `app` folder for testing and an example project

##Changelog
---
* **0.1**:
	* Initial Version