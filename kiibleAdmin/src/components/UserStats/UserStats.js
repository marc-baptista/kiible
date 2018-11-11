import React, { Component } from "react";
import { Grid, Row, Col, Label } from "react-bootstrap";

import Menubar from "../MenuBar/MenubarBS";

import "../../styles/Home.css";

const params = require("../../../params.json");
const URLSearchParams = require("url-search-params");

const axios = require("axios");
require("promise/polyfill-done");

class UserStats extends Component {
	constructor(props) {
		super(props);

		this.state = {
			indexName: "kiible",
			wsServerBase: params.wsServerBase,
		};
		this.handleUsersList = this.handleUsersList.bind(this);
	}

	handleUsersList(event) {
		alert('handleUsersList');

			// this.getUsersList(event);
		event.preventDefault();
	}

	getUsersList(event) {
		const self = this;
		let ownerID = this.state.ecpUserID;

		// const indexName = this.state.indexName;
		// const wsServerBase = this.state.wsServerBase;

		console.log("Function: saveContact CALLED");
		/*  alert('saveContact CALLED:' +
			'\nisFormValid: ' + this.state.isFormValid +
				'\necEmail: ' + this.state.ecEmail +
				'\necName: ' + this.state.ecName +
		 		'\necFirstName: ' + this.state.ecFirstName +
				'\necComment: ' + this.state.ecComment +
				'\necpUserID: ' + this.state.ecpUserID +
				'\necpContactNumber: ' + this.state.ecpContactNumber +
		 		'\necpContactNumberLimit: ' + this.state.ecpContactNumberLimit
				); */

		const callingParams = new URLSearchParams();

		callingParams.append("contactOwnerId", this.state.ecpUserID);
		callingParams.append("ipAddr", this.state.ecIpAddr);
		callingParams.append("firstName", this.state.ecFirstName);
		callingParams.append("name", this.state.ecName);
		callingParams.append("email", this.state.ecEmail);
		callingParams.append("comment", this.state.ecComment);
		callingParams.append("fixePhone", this.state.ecFixePhone);
		callingParams.append("mobilePhone", this.state.ecMobilePhone);
		callingParams.append("twitter", this.state.ecTwitter);
		callingParams.append("facebook", this.state.ecFacebook);
		callingParams.append("skype", this.state.ecSkype);
		callingParams.append("google", this.state.ecGoogle);
		callingParams.append("viadeo", this.state.ecViadeo);
		callingParams.append("instagram", this.state.ecInstagram);
		callingParams.append("snapchat", this.state.ecSnapchat);
		callingParams.append("linkedIn", this.state.ecLinkedIn);
		callingParams.append("addressAddress", this.state.ecAddressAddress);
		callingParams.append("addressStreet", this.state.ecAddressStreet);
		callingParams.append("addressStreet_2", this.state.ecAddressStreet2);
		callingParams.append("addressStreet_3", this.state.ecAddressStreet3);
		callingParams.append("address_po_box", this.state.ecAddressPoBox);
		callingParams.append("addressCity", this.state.ecAddressCity);
		callingParams.append("addressState", this.state.ecAddressState);
		callingParams.append("address_postalCode", this.state.ecAddressPostalCode);
		callingParams.append("addressCountry", this.state.ecAddressCountry);


		axios.post(`${this.state.wsServerBase}/index/${this.state.indexName}/add/contact`, callingParams)
			.then((response) => {
				console.log("callPostContact - THEN");
				console.log(`callPostContact - response typeOf: ${typeof response}`);
				console.log(`callPostContact - response data: ${response.data}`);
				ownerID = response.data.userID;
				self.setState({ ecpUserID: ownerID });
				console.log(`callPostContact - response status: ${response.status}`);
				console.log(`callPostContact - response statusText: ${response.statusText}`);
				console.log(`callPostContact - response headers: ${response.headers}`);
				console.log(`callPostContact - response config: ${response.config}`);

				self.resetContactInfo();
				self.updateCounter();
			//    resultElement.innerHTML = genSuccessHTMLOutput(response);
			})
			.catch((error) => {
				const message = "Unable to save contact";
				const coord = event.target.getBoundingClientRect(); // event.target.getBoundingClientRect();
				const topPx = `${coord.top}px`;
				const leftPx = `${coord.right}px`;
				// bottom : 283.140625
				// height : 20
				// left : 246
				// right : 311
				// top : 263.140625
				// width : 65
				// x : 246
				// y : 263.140625
				this.oops("Oops: Submit", message, topPx, leftPx);

				console.log("callPostContact - CATCH");
				console.log(`callPostContact - error typeOf: ${typeof error}`);
				if (error.response) {
					//   // The request was made and the server responded with a status code
					//   // that falls out of the range of 2xx
					console.log(`callPostContact - error.response.data:${error.response.data}`);
					console.log(`callPostContact - error.response.status: ${error.response.status}`);
					console.log(`callPostContact - error.response.headers: ${error.response.headers}`);
					alert(`Unable to save new contact, error: ${error.response.status}`);
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

		//  this.setState({ ecpUserID: ownerID});
		/*      this.resetContactInfo();
			this.updateCounter(); */
		event.preventDefault();
	}

	render() {
		return (
			<div className='UserStats'>
				<Menubar items={ [["Home", "/", 1], ["Tests", "/tests", 2], ["Help", "/help", 3], ["UserStats", "/userStats", 4]] } />
				<Grid fluid="true" summary="Administration UserStats page">
					<Row>
						<Col className="headTitleBar" md={12}>
							<h1 className="headTitle">UserStats page.</h1>
						</Col>
					</Row>
					<Row>
						<Col md={8}>
							<p className="textBody" >
								Kiible user's statistics
							</p>
						</Col>
					</Row>
					<Row>
						<Col className="homeBody" md={12} >
							<Label>
							Administration home page</Label>
						</Col>
					</Row>
					<Row>
						<code>{this.state.wsServerBase}/index/create?indexName={this.state.indexName}</code>
						<input type='button' id='handleUsersList' value='handleUsersList'
							className='callWsReadContact'
							onClick={this.handleUsersList}></input>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default UserStats;
