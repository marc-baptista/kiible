// MenubarX
// Sample usage  <Menubarx items={ [['Home', '/'], ['Services', '/services'], ['About', '/about'], ['Contact us', '/contact']] } />


import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/Menubar.css";

class MenuBarx extends Component {
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

		//
		//   <div class="headMenu">
		// <a class="headMenuItem" href="/addContact.php"><?=$_LANGUE['title0addcontact'];?></a>
		// <a class="headMenuItem" href="/help.php"><?=$_LANGUE['title0help'];?></a>
		//  </div>

		// The map method will loop over the array of menu entries, and will return a new array with <li> elements.
		return (
			<div className="MenuBar">
				<ul>
					{ this.props.items.map((m, index) => {
						let style = "";
						if (self.state.focused === index) {
							style = "focused";
						}
						// Notice the use of the bind() method. It makes the index available to the clicked function:
						return <li key={m[0]} className={style} onClick={self.clicked.bind(self, index)}> <Link to={m[1]}>{m[0]}</Link></li>;
					})
					}
				</ul>
			</div>
		);
	}
}


export default MenuBarx;
