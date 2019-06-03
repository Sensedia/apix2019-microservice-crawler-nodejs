const channel = require('./channel');
const { RABBIT_PRE_SPECIFICATION_QUEUE, RABBIT_SUGGESTION_QUEUE } = require('../config/config');

const encode = obj => Buffer.from(JSON.stringify(obj));

function producer(channel, queue, obj) {

    channel.assertQueue(queue, { durable: false });

    channel.sendToQueue(queue, encode(obj));

}

function senderKit(obj) {
    console.log(`Sending kit`);
    channel(producer, RABBIT_PRE_SPECIFICATION_QUEUE, obj);
}

function senderSuggestion(obj) {
    console.log(`Sending ${obj.length} suggestions`);
    channel(producer, RABBIT_SUGGESTION_QUEUE, obj);
}

module.exports = {
    senderKit,
    senderSuggestion
}