import {default as TableView} from "./table/view";
import {default as ModalView} from "./modal/view";
import Model from "./model";

export default class Controller {
    #model
    #tableView
    #modalView

    constructor(tableTarget) {
        this.#model = new Model()
        this.#tableView = new TableView(tableTarget)
        this.#modalView = new ModalView()

        this.#model.bindModelChanged(contragents => this.#onModelChanged(contragents))

        this.#tableView.bindDelete(id => this.#onDelete(id))
        this.#tableView.bindEdit(contragent => this.#modalView.open(contragent))

        this.#modalView.bindOnSave(contragent => {
            if (contragent.id !== null && contragent.id !== undefined) {
                this.#onEdit(contragent)
            } else {
                this.#onAdd(contragent)
            }
        })
    }

    startCreatingNew() {
        this.#modalView.open()
    }

    setContragents(contragents) {
        contragents.forEach(c => this.#onAdd(c))
    }

    #onDelete(id) {
        this.#model.deleteContragent(id)
    }

    #onEdit(contragent) {
        this.#model.editContragent(contragent)
    }

    #onAdd(contragent) {
        this.#model.addContragent(contragent)
    }

    #onModelChanged(contragents) {
        this.#tableView.refresh(contragents)
    }
}