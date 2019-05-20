const { getCollection, initDB } = require('lokijs-promise');

initDB(`${__dirname}/db.json`);
const COLLECTION_NAME = 'recommendation';

const has = async (gender, type, color) => {

    const collection = await getCollection(COLLECTION_NAME);
    if (collection) {
        return collection.find({ gender: gender, type: type, color: color }).length > 0;
    }

    return false;
}


const save = async (gender, type, color) => {

    const collection = await getCollection(COLLECTION_NAME);
    if (collection) {
        collection.insert({ gender: gender, type: type, color: color });
    }

}

module.exports = {
    has,
    save
};