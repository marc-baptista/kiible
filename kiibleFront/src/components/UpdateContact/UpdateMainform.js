/* jslint devel: true */
/* global window */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Form, FormGroup, FormControl, InputGroup, Checkbox, Image, Button, Label, Radio } from "react-bootstrap";

import UpdateOptionsFrame from "./UpdateOptionsFrame";
import OopsFrame from "../Oops/OopsFrame";


import "../../styles/UpdateMainform.css";

// import headerformLogo from "../../images/img-logo_400x200.png";
import acrobat from "../../images/acrobat.png";

function validateEmail(value) {
	// eslint-disable-next-line
	const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (value.match(mailformat)) {
		return true;
	}
	// alert("You have entered an invalid email address!");
	return false;
}

function validateEmailList(emailList) {
	// eslint-disable-next-line
	// remove spaces and use the regilar expression (space or , or ;) to split the string in single emails array
	const reg = new RegExp("[ ,;]+", "g");
	const emailArray = emailList.replace(" ", "").split(reg);
	let emailsValidity = true;

	for (let i = 0; i < emailArray.length; i++) {
		if (validateEmail(emailArray[i]) === false) {
			emailsValidity = false;
			// alert(`You have entered an invalid email address!${emailArray[i]}`);
		}
	}

	// alert("You have entered an invalid email address!");
	return emailsValidity;
}


function formValidation(state) {
	let newState = true;
	// test email validity and set form's status and field color
	if (validateEmail(state.emailList) === false) {
		newState = "invalid email address list!";
	}
	if (state.message.length < 1) {
		newState = "invalid message";
	}
	return newState;
}


class UpdateMainform extends Component {
	constructor(props) {
		super(props);

		this.state = {
			wsServerBase: props.wsServerBase,
			ecpUserID: "",
			isFormValid: false,
			mainCols: 9,
			optionsShow: false,
			optionsOpenCols: 3,
			optionsCloseCols: 1,
			updateEmailNumberLimit: 3,
			updateEmailNumber: 0,
			oopsShow: false,
			oopsTopPx: "100px",
			oopsLeftPx: "350px",
			oopsTitle: "Oops...!",
			oopsMessage: "No message",
			selectedForm: "Individual",
			acceptConditions: false,
			message: "",
			emailList: "",
		};

		this.handleMessage = this.handleMessage.bind(this);
		this.handleEmailList = this.handleEmailList.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setConditions = this.setConditions.bind(this);
		this.setOptionShow = this.setOptionShow.bind(this);
		this.setOopsShow = this.setOopsShow.bind(this);
		this.setSelectedForm = this.setSelectedForm.bind(this);
	}

	handleMessage(event) {
		// alert('handleComment Called:');
		const target = event.target;
		const value = target.value;
		// const name = (target.id === "" ? target.className : target.id);
		this.setState({
			message: value,
		});

		// event.preventDefault();
	}

	handleEmailList(event) {
		// alert('handleComment Called:');
		const target = event.target;
		const value = target.value;
		// const name = (target.id === "" ? target.className : target.id);

		this.setState({
			emailList: value,
		});

		if (validateEmailList(this.state.emailList) === false) {
			// alert("Email list non conforme");

			this.setState({
				isFormValid: formValidation(this.state) === true,
			});
		}
		// event.preventDefault();
	}

	setSelectedForm(event) {
		const target = event.target;
		const value = target.value;
		// const name = target.id;

		// alert(`setSelectedForm Called: ${value}`);

		this.setState({
			selectedForm: value,
		});
		// event.preventDefault();
	}

