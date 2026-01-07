import BookingPage from './BookingPage.js';
import Homepage from './Homepage.js';
import {ConfirmedBooking} from './ConfirmedBooking.js';
import "./Main.css"
import { Routes, Route } from "react-router-dom";

function Main() {

return (

<main className="Main">
<Routes>
    <Route path="/" element={<Homepage />}></Route>
    <Route path="/booking" element={<BookingPage />}></Route>
    <Route path="/confirmation" element={<ConfirmedBooking />}></Route>
</Routes>
</main>

);
};

export default Main;