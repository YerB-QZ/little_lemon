import { render, screen } from '@testing-library/react';
import App from './App';
import BookingPage from "./components/BookingPage.js";
import { MemoryRouter } from "react-router-dom";


test('renders the booking form element rendered via booking page', () => {
    render(
    <MemoryRouter>
    <BookingPage />
    </MemoryRouter>
);

    const headingElement = screen.getByText(/looking forward to welcome you!/i);
    expect(headingElement).toBeInTheDocument();
    const guestNumberElement = screen.getByText(/number of guest/i);
    expect(guestNumberElement).toBeInTheDocument();
});
