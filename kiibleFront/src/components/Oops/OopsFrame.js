import React, { Component } from "react";
import PropTypes from "prop-types";
import { Popover } from "react-bootstrap";

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
		});
	}

	render() {
		if (this.props.oopsShow) {
			return (
				<Popover
					id="popover-basic"
					placement="right"
					positionLeft={this.state.oopsLeftPx}
					positionTop={this.state.oopsTopPx}
					title={this.state.oopsTitle}
					onClick={this.handleClose}
				>
					{this.state.oopsMessage}
				</Popover>
			);
		}
		return (
			<div className='OopsFrameClosed'>
			</div>
		);
	}
}

OopsFrame.propTypes = {
	setOopsShow: PropTypes.func.isRequired,
	oopsShow: PropTypes.bool.isRequired,
	oopsTopPx: PropTypes.number.isRequired,
	oopsLeftPx: PropTypes.number.isRequired,
	oopsTitle: PropTypes.string.isRequired,
	oopsMessage: PropTypes.string.isRequired,
};
export default OopsFrame;
