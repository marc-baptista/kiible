
var express = require("express"),
  app = express();
const params = require("./params.json");

//  port = process.env.PORT || 8182;
var port = process.env.PORT || process.env.npm_package_config_port;
/*
	var defaultBccDest =  process.env.DEFAULTBCCDEST || params.defaultBccDest,
	defaultMailSender = process.env.DEFAULTMAILSENDER || params.defaultMailSender,
	smtpHost = process.env.SMTPHOST || params.smtpHost,
	smtpUser = process.env.SMTPUSER || params.smtpUser,
	smtpPassword = process.env.SMTPPASSWORD || process.env.npm_package_config_smtpPassword
	;
*/

// mongoDB Stuff
var mongoose = require("mongoose");
var Message = require("./api/models/kiibleMessageModel"); //created model loading here

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/KiibleBd"); 


// Middleware: Allows cross-domain requests (CORS)
var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    next();
};

bodyParser = require("body-parser");

cookieParser = require("cookie-parser");
methodOverride = require("method-override");


app.use(methodOverride("_method"));
app.use(cookieParser());
// support parsing of application/json type post data
app.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(__dirname + '/public'));


app.use(allowCrossDomain);

var routes = require("./api/routes/kiibleRoutes");


routes(app);

app.use(function(request, res) {

	console.log("request properties: " + Object.getOwnPropertyNames(request));
	console.log("Page not found - request: " + request.originalUrl);

	// console.log('Request._readableState: ' + request._readableState);
	console.log("Request.readable: " + request.readable);
	console.log("Request.domain: " + request.domain);
	// console.log('Request._events: ' + request._events);
	// console.log('Request._eventsCount: ' + request._eventsCount);
	// console.log('Request._maxListeners: ' + request._maxListeners);
	console.log("Request.socket: " + request.socket);
	console.log("Request.connection: " + request.connection);
	console.log("Request.httpVersionMajor: " + request.httpVersionMajor);
	console.log("Request.httpVersionMinor: " + request.httpVersionMinor);
	console.log("Request.httpVersion: " + request.httpVersion);
	console.log("Request.complete.: " + request.complete);
	console.log("Request.headers: " + JSON.stringify(request.headers));
	console.log("Request.rawHeaders: " + request.rawHeaders);
	console.log("Request.trailers: " + request.trailers);
	console.log("Request.rawTrailers: " + request.rawTrailers);
//	console.log('Request.upgrade: ' + request.upgrade);
	console.log("Request.url: " + request.url);
	console.log("Request.method: " + request.method);
	console.log("Request.statusCode: " + request.statusCode);
	console.log("Request.statusMessage: " + request.statusMessage);
	console.log("Request.client: " + request.client);
//	console.log('Request._consuming: ' + request._consuming);
//	console.log('Request._dumped: ' + request._dumped);
//	console.log('Request.next: ' + request.next);
	console.log("Request.baseUrl: " + request.baseUrl);
	console.log("Request.originalUrl: " + request.originalUrl);
	console.log("Request._parsedUrl: " + JSON.stringify(request._parsedUrl));
	console.log("Request.params: " + request.params);
	console.log("Request.query: " + request.query);
	console.log("Request.res: " + request.res);
	console.log("Request.originalMethod: " + request.originalMethod);
//	console.log('Request.secret: ' + request.secret);
//	console.log('Request.cookies: ' + JSON.stringify(request.cookies));
//	console.log('Request.signedCookies: ' + JSON.stringify(request.signedCookies));
	console.log("Request.body: " + JSON.stringify(request.body));



  res.status(404).send({url: request.originalUrl + " not found"});
});

app.listen(port);

console.log("kiible RESTful API server started on: " + port);
