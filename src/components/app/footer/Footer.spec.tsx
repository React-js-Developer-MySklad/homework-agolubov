import {fireEvent, render} from "@testing-library/react";
import {screen} from "@testing-library/dom";
import {Footer} from "./Footer";

describe('Footer', () => {

    test('renders correctly', () => {
        render(<Footer />);

        const footerText = screen.getByText(/© 2007–2024 ООО «Логнекс»/i);
        expect(footerText).toBeInTheDocument();
    })
})