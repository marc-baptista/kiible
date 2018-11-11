'use strict';

var elasticClient = require('../../elConfig');

var KiibleIndex = function (data) {
	this.data = data;
};

var contactTypeBody = {
	contactType: {
		properties: {
			userID: {
				type: 'text',
			},
			ip_addr: {
				type: 'ip',
			},
			firstName: {
				type: 'text',
			},
			name: {
				type: 'text',
			},
			email: {
				type: 'text',
			},
			comment: {
				type: 'text',
			},
			fixePhone: {
				type: 'text',
			},
			mobilePhone: {
				type: 'text',
			},
			twitter: {
				type: 'keyword',
			},
			facebook: {
				type: 'keyword',
			},
			skype: {
				type: 'keyword',
			},
			google: {
				type: 'keyword',
			},
			viadeo: {
				type: 'keyword',
			},
			instagram: {
				type: 'keyword',
			},
			snapchat: {
				type: 'keyword',
			},
			linkedIn: {
				type: 'keyword',
			},
			address_address: {
				type: 'text',
			},
			address_street: {
				type: 'text',
			},
			address_street_2: {
				type: 'text',
			},
			address_street_3: {
				type: 'text',
			},
			address_po_box: {
				type: 'text',
			},
			address_city: {
				type: 'text',
			},
			address_state: {
				type: 'text',
			},
			address_postal_code: {
				type: 'text',
			},
			address_country: {
				type: 'text',
			},
		},
	},
};
var contactOwnerTypeBody = {
	contactOwnerType: {
		properties: {
			ip_addr: {
				type: 'ip',
			},
			firstName: {
				type: 'text',
			},
			name: {
				type: 'text',
			},
			email: {
				type: 'text',
			},
			comment: {
				type: 'text',
			},
			fixePhone: {
				type: 'text',
			},
			mobilePhone: {
				type: 'text',
			},
			twitter: {
				type: 'keyword',
			},
			facebook: {
				type: 'keyword',
			},
			skype: {
				type: 'keyword',
			},
			google: {
				type: 'keyword',
			},
			viadeo: {
				type: 'keyword',
			},
			instagram: {
				type: 'keyword',
			},
			snapchat: {
				type: 'keyword',
			},
			linkedIn: {
				type: 'keyword',
			},
			address_address: {
				type: 'text',
			},
			address_street: {
				type: 'text',
			},
			address_street_2: {
				type: 'text',
			},
			address_street_3: {
				type: 'text',
			},
			address_po_box: {
				type: 'text',
			},
			address_city: {
				type: 'text',
			},
			address_state: {
				type: 'text',
			},
			address_postal_code: {
				type: 'text',
			},
			address_country: {
				type: 'text',
			},
		},
	},
};

// LOCAL FUNCTIONS
/**
 * check if the index exists
 */
function indexExists(indexName, callback) {
	console.log('FUNCTION CALLED: indexExists');

	console.log('indexExists - called - indexName: ' + indexName);

	// return elasticClient.indices.exists({index: indexName}, callback);
	elasticClient.indices.exists({
		index: indexName
	},
	function (error, response, status) {
		if (error) {
			console.log("indexExists search error: " + error + ", status: " + status + ", Response: " + response);
		} else {
			console.log("indexExists --- Response ---");
			console.log(response);
			//         console.log("indexExists ----------------");

		}
		callback(response);
	}

	);
}

