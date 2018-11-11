/* jslint devel: true */
/* global window */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Form, FormGroup, FormControl, Button, Label, Checkbox, Image, InputGroup } from "react-bootstrap";

import "../../styles/CollectMainform.css";

import CollectOptionsFrame from "./CollectOptionsFrame";
import OopsFrame from "../Oops/OopsFrame";
import CollectSendFrame from "./CollectSendFrame";

import headerformLogo from "../../images/img-logo_400x200.png";
import acrobat from "../../images/acrobat.png";

const axios = require("axios");

// Require `PhoneNumberFormat`.
// const PNF = require("google-libphonenumber").PhoneNumberFormat;

// Get an instance of `PhoneNumberUtil`.
// const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();

/* */
function validateEmail(value) {
	let result = false;
	// eslint-disable-next-line
	const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (typeof value !== "undefined") {
		if (value.match(mailformat)) {
			result = true;
		}
	}
	// alert("You have entered an invalid email address!");
	return result;
}

/* phone validation: string is numeric mi 9, max */
function validatePhone(value) {
	let result = false;
	/* TODO reactivate google phone validation */
	//	if (typeof value !== "undefined" && value.lenght > 6) {
	//	result = phoneUtil.isValidNumber(phoneUtil.parse(value));
	// }
	if (value.lenght > 6) {
		result = true;
	}
	return result;
}

class CollectMainform extends Component {
	constructor(props) {
		super(props);

		this.state = {
			indexName: "kiible",
			wsServerBaseX: "http://localhost:8182",
			wsServerBase: props.wsServerBase,
			isFormValid: false,
			acceptConditions: false,
			formType: "mailForm",
			formTypeList: [["phoneForm", "Téléphone"], ["mailForm", "E-mail"], ["postalForm", "Adresse"], ["meetingForm", "Rendez-vous"], ["promoForm", "Promotion"]],
			mainCols: 9,
			optionsShow: false,
			sendShow: false,
			optionsOpenCols: 3,
			optionsCloseCols: 1,
			oopsShow: false,
			oopsTopPx: "100px",
			oopsLeftPx: "350px",
			oopsTitle: "Oops...!",
			oopsMessage: "No message",
			ecEmail: "",
			ecName: "",
			ecFirstName: "",
			ecComment: "",
			ecpUserID: "",
			ecIpAddr: "127.0.0.1",
			ecFixePhone: "",
			ecMobilePhone: "",
			ecTwitter: "",
			ecFacebook: "",
			ecSkype: "",
			ecGoogle: "",
			ecViadeo: "",
			ecInstagram: "",
			ecSnapchat: "",
			ecLinkedIn: "",
			ecAddressAddress: "",
			ecAddressStreet: "",
			ecAddressStreet2: "",
			ecAddressStreet3: "",
			ecAddressPoBox: "",
			ecAddressCity: "",
			ecAddressState: "",
			ecAddressPostalCode: "",
			ecAddressCountry: "",
			ecpContactNumber: 0,
			ecpContactNumberLimit: 100,
		};


		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePhone = this.handlePhone.bind(this);
		this.toggleSubmitClass = this.toggleSubmitClass.bind(this);
		this.resetContactInfo = this.resetContactInfo.bind(this);
		this.updateCounter = this.updateCounter.bind(this);
		this.setOptionShow = this.setOptionShow.bind(this);
		this.setSendShow = this.setSendShow.bind(this);
		this.setOopsShow = this.setOopsShow.bind(this);
		this.setFormType = this.setFormType.bind(this);
		this.sendContactFile = this.sendContactFile.bind(this);
		this.updateFormValidity = this.updateFormValidity.bind(this);
		this.setConditions = this.setConditions.bind(this);
	}

	resetContactInfo() {
		this.setState({
			isFormValid: false,
			acceptConditions: false,
			formType: "mailForm",
			sendShow: false,
			mainCols: 9,
			optionsShow: false,
			optionsOpenCols: 3,
			optionsCloseCols: 1,
			oopsShow: false,
			oopsTitle: "Oops...!",
			oopsMessage: "No message",
			ecEmail: "",
			ecName: "",
			ecFirstName: "",
			ecComment: "",
			ecIpAddr: "127.0.0.1",
			ecFixePhone: "",
			ecMobilePhone: "",
			ecTwitter: "",
			ecFacebook: "",
			ecSkype: "",
			ecGoogle: "",
			ecViadeo: "",
			ecInstagram: "",
			ecSnapchat: "",
			ecLinkedIn: "",
			ecAddressAddress: "",
			ecAddressStreet: "",
			ecAddressStreet2: "",
			ecAddressStreet3: "",
			ecAddressPoBox: "",
			ecAddressCity: "",
			ecAddressState: "",
			ecAddressPostalCode: "",
			ecAddressCountry: "",
		});
	}

