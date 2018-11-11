import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../Home/Home";
import Tests from "../Tests/Tests";
import Help from "../Help/Help";
import Contact from "../Contact/Contact";
import About from "../About/About";
import Team from "../Team/Team";
import GetMyContacts from "../GetMyContacts/GetMyContacts";


import "../../styles/Main.css";

class Main extends Component {
	render() {
		return (
			<div className='mainBackgroundDiv'>
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route path='/tests' component={Tests}/>
					<Route path='/help' component={Help}/>
					<Route path='/contact' component={Contact}/>
					<Route path='/about' component={About}/>
					<Route path='/team' component={Team}/>
					<Route path='/getMyContacts' component={GetMyContacts}/>
				</Switch>
			</div>
		);
	}
}

export default Main;
