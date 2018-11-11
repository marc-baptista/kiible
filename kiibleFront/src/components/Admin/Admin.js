import React, { Component } from "react";
import "../../styles/Admins.css";

const URLSearchParams = require("url-search-params");

const axios = require("axios");

require("promise/polyfill-done");

function genSuccessHTMLOutput(response) {
	console.log("Function: genHTMLOutput CALLED");
	return `<h5>Status:</h5> <pre>${response.status} ${response.statusText}</pre>
	<h5>Headers:</h5><pre>${JSON.stringify(response.headers)}</pre><h5>Data:</h5><pre>${JSON.stringify(response.data)}</pre>`;
}
function genErrorHTMLOutput(error) {
	console.log("Function: genErrorHTMLOutput CALLED");
	if (typeof error !== "undefined") {
		return "<h4>Result undefined</h4>";
	}
	return `<h5>Message:</h5><pre>${error.message}</pre>
	<h5>Status:</h5><pre>${error.response.status} ${error.response.statusText}</pre>
	<h5>Headers:</h5><pre>${JSON.stringify(error.response.headers, null, "\t")}</pre><h5>Data:</h5><pre>${JSON.stringify(error.response.data, null, "\t")}</pre>`;
}

class Admins extends Component {
	constructor(props) {
		super(props);

		this.state = {
			indexName: "kiible",
			email: "mbp@dd.fr",
			contactOwnerId: "",
			wsServerBase: "http://localhost:8182",
		};

		this.handleChange = this.handleChange.bind(this);
		this.callWsGetOwners = this.callWsGetOwners.bind(this);
		this.callWsGetContacts = this.callWsGetContacts.bind(this);
		this.callWsReadContact = this.callWsReadContact.bind(this);
		this.callPostContact = this.callPostContact.bind(this);
		this.performGetIndex1 = this.performGetIndex1.bind(this);
		this.performGetRequest2 = this.performGetRequest2.bind(this);
		this.callPostCreateIndex = this.callPostCreateIndex.bind(this);
		this.callPostDeleteIndex = this.callPostDeleteIndex.bind(this);
	}

	handleChange(event) {
		// this.setState({ec_email: event.target.value});
		// const target = event.target;
		const { target } = event;
		const value = target.type === "checkbox" ? target.checked : target.value;
		// const name = target.name;

		// trim indexName
		const correctedValue = value.trim();

		// index"s name cannot belongs to (create, info, delete)
		const forbidenNames = ["create", "info", "delete"];
		const a = forbidenNames.indexOf(correctedValue);

		if (a === -1) {
			this.setState({
				indexName: correctedValue,
			});

			// alert("Field " + name + " changed: " + correctedValue);
		} else {
			alert(`Forbiden index name: ${correctedValue}`);
		}
		event.preventDefault();
	}

	handleEmail(event) {
		// this.setState({ec_email: event.target.value});
		const { target } = event;
		const value = target.type === "checkbox" ? target.checked : target.value;
		// const name = target.name;

		this.setState({
			email: value,
		});
		event.preventDefault();
	}

