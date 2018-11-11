"use moz";

const params = require("../../params.json");

const mongoose = require("mongoose");

const Message = mongoose.model("KiibleMessage");

// const KiibleIndex = require("../models/kiibleIndexModel");

const nodemailer = require("nodemailer");

const EmailTemplate = require("email-templates").EmailTemplate;
const defaultBccDest = process.env.DEFAULTBCCDEST || params.defaultBccDest;
const defaultMailSender = process.env.DEFAULTMAILSENDER || params.defaultMailSender;
const smtpHost = process.env.SMTPHOST || params.smtpHost;
const smtpPort = process.env.SMTPPORT || params.smtpPort;
const smtpUser = process.env.SMTPUSER || params.smtpUser;
const smtpPassword = process.env.SMTPPASSWORD || params.smtpPassword;
const tempDirectory = process.env.TEMPDIRECTORY || params.tempDirectory;
const webSite = process.env.WEBSITE || params.webSite;

const appLogoFileName = params.appLogoFileName;
const appLogoFile = params.appLogoFile;
const mailDefaultSubject = "kiible: votre liste de contacts en pièce jointe";

const pug = require("pug");
// Compile the source code
const compiledMail = pug.compileFile("api/ressources/contactMessageMail/html.pug");

const smtpConfig = {
	// pool: true,
	host: smtpHost,
	port: smtpPort,
	secure: true, // use TLS
	auth: {
		user: smtpUser,
		pass: smtpPassword,
	},
	tls: { rejectUnauthorized: false },
	logger: true,
	debug: false, // include SMTP traffic in the logs
};
const defaultMessageFields = {
	// default message fields
	// sender info
	// from: 'Pangalink <no-reply@pangalink.net>',
	from: defaultMailSender,
	headers: {
		"X-Laziness-level": 1000, // just an example header, no need to use this
	},
};

const transporter = nodemailer.createTransport(smtpConfig, defaultMessageFields);

function mailFile(toDest, ccDest, bccDest, mailSubject, htmlMessage) {
	console.log("mailFile - called");
	console.log(`mailFile - toDest: ${toDest}`);
	console.log(`mailFile - ccDest: ${ccDest}`);
	console.log(`mailFile - bccDest: ${bccDest}`);
	console.log(`mailFile - mailSubject: ${mailSubject}`);
	console.log(`mailFile - htmlMessage: ${htmlMessage}`);

	console.log(`smtpConfig: ${JSON.stringify(smtpConfig)}`);

	// Message object
	const message = {
		// Comma separated list of recipients
		// to: 'Andris Reinman <andris.reinman@gmail.com>',
		to: toDest,
		cc: ccDest,
		bcc: bccDest,
		// Subject of the message
		// subject: 'Nodemailer is unicode friendly ✔',
		subject: mailSubject,
		// plaintext body
		// text: 'Hello to myself!',
		// text: textMessage, //plain text body
		// HTML body
		// html:
		//   '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
		//   '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',
		textEncoding: "base64",
		html: htmlMessage, // html body
		/*
				alternatives: [
								{
												contentType: 'text/x-web-markdown',
												content: textMessage
								}
				],
				*/
		// An array of attachments
		attachments: [
			// String attachment
			// {
			//  filename: 'notes.txt',
			//  content: 'Some notes about this e-mail',
			//  contentType: 'text/plain' // optional, would be detected from the filename
			// },
			// Binary Buffer attachment
			// File Stream attachment
			{
				filename: appLogoFileName,
				path: `${__dirname}/../images/${appLogoFile}`,
				cid: `${appLogoFileName}-CDI`, // should be as unique as possible
			},
		],
	};

	transporter.sendMail(message, (error, info) => {
		if (error) {
			console.log("Error occurred");
			console.log(error.message);
			return process.exit(1);
		}

		console.log("Message sent successfully!");
		console.log(info);

		// only needed when using pooled connections
		transporter.close();
	});
}

exports.create_message = function (request, response) {
	console.log("FUNCTION CALLED: create_message");

	console.log(`create_message - Params: ${JSON.stringify(request.params)}`);
	// console.log('create_message - Request.query: ' + request.query);
	console.log(`create_message - Request.body: ${JSON.stringify(request.body)}`);


	const ip_addr = request.body.ip_addr;
	const firstName = request.body.firstName;
	const name = request.body.name;
	const email = request.body.email;
	const comment = request.body.comment;
	let messageParams = request.body;
	messageParams.destinationEmail = "kiible@free.fr";
	//     const new_message = new Message(request.body);
	const new_message = new Message(messageParams);
	new_message.save((err, message) => {
		if (err) {
			console.log(`if err: ${err}`);
			response.send(err);
		} else {
			console.log(`else ${JSON.stringify(message)}`);
			response.json(message);
		}
	});

	/*
	const index = new KiibleIndex({name: `${indexName} create_contact`});

	const contactData = [];
	contactData.userID = userID;
	contactData.ip_addr = ip_addr;
	contactData.firstName = firstName;
	contactData.name = name;
	contactData.email = email;
	contactData.comment = comment;
	contactData.fixePhone = fixePhone;
	contactData.mobilePhone = mobilePhone;
	contactData.twitter = twitter;
	contactData.facebook = facebook;
	contactData.skype = skype;
	contactData.google = google;
	contactData.viadeo = viadeo;
	contactData.instagram = instagram;
	contactData.snapchat = snapchat;
	contactData.linkedIn = linkedIn;
	contactData.address_address = address_address;
	contactData.address_street = address_street;
	contactData.address_street_2 = address_street_2;
	contactData.address_street_3 = address_street_3;
	contactData.address_po_box = address_po_box;
	contactData.address_city = address_city;
	contactData.address_state = address_state;
	contactData.address_postal_code = address_postal_code;
	contactData.address_country = address_country;

	index.createMessage(indexName, contactOwnerId, contactData, (status, indexInfo) => {
		if (status) {
			console.log(`status (if): ${status}`);
			console.log(`createMessage returned: ${indexInfo}`);
			response.json(indexInfo);
		} else {
			console.log(`status (else): ${status}`);
			response.sendStatus(400);
		}
	}); */
};

