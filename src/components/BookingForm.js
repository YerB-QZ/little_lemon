import {useState} from "react";
import "./BookingPage.css";



function BookingForm({availableTimes, dispatcher, submitForm}) {
const [bookTime, setBookTime] = useState("");
const handleSubmit = (e) => {
e.preventDefault();

const formData = {
      date: availableTimes.date,
      time: bookTime
    };

    submitForm(formData);
};

const handleDateChange = (e) => {
const newDate = e.target.value;
dispatcher({type: "DATE_CHANGED", payload: newDate});
setBookTime("");
  };


return (

<>

<form className = "bookingForm" onSubmit = {handleSubmit}>
    <label htmlFor="res-date"> Choose Date</label>
    <input type="date" id="res-date" onChange={handleDateChange}/>
   <label htmlFor="res-time">Choose time</label>
   <select
   id="res-time"
   value = {bookTime}
   onChange = {(e)=>setBookTime(e.target.value)}
    >
      <option
      value=""
      disabled
      > Select Time
      </option>
      {availableTimes.times.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
    </select>
   <label htmlFor="guests">Number of guests</label>
   <input type="number" placeholder="1" min="1" max="10" id="guests"/>
   <label htmlFor="occasion">Occasion</label>
   <select id="occasion">
      <option>Birthday</option>
      <option>Anniversary</option>
   </select>
   <input type="submit" value="Make Your reservation" />
</form>

</>


);

}

export default BookingForm;