	callWsGetOwners(event) {
		console.log("Function: callWsGetOwners CALLED");
		const indexName = document.getElementById("indexName").value;

		const resultElement = document.getElementById("dataArea");
		resultElement.innerHTML = "";

		axios.get(`${this.state.wsServerBase}/index/info/${indexName}/owners`)
			.then((response) => {
				if (typeof response !== "undefined") {
					// console.log("callWsGetOwners then - Response 1: " + JSON.stringify(response.data));
					resultElement.innerHTML = `AJAX CALL: ${genSuccessHTMLOutput(response)}`;
					// console.log("End of then.");
				} else {
					// console.log("callWsGetOwners then - Response 1: undefined");
					resultElement.innerHTML = "UNDEFINED RESPONSE";
				}
			})
			.catch((error) => {
				if (typeof error !== "undefined") {
					console.log(`callWsGetOwners catch - Error 1: ${error}`);
					resultElement.innerHTML += genErrorHTMLOutput(error);
				} else {
					console.log("callWsGetOwners catch - Error 1: undefined");
					resultElement.innerHTML += "UNDEFINED ERROR";
				}
			});
	}
	callWsGetContacts(event) {
		console.log("Function: callWsGetContacts CALLED");
		const indexName = document.getElementById("indexName").value;

		const resultElement = document.getElementById("dataArea");
		resultElement.innerHTML = "";

		axios.get(`${this.state.wsServerBase}/index/info/${indexName}/owners`)
			.then((response) => {
				if (typeof response !== "undefined") {
					// console.log("callWsGetContacts then - Response 1: " + JSON.stringify(response.data));
					resultElement.innerHTML = `AJAX CALL: ${genSuccessHTMLOutput(response)}`;
					// console.log("End of then.");
				} else {
					// console.log("callWsGetContacts then - Response 1: undefined");
					resultElement.innerHTML = "UNDEFINED RESPONSE";
				}
			})
			.catch((error) => {
				if (typeof error !== "undefined") {
					console.log(`callWsGetContacts catch - Error 1: ${error}`);
					resultElement.innerHTML += genErrorHTMLOutput(error);
				} else {
					console.log("callWsGetContacts catch - Error 1: undefined");
					resultElement.innerHTML += "UNDEFINED ERROR";
				}
			});
	}
	callWsReadContact(event) {
		console.log("Function: callWsReadContact CALLED");
		const indexName = document.getElementById("indexName").value;

		const resultElement = document.getElementById("dataArea");
		resultElement.innerHTML = "";

		axios.get(`${this.state.wsServerBase}/index/info/${indexName}/owners`)
			.then((response) => {
				if (typeof response !== "undefined") {
					// console.log("callWsReadContact then - Response 1: " + JSON.stringify(response.data));
					resultElement.innerHTML = `AJAX CALL: ${genSuccessHTMLOutput(response)}`;
					// console.log("End of then.");
				} else {
					// console.log("callWsReadContact then - Response 1: undefined");
					resultElement.innerHTML = "UNDEFINED RESPONSE";
				}
			})
			.catch((error) => {
				if (typeof error !== "undefined") {
					console.log(`callWsReadContact catch - Error 1: ${error}`);
					resultElement.innerHTML += genErrorHTMLOutput(error);
				} else {
					console.log("callWsReadContact catch - Error 1: undefined");
					resultElement.innerHTML += "UNDEFINED ERROR";
				}
			});
	}


	callPostContact(event) {
		console.log("Function: callPostContact CALLED");
		const resultElement = document.getElementById("dataArea");
		const { indexName } = this.state;
		resultElement.innerHTML = "";

		console.log(`callPostContact - indexName: ${indexName}`);

		const callingParams = new URLSearchParams();
		callingParams.append("email", this.state.email);
		callingParams.append("contactOwnerId", this.state.contactOwnerId);
		callingParams.append("tatayoyo", "value2");

		// axios.post(this.state.wsServerBase+"/index/create",
		// {
		//   indexName: "Fred",
		//   tatayoyo: "Flintstone"
		// })
		// http://localhost:8181/index/kiible/add/contact?email=mbp@dd.fr

		axios.post(`${this.state.wsServerBase}/index/${indexName}/add/contact`, callingParams)
			.then((response) => {
				console.log(`callPostContact - response typeOf: ${typeof response}`);
				console.log(`callPostContact - response data: ${response.data}`);
				console.log(`callPostContact - response status: ${response.status}`);
				console.log(`callPostContact - response statusText: ${response.statusText}`);
				console.log(`callPostContact - response headers: ${response.headers}`);
				console.log(`callPostContact - response config: ${response.config}`);
				//    resultElement.innerHTML = genSuccessHTMLOutput(response);
			})
			.catch((error) => {
				console.log(`callPostContact - error typeOf: ${typeof error}`);
				if (error.response) {
					//   // The request was made and the server responded with a status code
					//   // that falls out of the range of 2xx
					console.log(`callPostContact - error.response.data:${error.response.data}`);
					console.log(`callPostContact - error.response.status: ${error.response.status}`);
					console.log(`callPostContact - error.response.headers: ${error.response.headers}`);
				} else if (error.request) {
					//   // The request was made but no response was received
					//   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					//   // http.ClientRequest in node.js
					console.log(`callPostContact - error.request:  ${error.request}`);
					console.log(`callPostContact - error.request properties:  ${Object.getOwnPropertyNames(error.request)}`);
					console.log(`callPostContact - error.request content:  ${JSON.stringify(error.request)}`);
				} else {
					//   // Something happened in setting up the request that triggered an Error
					console.log("callPostContact - error.message: ", error.message);
				}
				console.log(`callPostContact - error.config${error.config}`);

				//    resultElement.innerHTML = genErrorHTMLOutput(error);
			});

		event.preventDefault();
	}

