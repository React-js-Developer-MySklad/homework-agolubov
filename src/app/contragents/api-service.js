import {integerGenerator} from "../util";

export default class ApiService {
    #contragents = []
    #idGenerator

    constructor(startData = []) {
        this.#idGenerator = integerGenerator()
        startData.forEach(c => this.save(c))
    }

    loadAll() {
        return new Promise((resolve, reject) => resolve(this.#contragents))
    }

    save(contragent) {
        if (contragent.id === null || contragent.id === undefined) {
            contragent = {
                ...contragent,
                id: this.#idGenerator.next().value
            }
        }
        this.#contragents.push(contragent)
        return new Promise((resolve, reject) => resolve(contragent))
    }
}