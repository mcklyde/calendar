import React from "react";
import "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./calendar.css";

const getMonth = date => {
  return new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
};

const getDaysInMonth = (year, month) => {
  // 5 x 7 date (includes previous dates not from the current month to fill in 5x7)
  const startDate = new Date(
    year,
    month,
    new Date(year, month).getDay() * -1 + 1
  );
  let daysInMonth = [];

  // 5 Weeks
  for (let i = 0; i < 5; i++) {
    let daysInWeek = [];
    // 7 Days
    for (let j = 0; j < 7; j++) {
      daysInWeek.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
    daysInMonth.push(daysInWeek);
  }

  return daysInMonth;
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const currentDate = new Date(Date.now());
    const currentMonth = getMonth(currentDate);
    const daysInMonth = getDaysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    this.state = {
      currentDate: new Date(Date.now()),
      currentMonth: currentMonth,
      daysInMonth: daysInMonth,
      checkInDate: null,
      checkOutDate: null,
      hidden: true
    };

    this.dateSelected = this.dateSelected.bind(this);
  }

  dateClick(direction) {
    const newDate = new Date(
      this.state.currentDate.setMonth(
        this.state.currentDate.getMonth() + direction
      )
    );
    const daysInMonth = getDaysInMonth(
      newDate.getFullYear(),
      newDate.getMonth()
    );
    this.setState({
      currentDate: newDate,
      currentMonth: getMonth(newDate),
      daysInMonth: daysInMonth
    });
  }

  dateSelected() {
    this.props.onDateSelected({
      checkIn: this.state.checkInDate,
      checkOut: this.state.checkOutDate
    });
  }

  hideCalendar() {
    console.log("test");
    this.props.onBlur();
  }

  selectDate(week, day) {
    const position = this.props.position;
    const selectedDay = this.state.daysInMonth[week][day];
    const stateToChange = {};

    if (position === "left") {
      if (
        this.state.checkOutDate == null ||
        selectedDay > this.state.checkOutDate
      ) {
        stateToChange.checkOutDate = null;
      }
      stateToChange.checkInDate = selectedDay;
    } else if (position === "right") {
      if (
        this.state.checkInDate == null ||
        selectedDay.valueOf() < this.state.checkInDate.valueOf()
      ) {
        stateToChange.checkInDate = selectedDay;
        stateToChange.checkOutDate = null;
      } else {
        stateToChange.checkOutDate = selectedDay;
      }
    }

    this.setState(stateToChange, this.dateSelected);
  }

  render() {
    let tableDays = this.state.daysInMonth.map((week, i) => {
      var currentWeek = week.map((day, j) => {
        const verifyDate = day => {
          if (this.state.checkInDate != null) {
            if (day.valueOf() === this.state.checkInDate.valueOf()) {
              return "selected";
            }
          }
          if (this.state.checkOutDate != null) {
            if (day.valueOf() === this.state.checkOutDate.valueOf()) {
              return "selected";
            }
            if (
              day.valueOf() > this.state.checkInDate.valueOf() &&
              day.valueOf() < this.state.checkOutDate.valueOf()
            ) {
              return "middle";
            }
          }
          const now = new Date(Date.now());
          now.setHours(0, 0, 0, 0);
          if (day.valueOf() < now.valueOf()) {
            return "invalid";
          } else {
            return "";
          }
        };
        const dateType = verifyDate(day);
        return (
          <td
            class={`${dateType} has-text-centered`}
            onClick={
              dateType !== "invalid" ? this.selectDate.bind(this, i, j) : ""
            }
            key={j}
          >
            {" "}
            {day.getDate()}{" "}
          </td>
        );
      });

      return <tr key={i}> {currentWeek} </tr>;
    });

    let calendarPos = {

    }

    calendarPos[this.props.position] = "0%";
    return (
      <div
        class={`calendar ${this.props.hidden ? "is-hidden" : "not-hidden"}`}
        style={ calendarPos }
      >
        <div class="card">
          <div class="card-content">
            <div class="field has-addons has-addons-centered" id="calendarNav">
              <p class="control">
                <span class="icon is-small">
                  <FontAwesomeIcon
                    onClick={this.dateClick.bind(this, -1)}
                    icon={faArrowLeft}
                  />
                </span>
              </p>
              <p class="control is-expanded">
                <h1 class="is-size-6 has-text-centered">
                  {`${
                    this.state.currentMonth
                  } ${this.state.currentDate.getFullYear()}`}
                </h1>
              </p>
              <p class="control has-text-right">
                <span class="icon is-small">
                  <FontAwesomeIcon
                    onClick={this.dateClick.bind(this, 1)}
                    icon={faArrowRight}
                  />
                </span>
              </p>
            </div>
            <div class="table-container">
              <table class="table is-bordered is-narrow">
                <thead>
                  <th class="has-text-centered"> Su </th>
                  <th class="has-text-centered"> M </th>
                  <th class="has-text-centered"> Tu </th>
                  <th class="has-text-centered"> We </th>
                  <th class="has-text-centered"> Th </th>
                  <th class="has-text-centered"> Fr </th>
                  <th class="has-text-centered"> Sa </th>
                </thead>
                <tbody>{tableDays}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
