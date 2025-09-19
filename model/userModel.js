const { getDb } = require('../mongodb/connection')

async function getData(user_id) {
    
    const db = await getDb();

    if (user_id !== undefined) {
        const userData = await db.collection('users').find({ _id: user_id }).toArray();
        console.log(`user_img !== undefined executed: ${user_id}`);
        return userData;
    } else {
        const usersData = await db.collection('users').find({}).toArray();
        console.log(`Else statement executed: ${user_id}`);
        return usersData;
    }
}

module.exports = { getData };