function createContactOwner(indexName, callback) {
	console.log('FUNCTION CALLED: createContactOwner');


	var createContactOwnerParams = {
		index: indexName,
		type: 'contactOwnerType',
		// id: '1',
		body: {
			ip_addr: '127.0.0.1',
			firstName: '',
			name: 'NOTSET',
			email: '',
			comment: '',
			fixePhone: '',
			mobilePhone: '',
			twitter: '',
			facebook: '',
			skype: '',
			google: '',
			viadeo: '',
			instagram: '',
			snapchat: '',
			linkedIn: '',
			address_address: '',
			address_street: '',
			address_street_2: '',
			address_street_3: '',
			address_po_box: '',
			address_city: '',
			address_state: '',
			address_postal_code: '',
			address_country: '',
		}
	};
	var createdOwnerIndex = 42;

	elasticClient.index(createContactOwnerParams,
		function (error, response) {
			if (error) {
				console.log('createContactOwner - createContactOwner CREATE ERROR: ' + error);
				console.log('createContactOwner - response: ' + JSON.stringify(response));
			} else {
				console.log('createContactOwner - createContactOwner CREATED');
				console.log('createContactOwner - response: ' + JSON.stringify(response));
				createdOwnerIndex = response._id;
				callback(createdOwnerIndex);
			}
		}
	);
}


function contactOwnerExistsBACKUP(indexName, contactOwnerId, callback) {
	console.log('FUNCTION CALLED: contactOwnerExists');

	// if contactOwnerId is null or empty or false, set it to empty string ''
	if (contactOwnerId === null || (contactOwnerId.hasOwnProperty('length') && contactOwnerId.length === 0)) {
		console.log('contactOwnerExists - contactOwnerId null or empty forcing its value to \'\'');
		contactOwnerId = '';
	}

	// contactOwnerId has a value or was set to '', check if corresponding document exists, if not set it to null to force generation of a new one
	console.log('contactOwnerExists - contactOwnerId NOT null NOR empty - contactOwnerId: ' + contactOwnerId);
	var searchContactOwnerParams = {
		index: indexName,
		type: 'contactOwnerType',
		id: contactOwnerId,
	};
	// return elasticClient.indices.exists({index: contactOwnerId}, callback);
	elasticClient.get(searchContactOwnerParams,
		function (error, response, status) {
			if (error) {
				console.log("contactOwnerExists search error: " + error);
			} else {
				console.log("contactOwnerExists ------Search result ------");
				// console.log("contactOwnerExists --- error ---");
				// console.log(error);
				console.log("contactOwnerExists --- Response ---");
				console.log(response);
				console.log("contactOwnerExists --- status ---");
				console.log(status);
				console.log("contactOwnerExists ----------------");
				//  callback(response);

				// if total hits == 0 create a new contactOwner
				if (response.hits.total === 0) {
					console.log("ZERO hits = CREATE A NEW contactOwner");
					createContactOwner(indexName, callback);
				} else {
					console.log("contactOwner found");
					callback(contactOwnerId);
				}
			}
		}
	);
}

function contactOwnerExists(indexName, contactOwnerId, callback) {
	console.log('FUNCTION CALLED: contactOwnerExists');

	// if contactOwnerId is null or empty or false, set it to empty string ''
	if (contactOwnerId === null || (contactOwnerId.hasOwnProperty('length') && contactOwnerId.length === 0)) {
		console.log('contactOwnerExists - contactOwnerId null or empty forcing its value to \'\'');
		contactOwnerId = 'X';
	}

	// contactOwnerId has a value or was set to '', check if corresponding document exists, if not set it to null to force generation of a new one
	console.log('contactOwnerExists - contactOwnerId NOT null NOR empty - contactOwnerId: ' + contactOwnerId);
	var searchContactOwnerParams = {
		index: indexName,
		type: 'contactOwnerType',
		id: contactOwnerId,
	};
	// return elasticClient.indices.exists({index: contactOwnerId}, callback);
	elasticClient.get(searchContactOwnerParams,
		function (error, response, status) {
			if (error) {
				console.log("contactOwnerExists search error: " + error);
				console.log("contactOwnerExists --- Response ---");
				console.log(response);
				console.log("contactOwnerExists --- status ---");
				console.log(status);
				console.log("contactOwnerExists ----------------");
				console.log("ZERO hits = CREATE A NEW contactOwner");
				createContactOwner(indexName, callback);
			} else {
				console.log("contactOwnerExists ------Search result ------");
				// console.log("contactOwnerExists --- error ---");
				// console.log(error);
				console.log("contactOwnerExists --- Response ---");
				console.log(response);
				console.log("contactOwnerExists --- status ---");
				console.log(status);
				console.log("contactOwnerExists ----------------");

				console.log("contactOwner found");
				callback(contactOwnerId);

			}
		}
	);
}
// var body = { post: { properties: { title: { type: 'string' }}}};
// client.indices.putMapping(
//   { index: 'blog', type: 'contactType', body: contactTypeBody },
//   function(err, body, code) {
//         if (err) throw new Error(err);
//     });

