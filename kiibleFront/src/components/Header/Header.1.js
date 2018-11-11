import React, { Component } from "react";

import Menubarx from "./MenubarX";
import kiiblelogo from "../../images/img-logo_400x200.png";
import "../../styles/Header.css";


// formatMessage(messages.menuItems);

class Header extends Component {
	render() {
		return (
			<div>
				<div className="App-header">
						<img src={kiiblelogo} className="App-full-logo" alt="Kiible full logo" />
						<div className="App-Header-title">
							Kiible Front Office Application
						</div>
						<Menubarx items={ [["Home", "/"], ["Tests", "/tests"], ["Help", "/help"], ["About", "/about"], ["Contact us", "/contact"], ["Our Mission", "/ourMission"]] } />
					</div>
				</div>
		);
	}
}

export default Header;
