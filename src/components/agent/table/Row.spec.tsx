import {fireEvent, render} from "@testing-library/react"
import {screen} from "@testing-library/dom"
import {Row} from "./Row"
import {Agent} from "../../../types/agent.types"

let agent: Agent
let mockOnEdit: jest.Mock
let mockOnDelete: jest.Mock

beforeEach(() => {
    agent = {
        id: "1",
        name: "name",
        address: "address",
        inn: "inn",
        kpp: "kpp",
    }
    mockOnEdit = jest.fn()
    mockOnDelete = jest.fn()
    render(
        <table>
            <tbody>
            <Row agent={agent} onEdit={mockOnEdit} onDelete={mockOnDelete} />
            </tbody>
        </table>
    )
});

describe('Agent table row', () => {

    test('renders correctly', () => {
        const thElements = screen.getAllByRole('rowheader')
        expect(thElements.length).toBe(1)
        expect(thElements[0]).toHaveTextContent('name')

        const tdElements = screen.getAllByRole('cell')

        expect(tdElements.length).toBe(4)
        expect(tdElements[0]).toHaveTextContent('inn')
        expect(tdElements[1]).toHaveTextContent('address')
        expect(tdElements[2]).toHaveTextContent('kpp')

        const button = screen.getByRole('button', { name: /удалить/i })
        expect(button).toBeInTheDocument();
        expect(tdElements[3]).toContainElement(button);
    })

    test('remove click action', () => {
        const button = screen.getByRole('button', { name: /удалить/i })
        fireEvent.click(button)
        fireEvent.dblClick(button)

        expect(mockOnDelete).toHaveBeenCalledTimes(1)
        expect(mockOnEdit).toHaveBeenCalledTimes(0)
    })

    test('double click action', () => {
        const rowElement = screen.getByRole('row')
        fireEvent.dblClick(rowElement)
        fireEvent.click(rowElement)

        expect(mockOnEdit).toHaveBeenCalledTimes(1)
    })
})