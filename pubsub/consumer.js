const channel = require('./channel');
const processor = require('../service/kit-processor');
const { RABBIT_KIT_QUEUE } = require('../config/config');

function consumer(channel, queue) {

    channel.assertQueue(queue, { durable: false });

    console.log(`Waiting for messages in '${queue}'`);

    channel.consume(queue, message => {

        console.log(`Received ${message.content.toString()}`);
        processor(message);

    }, { noAck: true });

}

function connect() {
    channel(consumer, RABBIT_KIT_QUEUE);
}

module.exports = connect;