function initMapping(indexName, callback) {
	console.log('FUNCTION CALLED: initMapping');

	console.log('initMapping - called for index: ' + indexName);

	elasticClient.indices.putMapping({
		index: indexName,
		type: 'contactType',
		body: contactTypeBody,
	},
	function (error, response, status) {
		if (error) {
			console.log('putMapping contactType error: ' + error);
		} else {
			// console.log("indexExists --- Response ---");
			//         console.log(response);
			//         console.log("indexExists ----------------");
			console.log('putMapping contactType OK');
			elasticClient.indices.putMapping({
				index: indexName,
				type: 'contactOwnerType',
				body: contactOwnerTypeBody,
			},
			function (error, response, status) {
				if (error) {
					console.log('putMapping contactOwnerType error: ' + error);
				} else {
					// console.log("indexExists --- Response ---");
					//         console.log(response);
					//         console.log("indexExists ----------------");
					console.log('putMapping contactOwnerType OK');
					callback(response);
				}
			}

			);
		}
	}

	);
}

// EXPORTED METHODS & DATA

KiibleIndex.prototype.data = {};



KiibleIndex.prototype.changeName = function (name) {
	this.data.name = name;
};

/**
 * Delete an existing index
 */
KiibleIndex.prototype.deleteIndex = function (indexName, callback) {
	console.log('FUNCTION CALLED: deleteIndex - indexName: ' + indexName);

	indexExists(indexName, function (result) {
		console.log('indexInfo - indexExist returned: ' + result);
		if (result) {
			console.log('indexInfo - index ' + indexName + ' exist');
			return elasticClient.indices.delete({
				index: indexName,
			},
			function (result) {
				if (result) {
					console.log('Index DELETE error:' + result);
				} else {
					console.log('Index DELETION OK');
				}
			});
		} else {
			console.log('indexInfo - index ' + indexName + ' DO NOT exist');
			callback(false, '{' + indexName + ' DO NOT exist}');
		}

	});

};

/**
 * List all existing indexes
 */
KiibleIndex.prototype.listAll = function (callback) {
	console.log('FUNCTION CALLED: listAll');

	var searchParams = {
		format: 'json',
		bytes: 'b',
		local: true,
		masterTimeout: '3000ms',
		v: true,
	};

	return elasticClient.cat.indices(searchParams, callback);
};

/**
 * Get one existing index information
 */
KiibleIndex.prototype.indexInfo = function (indexName, callback) {
	console.log('FUNCTION CALLED: indexInfo');


	indexExists(indexName, function (result) {
		console.log('indexInfo - indexExist returned: ' + result);
		if (result) {
			console.log('indexInfo - index ' + indexName + ' exist');
			var searchParams = {
				format: 'json',
				bytes: 'b',
				local: true,
				masterTimeout: '3000ms',
				index: indexName,
			};
			return elasticClient.cat.indices(searchParams, callback);
		} else {
			console.log('indexInfo - index ' + indexName + ' DO NOT exist');
			callback(false, '{' + indexName + ' DO NOT exist}');
		}

	});
};

/**
 * create the index
 */
