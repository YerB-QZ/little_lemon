import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingForm from "./components/BookingForm";
import { fireEvent} from "@testing-library/react";

function ymd(date) {
  return date.toISOString().split("T")[0];
}

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

beforeEach(() => {
  // Set "today" to 2026-01-15T10:00:00Z (any time same date is fine)
  jest.setSystemTime(new Date("2026-01-15T10:00:00.000Z"));
});

function setup({
  availableTimes = { date: "", times: ["17:00", "18:00"] },
  dispatcher = jest.fn(),
  submitForm = jest.fn(),
} = {}) {
  const utils = render(
    <BookingForm
      availableTimes={availableTimes}
      dispatcher={dispatcher}
      submitForm={submitForm}
    />
  );
  const dateInput = screen.getByLabelText(/choose date/i);
  const timeSelect = screen.getByLabelText(/choose time/i);
  const submitBtn = screen.getByRole("button", { name: /make your reservation/i });

  return { ...utils, dateInput, timeSelect, submitBtn, dispatcher, submitForm };
}
describe("BookingForm validations", () => {
  test("initial state: submit disabled, time select disabled, date+time errors shown", () => {
  const { submitBtn, timeSelect } = setup();

  expect(submitBtn).toBeDisabled();
  expect(timeSelect).toBeDisabled();

  expect(screen.getByText(/date is required/i)).toBeInTheDocument();
  expect(screen.getByText(/time is required/i)).toBeInTheDocument();
});
test("date in the past shows correct error and keeps time select disabled", () => {
  const { dateInput, timeSelect, submitBtn } = setup({
    availableTimes: { date: "2026-01-14", times: ["17:00", "18:00"] }, // yesterday
  });

  expect(dateInput).toHaveAttribute("aria-invalid", "true");

  // Assert the specific date error
  expect(screen.getByText(/date cannot be earlier than today/i)).toBeInTheDocument();

  // Time error also exists (because time is empty) — assert it explicitly if you want:
  expect(screen.getByText(/time is required/i)).toBeInTheDocument();

  expect(timeSelect).toBeDisabled();
  expect(submitBtn).toBeDisabled();
});
   test("valid date enables time select and clears date error", () => {
    const { timeSelect, submitBtn } = setup({
      availableTimes: { date: "2026-01-15", times: ["17:00", "18:00"] },
    });

    // With a valid date, time is still empty => time error should show
    expect(timeSelect).toBeEnabled();
    expect(submitBtn).toBeDisabled();

    expect(timeSelect).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent(/time is required/i);
  });
test("selecting a time makes form valid and enables submit", async () => {
    const { timeSelect, submitBtn } = setup({
      availableTimes: { date: "2026-01-15", times: ["17:00", "18:00"] },
    });
  expect(timeSelect).toBeEnabled();
  fireEvent.change(timeSelect, { target: { value: "17:00" } });
  expect(timeSelect.value).toBe("17:00");
  expect(submitBtn).toBeEnabled();
  });

  test("submitting while invalid does not call submitForm", async () => {
    const user = userEvent.setup();
    const submitForm = jest.fn();

    const { submitBtn } = setup({
      availableTimes: { date: "2026-01-15", times: ["17:00", "18:00"] },
      submitForm,
    });

    expect(submitBtn).toBeDisabled();
    userEvent.click(submitBtn);

    expect(submitForm).not.toHaveBeenCalled();
  });
  test("submitting while valid calls submitForm with date and time", async () => {
    const submitForm = jest.fn();

    const { timeSelect, submitBtn } = setup({
      availableTimes: { date: "2026-01-15", times: ["17:00", "18:00"] },
      submitForm,
    });
    fireEvent.change(timeSelect, { target: { value: "18:00" } });
    expect(timeSelect.value).toBe("18:00");
    expect(submitBtn).toBeEnabled();
    fireEvent.click(submitBtn);
    expect(submitForm).toHaveBeenCalledTimes(1);
    expect(submitForm).toHaveBeenCalledWith({ date: "2026-01-15", time: "18:00" });
  });
  test("changing date dispatches DATE_CHANGED and resets selected time (requires rerender)", async () => {
    const dispatcher = jest.fn();
    const submitForm = jest.fn();

    // Start with a valid date so we can pick a time first
    const initial = setup({
      availableTimes: { date: "2026-01-15", times: ["17:00", "18:00"] },
      dispatcher,
      submitForm,
    });
    const { dateInput, timeSelect, submitBtn } = initial;
    fireEvent.change(timeSelect, { target: { value: "17:00" } });
    expect(timeSelect.value).toBe("17:00");
    expect(submitBtn).toBeEnabled();

    // Change date via input
    fireEvent.change(dateInput, { target: { value: "2026-01-16" } });
  expect(dispatcher).toHaveBeenCalledTimes(1);
  expect(dispatcher).toHaveBeenCalledWith({
    type: "DATE_CHANGED",
    payload: "2026-01-16",
  });

    // Because date is controlled from props, simulate parent update:
    initial.rerender(
      <BookingForm
        availableTimes={{ date: "2026-01-16", times: ["19:00", "20:00"] }}
        dispatcher={dispatcher}
        submitForm={submitForm}
      />
    );

    // bookTime should have been reset to "" by handleDateChange -> submit disabled again
     expect(timeSelect.value).toBe("");
     expect(submitBtn).toBeDisabled();
  });

  test("date input min attribute equals today's date (basic guard)", () => {
    const { dateInput } = setup();
    expect(dateInput).toHaveAttribute("min", "2026-01-15");
  });

test("time select stays disabled when date is empty", () => {
  const { timeSelect } = setup({
    availableTimes: { date: "", times: ["17:00"] },
  });

  expect(timeSelect).toBeDisabled();
});

test("time select stays disabled when date is in the past", () => {
  const { timeSelect } = setup({
    availableTimes: { date: "2026-01-14", times: ["17:00"] },
  });

  expect(timeSelect).toBeDisabled();
});
});