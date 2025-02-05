const express = require('express');
const router = express.Router();

const Room = require('./../models/Room.model');
const fileUploader = require('./../config/cloudinary')

router.get('/profile', (req, res) => {
	res.render('private/profile', { user: req.session.currentUser });
});

router
.route('/rooms/add')
.get((req, res) => {
	res.render('rooms/new-room');
})
.post(fileUploader.single('imageUrl'), (req, res) => {
	//Get the user id from the session
	const userId = req.session.currentUser._id;

	//Get the form data from the body
	const { name, description } = req.body;

	//Get the image url from uploading
	//const imageUrl = req.file?.path
	let imageUrl = undefined
	if(req.file) imageUrl = req.file.path 

	console.log(name, description, imageUrl);

	Room.create({
		name,
		description,
		imageUrl,
		owner: userId
	})
		.then((createdRoom) => {
			console.log(createdRoom);
			res.redirect('/rooms');
		})
		.catch((error) => {
			console.log(error);
		});
});

module.exports = router;
