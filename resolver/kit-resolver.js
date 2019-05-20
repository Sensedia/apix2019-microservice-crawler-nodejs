const Kit = require('../model/kit');
const Specification = require('../model/specification');
const validate = require('../validator/kit-schema-validator');

function resolver(object) {

    const validated = validate(object);

    return new Kit(validated.id,
                   validated.phone,
                   validated.gender,
                   resolveSpecifications(validated.specifications));

}

function resolveSpecifications(specifications) {
    return specifications.map(spec => new Specification(spec.type, spec.color));
}

module.exports = resolver;