	performGetIndex1(event) {
		console.log("Function: performGetIndex1 CALLED");
		const resultElement = document.getElementById("dataArea");
		resultElement.innerHTML = "";

		console.log(`Calling ${this.state.wsServerBase}/index`);

		axios.get(`${this.state.wsServerBase}/index`)
			.then((response) => {
				// console.log("response typeOf: " + typeof response)
				// console.log("response data: " + response.data);
				// console.log("response status: " + response.status);
				// console.log("response statusText: " + response.statusText);
				// console.log("response headers: " + response.headers);
				// console.log("response config: " + response.config);
				if (typeof response !== "undefined") {
					// console.log("performGetIndex1 then - Response 1: " + JSON.stringify(response.data));
					resultElement.innerHTML = `AJAX CALL: ${genSuccessHTMLOutput(response)}`;
					// console.log("End of then.");
				} else {
					// console.log("performGetIndex1 then - Response 1: undefined");
					resultElement.innerHTML = "UNDEFINED RESPONSE";
				}
			})
			.catch((error) => {
				// console.log("error typeOf: " + typeof error)
				// if (error.response) {
				//   // The request was made and the server responded with a status code
				//   // that falls out of the range of 2xx
				//   console.log("error.response.data:" + error.response.data);
				//   console.log("error.response.status: " + error.response.status);
				//   console.log("error.response.headers: " + error.response.headers);
				// } else if (error.request) {
				//   // The request was made but no response was received
				//   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				//   // http.ClientRequest in node.js
				//  console.log("error.request:  " + error.request);
				// } else {
				//   // Something happened in setting up the request that triggered an Error
				//   console.log("error.message: ", error.message);
				// }
				// console.log("error.config" + error.config);

				if (typeof error !== "undefined") {
					console.log(`performGetIndex1 catch - Error 1: ${error}`);
					resultElement.innerHTML += genErrorHTMLOutput(error);
				} else {
					console.log("performGetIndex1 catch - Error 1: undefined");
					resultElement.innerHTML += "UNDEFINED ERROR";
				}
			});
	}

	performGetRequest2(event) {
		console.log("Function: performGetRequest2 CALLED");
		const resultElement = document.getElementById("dataArea");
		const indexName = document.getElementById("indexName").value;
		// console.log("indexName: " + indexName);
		resultElement.innerHTML = "";

		axios.get(`${this.state.wsServerBase}/index/info/${indexName}`)
			.then((response) => {
				// console.log("response typeOf: " + typeof response)
				// console.log("response data: " + response.data);
				// console.log("response status: " + response.status);
				// console.log("response statusText: " + response.statusText);
				// console.log("response headers: " + response.headers);
				// console.log("response config: " + response.config);
				if (typeof response !== "undefined") {
					// console.log("performGetRequest2 then - Response 2: " + JSON.stringify(response.data));
					resultElement.innerHTML = `AJAX CALL: ${genSuccessHTMLOutput(response)}`;
					// console.log("End of then.");
				} else {
					// console.log("performGetRequest2 then - Response 2: undefined");
					resultElement.innerHTML = "UNDEFINED RESPONSE";
				}
			})
			.catch((error) => {
				// console.log("error typeOf: " + typeof error)
				// if (error.response) {
				//   // The request was made and the server responded with a status code
				//   // that falls out of the range of 2xx
				//   console.log("error.response.data:" + error.response.data);
				//   console.log("error.response.status: " + error.response.status);
				//   console.log("error.response.headers: " + error.response.headers);
				// } else if (error.request) {
				//   // The request was made but no response was received
				//   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				//   // http.ClientRequest in node.js
				//   console.log("error.request:  " + error.request);
				// } else {
				//   // Something happened in setting up the request that triggered an Error
				//   console.log("error.message: ", error.message);
				// }
				// console.log("error.config" + error.config);


				if (typeof error !== "undefined") {
					console.log(`performGetIndex1 catch - Error 1: ${error}`);
					resultElement.innerHTML += genErrorHTMLOutput(error);
				} else {
					console.log("performGetIndex1 catch - Error 1: undefined");
					resultElement.innerHTML += "UNDEFINED ERROR";
				}
			});
	}

