// 'use strict';

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Image, Label } from "react-bootstrap";

import "../../styles/UpdateOptionsFrame.css";
// import optionsButtonClosed from '../../images/optionsLocked_grey.png';
// import optionsButtonOpened from '../../images/optionsOpened_grey.png';
import optionsButtonClosed from "../../images/roueBlack_70x70.png";
import optionsButtonOpened from "../../images/roueBlack_70x70.png";
import optionsCloseButton from "../../images/croixBlack_70x70.png";
import helpButton from "../../images/helpBlackR.png";

// const undefConst = "NOTSET";

class UpdateOptionsFrame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ecFormtype: "",
			ecLanguage: "",
			optionsShow: props.optionsShow,
			optionsCols: props.optionsCloseCols,
		};

		// if (this.state.optionsShow === undefConst) {
		// 	this.setState({ optionsShow: props.optionsShow });
		// }

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOptionButton = this.handleOptionButton.bind(this);
		this.setLanguagePopup = this.setLanguagePopup.bind(this);
		this.sendContactsPopup = this.sendContactsPopup.bind(this);
		this.deleteContacts = this.deleteContacts.bind(this);
		this.handleHelp = this.handleHelp.bind(this);
	}

	handleChange(event) {
		// this.setState({ec_email: event.target.value});
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
		alert(`Field ${name} changed: ${value}`);
	}

	handleSubmit(event) {
		alert(`handleSubmit Called: ${this.state.ecFormtype}`);
		event.preventDefault();
	}

	handleOptionButton(event) {
		// alert('handleOptionButton Called: ' + this.state.optionsShow);
		if (this.state.optionsShow) {
			this.setState({ optionsShow: false });
			this.setState({ optionsCols: this.props.optionsCloseCols });
		} else {
			this.setState({ optionsShow: true });
			this.setState({ optionsCols: this.props.optionsOpenCols });
		}
		event.preventDefault();
	}
	handleHelp(event) {
		window.alert("handleHelp Called: ");
		event.preventDefault();
	}

	setLanguagePopup(event) {
		alert(`setLanguagePopup Called: ${this.state.ecFormtype}`);
		event.preventDefault();
	}
	sendContactsPopup(event) {
		// alert('sendContactsPopup Called: ' + this.state.ecFormtype + '\nFor ecp_userID: ' + this.props.ecpUserID);
		if (this.props.ecpUserID !== "") {
			// alert('userID set ('+ this.props.ecpUserID +'): OK to sendContacts');
			// set parents property sendShow=true to display sendFrame
			this.props.setSendShow(true);
		} else {
			alert("userID NOT SET: cannot sendContacts");
		}

		event.preventDefault();
	}
	deleteContacts(event) {
		alert(`deleteContacts Called: ${this.state.ecFormtype}`);
		event.preventDefault();
	}

	render() {
		// const optionsShow = this.state.optionsShow;

		if (this.state.optionsShow) {
			return (
				<Col className='UpdateOptionsFrame' sx={this.state.optionsCols} md={this.state.optionsCols} xl={this.state.optionsCols}>
					<Row className='UpdateOptionsFrameRow0'>
						<Image type='image' className='optionsButton' src={optionsButtonOpened} alt='Options Button Opened' onClick={this.handleOptionButton}></Image>
						<Image type='image' className='optionsCloseButton' src={optionsCloseButton} alt='Close Options' onClick={this.handleOptionButton}></Image>
					</Row>
					<Row className='UpdateOptionsFrameRow1'>
						<ol className='optionsOl'>
							<li className='optionsLi'>Saisir les e-mails</li>
							<li className='optionsLi'>Ajouter votre message</li>
							<li className='optionsLi'>Sélectionner un formulaire</li>
							<li className='optionsLi'>Valider</li>
						</ol>
						<Label>Le formulaire sélectionné est envoyé à chaque e-mail saisi.</Label>
					</Row>
					<Row className='UpdateOptionsFrameRow2'>
						<Label id='languageSelector' className='languageSelector' onClick={this.setLanguagePopup}>Changer de langue</Label>
					</Row>
					<Row className='sendOrDelete'>
						<Image type='image' id='helpButton' className='helpButton' src={helpButton} alt='help' onClick={this.handleHelp}></Image>
					</Row>
				</Col>
			);
		}
		return (
			<Col className='UpdateOptionsFrameClosed' sx={this.state.optionsCols} md={this.state.optionsCols} xl={this.state.optionsCols}>
				<Row className='UpdateOptionsFrameRow0X'>
					<Image type='image' className='optionsButton' src={optionsButtonClosed} alt='Options Button Closed' onClick={this.handleOptionButton}></Image>
				</Row>
				<Row className='UpdateOptionsFrameRow0X'>
					<input type='image' id='helpButton' className='helpButton' src={helpButton} alt='help' onClick={this.handleHelp}></input>
				</Row>
			</Col>
		);
	}
}
UpdateOptionsFrame.propTypes = {
	optionsCloseCols: PropTypes.string.isRequired,
	optionsOpenCols: PropTypes.string.isRequired,
	optionsShow: PropTypes.string.isRequired,
	ecpUserID: PropTypes.string.isRequired,
	setSendShow: PropTypes.func.isRequired,
};
export default UpdateOptionsFrame;
