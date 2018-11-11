"use moz";

const params = require("../../params.json");

/*
		app.route('/index')
				.get(index.list_index);

// createIndex & deleteIndex
		app.route('/index/info')
				.get(index.read_index)
				.put(index.create_index)
				.delete(index.delete_index);

				*/

const KiibleIndex = require("../models/kiibleIndexModel");
const XLSX = require("xlsx");

const nodemailer = require("nodemailer");

const EmailTemplate = require("email-templates").EmailTemplate;


const defaultBccDest = process.env.DEFAULTBCCDEST || params.defaultBccDest;
const defaultMailSender = process.env.DEFAULTMAILSENDER || params.defaultMailSender;
const smtpHost = process.env.SMTPHOST || params.smtpHost;
const smtpPort = process.env.SMTPPORT || params.smtpPort;
const smtpUser = process.env.SMTPUSER || params.smtpUser;
const smtpPassword = process.env.SMTPPASSWORD || params.smtpPassword;
const tempDirectory = process.env.TEMPDIRECTORY || params.tempDirectory;
const workSheetName = process.env.WORKSHEETNAME || params.workSheetName;
const webSite = process.env.WEBSITE || params.webSite;

const appLogoFileName = params.appLogoFileName;
const appLogoFile = params.appLogoFile;
const mailDefaultSubject = "kiible: votre liste de contacts en pièce jointe";

const pug = require("pug");
// Compile the source code
const compiledMail = pug.compileFile("api/ressources/contactsFileMail/html.pug");

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


function isValidIndexName(indexName) {
	const forbidenNames = ["create", "info", "delete"];
	let ret = true;

	const correctedValue = indexName.trim();

	if (indexName.localeCompare(correctedValue) !== 0) {
		ret = false;
	}

	const a = forbidenNames.indexOf(indexName);
	if (a > -1) {
		ret = false;
	}
	return true;
}
// //////////////////////////////////////
//         INDEX controllers          //
// //////////////////////////////////////

exports.list_index = function (request, response) {
	console.log("FUNCTION CALLED: list_index");

	const index = new KiibleIndex({
		name: "Toby",
	});

	index.listAll((err, indexInfo) => {
		if (err) {
			response.send(err);
		} else {
			response.json(indexInfo);
		}
	});
};

// get informations about one index
exports.read_index = function (request, response) {
	console.log("FUNCTION CALLED: read_index");

	const indexName = request.params.indexName;
	console.log(`read_index - indexName: ${indexName}`);

	const index = new KiibleIndex({
		name: `${indexName} read_index`,
	});

	index.indexInfo(indexName, (err, indexInfo) => {
		if (err) {
			response.send(err);
		} else {
			response.json(indexInfo);
		}
	});
};

