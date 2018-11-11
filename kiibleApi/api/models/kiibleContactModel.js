KiibleIndex.prototype.searchContacts = function (indexName, documentType, ownerId) {
	console.log("FUNCTION CALLED: searchContacts");

	elasticClient.search({
  		index: indexName,
  		type: documentType,
  		body: {
    		query: {
      			match: { ownerId },
    		},
  		},
	}, (error, response, status) => {
    	if (error) {
      		console.log(`search error: ${error}`);
    	} else {
      		console.log("--- Response ---");
      		console.log(response);
      		console.log("--- Hits ---");
      		response.hits.hits.forEach((hit) => {
        			console.log(hit);
      			});
    	}
	});
};
