const userModel = require('../model/userModel')
const imgModel = require('../model/imgModel')
const objectId = require('mongodb').ObjectId;


async function getContent(req, res) {
    res.send("To delete content insert /deleteImage/:id or /deleteUser/:id after the URL.");
}

/*
    * Delete user data by ID
*/
async function deleteUser(req, res) {
    try {
        const user_id = new objectId(req.params.id);

        const deletedData = await userModel.deleteUser(user_id);
        res.setHeader('Content-Type', 'application/json');
        res.json(deletedData);

    } catch (error) {
        console.error('Failed to delete user: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

/*
    * Delete image data by ID
*/
async function deleteImg(req, res) {
    try {
        const img_id = new objectId(req.params.id);

        const deletedData = await imgModel.updateContact(img_id);
        res.setHeader('Content-Type', 'application/json');
        res.json(deletedData);

    } catch (error) {
        console.error('Failed to delete image: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getContent, deleteUser, deleteImg };