import React, { Component } from "react";
import { Grid, Row, Col, Label } from "react-bootstrap";

import Menubar from "../MenuBar/MenubarBS";

import "../../styles/Help.css";

// const params = require("../../../params.json");

class Help extends Component {
	render() {
		return (
			<div className="Help">
				<Menubar items={ [["Home", "/", 1], ["Tests", "/tests", 2], ["Help", "/help", 3], ["UserStats", "/userStats", 4]] } />
				<Grid fluid="true" summary="Administration Home page">
					<Row>
						<Col className="headTitleBar" md={12}>
							<Label>
								<b>Mini site d&quote;administration de kiible.</b>
							</Label>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default Help;
