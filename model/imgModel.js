const { getDb } = require('../mongodb/connection')

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

async function postImage(newImage) {
    const db = await getDb();
    const result = await db.collection('pictures').insertOne(newImage);
    return { _id: result.insertedId };
}

async function updateImg(img_id, updatedImg) {
    try {
        const db = await getDb();
        return db.collection('pictures').updateOne({_id: img_id}, { $set: updatedImg });
    } catch (error) {
        console.error('Error updating image in imgModel: ', error);
        throw new Error("Internal Server Error");
    }
}

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