	setConditions(event) {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		// const name = target.id;

		// alert(`setSelectedForm Called: ${value}`);

		this.setState({
			acceptConditions: value,
		});
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

	handleSubmit(event) {
		// alert('A ecEmail was submitted: ' + this.state.ecEmail);
		if (this.state.isFormValid) {
			alert("PROCESSING FORM submitted ");
			// this.saveContact();
		} else {
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
			this.oops("Oops: Submit", this.state.oopsMessage, topPx, leftPx);
		}
		event.preventDefault();
	}

	render() {
		return (
			<Row className=''>
				<Col className='UpdateglobalFrame' xl={4} md={6} xs={12} >
					<Row >
						<Col xl={this.state.mainCols} md={this.state.mainCols} xs={this.state.mainCols}>
							<Form className="UpdateInputForm" horizontal>
								<Row className='UpdateInputFormRow'>
									<FormGroup bsSize="small" controlId="formControlsEmail">
										<Label className='UpdateecpUserID'>{new Date().toLocaleTimeString()} / {this.state.ecpUserID}</Label>
										<FormControl className={validateEmailList(this.state.emailList) ? "UpdateEmailListOK" : "UpdateEmailListKO"}
											value={this.state.emailList} onChange={this.handleEmailList} placeholder="Mail (required)" />
										<div ><Label className='UpdateMoreEmail'>Ajouter adresses (séparées par des , ou ;)</Label></div>
									</FormGroup>
									<FormGroup bsSize="small" controlId="formControlsTextarea">
										<FormControl className='UpdateComment' componentClass="textarea" value={this.state.message}
											onChange={this.handleMessage} maxLength='140' placeholder="Message" />
									</FormGroup>
								</Row>
								<Row className='UpdateSelectFormRow'>
									<Label className='UpdateSelectFormLabel'>Choisissez le formulaire pret à l&quot;emploi</Label>
									<FormGroup bsSize='small'>
										<Radio name="radioGroup" value='Individual' onChange={this.setSelectedForm} inline>
											<Label className={this.state.selectedForm === "Individual" ? "UpdateSelectorSelected" : "UpdateSelectorNotSelected"}>
												Individual</Label>
										</Radio>{" "}
										<Radio name="radioGroup" value='Company' onChange={this.setSelectedForm} inline>
											<Label className={this.state.selectedForm === "Company" ? "UpdateSelectorSelected" : "UpdateSelectorNotSelected"}>
											Company</Label>
										</Radio>{" "}
										<Radio name="radioGroup" value='Invitation' onChange={this.setSelectedForm} inline>
											<Label className={this.state.selectedForm === "Invitation" ? "UpdateSelectorSelected" : "UpdateSelectorNotSelected"}>
											Invitation</Label>
										</Radio>
									</FormGroup>
								</Row>
								<Row className='formValidationRow'>
									<FormGroup className='UpdateTermsAndCond'>
										<InputGroup>
											<Checkbox checked={this.state.acceptConditions} onClick={this.setConditions}>J&quot;accepte les conditions</Checkbox>
											<InputGroup.Addon className='UpdateConditionsLink'>
												<a href='/documents/enterContact_Terms_And_Conditions.pdf' download='enterContact_Terms_And_Conditions.pdf'>
													<Image className='UpdateTerms' rounded alt="Terms and conditions" src={acrobat} /></a>
											</InputGroup.Addon>
										</InputGroup>
									</FormGroup>
									<Col>
										<Button className={this.state.isFormValid ? "UpdatesendValidate" : "UpdatesendValidateInactive"}
											bsStyle="primary" bsSize="small" type="submit" onClick={this.handleSubmit}>Validate</Button>
									</Col>
								</Row>
							</Form>
						</Col>
						<UpdateOptionsFrame optionsShow={this.state.optionsShow} optionsOpenCols={this.state.optionsOpenCols} optionsCloseCols={this.state.optionsCloseCols}
							setOptionShow={this.setOptionShow} ecpUserID={this.state.ecpUserID}/>
					</Row>
				</Col>
				<OopsFrame oopsShow={this.state.oopsShow} setOopsShow={this.setOopsShow} oopsTopPx={this.state.oopsTopPx}
					oopsLeftPx={this.state.oopsLeftPx} oopsTitle={this.state.oopsTitle} oopsMessage={this.state.oopsMessage}/>
			</Row>
		);
	}
}

UpdateMainform.propTypes = {
	wsServerBase: PropTypes.string.isRequired,
};
// UpdateMainform.defaultProps = {};

export default UpdateMainform;
