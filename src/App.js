import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./Calendar.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: "50%",
      checkIn: null,
      checkOut: null,
      hidden: true
    };
    this.calendarRef = React.createRef();

    this.dateSelected = this.dateSelected.bind(this);
    this.hideCalendar = this.hideCalendar.bind(this);
    this.clickedOutside = this.clickedOutside.bind(this);
  }

  calendarClick(pos) {
    this.setState({
      position: `${pos}%`,
      hidden: false
    });
  }

  hideCalendar() {
    this.setState({ hidden: true });
  }

  dateSelected(data) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const checkInDate = data.checkIn
      ? data.checkIn.toLocaleDateString(options)
      : null;
    const checkOutDate = data.checkOut
      ? data.checkOut.toLocaleDateString(options)
      : null;
    this.setState({
      checkIn: checkInDate,
      checkOut: checkOutDate
    });

    if (this.state.position === "0%") {
      this.setState({
        position: "50%"
      });
    }
  }

  clickedOutside(ev) {
    const calendarDom = ReactDOM.findDOMNode(this.calendarRef.current);
    if (calendarDom && !calendarDom.contains(ev.target)) {
      this.hideCalendar();
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.clickedOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.clickedOutside);
  }

  render() {
    return (
      <div className="App">
        <section class="hero is-success is-fullheight">
          <div class="hero-body">
            <div class="container is-fluid">
              <div class="card" id="searchCard">
                <div class="card-content">
                  <p class="is-size-4 has-text-weight-bold">
                    {" "}
                    Book unique places to stay and things to do.{" "}
                  </p>
                  <form>
                    <div
                      class="field has-addons"
                      style={{ position: "relative" }}
                    >
                      <div class="control is-expanded">
                        <label class="label">Check in</label>
                        <input
                          onClick={this.calendarClick.bind(this, 0)}
                          class="input"
                          type="text"
                          value={this.state.checkIn}
                          readOnly
                        />
                      </div>
                      <div class="control is-expanded">
                        <label class="label">Check out</label>
                        <input
                          onClick={this.calendarClick.bind(this, 50)}
                          class="input"
                          type="text"
                          value={this.state.checkOut}
                          readOnly
                        />
                      </div>
                      <Calendar
                        ref={this.calendarRef}
                        hidden={this.state.hidden}
                        position={this.state.position}
                        onDateSelected={this.dateSelected}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