exports.create_index = function (request, response) {
	console.log("FUNCTION CALLED: create_index");

	console.log(`Request.readable: ${request.readable}`);
	console.log(`Request.domain: ${request.domain}`);
	// console.log('Request._events: ' + request._events);
	// console.log('Request._eventsCount: ' + request._eventsCount);
	// console.log('Request._maxListeners: ' + request._maxListeners);
	console.log(`Request.socket: ${request.socket}`);
	console.log(`Request.connection: ${request.connection}`);
	console.log(`Request.httpVersionMajor: ${request.httpVersionMajor}`);
	console.log(`Request.httpVersionMinor: ${request.httpVersionMinor}`);
	console.log(`Request.httpVersion: ${request.httpVersion}`);
	console.log(`Request.complete.: ${request.complete}`);
	console.log(`Request.headers: ${request.headers}`);
	console.log(`Request.headers: ${JSON.stringify(request.headers)}`);
	//  console.log('Request.rawHeaders: ' + request.rawHeaders);
	console.log(`Request.trailers: ${request.trailers}`);
	// console.log('Request.rawTrailers: ' + request.rawTrailers);
	//  console.log('Request.upgrade: ' + request.upgrade);
	console.log(`Request.url: ${request.url}`);
	console.log(`Request.method: ${request.method}`);
	// console.log('Request.statusCode: ' + request.statusCode);
	// console.log('Request.statusMessage: ' + request.statusMessage);
	console.log(`Request.client: ${request.client}`);
	//  console.log('Request._consuming: ' + request._consuming);
	//  console.log('Request._dumped: ' + request._dumped);
	//  console.log('Request.next: ' + request.next);
	console.log(`Request.baseUrl: ${request.baseUrl}`);
	console.log(`Request.originalUrl: ${request.originalUrl}`);
	console.log(`Request._parsedUrl: ${JSON.stringify(request._parsedUrl)}`);
	console.log(`Request.params: ${request.params}`);
	console.log(`ParamspropertiyNames: ${Object.getOwnPropertyNames(request.params)}`);
	console.log(`Params: ${JSON.stringify(request.params)}`);
	console.log(`Request.query: ${request.query}`);
	console.log(`Request.res: ${request.res}`);
	console.log(`Request.originalMethod: ${request.originalMethod}`);
	//  console.log('Request.secret: ' + request.secret);
	//  console.log('Request.cookies: ' + JSON.stringify(request.cookies));
	//  console.log('Request.signedCookies: ' + JSON.stringify(request.signedCookies));
	console.log(`Request.body: ${JSON.stringify(request.body)}`);

	const indexName = request.body.indexName;

	console.log(`create_index - indexName: ${indexName}`);

	const index = new KiibleIndex({
		name: `${indexName} create_index`,
	});

	index.createIndex(indexName, (err, indexInfo) => {
		if (err) {
			response.send(err);
		} else {
			response.json(indexInfo);
		}
	});
};

exports.delete_index = function (request, response) {
	console.log("FUNCTION CALLED: delete_index");

	const indexName = request.body.indexName;

	console.log(`create_index - indexName: ${indexName}`);

	const index = new KiibleIndex({
		name: `${indexName} delete_index`,
	});

	index.deleteIndex(indexName, (err, indexInfo) => {
		if (err) {
			response.send(err);
		} else {
			response.json(indexInfo);
		}
	});
};


// ////////////////////////////////////////
//         CONTACT controllers          //
// ////////////////////////////////////////

exports.list_owners = function (request, response) {
	console.log("FUNCTION CALLED: list_owners");

	const indexName = request.params.indexName;
	console.log(`list_owners - indexName: ${indexName}`);

	const index = new KiibleIndex({
		name: "list_owners",
	});

	index.listOwners(indexName, (err, indexInfo) => {
		if (err) {
			response.send(err);
		} else {
			response.json(indexInfo);
		}
	});
};

exports.list_contacts = function (request, response) {
	console.log("FUNCTION CALLED: list_contacts");

	const indexName = request.params.indexName;
	console.log(`list_contacts - indexName: ${indexName}`);
	const ownerID = request.params.ownerID;
	console.log(`list_contacts - ownerID: ${ownerID}`);

	const index = new KiibleIndex({
		name: "list_contacts",
	});

	index.listContacts(indexName, ownerID, (err, indexInfo) => {
		if (err) {
			response.send(err);
		} else {
			response.json(indexInfo);
		}
	});
};

// get informations about one index
exports.read_contact = function (request, response) {
	console.log("FUNCTION CALLED: read_contact");

	const indexName = request.params.indexName;
	console.log(`read_contact - indexName: ${indexName}`);
	const ownerID = request.params.ownerID;
	console.log(`read_contact - ownerID: ${ownerID}`);
	const contactID = request.params.contactID;
	console.log(`read_contact - contactID: ${contactID}`);

	const index = new KiibleIndex({
		name: `${indexName} read_contact`,
	});

	index.readContact(indexName, ownerID, contactID, (err, indexInfo) => {
		if (err) {
			response.send(err);
		} else {
			response.json(indexInfo);
		}
	});
};

