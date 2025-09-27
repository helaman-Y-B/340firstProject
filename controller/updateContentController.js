const userModel = require('../model/userModel')
const imgModel = require('../model/imgModel')
const objectId = require('mongodb').ObjectId;


async function getContent(req, res) {
    res.send("To update content insert /updateImage/:id or /updateUser/:id after the URL.");
}

/*
    * Update user data by ID
*/
async function updateUser(req, res) {
    try {
        if (!req.session.user) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(401).json({ error: 'Unauthorized: Please log in to update user data.' });
        } else {
            const user_id = new objectId(req.params.id);
            const updatedUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                age: req.body.age,
                city: req.body.city
            };

            const updatedData = await userModel.updateUser(user_id, updatedUser);
            res.setHeader('Content-Type', 'application/json');
            res.json(updatedData);
        }

    } catch (error) {
        console.error('Failed to update user: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

/*
    * Update image data by ID
*/
async function updateImg(req, res) {
    try {
        if (!req.session.user) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(401).json({ error: 'Unauthorized: Please log in to update image data.' });
        } else {
            const img_id = new objectId(req.params.id);
            const updatedImg = {
                base64img: req.body.base64img,
                title: req.body.title,
                description: req.body.description,
                owner: req.body.owner,
                ownerContact: req.body.ownerContact,
                dateCreated: req.body.dateCreated,
                location: req.body.location
            };
            const updatedData = await imgModel.updateContact(img_id, updatedImg);
            res.setHeader('Content-Type', 'application/json');
            res.json(updatedData);
        }

    } catch (error) {
        console.error('Failed to update image: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getContent, updateUser, updateImg };