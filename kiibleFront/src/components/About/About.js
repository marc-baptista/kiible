import React, { Component } from "react";
import { Grid, Row, Col, Label } from "react-bootstrap";



import Menubar from "../MenuBar/MenubarBS";
import dotlogo from "../../images/dotcadre-logo_78x60.png";
import filler from "../../images/fillerWhitePurple.png";

import "../../styles/About.css";

const params = require("../../../params.json");

class About extends Component {
	render() {
		return (
			<div className='About'>
				<Menubar items={ [["Home", "/", 1], ["Help", "/help", 2], ["Contact us", "/contact", 3], ["Team", "/team", 4]] } />
				<Grid fluid="true" summary="About us">
					<Row>
						<Col className="headTitleBar" md={12}>
							<h1 className="headTitle">Hello, people.</h1>
						</Col>
					</Row>
					<Row>
						<Col className="middleBar" md="12">
							<Row>
								<Col className="Alfbar" style={{ backgroundImage: `url(${filler})` }} md="5" xs="3"></Col>
								<Col className="middleLogoBar" style={{ backgroundImage: `url(${filler})` }} md="2" xs="2"><img className="dotLogo" src={dotlogo} alt="Kiible Logo"/></Col>
								<Col className="Alfbar" style={{ backgroundImage: `url(${filler})` }} md="5" xs="3"></Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col md={8}>
							<p className="textBody" >
								Introducing Kiible
							</p>
						</Col>
					</Row>
					<Row>
						<Col className="aboutBody" md={12} >
							<Label>
							We give everyone the power to get updated contact (email, phone, or postal address). In our moving world, people use Kiible to keep in touch with prospects, customers, colleagues, friends and family. We provide a high-performance platform that allows anyone to key-in contacts, or get updated contact starting from email address. We transfer it to you…and you receive your updated contacts free of stress. It’s a simple service, secure, free and easy. Just the way we like.
	Ultimately, at Kiible we enable our users to get updated contact.
	The Solution…
	At Kiible we build the simplest solution for updating contact information you need.
	Basically, you key-in contact information come across an event (Expo, Fair, Birthday party, meeting…) or ask for update contact information starting from an email address. Then we send it to you. Our team develop and implement a simple and fast solution that deliver a high-performance service.
	Mum’s the word…
	We like to keep things simple, especially when you need to keep in touch with your prospects, customers and people. We have built the simplest and responsive solution to give anyone the ability to key-in emails or friends’ phone number, during an event. And so, we transfer your updated contact by email, free of charge.
	For you, it is quick and safe. Just use it!</Label>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default About;
