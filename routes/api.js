var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController.js');
var authController = require('../controllers/authController.js');
var authMiddleware = require('../middleware/authMiddleware.js');

var translatorTextController = require('../controllers/translatorTextController');
var visionController = require('../controllers/computerVisionController');

router.get('/', function (req, res) {
	res.status(200).send({ message : "API server online" });
});

router.route('/users')
	.get(authMiddleware.isAuthenticated, userController.getList)
	
router.route('/users/:id')
	.get(authMiddleware.isAuthenticated, userController.getById)
	.put(authMiddleware.isAuthenticated, userController.update)
	.delete(authMiddleware.isAuthenticated, userController.delete);

router.route('/login')
	.post(authController.login)

router.route('/register')
	.post(authController.register)

router.route('/forgot')
	.post(authController.forgot)
// /api/reset?token=
router.route('/reset')
	.get(authController.resetTokenValidation)
	.post(authController.reset)

router.route('/changePassword')
	.post(authMiddleware.isAuthenticated, authController.changePassword)

router.route('/translate/:text')
	.get(translatorTextController.translate)

router.route('/languages')
	.get(translatorTextController.languages)

router.route('/vision')
	.post(visionController.vision)

module.exports = router;
