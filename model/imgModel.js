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

module.exports = { getData, postImage };