KiibleIndex.prototype.createIndex = function (indexName, callback) {
	console.log('FUNCTION CALLED: createIndex - indexName: ' + indexName);

	indexExists(indexName, function (result) {
		console.log('indexInfo - indexExist returned: ' + result);
		if (result) {
			console.log('indexInfo - index ' + indexName + ' ALREADY exists');
			callback(false, '{' + indexName + ' DO NOT exist}');
		} else {
			console.log('indexInfo - index ' + indexName + ' DO NOT exist, CREATING');
			return elasticClient.indices.create({
				index: indexName,
			}, function (result) {
				if (result) {
					console.log('index CREATE ERROR: ' + result);
				} else {
					console.log('index CREATED');
					return initMapping(indexName, callback);
				}
			});
		}

	});

};

/////////////////////////////////////
//     index content handling      //
/////////////////////////////////////


KiibleIndex.prototype.listOwners = function (indexName, callback) {
	console.log('FUNCTION CALLED: listOwners');


	indexExists(indexName, function (result) {
		console.log('listOwners - indexExist returned: ' + result);
		if (result) {
			console.log('listOwners - index ' + indexName + ' exist');
			var searchParams = {
				format: 'json',
				bytes: 'b',
				local: true,
				masterTimeout: '3000ms',
				index: indexName,
			};
			return elasticClient.cat.indices(searchParams, callback);
		} else {
			console.log('listOwners - index ' + indexName + ' DO NOT exist');
			callback(false, '{' + indexName + ' DO NOT exist}');
		}

	});
};

KiibleIndex.prototype.listContacts = function (indexName, ownerID, callback) {
	console.log('FUNCTION CALLED: listContacts');


	indexExists(indexName, function (result) {
		console.log('listContacts - indexExist returned: ' + result);
		if (result) {
			console.log('listContacts - index ' + indexName + ' exist');
			/*var searchParams = {
                    format: 'json',
                    bytes: 'b',
                    local: true,
                    masterTimeout: '3000ms',
                    index: indexName
                    };
        return elasticClient.cat.indices(searchParams, callback);*/
			var searchParams = {
				format: 'json',
				index: indexName,
				type: 'contactType',
				body: {
					min_score: 1,
					query: {
						match: {
							userID: ownerID,
						},
					},
				},
			};
			return elasticClient.search(searchParams, callback);
		} else {
			console.log('listContacts - index ' + indexName + ' DO NOT exist');
			callback(false, '{' + indexName + ' DO NOT exist}');
		}

	});
};

KiibleIndex.prototype.readContact = function (indexName, ownerID, contactID, callback) {
	console.log('FUNCTION CALLED: readContact');


	indexExists(indexName, function (result) {
		console.log('readContact - indexExist returned: ' + result);
		if (result) {
			console.log('readContact - index ' + indexName + ' exist');
			var searchParams = {
				format: 'json',
				bytes: 'b',
				local: true,
				masterTimeout: '3000ms',
				index: indexName,
			};
			return elasticClient.cat.indices(searchParams, callback);
		} else {
			console.log('readContact - index ' + indexName + ' DO NOT exist');
			callback(false, '{' + indexName + ' DO NOT exist}');
		}

	});
};

