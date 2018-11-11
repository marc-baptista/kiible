// Menubar original code => replaced by MenubarX to handle names & urls
// Sample usage    <Menubar items={ ['Home', 'Services', 'About', 'Contact us'] } />

import React, { Component } from "react";

class MenuBar extends Component {
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
								// alert("Idex of ckicked item: "+index);
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
					<ul>{ this.props.items.map((m, index) => {
						let style = "";
						if (self.state.focused === index) {
							style = "focused";
						}
						// Notice the use of the bind() method. It makes the index available to the clicked function:
						return <a className={style} onClick={self.clicked.bind(self, index)}>{m}</a>;
					})
				}
				</ul>
				<p>Selected: {this.props.items[this.state.focused]}</p>
		</div>
		);
	}
}


export default MenuBar;
