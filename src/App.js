import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar.js'
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {position: "50%", checkIn: null, checkOut: null, hidden: true};
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

  hideCalendar(){
    console.log("hide calendar")
    this.setState({hidden: true});
  }

  dateSelected(data) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const checkInDate = data.checkIn ? data.checkIn.toLocaleDateString(options) : null
    const checkOutDate = data.checkOut ? data.checkOut.toLocaleDateString(options) : null
    this.setState({
      checkIn: checkInDate, 
      checkOut: checkOutDate
    })

    if(this.state.position == "0%"){
      this.setState({
        position: "50%"
      })
    }
  }

  clickedOutside(ev) {
    const calendarDom = ReactDOM.findDOMNode(this.calendarRef.current);
    if(calendarDom && !calendarDom.contains(ev.target)){
      this.hideCalendar()
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.clickedOutside);
  }

  render() {
  return (
    <div className="App">

                  <section class="hero is-success is-fullheight">
        <div class="hero-head">
        <nav class="navbar" role="navigation" aria-label="main navigation">
                    <div class="navbar-brand">
                      <a class="navbar-item">
                      <svg viewBox="0 0 1000 1000" role="presentation" aria-hidden="true" focusable="false"><path d="m499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-11 49-41 105-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 126.1 110 201.1-37 41-72 70-103 88-24 13-47 21-69 23-101 15-180.1-83-144.1-184.1 5-13 15-37 32-74l1-2c55-120.1 122.1-256.1 199.1-407.2l2-5 22-42c17-31 24-45 51-62 13-8 29-12 47-12 36 0 64 21 76 38 6 9 13 21 22 36l21 41 3 6c77 151.1 144.1 287.1 199.1 407.2l1 1 20 46 12 29c9.2 23.1 11.2 46.1 8.2 70.1zm46-90.1c-7-22-19-48-34-79v-1c-71-151.1-137.1-287.1-200.1-409.2l-4-6c-45-92-77-147.1-170.1-147.1-92 0-131.1 64-171.1 147.1l-3 6c-63 122.1-129.1 258.1-200.1 409.2v2l-21 46c-8 19-12 29-13 32-51 140.1 54 263.1 181.1 263.1 1 0 5 0 10-1h14c66-8 134.1-50 203.1-125.1 69 75 137.1 117.1 203.1 125.1h14c5 1 9 1 10 1 127.1.1 232.1-123 181.1-263.1z"></path></svg>
                      </a>

                      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                      </a>
                    </div>
                    <div class="navbar-menu">
                      <div class="navbar-end">
                        <a class="navbar-item">
                            Log In
                          </a>
                          <a class="navbar-item">

                                Sign up
                            </a>
                      </div>
                    </div>
                  </nav>
        </div>
        <div  class="hero-body">
          <div class="container is-fluid">
            <div class="card" id="searchCard">
                <div class="card-content">
                    <p class="is-size-4 has-text-weight-bold"> Book unique places to stay and things to do. </p>
                    <form>
                    <div class="field">
                      <label class="label">Where</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="Anywhere"></input>
                      </div>
                    </div>
                    <div class="field has-addons"  style={{position: "relative"}}>
                      
                      <div class="control is-expanded">
                      <label class="label">Check in</label>
                        <input onClick={this.calendarClick.bind(this, 0)} class="input" type="text" value={this.state.checkIn} readOnly/>
                      </div>
                      <div class="control is-expanded">
                      <label class="label">Check out</label>
                        <input onClick={this.calendarClick.bind(this, 50)} class="input" type="text" value={this.state.checkOut} readOnly/>
                      </div>
                      <Calendar ref={this.calendarRef} hidden={this.state.hidden} position={this.state.position} onDateSelected={this.dateSelected}/>
                    </div>
                    <div class="field has-addons">
                      
                      <div class="control is-expanded">
                      <label class="label">Guests</label>
                        <div class="select is-fullwidth">
                            <select>
                              <option> 1 </option>

                            </select>

                          </div>
                      </div>
                    </div>
                    <div class="field is-grouped is-grouped-right">
                      <p class="control">
                        <a class="button is-primary">
                          Search
                        </a>
                      </p>
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
