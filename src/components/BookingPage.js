import BookingForm from "./BookingForm.js";
import "./Nav.css"
import {useReducer} from "react";
import { submitAPI } from "../api";
import { initializeTimes, updateTimes } from "./bookingTimeLogic";
import { useNavigate } from "react-router-dom";

const today = new Date().toISOString().split("T")[0];




function BookingPage() {
    const navigate = useNavigate();

    const [availableTimes, dispatcher] = useReducer(
    updateTimes,
    today,
    initializeTimes
    );
function submitForm(formData) {
submitAPI(formData) ? navigate("/confirmation") : null;
};

return (

<div className="homepage">
<h1>This is booking page</h1>
<BookingForm availableTimes = {availableTimes} dispatcher = {dispatcher} submitForm = {submitForm}/>
</div>



);
};

export default BookingPage;