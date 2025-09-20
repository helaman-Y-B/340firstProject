const { getDb } = require('../mongodb/connection')

async function getData(user_id) {
    
    const db = await getDb();

    if (user_id !== undefined) {
        const userData = await db.collection('users').find({ _id: user_id }).toArray();
        return userData;
    } else {
        const usersData = await db.collection('users').find({}).toArray();
        return usersData;
    }
}

async function postUser(newUser) {
    const db = await getDb();
    const result = await db.collection('users').insertOne(newUser);
    return { _id: result.insertedId };
}

async function updateUser(user_id, updatedUser) {
    try {
        const db = await getDb();
        return db.collection('users').updateOne({_id: user_id}, { $set: updatedUser });
    } catch (error) {
        console.error('Error updating user in userModel: ', error);
        throw new Error("Internal Server Error");
    }
}

module.exports = { getData, postUser, updateUser };