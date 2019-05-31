const colorEnum = require('../enums/colorEnum');
const typesEnum = require('../enums/typeEnum');

module.exports = class Specification {

    #type;
    #color;

    constructor(type, color) {
        this.#type = type;
        this.#color = color;
    }

    getType() {
        return this.#type;
    }

    getTypeDesc() {
        return typesEnum[this.#type];
    }

    getColor() {
        return this.#color;
    }

    getColorDesc() {
        return colorEnum[this.#color];
    }

}