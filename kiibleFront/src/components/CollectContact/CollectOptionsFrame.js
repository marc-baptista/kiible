// 'use strict';

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, ButtonGroup, Button, Radio, Image, Label } from "react-bootstrap";
import "../../styles/CollectOptionsFrame.css";
// import optionsButtonClosed from '../../images/optionsLocked_grey.png';
// import optionsButtonOpened from '../../images/optionsOpened_grey.png';
// import optionsButtonClosed from "../../images/roueBlack_70x70.png";
import optionsButtonOpened from "../../images/roueBlack_70x70.png";
import optionsCloseButton from "../../images/croixBlack_70x70.png";

// const undefConst = "NOTSET";

class CollectOptionsFrame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formType: props.formType,
			ecLanguage: "",
			optionsShow: props.optionsShow,
			optionsCols: props.optionsCloseCols,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOptionButton = this.handleOptionButton.bind(this);
		this.setLanguagePopup = this.setLanguagePopup.bind(this);
		this.sendContactsPopup = this.sendContactsPopup.bind(this);
		this.deleteContacts = this.deleteContacts.bind(this);
		this.handleHelp = this.handleHelp.bind(this);
		this.selectFormType = this.selectFormType.bind(this);
	}

	handleChange(event) {
		// this.setState({ec_email: event.target.value});
		const { target } = event;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const { name } = target;

		this.setState({
			[name]: value,
		});
		alert(`Field ${name} changed: ${value}`);
	}

	selectFormType(event) {
		// this.setState({ec_email: event.target.value});
		const { target } = event;
		const { value } = target;
		// const name = target.name;

		this.setState({
			formType: value,
		});
		this.props.setFormType(value);
		// alert(`Field formType changed: ${value}`);
	}

	handleSubmit(event) {
		alert(`handleSubmit Called: ${this.state.formType}`);
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
		alert(`setLanguagePopup Called: ${this.state.formType}`);
		event.preventDefault();
	}
	sendContactsPopup(event) {
		// alert('sendContactsPopup Called: ' + this.state.formType + '\nFor ecp_userID: ' + this.props.ecpUserID);

		// REMOVE TRUE FOR NORMAL USAGE
		if (this.props.ecpUserID !== "" || true) {
			// alert('userID set ('+ this.props.ecpUserID +'): OK to sendContacts');
			// set parents property sendShow=true to display sendFrame
			this.props.setSendShow(true);
		} else {
			alert("userID NOT SET: cannot sendContacts");
		}
		event.preventDefault();
	}
	deleteContacts(event) {
		alert(`deleteContacts Called: ${this.state.formType}`);
		event.preventDefault();
	}

	render() {
		// const optionsShow = this.state.optionsShow;

		if (this.state.optionsShow) {
			return (
				<Col className='CollectOptionsFrame' sx={this.state.optionsCols} md={this.state.optionsCols} xl={this.state.optionsCols}>
					<Row className='CollectOptionsFrameRow0'>
						<Image type='image' className='optionsButtonOpen' src={optionsButtonOpened} alt='Options Button Opened' onClick={this.handleOptionButton}></Image>
						<Image type='image' className='optionsClose' src={optionsCloseButton} alt='Close Options' onClick={this.handleOptionButton}></Image>
					</Row>
					<Row>
						<Label className='formSelector'>Types de formulaires</Label>
						<FormGroup>
							{ this.props.formTypeList.map((m, index) => {
								return <Radio key={m[0]} value={m[0]} bsSize="small" active={this.state.formType === m[0] ? "true" : ""}
									className={this.state.formType === m[0] ? "selectorSelected" : "selectorNotSelected"}
									onClick={this.selectFormType}>
									{m[1]}
								</Radio>;
							})
							}
						</FormGroup>
					</Row>
					<Row className='CollectOptionsFrameRow2'>
						<Label id='languageSelector' className='languageSelector' onClick={this.setLanguagePopup}>Changer de langue</Label>
					</Row>
					<Row>
						<ButtonGroup className='sendOrDelete' vertical block>
							<Button className='sendContacts' bsStyle="success" bsSize="small" type='submit' onClick={this.sendContactsPopup}>Envoyer contacts</Button>
							<Button className="deleteContacts" bsStyle="danger" bsSize="small" type='submit' onClick={this.deleteContacts}>Supprimer</Button>
						</ButtonGroup>
					</Row>
				</Col>
			);
		}
		return (
			<Col className='CollectOptionsFrameClosed' sx={this.state.optionsCols} md={this.state.optionsCols} xl={this.state.optionsCols}>
				<div className='CollectOptionsFrameRow0'>
					<Image type='image' className='optionsButtonClose' src={optionsButtonOpened} alt='Options Button Opened' onClick={this.handleOptionButton}></Image>
				</div>
			</Col>
		);
	}
}

CollectOptionsFrame.propTypes = {
	formTypeList: PropTypes.string.isRequired,
	ecpUserID: PropTypes.string.isRequired,
	formType: PropTypes.string.isRequired,
	optionsShow: PropTypes.bool.isRequired,
	optionsCloseCols: PropTypes.number.isRequired,
	optionsOpenCols: PropTypes.number.isRequired,
	setFormType: PropTypes.func.isRequired,
	setSendShow: PropTypes.func.isRequired,
};

export default CollectOptionsFrame;
