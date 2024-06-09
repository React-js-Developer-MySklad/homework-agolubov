import html from './index.html'

export default class View {
    #table
    #template

    #onDeleteAction
    #onEditAction

    constructor(targetElement) {
        targetElement.innerHTML = html

        this.#table = targetElement.querySelector('tbody')
        this.#template = targetElement.querySelector('template')
    }

    refresh(contragents) {
        // remove old
        this.#table.querySelectorAll('tr').forEach(el => this.#table.removeChild(el))

        // fill new
        contragents.forEach(c => this.#table.appendChild(this.#createRow(c)))
    }

    #createRow(contragent) {
        if (contragent.id === null || contragent.id === undefined) {
            return
        }

        const row = this.#template.content.cloneNode(true)

        const root = row.querySelector('tr')
        root.addEventListener('dblclick', () => this.#onEditAction(contragent))

        const elements = root.children
        elements[0].textContent = contragent.name
        elements[1].textContent = contragent.address
        elements[2].textContent = contragent.inn
        elements[3].textContent = contragent.kpp

        const deleteButton = row.querySelector('button')
        deleteButton.addEventListener('click', () => this.#onDeleteAction(contragent.id))

        return row
    }

    bindDelete(onDeleteAction) {
        this.#onDeleteAction = onDeleteAction
    }

    bindEdit(onEditAction) {
        this.#onEditAction = onEditAction
    }
}