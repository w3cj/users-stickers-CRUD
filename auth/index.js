const express = require('express');
const router = express.Router();

const User = require('../db/user');

router.get('/', (req, res) => {
	res.json({
		message: '🖖'
	});
});

function validUser(user) {
	return typeof user.email == 'string' &&
					user.email.trim() != '' &&
					typeof user.password == 'string' &&
					user.password.trim() != '' &&
					user.password.trim().length >= 5; // when hashing trim also!
}

router.post('/signup', (req, res, next) => {
	console.log(req.body);
	if(validUser(req.body)) {
		// check if email is unique
		User
			.getOneByEmail(req.body.email)
			.then(user => {
				console.log(user);
				// if it is unique insert the user
				// set a cookie
				// respond
				res.json({
					message: 'Signup working!'
				}); 
			});
	} else {
		next(new Error('Invalid User'));
	}
});

module.exports = router;
