const phin = require('phin')

async function search(url, callback, gender, specification) {
    const response = await phin(url.getCompleteUrl());
    return callback(response.body, url, gender, Date.now(), specification);
}

module.exports = search;