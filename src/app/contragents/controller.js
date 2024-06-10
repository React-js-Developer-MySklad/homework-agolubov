import {default as TableView} from "./table/view";
import {default as ModalView} from "./modal/view";
import Model from "./model";

export default class Controller {
    #model
    #tableView
    #modalView
    #apiService

    constructor(tableTarget, apiService) {
        this.#model = new Model()
        this.#tableView = new TableView(tableTarget)
        this.#modalView = new ModalView()
        this.#apiService = apiService

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

    refresh() {
        this.#apiService.loadAll()
            .then(contragents => this.#model.setContragents(contragents))
    }

    startCreatingNew() {
        this.#modalView.open()
    }

    #onDelete(id) {
        this.#model.deleteContragent(id)
    }

    #onEdit(contragent) {
        this.#apiService.save(contragent)
            .then(contragent => this.#model.editContragent(contragent))
    }

    #onAdd(contragent) {
        this.#apiService.save(contragent)
            .then(contragent => this.#model.addContragent(contragent))
    }

    #onModelChanged(contragents) {
        this.#tableView.refresh(contragents)
    }
}