// 'use strict';

import React, { Component } from "react";
import { Popover } from "react-bootstrap";

import oopsIcone from "../../images/i-209x209.png";

import "../../styles/OopsFrame.css";

class OopsFrame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ecFormtype: "",
			ecLanguage: "",
			oopsShow: props.oopsShow,
			oopsTopPx: props.oopsTopPx,
			oopsLeftPx: props.oopsLeftPx,
			oopsTitle: props.oopsTitle,
			oopsMessage: props.oopsMessage,
			oopsStyle: { top: props.oopsTopPx },

		};

		// if (this.state.OopsShow === undefConst) {
		// 	this.setState({ OopsShow: props.OopsShow });
		// }

		this.handleClose = this.handleClose.bind(this);
	}


	handleClose(event) {
		this.props.setOopsShow(false);
		event.preventDefault();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			oopsShow: nextProps.oopsShow,
			oopsTopPx: nextProps.oopsTopPx,
			oopsLeftPx: nextProps.oopsLeftPx,
			oopsTitle: nextProps.oopsTitle,
			oopsMessage: nextProps.oopsMessage,
			oopsStyle: { top: nextProps.oopsTopPx },
		});
	}

	render() {
		if (this.props.oopsShow) {
			return (
				<div className='OopsFrame' style={this.state.oopsStyle}>
					<div className='OopsTriangle'></div>
					<div className='OopsBody' onClick={this.handleClose}>
						<div className='OopsFrameTitle'>
							<input type='image' className='OopsIcone' src={oopsIcone} alt='Oops icone' onClick={this.handleClose}></input>
							{this.state.oopsTitle}
						</div>
						<div className='OopsFrameMessage' onClick={this.handleClose}>
							<hr/>
							{this.state.oopsMessage}
						</div>
					</div>
					<div className='OopsFrame' style={this.state.oopsStyle}>
						<Popover
							id="popover-basic"
							placement="right"
							positionLeft={200}
							positionTop={50}
							title={this.state.oopsTitle}
							onClick={this.handleClose}
						>
							{this.state.oopsMessage}
						</Popover>
					</div>
				</div>
			);
		}
		return (
			<div className='OopsFrameClosed'>
			</div>
		);
	}
}


export default OopsFrame;