	updateFormValidity() {
		let formValidity = false;

		// ["phoneForm", "mailForm", "postalForm", "meetingForm", "promoForm"]
		// phoneForm: valid phone number + acceptConditions+ contactNumberLimit
		if (this.state.formType === "phoneForm") {
			if (validatePhone(this.state.ecFixePhone) && this.state.acceptConditions && this.state.ecpContactNumber < this.state.ecpContactNumberLimit) {
				// VALID
				formValidity = true;
			}
		}
		// mailForm: valid email + acceptConditions + contactNumberLimit
		if (this.state.formType === "mailForm") {
			if (validateEmail(this.state.ecEmail) && this.state.acceptConditions && this.state.ecpContactNumber < this.state.ecpContactNumberLimit) {
				// VALID
				formValidity = true;
			}
		}
		// postalForm: valid name length + acceptConditions + contactNumberLimit
		if (this.state.formType === "postalForm") {
			if (this.state.name.length > 1 && this.state.acceptConditions && this.state.ecpContactNumber < this.state.ecpContactNumberLimit) {
				// VALID
				formValidity = true;
			}
		}
		// meetingForm: valid phone + valid name + contactNumberLimit
		if (this.state.formType === "meetingForm") {
			if (validateEmail(this.state.ecEmail) && this.state.name.length > 1 && this.state.ecpContactNumber < this.state.ecpContactNumberLimit) {
				// VALID
				formValidity = true;
			}
		}
		// promoForm: valid email + valid message + acceptConditions + contactNumberLimit
		if (this.state.formType === "promoForm") {
			if (validateEmail(this.state.ecEmail) && this.state.acceptConditions && this.state.message.length > 10 && this.state.ecpContactNumber < this.state.ecpContactNumberLimit) {
				// VALID
				formValidity = true;
			}
		}

		this.setState({
			isFormValid: formValidity,
		});
		return formValidity;
	}

	updateCounter() {
		const newValue = this.state.ecpContactNumber + 1;
		this.setState({ ecpContactNumber: newValue });
		if (this.state.ecpContactNumber >= this.state.ecpContactNumberLimit) {
			this.setState({ isFormValid: false });
		}
	}

