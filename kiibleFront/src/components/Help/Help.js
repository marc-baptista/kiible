import React, { Component } from "react";

import "../../styles/Help.css";

const params = require("../../../params.json");

class Help extends Component {
	render() {
		return (

			<div className="Help">


				<table summary="Help">
					<tbody>
						<tr>
							<td colSpan="2">
								<p className="textBody" >
									<b>txthelp</b>
								</p>
							</td>
						</tr>
					</tbody>
				</table>

			</div>
		);
	}
}

export default Help;
