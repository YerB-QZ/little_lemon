import { fetchAPI } from "../api";



export function getTimesForDate(dateStr) {
  return ["17:00", "18:00", "19:00", "20:00", "21:00"];
}

export function initializeTimes(dateStr) {
    const times = fetchAPI(new Date(dateStr));
    return { date: dateStr, times};
}

export function updateTimes(state, action) {
  switch (action.type) {
    case "DATE_CHANGED":
      const dateStr= action.payload;
      const times = fetchAPI(new Date(dateStr));
      return { date: dateStr, times};
    default:
      return state;
  }
}
