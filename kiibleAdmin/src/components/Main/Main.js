import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../Home/Home";
import Tests from "../Tests/Tests";
import Help from "../Help/Help";
import UserStats from "../UserStats/UserStats";

import "../../styles/Main.css";

class Main extends Component {
	render() {
		return (
			<div className='mainBackgroundDiv'>
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route exact path='/Home' component={Home}/>
					<Route path='/tests' component={Tests}/>
					<Route path='/userStats' component={UserStats}/>
					<Route path='/help' component={Help}/>
				</Switch>
			</div>
		);
	}
}

export default Main;
