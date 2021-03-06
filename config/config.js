const dotenv = require('dotenv');
const { parsed: envs } = dotenv.config();

module.exports = {
    RABBIT_SERVER: process.env.RABBIT_SERVER || envs.RABBIT_SERVER,
    RABBIT_KIT_QUEUE: process.env.RABBIT_KIT_QUEUE || envs.RABBIT_KIT_QUEUE,
    RABBIT_PRE_SPECIFICATION_QUEUE: process.env.RABBIT_PRE_SPECIFICATION_QUEUE || envs.RABBIT_PRE_SPECIFICATION_QUEUE,
    RABBIT_SUGGESTION_QUEUE: process.env.RABBIT_SUGGESTION_QUEUE || envs.RABBIT_SUGGESTION_QUEUE
};