const resolve = (uri, gender, specification) => uri.replace('[TYPE]', specification.getTypeDesc())
                                                   .replace('[COLOR]', specification.getColorDesc())
                                                   .replace('[GENDER]', gender);

module.exports = resolve;