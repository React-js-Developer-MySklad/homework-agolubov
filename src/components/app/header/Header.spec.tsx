import {fireEvent, render} from '@testing-library/react'
import {screen} from '@testing-library/dom'
import { Header } from './Header'

describe('Header', () => {

    test('renders correctly', () => {
        const mockOnAdd = jest.fn()
        render(<Header onAdd={mockOnAdd} />)

        expect(screen.getByRole('button', {name: /Добавить/i})).toBeInTheDocument()
        expect(screen.getByAltText('moysklad-logo')).toBeInTheDocument()
    })

    test('calls onAdd', () => {
        const mockOnAdd = jest.fn()
        render(<Header onAdd={mockOnAdd} />)

        const button = screen.getByRole('button', {name: /Добавить/i})
        fireEvent.click(button)

        expect(mockOnAdd).toHaveBeenCalledTimes(1)
    })
});