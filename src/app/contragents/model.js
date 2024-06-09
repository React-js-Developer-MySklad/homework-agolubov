import {integerGenerator} from "../util";

export default class Model {
    #data = []
    #onChange
    #idGenerator

    bindModelChanged(onChange) {
        this.#onChange = onChange
        this.#idGenerator = integerGenerator()
    }

    addContragent(contragent) {
        if (contragent.id === undefined || contragent.id === null) {
            contragent = {
                ...contragent,
                id: this.#idGenerator.next().value
            }
        }
        this.#data.push(contragent)
        this.#commit()
    }

    editContragent(contragent) {
        this.#data = this.#data.map(c => {
            if (c.id === contragent.id && c ) {
                return contragent
            }
            return c
        })
        this.#commit()
    }

    deleteContragent(id) {
        this.#data = this.#data.filter(c => c.id !== id)
        this.#commit()
    }

    #commit() {
        this.#onChange(this.#data)
    }
}