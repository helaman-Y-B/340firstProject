const objectId = require('mongodb').ObjectId;
const getImgModel = require('../model/imgModel');

const getDatafunctions = {}

getDatafunctions.getImage = async (req, res) => {

    const img_id = new objectId(req.params.id);

    try {
        const data = await getImgModel.getData(img_id);

        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    } catch (error) {
        console.error('Error when trying to fetch data in imgModel file: ', error)
        throw new Error('Internal server error: Could not fetch data from DB.')
    }

};

getDatafunctions.getImages = async (req, res) => {

    try {
        const data = await getImgModel.getData();

        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    } catch (error) {
        console.error('Error when trying to fetch data in imgModel file: ', error)
        throw new Error('Internal server error: Could not fetch data from DB.')
    }

};

module.exports = getDatafunctions;