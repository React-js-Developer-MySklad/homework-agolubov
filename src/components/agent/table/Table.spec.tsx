import {Agent} from "../../../agent/agent.types";
import {fireEvent, render} from "@testing-library/react";
import {screen} from '@testing-library/dom'
import {Table} from "./Table";


let agent1: Agent
let agent2: Agent
let mockOnEdit: jest.Mock
let mockOnDelete: jest.Mock

beforeEach(() => {
    agent1 = {
        id: 1,
        name: "name",
        address: "address",
        inn: "inn",
        kpp: "kpp",
    }
    agent2 = {
        id: 2,
        name: "name2",
        address: "address2",
        inn: "inn2",
        kpp: "kpp2",
    }
    mockOnDelete = jest.fn()
    mockOnEdit = jest.fn()
    render(<Table agents={[agent1, agent2]} onEdit={mockOnEdit} onDelete={mockOnDelete}/>)
})

describe('Agent table', () => {

    test('renders correctly', () => {
        const headers = screen.getAllByRole('columnheader')
        expect(headers.length).toBe(5)
        expect(headers[0]).toHaveTextContent('Наименование')
        expect(headers[1]).toHaveTextContent('ИНН')
        expect(headers[2]).toHaveTextContent('Адрес')
        expect(headers[3]).toHaveTextContent('КПП')
        expect(headers[4]).toHaveTextContent('')

        const rows = screen.getAllByRole('row')
        expect(rows.length).toBe(3) // header + rows
    })

    test('calls onDelete when delete button is clicked', () => {
        const deleteButtons = screen.getAllByRole('button', { name: /удалить/i })

        fireEvent.click(deleteButtons[0])
        expect(mockOnDelete).toHaveBeenCalledWith(agent1)

        fireEvent.click(deleteButtons[1])
        expect(mockOnDelete).toHaveBeenCalledWith(agent2)

        // Ensure that the delete handler was called the correct number of times
        expect(mockOnDelete).toHaveBeenCalledTimes(2);
    });

    test('calls onEdit when row is double-clicked', () => {
        const rows = screen.getAllByRole('row')

        fireEvent.doubleClick(rows[1])
        expect(mockOnEdit).toHaveBeenCalledWith(agent1)

        fireEvent.doubleClick(rows[2])
        expect(mockOnEdit).toHaveBeenCalledWith(agent2)

        expect(mockOnEdit).toHaveBeenCalledTimes(2);
    });
})