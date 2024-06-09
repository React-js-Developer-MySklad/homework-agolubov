import html from "./index.html"
import {asDocument} from "../../util"
import {Modal} from "flowbite"

export default class View {
    #modal
    #form

    #contragentId
    #onSave

    constructor() {
        const doc = asDocument(html)
        this.#modal = new Modal(doc.getElementById("contragent-create-modal"))
        this.#form = doc.getElementById("contragent-create-form")

        this.#form.onsubmit = this.#onSubmit.bind(this)

        document.getElementById('root').appendChild(doc.body)
    }

    open(contragent = null) {
        this.#modal.show()
        if (contragent === null || contragent === undefined) {
            this.#contragentId = null
            this.#getInput("name").value = ""
            this.#getInput("address").value = ""
            this.#getInput("inn").value = ""
            this.#getInput("kpp").value = ""
        } else {
            this.#contragentId = contragent.id
            this.#getInput("name").value = contragent.name
            this.#getInput("address").value = contragent.address
            this.#getInput("inn").value = contragent.inn
            this.#getInput("kpp").value = contragent.kpp
        }
    }

    bindOnSave(onSave) {
        this.#onSave = onSave
    }

    #onSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        this.#createContragent()
        this.#modal.hide()
    }

    #getInput(id) {
        return this.#form.querySelector(`#${id}`)
    }

    #createContragent() {
        const contragent = {
            id: this.#contragentId,
            name: this.#getInput("name").value,
            address: this.#getInput("address").value,
            inn: this.#getInput("inn").value,
            kpp: this.#getInput("kpp").value
        }
        this.#onSave(contragent)
    }
}