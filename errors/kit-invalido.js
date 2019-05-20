class KitInvalido extends Error {

    constructor(obj, err) {
        const message = {
            message: 'Kit invalido',
            kit: obj,
            details: err
        };

        super(JSON.stringify(message));
    }

}

module.exports = KitInvalido;