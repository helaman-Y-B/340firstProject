const objectId = require('mongodb').ObjectId;
const getUserModel = require('../model/userModel');

const getDatafunctions = {}

getDatafunctions.getUser = async (req, res) => {

    const user_id = new objectId(req.params.id);

    try {
        const data = await getUserModel.getData(user_id);

        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    } catch (error) {
        console.error('Error when trying to fetch data in imgModel file: ', error)
        throw new Error('Internal server error: Could not fetch data from DB.')
    }

};

getDatafunctions.getUsers = async (req, res) => {

    try {
        const data = await getUserModel.getData();

        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    } catch (error) {
        console.error('Error when trying to fetch data in imgModel file: ', error)
        throw new Error('Internal server error: Could not fetch data from DB.')
    }

};

module.exports = getDatafunctions;