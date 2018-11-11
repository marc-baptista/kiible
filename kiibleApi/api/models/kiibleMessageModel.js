const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const KiibleMessageSchema = new Schema({
	firstName: {
		type: String,
		required: "Sender's first name",
	},
	name: {
		type: String,
		required: "Sender's name",
	},
	ipAddr: {
		type: String,
		required: "Sender's IP address",
	},
	email: {
		type: String,
		required: "Sender's e-mail address",
	},
	destinationEmail: {
		type: String,
		required: "Destination's e-mail address",
	},
	message: {
		type: String,
		required: "Message's content",
	},
	creationDate: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: [{
			type: String,
			enum: ["new", "done", "archive"],
		}],
		default: ["new"],
	},
});

module.exports = mongoose.model("KiibleMessage", KiibleMessageSchema);
