import html from './index.html'

export default class View {
    #table
    #template
    #rows = new Map()

    #onDeleteAction
    #onEditAction

    constructor(targetElement) {
        targetElement.innerHTML = html

        this.#table = targetElement.querySelector('tbody')
        this.#template = targetElement.querySelector('template')
    }

    // данный метод позволяет отобразить любой новый список, сохраняя эффективное переиспользование dom
    // в простых случаях подразумеваемых задачей (вставка в конец, удаление в любом месте, изменение одного элемента) -
    // будет изменена только одна строка в таблице
    refresh(contragents) {
        this.#removeRows(contragents)
        const newRows = new Map()

        contragents.forEach((contragent, idx) => {
            let found = this.#rows.get(contragent.id)

            if (found !== undefined) {
                // На случай, если изменился порядок элементов
                if (Array.prototype.indexOf.call(this.#table.children, found.asElement()) !== idx) {
                    found.remove()
                    this.#insertRowAt(found.asElement(), idx)
                }
            } else {
                // Новый элемент может быть вставлен в любое место
                found = new ContragentRow(this.#template, this.#onEditAction, this.#onDeleteAction)
                this.#insertRowAt(found.asElement(), idx)
            }

            found.render(contragent)
            newRows.set(contragent.id, found)
        })

        this.#rows = newRows
    }

    #removeRows(contragents) {
        const newIds = new Set(contragents.map(c => c.id))
        Array.from(this.#rows.keys())
            .filter(id => !newIds.has(id))
            .forEach(id => this.#rows.get(id).remove())
    }

    #insertRowAt(child, index) {
        if (index >= this.#table.children.length) {
            this.#table.appendChild(child);
        } else {
            this.#table.insertBefore(child, this.#table.children[index]);
        }
    }

    bindDelete(onDeleteAction) {
        this.#onDeleteAction = onDeleteAction
    }

    bindEdit(onEditAction) {
        this.#onEditAction = onEditAction
    }
}

class ContragentRow {
    #root
    #onEdit
    #onDelete
    #contragent

    constructor(template, onEdit, onDelete) {
        this.#onEdit = onEdit
        this.#onDelete = onDelete

        const row = template.content.cloneNode(true)

        this.#root = row.querySelector('tr')
        this.#root.addEventListener('dblclick', () => this.#onEditAction())

        const deleteButton = row.querySelector('button')
        deleteButton.addEventListener('click', () => this.#onDeleteAction())
    }

    render(contragent) {
        if (this.#contragent === contragent) {
            return
        }
        this.#contragent = contragent

        const elements = this.#root.children
        elements[0].textContent = contragent.name
        elements[1].textContent = contragent.address
        elements[2].textContent = contragent.inn
        elements[3].textContent = contragent.kpp
    }

    remove() {
        this.#root.remove()
    }

    asElement() {
        return this.#root
    }

    #onEditAction() {
        if (this.#contragent !== null && this.#contragent !== undefined) {
            this.#onEdit(this.#contragent)
        }
    }

    #onDeleteAction() {
        if (this.#contragent !== null && this.#contragent !== undefined) {
            this.#onDelete(this.#contragent.id)
        }
    }
}