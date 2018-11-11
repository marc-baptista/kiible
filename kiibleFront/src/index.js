//  core-js to support older browsers
import "core-js/es6/map";
import "core-js/es6/set";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

import App from "./components/App";

import "./styles/index.css";

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
	,
	document.getElementById("root"),
);
