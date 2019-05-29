const Joi = require('@hapi/joi');
const KitInvalido = require('../errors/kit-invalido')

const schema = Joi.object().keys({
    id: Joi.string().guid().required(),
    gender: Joi.string().length(1).required(),
    phone: Joi.string().required(),
    specifications: Joi.array()
        .ordered(
            Joi.object().keys({
                type: Joi.string().valid('PANT').required(),
                color: Joi.string().valid('BLACK', 'BLUE', 'WHITE').required()
            }),
            Joi.object().keys({
                type: Joi.string().valid('SHIRT').required(),
                color: Joi.string().valid('BLACK', 'BLUE', 'WHITE').required()
            }),
            Joi.object().keys({
                type: Joi.string().valid('SHOES').required(),
                color: Joi.string().valid('BLACK', 'BLUE', 'WHITE').required()
            }))
        .length(3)
        .required()
});

const validate = kit => {

    const { error, value } = Joi.validate(kit, schema, { abortEarly: false, stripUnknown: true });
    if (error) {
        throw new KitInvalido(kit, error);
    }

    return value;

};

module.exports = validate;