import React, { Component } from "react";
import { Row, Label } from "react-bootstrap";

import "../../styles/Footer.css";

class Footer extends Component {
	render() {
		return (
			<Row className="App-footer">
				<Label className="copyright">@ M.Baptista & M.Bordes 2017</Label>
			</Row>
		);
	}
}

export default Footer;
