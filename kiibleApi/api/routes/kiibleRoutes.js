

module.exports = function (app) {
	// var todoList = require('../controllers/kiibleController');
	const index = require("../controllers/kiibleIndexController");
	const database = require("../controllers/kiibleMessageController");
	// var contact = require('../controllers/kiibleContactController');

	/*
   todoList Routes
   app.route('/tasks')
	.get(todoList.list_all_tasks)
	.post(todoList.create_a_task);


  app.route('/tasks/:taskId')
	.get(todoList.read_a_task)
	.put(todoList.update_a_task)
	.delete(todoList.delete_a_task);
*/


	// params validation

	// app.param('user', function(req, res, next, id) {

	//   // try to get the user details from the User model and attach it to the request object
	//   User.find(id, function(err, user) {
	//     if (err) {
	//       next(err);
	//     } else if (user) {
	//       req.user = user;
	//       next();
	//     } else {
	//       next(new Error('failed to load user'));
	//     }
	//   });
	// });


	// index routes

	app.route("/index")
		.get(index.list_index);

	// createIndex & deleteIndex
	app.route("/index/info/:indexName")
		.get(index.read_index);
	app.route("/index/info:indexName")
		.get(index.read_index);
	app.route("/index/info")
		.get(index.read_index);
	app.route("/index/create")
		.post(index.create_index);
	app.route("/index/create:indexName")
		.post(index.create_index);
	app.route("/index/delete")
		.post(index.delete_index);

	app.route("/index/info/:indexName/owners")
		.get(index.list_owners);

	app.route("/index/:indexName/add/contact")
		.post(index.create_contact);
	app.route("/index/:indexName/send/contactFile")
		.post(index.sendContactFile);
	app.route("/index/:indexName/add/message")
		.post(database.create_message);

//  app.route('/index/info:indexName')
//    .put(index.create_index)
//    .delete(index.delete_index);

//  loadDataset

/* getContacts & saveContact
  app.route('/contacts:ownerId')
	.get(contact.list_contacts)
	.post(contact.create_contact);
*/
/* // sendContactList
  app.route('/tasks')
	.get(contact.list_all_tasks)
	.post(contact.create_a_task);
*/
};

