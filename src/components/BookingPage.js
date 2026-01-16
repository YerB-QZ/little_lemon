import BookingForm from "./BookingForm.js";
import "./BookingPage.css";
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
if(submitAPI(formData)) {
     navigate("/confirmation");
}
};

return (

<div className="bookingPage">
<h1>Looking forward to welcome you!</h1>
<BookingForm availableTimes = {availableTimes} dispatcher = {dispatcher} submitForm = {submitForm}/>
</div>



);
};

export default BookingPage;