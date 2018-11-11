import "core-js/es6/map";
import "core-js/es6/set";

import React, { Component } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import "../../styles/App.css";

global.requestAnimationFrame = function (callback) {
	setTimeout(callback, 0);
};

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header/>
				<Main/>
				<Footer/>
			</div>
		);
	}
}

export default App;