exports.create_contact = function (request, response) {
	console.log("FUNCTION CALLED: create_contact");

	console.log(`create_contact - Params: ${JSON.stringify(request.params)}`);
	// console.log('create_contact - Request.query: ' + request.query);
	console.log(`create_contact - Request.body: ${JSON.stringify(request.body)}`);

	const indexName = request.params.indexName;
	const contactOwnerId = request.body.contactOwnerId;

	const userID = contactOwnerId;
	const ip_addr = request.body.ip_addr;
	const firstName = request.body.firstName;
	const name = request.body.name;
	const email = request.body.email;
	const comment = request.body.comment;
	const fixePhone = request.body.fixePhone;
	const mobilePhone = request.body.mobilePhone;
	const twitter = request.body.twitter;
	const facebook = request.body.facebook;
	const skype = request.body.skype;
	const google = request.body.google;
	const viadeo = request.body.viadeo;
	const instagram = request.body.instagram;
	const snapchat = request.body.snapchat;
	const linkedIn = request.body.linkedIn;
	const address_address = request.body.address_address;
	const address_street = request.body.address_street;
	const address_street_2 = request.body.address_street_2;
	const address_street_3 = request.body.address_street_3;
	const address_po_box = request.body.address_po_box;
	const address_city = request.body.address_city;
	const address_state = request.body.address_state;
	const address_postal_code = request.body.address_postal_code;
	const address_country = request.body.address_country;

	console.log(`create_contact - indexName: ${indexName}, email: ${email}, contactOwnerId: ${contactOwnerId}`);

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

	index.createContact(indexName, contactOwnerId, contactData, (status, indexInfo) => {
		if (status) {
			console.log(`status (if): ${status}`);
			console.log(`createContact returned: ${indexInfo}`);
			response.json(indexInfo);
		} else {
			console.log(`status (else): ${status}`);

			response.sendStatus(400);
		}
	});
};


