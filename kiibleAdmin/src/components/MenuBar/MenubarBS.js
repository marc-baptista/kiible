// MenubarBS
// Sample usage  <Menubarx items={ [['Home', '/'], ['Services', '/services'], ['About', '/about'], ['Contact us', '/contact']] } />


import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";

import kiiblelogo from "../../images/img-logo_400x200.png";

import "../../styles/MenubarBS.css";

class MenuBarBS extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focused: 0,
			notUsedToRemove: false,
		};
	}
	clicked(index) {
		// The click handler will update the state with the index of the focused menu entry
		this.setState({ focused: index });
		/*
								alert("Index of ckicked item: "+index
												+"\n Item's name: "+ this.props.items[index][0]
												+"\n Redirecting to :" + this.props.items[index][1]);
												*/
	}
	render() {
		// Here we will read the items property, which was passed as an attribute when the component was created
		const self = this;
		// The map method will loop over the array of menu entries, and will return a new array with <li> elements.
		return (
			<div className="MenuBar">
				<Navbar>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="/Home"><img src={kiiblelogo} className="App-full-logo" alt="Kiible full logo" /></a>
						</Navbar.Brand>
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
							{ this.props.items.map((m, index) => {
								let style = "";
								if (self.state.focused === index) {
									style = "focused";
								}
								// Notice the use of the bind() method. It makes the index available to the clicked function:
								return <NavItem key={m[2]} eventKey={m[0]} className={style} onClick={self.clicked.bind(self, index)} href={m[1]}>{m[0]}</NavItem>;
							})
							}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

MenuBarBS.propTypes = {
	items: PropTypes.array.isRequired,
};

export default MenuBarBS;
