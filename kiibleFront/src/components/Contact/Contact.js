import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, Form, FormGroup, FormControl, Button } from "react-bootstrap";
import Menubar from "../MenuBar/MenubarBS";
import OopsFrame from "../Oops/OopsFrame";

import "../../styles/Contact.css";

const params = require("../../../params.json");

const axios = require("axios");

function validateEmail(value) {
	let result = false;
	// eslint-disable-next-line
	const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (typeof value !== "undefined") {
		if (value.match(mailformat)) {
			result = true;
		}
	}
	return result;
}

class Contact extends Component {
	constructor(props) {
		super(props);

		this.state = {
			indexName: "kiible",
			wsServerBase: params.wsServerBase,
			isFormValid: false,
			email: "",
			name: "",
			firstName: "",
			message: "",
			ipAddress: "127.0.0.1",
			oopsShow: false,
			oopsTopPx: 100,
			oopsLeftPx: 350,
			oopsTitle: "Oops...!",
			oopsMessage: "No message",
		};

		this.validateForm = this.validateForm.bind(this);
		this.submitFeedback = this.submitFeedback.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handleName = this.handleName.bind(this);
		this.handleFirstName = this.handleFirstName.bind(this);
		this.handleMessage = this.handleMessage.bind(this);
		this.setOopsShow = this.setOopsShow.bind(this);
	}
	submitFeedback(event) {
		const self = this;
		let ownerID = this.state.ecpUserID;

		// const indexName = this.state.indexName;
		// const wsServerBase = this.state.wsServerBase;

		console.log("Function: submitFeedback CALLED");

		const callingParams = new URLSearchParams();

		callingParams.append("ipAddr", this.state.ipAddress);
		callingParams.append("firstName", this.state.firstName);
		callingParams.append("name", this.state.name);
		callingParams.append("email", this.state.email);
		callingParams.append("message", this.state.message);
		callingParams.append("destinationEmail", this.state.message);

		axios.post(`${this.state.wsServerBase}/index/${this.state.indexName}/add/message`, callingParams)
			.then((response) => {
				console.log("callPostMessage - THEN");
				console.log(`callPostMessage - response typeOf: ${typeof response}`);
				console.log(`callPostMessage - response data: ${response.data}`);
				ownerID = response.data.userID;
				self.setState({ ecpUserID: ownerID });
				console.log(`callPostMessage - response status: ${response.status}`);
				console.log(`callPostMessage - response statusText: ${response.statusText}`);
				console.log(`callPostMessage - response headers: ${response.headers}`);
				console.log(`callPostMessage - response config: ${response.config}`);

				// self.resetContactInfo();
				// self.updateCounter();
			//    resultElement.innerHTML = genSuccessHTMLOutput(response);
			})
			.catch((error) => {
				const message = "Unable to save message";
				const coord = event.target.getBoundingClientRect(); // event.target.getBoundingClientRect();
				const topPx = `${coord.top}`;
				const leftPx = `${coord.right}`;
				// bottom : 283.140625
				// height : 20
				// left : 246
				// right : 311
				// top : 263.140625
				// width : 65
				// x : 246
				// y : 263.140625
				this.oops("Oops: Submit", message, topPx, leftPx);

				console.log("callPostMessage - CATCH");
				console.log(`callPostMessage - error typeOf: ${typeof error}`);
				if (error.response) {
					//   // The request was made and the server responded with a status code
					//   // that falls out of the range of 2xx
					console.log(`callPostMessage - error.response.data:${error.response.data}`);
					console.log(`callPostMessage - error.response.status: ${error.response.status}`);
					console.log(`callPostMessage - error.response.headers: ${error.response.headers}`);
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

	validateForm() {
		if (validateEmail(this.state.email) && this.state.name !== "" && this.state.message !== "") {
			// VALID
			alert("VALID");
			this.setState({
				isFormValid: true,
			});
		} else {
			// NOT VALID
			this.setState({
				isFormValid: false,
			});
		}
	}
	handleSubmit(event) {
		alert(`Form submitted:\n email: ${this.state.email}\n
				Name: ${this.state.name}\n
				FirstName: ${this.state.firstName}\n
				Message: ${this.state.message}`);
		if (this.state.isFormValid) {
			alert("PROCESSING FORM submitted ");
			this.submitFeedback(event);
		} else {
			alert("INVALID Form");
			let message = "NOTHING TO DO: invalid form\n";
			if (validateEmail(this.state.email) !== true) {
				message += "Invalid email address\n";
			}
			if (this.state.name === "") {
				message += "Give a name\n";
			}
			if (this.state.message === "") {
				message += "Leave a message\n";
			}
			const coord = event.target.getBoundingClientRect(); // event.target.getBoundingClientRect();
			const topPx = coord.top;
			const leftPx = coord.right;
			// bottom : 283.140625
			// height : 20
			// left : 246
			// right : 311
			// top : 263.140625
			// width : 65
			// x : 246
			// y : 263.140625
			this.oops("Oops: Submit", message, topPx, leftPx);
		}
		event.preventDefault();
	}

	handleEmail(event) {
		// const target = event.target;
		const { target } = event;
		// const value = target.value;
		const { value } = target;
		const name = target.id;

		this.setState({
			[name]: value,
		});

		this.validateForm();
		event.preventDefault();
	}
	handleName(event) {
		// const target = event.target;
		const { target } = event;
		// const value = target.value;
		const { value } = target;
		const name = target.id;

		this.setState({
			[name]: value,
		});

		this.validateForm();
		event.preventDefault();
	}
	handleFirstName(event) {
		// const target = event.target;
		const { target } = event;
		// const value = target.value;
		const { value } = target;
		const name = target.id;
		alert(`name:${name} value:${value}`);
		this.setState({
			[name]: value,
		});

		this.validateForm();
		event.preventDefault();
	}
	handleMessage(event) {
		// const target = event.target;
		const { target } = event;
		// const value = target.value;
		const { value } = target;
		const name = target.id;

		this.setState({
			[name]: value,
		});

		this.validateForm();
		event.preventDefault();
	}

	oops(title, message, topPx, leftPx) {
		this.setState({
			oopsTopPx: topPx,
			oopsLeftPx: leftPx,
			oopsTitle: title,
			oopsMessage: message,
		});
		this.setOopsShow(true);
	}

	setOopsShow(value) {
		this.setState({
			oopsShow: value,
		});

		// alert('Setting sendShow to: ' + value);
	}

	setOptionShow(value) {
		this.setState({
			sendShow: value,
		});

		// alert('Setting sendShow to: ' + value);
	}

	render() {
		return (
			<div className="Contact">
				<Menubar items={ [["Home", "/", 1], ["Help", "/help", 2], ["Team", "/team", 3]] } />
				<Grid fluid summary="Contact">
					<Row>
						<Col className="headTitleBar" md={12}>
							<h1 className="headTitle">Hello, people.</h1>
						</Col>
					</Row>
					<Row>
						<Col className="menuTitleBar" md={12}>
							<h1 className="menuTitle">Give us your feedback.</h1>
						</Col>
					</Row>
					<Row>
						<Col className="mainBar" md={12}>
							<Row>
								<Col className="ContactForm" md={6} mdOffset={3} xs={4} xsOffset={2}>
									<Form className="contactForm" horizontal>
										<FormGroup bsSize="small" controlId="email">
											<FormControl type="email"
												label="Email address"
												placeholder="Mail (required)"
												onChange={this.handleEmail} />
										</FormGroup>
										<FormGroup bsSize="small" controlId="name">
											<FormControl type="name"
												label="name"
												placeholder="Name"
												onChange={this.handleName} />
										</FormGroup>
										<FormGroup bsSize="small" controlId="firstName">
											<FormControl type="firstName"
												label="firstName"
												placeholder="First Name"
												onChange={this.handleName} />
										</FormGroup>
										<FormGroup controlId="message">
											<FormControl componentClass="textarea"
												placeholder="Message"
												onChange={this.handleMessage} />
										</FormGroup>
										<Button className="submitButton" bsStyle="primary" bsSize="small" type="submit" 
											disabled={!this.state.isFormValid} block={true} onClick={this.handleSubmit}>Submit</Button>
									</Form>
								</Col>
							</Row>
						</Col>
						<OopsFrame oopsShow={this.state.oopsShow} setOopsShow={this.setOopsShow} oopsTopPx={this.state.oopsTopPx} oopsLeftPx={this.state.oopsLeftPx}
							oopsTitle={this.state.oopsTitle} oopsMessage={this.state.oopsMessage}/>
					</Row>
				</Grid>
			</div>
		);
	}
}

Contact.propTypes = {
	// wsServerBase: PropTypes.string.isRequired,
};

export default Contact;
