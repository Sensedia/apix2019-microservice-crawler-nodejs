const channel = require('./channel');
const { RABBIT_SPECIFICATION_QUEUE, RABBIT_RECOMMENDATION_QUEUE } = require('../config/config');

const encode = obj => Buffer.from(JSON.stringify(obj));

function producer(channel, queue, obj) {

    channel.assertQueue(queue, { durable: false });

    channel.sendToQueue(queue, encode(obj));

    console.log(" [x] Sent %s", obj);

}

function senderKit(obj) {
    console.log(`Sending kit`);
    channel(producer, RABBIT_SPECIFICATION_QUEUE, obj);
}

function senderRecommendation(obj) {
    console.log(`Sending ${obj.length} recommendations`);
    channel(producer, RABBIT_RECOMMENDATION_QUEUE, obj);
}

module.exports = {
    senderKit,
    senderRecommendation
}