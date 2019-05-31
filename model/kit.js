const genderEnum = require('../enums/genderEnum');

module.exports = class Kit {

    #id;
    #phone;
    #gender;
    #specifications;

    constructor(id, phone, gender, specifications) {
        this.#id = id;
        this.#phone = phone;
        this.#gender = gender;
        this.#specifications = specifications;
    }

    getId() {
        return this.#id;
    }

    getPhone() {
        return this.#phone;
    }

    getGender() {
        return this.#gender;
    }

    getGenderDesc() {
        return genderEnum[this.#gender];
    }

    getSpecifications() {
        return this.#specifications;
    }

    getImmutableObject() {
        return {
            id: this.#id,
            gender: this.#gender,
            phone: this.#phone,
            specifications: this.#specifications.map(spec => ({ type: spec.getType(), color: spec.getColor() }))
        }
    }

}