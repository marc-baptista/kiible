// 'use strict';

import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import CollectMainform from "../CollectContact/CollectMainform";
import UpdateMainform from "../UpdateContact/UpdateMainform";
import Menubar from "../MenuBar/MenubarBS";
import MainBackground from "../../images/background_10.jpg";
import "../../styles/Home.css";

const params = require("../../../params.json");

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			wsServerBase: params.wsServerBase,
			updateContact: false,
			collectContact: true,
		};

		this.selectItem = this.selectItem.bind(this);
	}

	selectItem(event) {
		/* const target = event.target; */
		/* const value = target.value; */
		/* const name = target.id; */

		// switch values
		const newCollectContact = this.state.updateContact;
		const newUpdateContact = this.state.collectContact;

		// alert(`item selected: ${name}`);
		this.setState({
			updateContact: newUpdateContact,
			collectContact: newCollectContact,
		});

		// alert('Setting sendShow to: ' + value);
	}
	render() {
		return (
			<div className='Home'>
				<img className='mainBackground' src={MainBackground} alt='background' />
				<Menubar items={ [["Help", "/help", 1]] } />
				<Grid>
					<Row className='HomeSelector'>
						<Col className='ItemBlock1' onClick={this.selectItem}>
							<div className='SelectorItem'>CollectContact</div>
							<div className={this.state.collectContact ? "SelectedUnderlineSelected" : "SelectedUnderline"}></div>
						</Col>
						<Col className='ItemBlock2' onClick={this.selectItem}>
							<div className='SelectorItem'>UpdateContact</div>
							<div className={this.state.updateContact ? "SelectedUnderlineSelected" : "SelectedUnderline"}></div>
						</Col>
					</Row>
					<Row>
						<Col className="ContactForm" md={12} xs={12}>
							{this.state.collectContact ? <CollectMainform wsServerBase={this.state.wsServerBase} /> : null}
							{this.state.updateContact ? <UpdateMainform wsServerBase={this.state.wsServerBase} /> : null}
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default Home;
