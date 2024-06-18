
export default class Model {
    #data = []
    #onChange

    bindModelChanged(onChange) {
        this.#onChange = onChange
    }

    setContragents(contragents) {
        this.#data = []
        contragents.forEach(c => this.#data.push(c))
        this.#commit()
    }

    addContragent(contragent) {
        this.#data.push(contragent)
        this.#commit()
    }

    editContragent(contragent) {
        this.#data = this.#data.map(c => {
            if (c.id === contragent.id) {
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