import { initializeTimes, updateTimes, getTimesForDate } from "./components/bookingTimeLogic";
import { fetchAPI } from "./api";

jest.mock("./api", () => ({
  fetchAPI: jest.fn(),
}))

describe("BookingPage time logic", () => {
  test("initializeTimes returns initial state with date and times array", () => {
    fetchAPI.mockReturnValueOnce(["17:00", "18:00", "19:00"]);
    const dateStr = "2026-01-04";
    const state = initializeTimes(dateStr);
    expect(fetchAPI).toHaveBeenCalledWith(new Date(dateStr));
    expect(state).toEqual({
      date: dateStr,
      times: ["17:00", "18:00", "19:00"],
    });
    });
    });

test("updateTimes handles DATE_CHANGED action by updating date and times", () => {
    fetchAPI.mockReturnValueOnce(["20:00", "20:30"]);  
    const prevState = { date: "2026-01-01", times: ["17:00"] };
    const action = { type: "DATE_CHANGED", payload: "2026-01-04" };

    const nextState = updateTimes(prevState, action);
    expect(fetchAPI).toHaveBeenCalledWith(new Date("2026-01-04"));
    expect(nextState).toEqual({
      date: "2026-01-04",
      times: ["20:00", "20:30"],
    });
  });

  test("updateTimes returns same state object for unknown action", () => {
    const prevState = initializeTimes("2026-01-01");
    const action = { type: "UNKNOWN_ACTION" };

    const nextState = updateTimes(prevState, action);

    // For default: return state (same reference)
    expect(nextState).toBe(prevState);
  });