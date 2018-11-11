import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Media } from "react-bootstrap";
import Menubar from "../MenuBar/MenubarBS";

import marcAvatar from "../../images/marcAvatar.png";
import mathieuAvatar from "../../images/mathieuAvatar.png";
import inconnuAvatar from "../../images/inconnuAvatar.png";

import "../../styles/Team.css";

const params = require("../../../params.json");

class Team extends Component {
	render() {
		return (
			<div className='Team'>
				<Menubar items={ [["Home", "/", 1], ["Help", "/help", 2], ["Contact us", "/contact", 3]] } />
				<Grid fluid="true" summary="Team">
					<Row>
						<Col className="headTitleBar" md={12}>
							<h1 className="headTitle">The Kiible Team</h1>
						</Col>
					</Row>
					<Row>
						<Col className="mainBar" md="10" xs="10" mdOffset="1" xsOffset="1">
							<Row>
								<Media>
									<Media.Left>
										<img width={64} height={64} src={mathieuAvatar} alt="thumbnail" />
									</Media.Left>
									<Media.Body>
										<Media.Heading className="TeamMemberTitle">Mathieu Bordes, CEO</Media.Heading>
										<label className="TeamMemberDescription">Kibble co-founder. Executive MBA at ESCP Europe. I’m passionate about creating new products -like Kiible-and building services around them.</label>
									</Media.Body>
								</Media>
								<Media>
									<Media.Left>
										<img width={64} height={64} src={marcAvatar} alt="thumbnail" />
									</Media.Left>
									<Media.Body>
										<Media.Heading className="TeamMemberTitle">Marc Baptista, CTO</Media.Heading>
										<label className="TeamMemberDescription">Kibble co-founder and a Director of Engineering at Kiible. Uniting technology and business services exposes new ground on which to build the easy products.</label>
									</Media.Body>
								</Media>
								<Media>
									<Media.Left>
										<img width={64} height={64} src={inconnuAvatar} alt="thumbnail" />
									</Media.Left>
									<Media.Body>
										<Media.Heading className="TeamMemberTitle">Mxxx Bxxxx, CPO</Media.Heading>
										<label className="TeamMemberDescription">Kibble co-founder.. I’m passionate about using the best of technology to deliver a high-performance solutions and building the faster services, just the way we like.</label>
									</Media.Body>
								</Media>
							</Row>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default Team;