function mailFile(toDest, ccDest, bccDest, mailSubject, htmlMessage, fileName, fileBuffer) {
	console.log("mailFile - called");
	console.log(`mailFile - toDest: ${toDest}`);
	console.log(`mailFile - ccDest: ${ccDest}`);
	console.log(`mailFile - bccDest: ${bccDest}`);
	console.log(`mailFile - mailSubject: ${mailSubject}`);
	console.log(`mailFile - htmlMessage: ${htmlMessage}`);

	//    console.log('mailFile - filebuffer: ' + filebuffer);

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
			{
				filename: fileName,
				content: fileBuffer,
				cid: `${fileName}-CDI`, // should be as unique as possible
			},
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

function cleanAndFormatOutputData(jsonInput) {
	const jsonOutput = [];
	for (const exKey in jsonInput) {
		// console.log("key:"+exKey+", value:"+jsonInput[exKey]);
		// console.log("key:"+exKey+", value._source:"+jsonInput[exKey]._source);
		// remove userID
		// jsonOutput[exKey]=jsonInput[exKey]._source;
		jsonOutput[exKey] = [];
		for (const sourceKey in jsonInput[exKey]._source) {
			if (sourceKey != "userID") {
				jsonOutput[exKey][sourceKey] = jsonInput[exKey]._source[sourceKey];
			}
		}
	}
	return jsonOutput;
}

exports.sendContactFile = function (request, response) {
	console.log("FUNCTION CALLED: sendContactFile");

	// console.log('sendContactFile - Params: ' + JSON.stringify(request.params));
	// console.log('sendContactFile - Request.query: ' + request.query);
	// console.log('sendContactFile - Request.body: ' + JSON.stringify(request.body));

	const indexName = request.params.indexName;
	const contactOwnerId = request.body.contactOwnerId;


	const ownerID = contactOwnerId;
	const email = request.body.email;
	const moreEmail = request.body.moreEmail;
	const comment = request.body.comment;
	const fileFormat = request.body.fileFormat;

	/* console.log('sendContactFile - indexName: '+ indexName +
				', email: ' + email + ', moreEmail: ' + moreEmail + ', comment: ' + comment + ', fileFormat: ' + fileFormat + ', contactOwnerId: '+contactOwnerId );
		*/
	// build message in both text and html

	const mailSubject = mailDefaultSubject;
	// set default
	// var textMessage = mailDefaultTextmessage;
	// var htmlMessage = mailDefaultHtmlmessage;
	// if (comment != '') {
	//   var personalNotes = comment;
	//   textMessage = mailDefaultTextmessageNoteHeader + personalNotes + mailDefaultTextmessageNoteFooter;
	//   htmlMessage = mailDefaultHtmlmessageNoteHeader + personalNotes + mailDefaultHtmlmessageNoteFooter;
	// }

	const htmlMessage = compiledMail({
		logoCDI: `${appLogoFileName}-CDI`,
		withComment: true,
		notes: comment,
		webSite,
	});
	// Render a set of data
	// console.log('PUG HTML CONTENT: ' + compiledMail({
	//  notes: comment
	// }));

	const index = new KiibleIndex({
		name: `${indexName} sendContactFile`,
	});

	index.listContacts(indexName, ownerID, (error, indexInfo) => {
		if (error) {
			console.log(`sendContactFile - listContacts error (if): ${error}`);
			console.log(`sendContactFile - listContacts returned: ${indexInfo}`);
			response.sendStatus(400);
		} else {
			console.log(`sendContactFile - listContacts returned: ${JSON.stringify(indexInfo)}`);
			var buf;
			if (indexInfo.hits.total >= 0) {
				var hitsData = cleanAndFormatOutputData(indexInfo.hits.hits);
				/* generate workbook */
				// var ws = XLSX.utils.aoa_to_sheet(data);
				// var ws = XLSX.utils.json_to_sheet(indexInfo.hits.hits);
				var ws = XLSX.utils.json_to_sheet(hitsData);
				var wb = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(wb, ws, workSheetName);

				/* generate buffer */
				buf = XLSX.write(wb, {
					type: "buffer",
					bookType: fileFormat,
					// bookType: "xlsx"
				});

				const filename = `contact_${ownerID}.${fileFormat}`;
				const write_opts = {
					type: fileFormat, //    Output data encoding (see Output Type below)
					cellDates: false, // Store dates as type d (default is n)
					bookSST: false, // Generate Shared String Table **
					bookType: fileFormat, //  Type of Workbook (see below for supported formats)
					sheet: "", // Name of Worksheet for single-sheet formats **
					compression: false, // Use ZIP compression for ZIP-based formats **
					Props: "", //  Override workbook properties when writing **
					themeXLSX: "", //  Override theme XML when writing XLSX/XLSB/XLSM **
				};

				/*
								bookType  file ext  container sheets  Description
								xlsx  .xlsx ZIP multi Excel 2007+ XML Format
								xlsm  .xlsm ZIP multi Excel 2007+ Macro XML Format
								xlsb  .xlsb ZIP multi Excel 2007+ Binary Format
								biff8 .xls  CFB multi Excel 97-2004 Workbook Format
								biff5 .xls  CFB multi Excel 5.0/95 Workbook Format
								biff2 .xls  none  single  Excel 2.0 Worksheet Format
								xlml  .xls  none  multi Excel 2003-2004 (SpreadsheetML)
								ods .ods  ZIP multi OpenDocument Spreadsheet
								fods  .fods none  multi Flat OpenDocument Spreadsheet
								csv .csv  none  single  Comma Separated Values
								txt .txt  none  single  UTF-16 Unicode Text (TXT)
								sylk  .sylk none  single  Symbolic Link (SYLK)
								html  .html none  single  HTML Document
								dif .dif  none  single  Data Interchange Format (DIF)
								dbf .dbf  none  single  dBASE II + VFP Extensions (DBF)
								rtf .rtf  none  single  Rich Text Format (RTF)
								prn .prn  none  single  Lotus Formatted Text

								*/
				/* generate a file: attempts to write wb to filename */
				XLSX.writeFile(wb, `${tempDirectory}/${filename}`, write_opts);


				// mailFile(email, buf);
				mailFile(email, moreEmail, defaultBccDest, mailSubject, htmlMessage, filename, buf);
			}
			/* send to client */
			response.status(200);

			// response.json(indexInfo);
		}
	});
};
