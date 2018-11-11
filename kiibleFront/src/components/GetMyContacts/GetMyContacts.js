import React, { Component } from "react";

import "../../styles/GetMyContacts.css";

import CollectSendFrame from "../CollectContact/CollectSendFrame";

const params = require("../../../params.json");

// const axios = require("axios");

class GetMyContact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			indexName: "kiible",
			wsServerBaseX: "http://localhost:8182",
			wsServerBase: props.wsServerBase,
			isFormValid: false,
			sendShow: true,
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
			ecpContactNumberLimit: 3,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.ecHelp = this.ecHelp.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.toggleSubmitClass = this.toggleSubmitClass.bind(this);
		this.resetContactInfo = this.resetContactInfo.bind(this);
		this.updateCounter = this.updateCounter.bind(this);
		this.setSendShow = this.setSendShow.bind(this);
		this.sendContactFile = this.sendContactFile.bind(this);
	}
	render() {
		return (

			<div className="GetMyContact">
				<CollectSendFrame
					sendShow={this.state.sendShow}
					setSendShow={this.setSendShow}
					sendContactFile={this.sendContactFile}
					ecpUserID={this.state.ecpUserID}
					wsServerBase={this.state.wsServerBase} />
			</div>
		);
	}
}

export default GetMyContact;