KiibleIndex.prototype.createContact = function (indexName, contactOwnerId, contactData, callback) {
	console.log('FUNCTION CALLED: createContact');

	indexExists(indexName, function (result) {
		console.log('createContact - indexExist returned: ' + result);
		if (result) {
			console.log('createContact - index ' + indexName + ' exist');
			contactOwnerExists(indexName, contactOwnerId, function (checkedContactOwnerId) {

				if (checkedContactOwnerId) {
					console.log('createContact - checkedContactOwnerId returned by contactOwnerExists: ' + checkedContactOwnerId);

					var createContactParams = {
						index: indexName,
						type: 'contactType',
						// id: '1',
						body: {
							userID: checkedContactOwnerId,
							ip_addr: contactData.ip_addr,
							firstName: contactData.firstName,
							name: contactData.name,
							email: contactData.email,
							comment: contactData.comment,
							fixePhone: contactData.fixePhone,
							mobilePhone: contactData.mobilePhone,
							twitter: contactData.twitter,
							facebook: contactData.facebook,
							skype: contactData.skype,
							google: contactData.google,
							viadeo: contactData.viadeo,
							instagram: contactData.instagram,
							snapchat: contactData.snapchat,
							linkedIn: contactData.linkedIn,
							address_address: contactData.address_address,
							address_street: contactData.address_street,
							address_street_2: contactData.address_street_2,
							address_street_3: contactData.address_street_3,
							address_po_box: contactData.address_po_box,
							address_city: contactData.address_city,
							address_state: contactData.address_state,
							address_postal_code: contactData.address_postal_code,
							address_country: contactData.address_country,
						},
					};
					return elasticClient.index(createContactParams,
						function (error, response) {
							if (error) {
								console.log('createContact - contact CREATE ERROR: ' + error);
								console.log('createContact - response: ' + JSON.stringify(response));
							} else {
								console.log('createContact - contact CREATED');
								console.log('createContact - response: ' + JSON.stringify(response));
								// callback(true, response);
								var rep = {};
								rep.userID = checkedContactOwnerId;
								rep._id = response._id;
								// callback(true, '{userID: "' + checkedContactOwnerId + '", _id: "'+ response._id +'"}');
								callback(true, rep);
							}
						});
				} else {
					console.log('createContact - contactOwnerId ' + contactOwnerId + ' DO NOT exist');

				}
			});
		} else {
			console.log('createContact - index ' + indexName + ' DO NOT exist');
			callback(false, '{' + indexName + ' DO NOT exist}');
		}

	});
};

KiibleIndex.prototype.createContactOwner = function (indexName, contactOwnerData, callback) {
	console.log('FUNCTION CALLED: createContactOwner');

	// contactOwner userId should be empty as whe are here to create a new one
	if (contactOwnerData.userID.localcompare('')) {
		indexExists(indexName, function (result) {
			console.log('createContactOwner - indexExist returned: ' + result);
			if (result) {
				console.log('createContactOwner - index ' + indexName + ' exist');
				var createParams = {
					index: indexName,
					type: 'contactOwnerType',
					// id: '1',
					body: {
						userID: contactOwnerData.userID,
						ip_addr: contactOwnerData.ip_addr,
						firstName: contactOwnerData.firstName,
						name: contactOwnerData.name,
						email: contactOwnerData.email,
						comment: contactOwnerData.comment,
						fixePhone: contactOwnerData.fixePhone,
						mobilePhone: contactOwnerData.mobilePhone,
						twitter: contactOwnerData.twitter,
						facebook: contactOwnerData.facebook,
						skype: contactOwnerData.skype,
						google: contactOwnerData.google,
						viadeo: contactOwnerData.viadeo,
						instagram: contactOwnerData.instagram,
						snapchat: contactOwnerData.snapchat,
						linkedIn: contactOwnerData.linkedIn,
						address_address: contactOwnerData.address_address,
						address_street: contactOwnerData.address_street,
						address_street_2: contactOwnerData.address_street_2,
						address_street_3: contactOwnerData.address_street_3,
						address_po_box: contactOwnerData.address_po_box,
						address_city: contactOwnerData.address_city,
						address_state: contactOwnerData.address_state,
						address_postal_code: contactOwnerData.address_postal_code,
						address_country: contactOwnerData.address_country,
					},
				};
				return elasticClient.index(createParams,
					function (error, response) {
						if (error) {
							console.log('createContactOwner - contact CREATE ERROR: ' + error);
							console.log('createContactOwner - response: ' + JSON.stringify(response));
						} else {
							console.log('createContactOwner - contact CREATED');
							console.log('createContactOwner - response: ' + JSON.stringify(response));
							callback(true, response);
						}
					});
			} else {
				console.log('createContactOwner - index ' + indexName + ' DO NOT exist');
				callback(false, '{' + indexName + ' DO NOT exist}');
			}
		});

	} else {
		console.log('createContactOwner - userID NOT EMPTY: ' + contactOwnerData.userID);
		callback(false, '{' + contactOwnerData.userID + ' DO NOT EMPTY}');
	}
};


module.exports = KiibleIndex;