	sendContactFile(sendEmail, sendMoreEmail, sendComment, sendFormat) {
		window.alert("sendContactFile function called");
		// const ownerID = this.state.ecpUserID;
		// const indexName = this.state.indexName;
		// const wsServerBase = this.state.wsServerBase;


		window.alert(`sendContactFile CALLED:\nsendEmail: ${sendEmail}\nsendMoreEmail: ${sendMoreEmail}\nsendComment: ${sendComment}\nsendFormat: ${sendFormat}\nownerID: ${this.state.ecpUserID}`);

		const callingParams = new URLSearchParams();

		callingParams.append("contactOwnerId", this.state.ecpUserID);
		callingParams.append("email", sendEmail);
		callingParams.append("moreEmail", sendMoreEmail);
		callingParams.append("comment", sendComment);
		callingParams.append("fileFormat", sendFormat);


		axios.post(`${this.state.wsServerBase}/index/${this.state.indexName}/send/contactFile`, callingParams)
			.then((response) => {
				console.log("sendContactFile - THEN");
				console.log(`sendContactFile - response typeOf: ${typeof (response)}`);
				console.log(`sendContactFile - response data: ${response.data}`);
				// ownerID=response.data.userID;
				// self.setState({ ecpUserID: ownerID});
				console.log(`sendContactFile - response status: ${response.status}`);
				console.log(`sendContactFile - response statusText: ${response.statusText}`);
				console.log(`sendContactFile - response headers: ${response.headers}`);
				console.log(`sendContactFile - response config: ${response.config}`);
			})
			.catch((error) => {
				console.log("sendContactFile - CATCH");
				console.log(`sendContactFile - error typeOf: ${typeof error}`);
				if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
					console.log(`sendContactFile - error.response.data:${error.response.data}`);
					console.log(`sendContactFile - error.response.status: ${error.response.status}`);
					console.log(`sendContactFile - error.response.headers: ${error.response.headers}`);
					alert(`Unable to save new contact, error: ${error.response.status}`);
				} else if (error.request) {
					//   // The request was made but no response was received
					//   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					//   // http.ClientRequest in node.js
					console.log(`sendContactFile - error.request:  ${error.request}`);
					console.log(`sendContactFile - error.request properties:  ${Object.getOwnPropertyNames(error.request)}`);
					console.log(`sendContactFile - error.request content:  ${JSON.stringify(error.request)}`);
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

		this.setSendShow(false);
		// event.preventDefault();
	}
	saveContact(event) {
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

	toggleSubmitClass() {
		const currentState = this.state.isFormValid;
		this.setState({ isFormValid: !currentState });
	}

	handleChange(event) {
		// this.setState({ecEmail: event.target.value});
		// const target = event.target;
		const { target } = event;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.id;

		this.setState({
			[name]: value,
		});
		// alert('Field ' + name + ' changed: ' + value);
		event.preventDefault();
	}

	handleSubmit(event) {
		// alert('A ecEmail was submitted: ' + this.state.ecEmail);
		if (this.state.isFormValid) {
		// alert('PROCESSING FORM submitted ');
			this.saveContact(event);
		} else {
			let message = "NOTHING TO DO: invalid form";
			if (this.state.ecpContactNumber >= this.state.ecpContactNumberLimit) {
				message = `MAXIMUM CONTACT LIMIT (${this.state.ecpContactNumberLimit})`;
			}
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
		}
		event.preventDefault();
	}

	handlePhone(event) {
		// const target = event.target;
		const { target } = event;
		// const value = target.value;
		const { value } = target;
		const name = target.id;

		this.setState({
			[name]: value,
		});

		this.updateFormValidity();
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

		// test email validity and set form's status and field color
		if (validateEmail(value) && this.state.ecpContactNumber < this.state.ecpContactNumberLimit) {
			// VALID
			this.setState({
				isFormValid: true,
			});
			// alert(`You have entered VALID email address! ${value}`);
		} else {
			// NOT VALID
			this.setState({
				isFormValid: false,
			});
			target.color = "red";
		}
		// alert('handleEmail called:' + ' name=' + name + ', value=' + value + ', this.state.ecEmail=' + this.state.ecEmail);
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

	setOptionShow(value) {
		this.setState({
			OptionsShow: value,
		});

		// alert('Setting sendShow to: ' + value);
	}
	setSendShow(value) {
		this.setState({
			sendShow: value,
		});

		// alert('Setting sendShow to: ' + value);
	}
	setConditions(event) {
		// const target = event.target;
		const { target } = event;
		const value = target.type === "checkbox" ? target.checked : target.value;
		// const name = target.id;

		// alert(`setSelectedForm Called: ${value}`);

		this.setState({
			acceptConditions: value,
		});
	}

	setFormType(value) {
		// reset data
		this.resetContactInfo();

		this.setState({
			formType: value,
		});
		// alert(`Setting formType to: ${value}`);
	}

	setOopsShow(value) {
		this.setState({
			oopsShow: value,
		});

		// alert('Setting sendShow to: ' + value);
	}

	render() {
		return (
			<Row className=''>
				<Col className='CollectGlobalFrame' xl={4} md={6} xs={12} >
					<Row>
						<Col xl={this.state.mainCols} md={this.state.mainCols} xs={this.state.mainCols}>
							<Form className='formInputsForm'>
								<Image className='headerformLogo' src={headerformLogo} alt='kiibleLogo'/>
								<Label className='ecpUserID'>{new Date().toLocaleTimeString()} / {this.state.ecpUserID}</Label>
								<Row className='formInputsRow'>
									{this.state.formType === "phoneForm" &&
									<div>
										<FormGroup bsSize='small' controlId='ecFixePhone'>
											<FormControl className={validatePhone(this.state.ecFixePhone) ? "CollectInputOK" : "CollectInputKO"}
												size='33' value={this.state.ecFixePhone} onChange={this.handlePhone} placeholder='Téléphone (obligatoire)' />
										</FormGroup>
										<FormGroup bsSize='small' controlId='ecName'>
											<FormControl className='ecName'
												size='33' value={this.state.ecName} onChange={this.handleChange} placeholder='Nom' />
										</FormGroup>
										<FormGroup bsSize='small' controlId='ecFirstName'>
											<FormControl className='ecFirstName'
												size='33' value={this.state.ecFirstName} onChange={this.handleChange} placeholder='Prénom' />
										</FormGroup>
										<FormGroup bsSize='small' controlId='ecComment'>
											<FormControl componentClass='textarea' value={this.state.ecComment} onChange={this.handleChange} maxLength='140' rows='6' cols='34'placeholder='Notes' />
										</FormGroup>
										<FormGroup className='CollectTermsAndCond'>
											<InputGroup>
												<Checkbox checked={this.state.acceptConditions} onClick={this.setConditions}>J&quot;accepte les conditions</Checkbox>
												<InputGroup.Addon className='CollectConditionsLink'>
													<a href='/documents/enterContact_Terms_And_Conditions.pdf' download='enterContact_Terms_And_Conditions.pdf'>
														<Image className='CollectTerms' rounded alt="Terms and conditions" src={acrobat} /></a>
												</InputGroup.Addon>
											</InputGroup>
										</FormGroup>
									</div>
									}
									{this.state.formType === "mailForm" &&
									<div>
										<FormGroup bsSize='small' controlId='ecEmail'>
											<FormControl className={validateEmail(this.state.ecEmail) ? "CollectInputOK" : "CollectInputKO"}
												size='33' value={this.state.ecEmail} onChange={this.handleEmail} placeholder='E-mail (obligatoire)' />
										</FormGroup>
										<FormGroup bsSize='small' controlId='ecName'>
											<FormControl className='ecName'
												size='33' value={this.state.ecName} onChange={this.handleChange} placeholder='Nom' />
										</FormGroup>

										<FormGroup bsSize='small' controlId='ecFirstName'>
											<FormControl className='ecFirstName'
												size='33' value={this.state.ecFirstName} onChange={this.handleChange} placeholder='Prénom' />
										</FormGroup>
										<FormGroup bsSize='small' controlId='ecComment'>
											<FormControl componentClass='textarea' value={this.state.ecComment} onChange={this.handleChange} maxLength='140' rows='6' cols='34'placeholder='Notes' />
										</FormGroup>
										<FormGroup className='CollectTermsAndCond'>
											<InputGroup>
												<Checkbox checked={this.state.acceptConditions} onClick={this.setConditions}>J&quot;accepte les conditions</Checkbox>
												<InputGroup.Addon className='CollectConditionsLink'>
													<a href='/documents/enterContact_Terms_And_Conditions.pdf' download='enterContact_Terms_And_Conditions.pdf'>
														<Image className='CollectTerms' rounded alt="Terms and conditions" src={acrobat} /></a>
												</InputGroup.Addon>
											</InputGroup>
										</FormGroup>
									</div>
									}
									{this.state.formType === "postalForm" &&
									<div>
										<FormGroup bsSize='small' controlId='ecName'>
											<FormControl className='ecName'
												size='33' value={this.state.ecName} onChange={this.handleChange} placeholder='Nom' />
										</FormGroup>

										<FormGroup bsSize='small' controlId='ecFirstName'>
											<FormControl className='ecFirstName'
												size='33' value={this.state.ecFirstName} onChange={this.handleChange} placeholder='Prénom' />
										</FormGroup>
										<FormGroup bsSize='small' controlId='ecEmail'>
											<FormControl className={validateEmail(this.state.ecEmail) ? "CollectInputOK" : "CollectInputKO"}
												size='33' value={this.state.ecEmail} onChange={this.handleEmail} placeholder='E-mail (obligatoire)' />
										</FormGroup>
										<FormGroup bsSize='small' controlId='ecAddressAddress'>
											<FormControl className={validateEmail(this.state.ecAddressAddress) ? "CollectInputOK" : "CollectInputKO"}
												size='33' value={this.state.ecAddressAddress} onChange={this.handleChange} placeholder='Rue' />
										</FormGroup>
										<FormGroup bsSize='small' controlId='ecAddressPostalCode'>
											<FormControl className={validateEmail(this.state.ecAddressPostalCode) ? "CollectInputOK" : "CollectInputKO"}
												size='33' value={this.state.ecAddressPostalCode} onChange={this.handleChange} placeholder='Code Postal' />
										</FormGroup>
										<FormGroup bsSize='small' controlId='ecAddressCity'>
											<FormControl className={validateEmail(this.state.ecAddressCity) ? "CollectInputOK" : "CollectInputKO"}
												size='33' value={this.state.ecAddressCity} onChange={this.handleChange} placeholder='Ville' />
										</FormGroup>
										<FormGroup bsSize='small' controlId='ecAddressCountry'>
											<FormControl className={validateEmail(this.state.ecAddressCountry) ? "CollectInputOK" : "CollectInputKO"}
												size='33' value={this.state.ecAddressCountry} onChange={this.handleChange} placeholder='Pays' />
										</FormGroup>

										<FormGroup bsSize='small' controlId='ecComment'>
											<FormControl componentClass='textarea' value={this.state.ecComment} onChange={this.handleChange} maxLength='140' rows='3' cols='34'placeholder='Notes' />
										</FormGroup>
										<FormGroup className='CollectTermsAndCond'>
											<InputGroup>
												<Checkbox checked={this.state.acceptConditions} onClick={this.setConditions}>J&quot;accepte les conditions</Checkbox>
												<InputGroup.Addon className='CollectConditionsLink'>
													<a href='/documents/enterContact_Terms_And_Conditions.pdf' download='enterContact_Terms_And_Conditions.pdf'>
														<Image className='CollectTerms' rounded alt="Terms and conditions" src={acrobat} /></a>
												</InputGroup.Addon>
											</InputGroup>
										</FormGroup>
									</div>
									}
									{this.state.formType === "meetingForm" &&
									<div>
										<FormGroup bsSize='small' controlId='ecEmail'>
											<FormControl className={validateEmail(this.state.ecEmail) ? "CollectInputOK" : "CollectInputKO"}
												size='33' value={this.state.ecEmail} onChange={this.handleEmail} placeholder='Téléphone' />
										</FormGroup>
										<FormGroup bsSize='small' controlId='ecName'>
											<FormControl className='ecName'
												size='33' value={this.state.ecName} onChange={this.handleChange} placeholder='Nom' />
										</FormGroup>

										<FormGroup bsSize='small' controlId='ecFirstName'>
											<FormControl className='ecFirstName'
												size='33' value={this.state.ecFirstName} onChange={this.handleChange} placeholder='Prénom' />
										</FormGroup>
										<FormGroup bsSize='small' controlId='ecComment'>
											<FormControl componentClass='textarea' value={this.state.ecComment} onChange={this.handleChange} maxLength='140' rows='6' cols='34'placeholder='Notes' />
										</FormGroup>
									</div>
									}
									{this.state.formType === "promoForm" &&
									<div>
										<FormGroup bsSize='small' controlId='ecComment'>
											<FormControl componentClass='textarea' value={this.state.ecComment} onChange={this.handleChange}
												maxLength='140' rows='6' cols='34'placeholder='Message' />
										</FormGroup>
										<FormGroup bsSize='small' controlId='ecEmail'>
											<FormControl className={validateEmail(this.state.ecEmail) ? "CollectInputOK" : "CollectInputKO"}
												size='33' value={this.state.ecEmail} onChange={this.handleEmail} placeholder='E-Mail (Obligatoire)' />
										</FormGroup>
										<FormGroup bsSize='small' controlId='ecFirstName'>
											<FormControl className='ecFirstName'
												size='33' value={this.state.ecFirstName} onChange={this.handleChange} placeholder='Prénom' />
										</FormGroup>
									</div>
									}
								</Row>
								<Row className='formValidationRow'>
									<Col>
										<Label className='ecpContactNumber'>{this.state.ecpContactNumber}/{this.state.ecpContactNumberLimit}</Label>
									</Col>
									<FormGroup className="formSubmitRow" bsSize='small'>
										<Button className="Reset" inline
											bsStyle="primary" type="submit" onClick={this.handleReset}>Cancel</Button>
										<Button className={this.state.isFormValid ? "ecSubmit" : "ecSubmitInactive"} inline
											bsStyle="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
									</FormGroup>
								</Row>
							</Form>
						</Col>
						<CollectOptionsFrame optionsShow={this.state.optionsShow} optionsOpenCols={this.state.optionsOpenCols} optionsCloseCols={this.state.optionsCloseCols}
							setOptionShow={this.setOptionShow} setSendShow={this.setSendShow}
							setFormType={this.setFormType} formType={this.state.formType} formTypeList={this.state.formTypeList} ecpUserID={this.state.ecpUserID}/>
					</Row>
				</Col>
				<OopsFrame oopsShow={this.state.oopsShow} setOopsShow={this.setOopsShow} oopsTopPx={this.state.oopsTopPx} oopsLeftPx={this.state.oopsLeftPx}
					oopsTitle={this.state.oopsTitle} oopsMessage={this.state.oopsMessage}/>
				<CollectSendFrame sendShow={this.state.sendShow} setSendShow={this.setSendShow} sendContactFile={this.sendContactFile}
					ecpUserID={this.state.ecpUserID} wsServerBase={this.state.wsServerBase}/>
			</Row>
		);
	}
}


CollectMainform.propTypes = {
	wsServerBase: PropTypes.string.isRequired,
	setSendShow: PropTypes.func.isRequired,
};
// CollectMainform.defaultProps = {};


export default CollectMainform;
