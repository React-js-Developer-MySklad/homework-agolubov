import {createRoot} from "react-dom/client";

jest.mock('react-dom/client', () => ({
    createRoot: jest.fn(() => ({
        render: jest.fn(),
    })),
}))

describe('main render', () => {
    it('renders correctly', async () => {
        document.body.innerHTML = '<div id="root"></div>'
        const rootElement = document.getElementById('root')

        await import('./main')

        expect(createRoot).toHaveBeenCalledWith(rootElement)
    })
})