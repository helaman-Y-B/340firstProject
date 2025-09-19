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

getDatafunctions.createUser = async (req, res) => {
    try {
      const newUser = await getUserModel.post({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            age: req.body.age,
            city: req.body.city
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Failed to create new user: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = getDatafunctions;