	callPostCreateIndex(event) {
		console.log("Function: callPostCreateIndex CALLED");
		const resultElement = document.getElementById("dataArea");
		const indexName = document.getElementById("indexName").value;
		resultElement.innerHTML = "";

		console.log(`callPostCreateIndex - indexName: ${indexName}`);

		const callingParams = new URLSearchParams();
		callingParams.append("indexName", indexName);
		callingParams.append("tatayoyo", "value2");

		// axios.post(this.state.wsServerBase+"/index/create",
		// {
		//   indexName: "Fred",
		//   tatayoyo: "Flintstone"
		// })

		axios.post(`${this.state.wsServerBase}/index/create`, callingParams)
			.then((response) => {
				console.log(`callPostCreateIndex - response typeOf: ${typeof response}`);
				console.log(`callPostCreateIndex - response data: ${response.data}`);
				console.log(`callPostCreateIndex - response status: ${response.status}`);
				console.log(`callPostCreateIndex - response statusText: ${response.statusText}`);
				console.log(`callPostCreateIndex - response headers: ${response.headers}`);
				console.log(`callPostCreateIndex - response config: ${response.config}`);
				//    resultElement.innerHTML = genSuccessHTMLOutput(response);
			})
			.catch((error) => {
				console.log(`callPostCreateIndex - error typeOf: ${typeof error}`);
				if (error.response) {
					//   // The request was made and the server responded with a status code
					//   // that falls out of the range of 2xx
					console.log(`callPostCreateIndex - error.response.data:${error.response.data}`);
					console.log(`callPostCreateIndex - error.response.status: ${error.response.status}`);
					console.log(`callPostCreateIndex - error.response.headers: ${error.response.headers}`);
				} else if (error.request) {
					//   // The request was made but no response was received
					//   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					//   // http.ClientRequest in node.js
					console.log(`callPostCreateIndex - error.request:  ${error.request}`);
					console.log(`callPostCreateIndex - error.request properties:  ${Object.getOwnPropertyNames(error.request)}`);
					console.log(`callPostCreateIndex - error.request content:  ${JSON.stringify(error.request)}`);
				} else {
					//   // Something happened in setting up the request that triggered an Error
					console.log(`callPostCreateIndex - error.message: ${error.message}`);
				}
				console.log(`callPostCreateIndex - error.config: ${error.config}`);

				//    resultElement.innerHTML = genErrorHTMLOutput(error);
			});

		event.preventDefault();
	}

