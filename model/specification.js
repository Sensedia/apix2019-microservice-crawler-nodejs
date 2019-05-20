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
        if (this.#type === 'SHIRT') {
            return 'camisa';
        }
        if (this.#type === 'PANT') {
            return 'calça';
        }
        return 'tênis';
    }

    getColor() {
        return this.#color;
    }

    getColorDesc() {
        if (this.#color === 'BLACK') {
            return 'preta';
        }
        if (this.#color === 'BLUE') {
            return 'azul';
        }
        return 'branca';
    }

}