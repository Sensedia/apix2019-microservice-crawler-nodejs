const dotenv = require('dotenv');
const { parsed: envs } = dotenv.config();

module.exports = {
    RABBIT_SERVER: process.env.RABBIT_SERVER || envs.RABBIT_SERVER,
    RABBIT_KIT_QUEUE: process.env.RABBIT_KIT_QUEUE || envs.RABBIT_KIT_QUEUE,
    RABBIT_SPECIFICATION_QUEUE: process.env.RABBIT_SPECIFICATION_QUEUE || envs.RABBIT_SPECIFICATION_QUEUE,
    RABBIT_RECOMMENDATION_QUEUE: process.env.RABBIT_RECOMMENDATION_QUEUE || envs.RABBIT_RECOMMENDATION_QUEUE
};