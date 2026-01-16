import {useMemo, useState} from "react";
import "./BookingPage.css";



function BookingForm({availableTimes, dispatcher, submitForm}) {
const [bookTime, setBookTime] = useState("");

const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);

  const selectedDate = availableTimes?.date ?? "";
  const times = availableTimes?.times ?? [];

  const isDateEmpty = !selectedDate;
  const isDateInPast = selectedDate !== "" && selectedDate < todayStr; // works for YYYY-MM-DD strings
  const isTimeEmpty = !bookTime;

  const dateError =
  isDateEmpty ? "Date is required." : isDateInPast ? "Date cannot be earlier than today." : "";

  const timeError = isTimeEmpty ? "Time is required." : "";

  const isFormValid = !isDateEmpty && !isDateInPast && !isTimeEmpty;
const handleDateChange = (e) => {
const newDate = e.target.value;
dispatcher({type: "DATE_CHANGED", payload: newDate});
setBookTime("");
  };

const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

const formData = {
      date: selectedDate,
      time: bookTime
    };

    submitForm(formData);
};




return (

<>
<form className = "bookingForm" onSubmit = {handleSubmit} noValidate aria-labelledby="booking-form-title">
  <h2 id="booking-form-title">Table reservation</h2>
    <label htmlFor="res-date"> Choose Date</label>
    <input
    type="date"
    id="res-date"
    value={selectedDate}
    onChange={handleDateChange}
    min={todayStr}
    required
    aria-invalid={Boolean(dateError)}
    aria-describedby={dateError ? "date-error":undefined}
    />
    {dateError && (
     <div id="date-error" role = "alert" style={{marginTop:6}}>
      {dateError}
     </div>
    )}
   <label htmlFor="res-time">Choose time</label>
   <select
   id="res-time"
   value = {bookTime}
   onChange = {(e)=>setBookTime(e.target.value)}
   required
    aria-invalid={Boolean(timeError)}
    aria-describedby={timeError ? "time-error" : undefined}
    disabled={!selectedDate || isDateInPast}
    >
      <option
      value=""
      disabled
      > Select Time
      </option>
      {times.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
    </select>
    {timeError && (
        <div id="time-error" role="alert" style={{ marginTop: 6 }}>
          {timeError}
        </div>
      )}
   <label htmlFor="guests">Number of guests</label>
   <input type="number" placeholder="1" min="1" max="10" id="guests"/>
   <label htmlFor="occasion">Occasion</label>
   <select id="occasion">
      <option>Birthday</option>
      <option>Anniversary</option>
   </select>
   <button className="primaryBtn" type="submit" disabled={!isFormValid}>
    Make Your Reservation
  </button>
</form>
</>


);

}

export default BookingForm;