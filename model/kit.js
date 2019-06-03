const genderEnum = require('../enums/genderEnum');

module.exports = class Kit {

    #id;
    #gender;
    #specifications;

    constructor(id, gender, specifications) {
        this.#id = id;
        this.#gender = gender;
        this.#specifications = specifications;
    }

    getId() {
        return this.#id;
    }

    getGender() {
        return this.#gender;
    }

    getGenderDesc() {
        return genderEnum[this.#gender];
    }

    getSpecifications() {
        return [... this.#specifications];
    }

    getImmutableObject() {
        return {
            id: this.#id,
            gender: this.#gender,
            specifications: this.#specifications.map(spec => ({ type: spec.getType(), color: spec.getColor() }))
        }
    }

}