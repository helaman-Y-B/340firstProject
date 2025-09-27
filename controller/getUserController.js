const objectId = require('mongodb').ObjectId;
const getUserModel = require('../model/userModel');

const getDatafunctions = {}

/*
    * Get user data by ID
*/
getDatafunctions.getUser = async (req, res) => {

    const user_id = new objectId(req.params.id);

    try {
        if (!req.session.user) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(401).json({ error: 'Unauthorized: Please log in to view user data.' });
        } else {
            const data = await getUserModel.getData(user_id);

            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }
    } catch (error) {
        console.error('Error when trying to fetch data in imgModel file: ', error)
        throw new Error('Internal server error: Could not fetch data from DB.')
    }

};

/*
    * Get all users from database
*/
getDatafunctions.getUsers = async (req, res) => {

    try {
        if (!req.session.user) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(401).json({ error: 'Unauthorized: Please log in to view user data.' });
        } else {
            const data = await getUserModel.getData();

            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }
    } catch (error) {
        console.error('Error when trying to fetch data in imgModel file: ', error)
        throw new Error('Internal server error: Could not fetch data from DB.')
    }

};

/*
    * Create new user
*/
getDatafunctions.createUser = async (req, res) => {
    try {
        if (!req.session.user) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(401).json({ error: 'Unauthorized: Please log in to create a new user.' });
        } else {
            const newUser = await getUserModel.postUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            age: req.body.age,
            city: req.body.city
            });
            res.status(201).json(newUser);
        }
    } catch (error) {
        console.error('Failed to create new user: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = getDatafunctions;