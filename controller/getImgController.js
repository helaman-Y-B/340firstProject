const objectId = require('mongodb').ObjectId;
const getImgModel = require('../model/imgModel');

const getDatafunctions = {}

/*
    * Get image data by ID
*/
getDatafunctions.getImage = async (req, res) => {

    const img_id = new objectId(req.params.id);

    try {
        if (!req.session.user) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(401).json({ error: 'Unauthorized: Please log in to view image data.' });
        } else {
            const data = await getImgModel.getData(img_id);

            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }
    } catch (error) {
        console.error('Error when trying to fetch data in imgModel file: ', error)
        throw new Error('Internal server error: Could not fetch data from DB.')
    }

};

/*
    * Get all images from database
*/
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

/*
    * Create new image
*/
getDatafunctions.postImage = async (req, res) => {
    try {
      const newImage = await getImgModel.postImage({
            base64img: req.body.base64img,
            title: req.body.title,
            description: req.body.description,
            owner: req.body.owner,
            ownerContact: req.body.ownerContact,
            dateCreated: req.body.dateCreated,
            location: req.body.location
        });
        res.status(201).json(newImage);
    } catch (error) {
        console.error('Failed to post new image: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = getDatafunctions;