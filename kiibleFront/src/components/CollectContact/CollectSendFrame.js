import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Form, FormGroup, FormControl, Label, HelpBlock, ButtonGroup, Button, Radio, Image, InputGroup, Checkbox } from "react-bootstrap";
import "../../styles/CollectSendFrame.css";

import kiiblePersona from "../../images/kiiblePersona200x220.png";
import socnetGrey from "../../images/socnet_grey.png";
import acrobat from "../../images/acrobat.png";


const undefConst = "NOTSET";

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

class CollectSendFrame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isFormValid: false,
			sendEmail: "",
			sendComment: "",
			sendFormat: "csv",
			sendConditionsAcceptance: false,
			sendShow: undefConst,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
		this.sendCancel = this.sendCancel.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.setContactFormat = this.setContactFormat.bind(this);
		this.setConditions = this.setConditions.bind(this);
		this.handleComment = this.handleComment.bind(this);
		this.sendHelpPopup = this.sendHelpPopup.bind(this);
	}


	validateForme(value) {
		if (this.validateEmail(this.state.sendEmail) && this.validateComment(this.state.sendComment) && this.state.sendConditionsAcceptance) {
			this.setState({
				isFormValid: true,
			});
		}
		alert(`validateForme Called: ${this.state.isFormValid}`);
		return this.state.isFormValid;
	}


	handleChange(event) {
		const { target } = event;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const { name } = target;

		this.setState({
			[name]: value,
		});
		alert(`Field ${name} changed: ${this.state.sendEmail}`);
	}


	validateComment(value) {
		const retValue = true;

		return retValue;
	}

	handleEmail(event) {
		const { target } = event;
		const { value } = target;

		this.setState({ sendEmail: value });

		// test email validity and set form's status and field color
		if (validateEmail(value)) {
			// VALID

			// alert("You have entered VALID email address!");
		} else {
			// NOT VALID
			target.color = "red";
		}

		// alert('handleEmail called:' + ' name=' + name + ', value=' + value + ', this.state.sendEmail=' + this.state.sendEmail);
		event.preventDefault();
	}

	setConditions(event) {
		const { target } = event;
		const value = target.type === "checkbox" ? target.checked : target.value;

		this.setState({
			sendConditionsAcceptance: value,
		});
		// alert(`setConditions Called: ${value}`);
	}

	handleValidate(event) {
		alert("handleValidate function called");
		const sendMoreEmail = ""; // NO CC mails recipients

		this.props.sendContactFile(this.state.sendEmail, sendMoreEmail, this.state.sendComment, this.state.sendFormat);
		//  this.setState({ ecpUserID: ownerID});
		/*      this.resetContactInfo();
		this.updateCounter(); */

		this.props.setSendShow(false);
		event.preventDefault();
	}

	sendCancel(event) {
		// alert('sendCancel Called: ');
		this.props.setSendShow(false);
		event.preventDefault();
	}

	setContactFormat(event) {
		const { target } = event;
		const { value } = target;
		// const name = target.id;
		// alert(`setContactFormat Called: ${value}`);
		this.setState({
			sendFormat: value,
		});
	}

	handleComment(event) {
		// alert('handleComment Called:');
		const { target } = event;
		const { value } = target;
		// const name = (target.id === "" ? target.className : target.id);
		this.setState({
			sendComment: value,
		});

		// event.preventDefault();
	}

	sendHelpPopup(event) {
		alert("sendHelpPopup Called:");
		event.preventDefault();
	}
	getEmailValidationState() {
		const length = this.state.sendEmail.length;
		const emailValue = this.state.sendEmail;

		if (validateEmail(emailValue)) return "success";
		else if (length > 1) return "warning";
		else if (length > 0) return "error";
		return null;
	}

	handleEmailChange(event) {
		this.setState({ sendEmail: event.target.value });
	}

	render() {
		if (this.props.sendShow) {
			return (
				<Col className='CollectSendFrame' sx={11} md={4} xl={4}>
					<Form className='sendForm' horizontal>
						<FormGroup className='headRow'>
							<Image type='image' className='kiiblePersona' src={kiiblePersona} alt='Kiible Persona'></Image>
							<Label className='headerTitle'>Envoyer vos contacts</Label>
							<Image type='image' className='socnet_grey' src={socnetGrey} alt='Close Options' onClick={this.sendHelpPopup}></Image>
						</FormGroup>

						<FormGroup>
							<Label className='headerTitle'>userID: {this.props.ecpUserID}</Label>
						</FormGroup>
						<FormGroup
							controlId="sendEmail"
							validationState={this.getEmailValidationState()}>
							<FormControl
								type="text"
								size='29'
								value={this.state.sendEmail}
								placeholder="E-mail (obligatoire)"
								onChange={this.handleEmailChange} />
							<HelpBlock>Multiple E-Mails comma separated list</HelpBlock>
						</FormGroup>
						<FormGroup
							controlId="sendComment"
							validationState={this.getEmailValidationState()}>
							<FormControl
								componentClass="textarea"
								maxLength='140' rows='2' cols='30'
								value={this.state.sendComment}
								placeholder="Ajoutez vos notes"
								onChange={this.handleComment} />
						</FormGroup>
						<FormGroup className='sendFormatSet'>
							<Radio inline bsSize="small" className={this.state.sendFormat === "xls" ? "selectedItem" : "selectableItem"}
								name='sendFormatSelector' checked={this.state.sendFormat === "xls"} value='xls' onChange={this.setContactFormat} >xls</Radio>
							<Radio inline bsSize="small" className='disabledItem'
								name='sendFormatSelector' checked={this.state.sendFormat === "vcf"} value='vcf' disabled onChange={this.setContactFormat} >vCard</Radio>
							<Radio inline bsSize="small" className='disabledItem'
								name='sendFormatSelector' checked={this.state.sendFormat === "ocsv"} value='ocsv' disabled onChange={this.setContactFormat} >Outlook CSV</Radio>
						</FormGroup>
						<FormGroup className='sendFormatSet'>
							<Radio inline bsSize="small" className={this.state.sendFormat === "xlsx" ? "selectedItem" : "selectableItem"}
								name='sendFormatSelector' checked={this.state.sendFormat === "xlsx"} value='xlsx' onChange={this.setContactFormat} >xlsx</Radio>
							<Radio inline bsSize="small" className={this.state.sendFormat === "csv" ? "selectedItem" : "selectableItem"}
								name='sendFormatSelector' checked={this.state.sendFormat === "csv"} value='csv' onChange={this.setContactFormat} >CSV Simple</Radio>
							<Radio inline bsSize="small" className='disabledItem'
								name='sendFormatSelector' checked={this.state.sendFormat === "gcsv"} value='gcsv' disabled onChange={this.setContactFormat} >Google CSV</Radio>
						</FormGroup>
						<FormGroup className='sendTermsAndCond'>
							<InputGroup>
								<Checkbox checked={this.state.acceptConditions} onClick={this.setConditions}>J&quot;accepte les conditions</Checkbox>
								<InputGroup.Addon className='CollectConditionsLink'>
									<a href='/documents/enterContact_Terms_And_Conditions.pdf' download='enterContact_Terms_And_Conditions.pdf'>
										<Image className='CollectTerms' rounded alt="Terms and conditions" src={acrobat} /></a>
								</InputGroup.Addon>
							</InputGroup>
						</FormGroup>
						<ButtonGroup className='sendSubmitRow'>
							<Button className='sendCancel' bsStyle="danger"
								bsSize="small" type='submit' onClick={this.sendCancel}>Cancel</Button>
							<Button className={this.validateForme ? "sendValidate" : "sendValidateInactive"}
								bsStyle="success" bsSize="small" type='submit' onClick={this.handleValidate}>Validate</Button>
						</ButtonGroup>
					</Form>
				</Col>
			);
		}
		return (
			<div className='CollectSendFrameClosed'>
			</div>
		);
	}
}

CollectSendFrame.propTypes = {
	ecpUserID: PropTypes.string.isRequired,
	sendShow: PropTypes.string.isRequired,
	sendContactFile: PropTypes.func.isRequired,
	setSendShow: PropTypes.func.isRequired,
};
export default CollectSendFrame;
