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
        if (this.#gender === 'F') {
            return 'feminino';
        }
        return 'masculino';
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