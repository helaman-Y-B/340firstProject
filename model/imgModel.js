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

module.exports = { getData };