	callPostDeleteIndex(event) {
		console.log("Function: callPostDeleteIndex CALLED");
		const resultElement = document.getElementById("dataArea");
		const indexName = document.getElementById("indexName").value;
		resultElement.innerHTML = "";

		console.log(`callPostDeleteIndex - indexName: ${indexName}`);

		const callingParams = new URLSearchParams();
		callingParams.append("indexName", indexName);
		callingParams.append("tatayoyo", "value2");

		// axios.post(this.state.wsServerBase+"/index/create",
		// {
		//   indexName: "Fred",
		//   tatayoyo: "Flintstone"
		// })

		axios.post(`${this.state.wsServerBase}/index/delete`, callingParams)
			.then((response) => {
				console.log(`callPostDeleteIndex - response typeOf: ${typeof response}`);
				console.log(`callPostDeleteIndex - response data: ${response.data}`);
				console.log(`callPostDeleteIndex - response status: ${response.status}`);
				console.log(`callPostDeleteIndex - response statusText: ${response.statusText}`);
				console.log(`callPostDeleteIndex - response headers: ${response.headers}`);
				console.log(`callPostDeleteIndex - response config: ${response.config}`);
				//    resultElement.innerHTML = genSuccessHTMLOutput(response);
			})
			.catch((error) => {
				console.log(`callPostDeleteIndex - error typeOf: ${typeof error}`);
				if (error.response) {
					//   // The request was made and the server responded with a status code
					//   // that falls out of the range of 2xx
					console.log(`callPostDeleteIndex - error.response.data:${error.response.data}`);
					console.log(`callPostDeleteIndex - error.response.status: ${error.response.status}`);
					console.log(`callPostDeleteIndex - error.response.headers: ${error.response.headers}`);
				} else if (error.request) {
					//   // The request was made but no response was received
					//   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					//   // http.ClientRequest in node.js
					console.log(`callPostDeleteIndex - error.request:  ${error.request}`);
					console.log(`callPostDeleteIndex - error.request properties:  ${Object.getOwnPropertyNames(error.request)}`);
					console.log(`callPostDeleteIndex - error.request content:  ${JSON.stringify(error.request)}`);
				} else {
					//   // Something happened in setting up the request that triggered an Error
					console.log("callPostDeleteIndex - error.message: ", error.message);
				}
				console.log(`callPostDeleteIndex - error.config${error.config}`);

				//    resultElement.innerHTML = genErrorHTMLOutput(error);
			});

		event.preventDefault();
	}

	render() {
		return (
			<div className="Admins">

				<div className="WsAdmin-bar">
					<h3>Press each buttton to call corresponding webservice</h3>
					<table>
						<tr>
							<td>
								<div className="WsAdminCell1">
									indexName: <input type="text" id="indexName"
										className="indexName"
										value={this.state.indexName}
										onChange={this.handleChange}>
									</input>
									<br></br>
									<code>{this.state.wsServerBase}/index</code>
									<input type="button" id="performGetIndex1" value="performGetIndex1"
										className="performGetIndex1"
										onClick={this.performGetIndex1}></input>
									<br></br>

									<code>{this.state.wsServerBase}/index/info/{this.state.indexName}</code>

									<input type="button" id="performGetRequest2" value="performGetRequest2"
										className="performGetRequest2"
										onClick={this.performGetRequest2}></input>
									<br></br>
									<code>{this.state.wsServerBase}/index/create?indexName={this.state.indexName}</code>
									<input type="button" id="callPostCreateIndex" value="callPostCreateIndex"
										className="callPostCreateIndex"
										onClick={this.callPostCreateIndex}></input>
									<br></br>
									<code>{this.state.wsServerBase}/index/delete?indexName={this.state.indexName}</code>
									<input type="button" id="callPostDeleteIndex" value="callPostDeleteIndex"
										className="callPostDeleteIndex"
										onClick={this.callPostDeleteIndex}></input>
								</div>
							</td>
							<td>
								<div className="WsAdminCell2">
									email: <input type="text" id="email"
										className="indexName"
										value={this.state.email}
										onChange={this.handEmail}>
									</input>
									contactOwnerID: {this.state.contactOwnerID}
									<br></br>
									<code>{this.state.wsServerBase}/index/info/{this.state.indexName}/owners</code>
									<input type="button" id="ws1" value="callWsGetOwners"
										className="ws1"
										onClick={this.callWsGetOwners}></input>
									<br></br>

									<code>{this.state.wsServerBase}/index/info/{this.state.indexName}</code>

									<input type="button" id="callWsGetContacts" value="callWsGetContacts"
										className="callWsGetContacts"
										onClick={this.callWsGetContacts}></input>
									<br></br>
									<code>{this.state.wsServerBase}/index/create?indexName={this.state.indexName}</code>
									<input type="button" id="callWsReadContact" value="callWsReadContact"
										className="callWsReadContact"
										onClick={this.callWsReadContact}></input>
									<br></br>
									<code>{this.state.wsServerBase}/index/{this.state.indexName}/add/contact?contactOwnerId={this.state.contactOwnerId}&email={this.state.email}</code>
									<input type="button" id="callPostContact" value="callPostContact"
										className="callPostContact"
										onClick={this.callPostContact}></input>
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div className="dataAreaDiv">
					<p className="dataArea" id="dataArea"> inner data area</p>
				</div>
			</div>
		);
	}
}

export default Admins;
