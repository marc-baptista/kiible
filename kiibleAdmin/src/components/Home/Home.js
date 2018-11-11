import React, { Component } from "react";
import { Grid, Row, Col, Label } from "react-bootstrap";

import Menubar from "../MenuBar/MenubarBS";

import "../../styles/Home.css";

// const params = require("../../../params.json");

class Home extends Component {
	render() {
		return (
			<div className='Home'>
				<Menubar items={ [["Home", "/", 1], ["Tests", "/tests", 2], ["Help", "/help", 3], ["UserStats", "/userStats", 4]] } />
				<Grid fluid="true" summary="Administration Home page">
					<Row>
						<Col className="headTitleBar" md={12}>
							<h1 className="headTitle">Administration page.</h1>
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
						<Col className="homeBody" md={12} >
							<Label>
							Adminastration home page</Label>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default Home;
