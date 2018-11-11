// 'use strict';

import React, { Component } from "react";
// import optionsButtonClosed from '../../images/optionsLocked_grey.png';
// import optionsButtonOpened from '../../images/optionsOpened_grey.png';
import optionsButtonClosed from "../../images/optionsLocked_blackR.png";
import optionsButtonOpened from "../../images/optionsOpened_blackR.png";

const undefConst = "NOTSET";

class HelpFrame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ecFormtype: "",
			ecLanguage: "",
			optionsShow: undefConst,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOptionButton = this.handleOptionButton.bind(this);
		this.setLanguagePopup = this.setLanguagePopup.bind(this);
		this.sendContactsPopup = this.sendContactsPopup.bind(this);
		this.deleteContacts = this.deleteContacts.bind(this);
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
		} else {
			this.setState({ optionsShow: true });
		}
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

		if (this.state.optionsShow === undefConst) {
			this.setState({ optionsShow: this.props.optionsShow });
		}

		if (this.state.optionsShow) {
			return (
							<div className='HelpFrame'>
								<div className='HelpFrameRow0'>
							<input type='image' className='optionsButton' src={optionsButtonOpened} alt='Options Button Opened' onClick={this.handleOptionButton}></input>
					</div>
								<div className='HelpFrameRow1'>
								<hr/>
								Types de formulaires
								<ul className='optionsUl'>
								<li className='optionsLi' value='phoneForm'>Téléphone</li>
								<li className='optionsLi' value='mailForm'>E-mail</li>
								<li className='optionsLi' value='postalForm'>Adresse</li>
								<li className='optionsLi' value='socNetForm'>Réseaux Soc.</li>
							</ul>
								</div>

								<div className='HelpFrameRow2'>
						<hr></hr>
							<input id='languageSelector' className='languageSelector' type='submit' value='Changer de langue' onClick={this.setLanguagePopup}></input>
							<hr></hr>
								</div>
								<div id='sendOrDelete' className='sendOrDelete'>
									<input className='sendContacts' type='submit' value='Envoyer contacts' onClick={this.sendContactsPopup}></input>
						<input className="deleteContacts" type='submit' value="Supprimer" onClick={this.deleteContacts}></input>
					</div>
							</div>
			);
		}
		return (
						<div className='HelpFrameClosed'>
							<div className='HelpFrameRow0'>
						<input type='image' className='optionsButton' src={optionsButtonClosed} alt='Options Button Closed' onClick={this.handleOptionButton}></input>
				</div>
						</div>
		);
	}
}

export default HelpFrame;
