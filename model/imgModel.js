const { getDb } = require('../mongodb/connection')

/*
    * Get image data by ID or all images if no ID is provided
*/
async function getData(img_id) {
    
    const db = await getDb();

    if (img_id !== undefined) {
        const imgData = await db.collection('pictures').find({ _id: img_id }).toArray();
        return imgData;
    } else {
        const imgData = await db.collection('pictures').find({}).toArray();
        return imgData;
    }
}

/*
    * Create new image
*/
async function postImage(newImage) {
    const db = await getDb();
    const result = await db.collection('pictures').insertOne(newImage);
    return { _id: result.insertedId };
}

/*
    * Update image data by ID 
*/
async function updateImg(img_id, updatedImg) {
    try {
        const db = await getDb();
        return db.collection('pictures').updateOne({_id: img_id}, { $set: updatedImg });
    } catch (error) {
        console.error('Error updating image in imgModel: ', error);
        throw new Error("Internal Server Error");
    }
}

/*
    * Delete image data by ID
*/
async function deleteImg(img_id) {
    try {
        const db = await getDb();
        return db.collection('pictures').deleteOne({_id: img_id});
    } catch (error) {
        console.error('Error deleting image in userModel: ', error);
        throw new Error("Internal Server Error");
    }
}

module.exports = { getData, postImage, updateImg, deleteImg };