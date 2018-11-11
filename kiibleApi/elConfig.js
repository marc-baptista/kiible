
// import { Client } from "elasticsearch";
var elasticsearch = require('elasticsearch');

function getElConfig() {
	return {
		host: ["localhost:9200"],
		connectionClass: "http",
		auth: "elastic:elasticpwd",
		//              log: 'trace'
	};
}

var elasticClient = new elasticsearch.Client(getElConfig());


// var client = new elasticsearch.Client( {
//   hosts: [
//     'https://[username]:[password]@[server]:[port]/',
//     'https://[username]:[password]@[server]:[port]/'
//   ]
// });

module.exports =elasticClient;
