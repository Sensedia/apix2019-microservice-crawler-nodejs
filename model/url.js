module.exports = class URL {

    #host;
    #resource;

    constructor(host, resource) {
        this.#host = host;
        this.#resource = resource;
    }

    getHost() {
        return this.#host;
    }

    getCompleteUrl() {
        return `${this.#host}${this.#resource}`;
    }

}