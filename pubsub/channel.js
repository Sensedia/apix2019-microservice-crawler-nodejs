const amqp = require('amqplib/callback_api');
const { RABBIT_SERVER } = require('../config/config');

function connect(callback, queue, obj) {

    amqp.connect(`amqp://${RABBIT_SERVER}`, (errorConnect, connection) => {

        if (errorConnect) {
            throw errorConnect;
        }

        connection.createChannel((errorCreateChannel, channel) => {

            if (errorCreateChannel) {
                throw errorCreateChannel;
            }

            callback(channel, queue, obj);

        });

    });

}

module.exports = connect;