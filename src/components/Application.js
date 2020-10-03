import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import metric from '../utilities/metric';

const darkBackground = "linear-gradient(#01081C, #002AA0)";
const lightBackground = "linear-gradient(#003D8D, #88D5FE)";
const hours = new Date().getHours();
let lat = '';
let lon = '';
let city = '';

const days = [
    { id: "Sunday", abb: "Sun" },
    { id: "Monday", abb: "Mon" },
    { id: "Tuesday", abb: "Tues" },
    { id: "Wednesday", abb: "Wed" },
    { id: "Thursday", abb: "Thurs" },
    { id: "Friday", abb: "Fri" },
    { id: "Saturday", abb: "Sat" }];


class Application extends Component {
    constructor(props) {
        super(props)
        this.state = {
            icon: '',
            unit: "fahrenheit",
            currentTemp: '',
            currentDay: '',
            daily: ''
        }
        this.unitChange = this.unitChange.bind(this);
    }

    componentDidMount() {
        let request = new XMLHttpRequest();
        var API = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=3daff8b6e93781c1d80277bbed731195";
        request.open("GET", API, true);
        request.onload = () => {
            let APIResponse = JSON.parse(request.response);
            this.setState(state => ({
                daily: APIResponse.daily,
                icon: APIResponse.current.weather[0].icon,
                currentTemp: JSON.stringify(Math.floor(APIResponse.current.temp)),
                currentDay: days[(Math.floor((JSON.stringify(APIResponse.current.dt) - 18000) / 86400) + 4) % 7].id
            }));
        }
        request.send();
    };

    unitChange(props) {
        props == "f" ?
            this.setState(state => ({
                unit: "fahrenheit"
            })) :
            this.setState(state => ({
                unit: "celsius"
            }))
    };

    render() {
        return (
            <main style={{
                backgroundImage: (hours >= 20 || hours < 5) ?
                    darkBackground :
                    lightBackground
            }}>

                <nav id="header">
                    <Link to={{ pathname: "/week", query: { daily: 5 } }} className="btn">
                        5-Day Forecast
                    </Link>
                    <Link to="/" className="btn">
                        City Search
                    </Link>
                    <Link to={{ pathname: "/week", query: { daily: 7 } }} className="btn">
                        7-Day Forecast
                    </Link>
                </nav>

                <div
                    id="container"
                    style={{ color: this.state.darkMode ? "lightgrey" : "#F0F0F0" }}
                >

                    <section id="activeDay">
                        <h4>{city}</h4>

                        <div id="activeTemp">
                            <img
                                id="currentIcon"
                                style={{ width: "65px", height: "65px" }}
                                src={"http://openweathermap.org/img/wn/" + `${this.state.icon}` + "@2x.png"} />

                            <div id="currentTemp">
                                {this.state.unit == "fahrenheit" ? this.state.currentTemp : Math.round(metric(this.state.currentTemp, "temp"))}&#176;
                            </div>

                            <div id="unitChange">
                                <button
                                    style={{ fontWeight: this.state.unit == "fahrenheit" ? "bold" : "400" }}
                                    className="btn unitBtn"
                                    onClick={() => this.unitChange("f")}
                                >F&#176;</button>

                                <button
                                    style={{ fontWeight: this.state.unit == "celsius" ? "bold" : "400" }}
                                    className="btn unitBtn"
                                    onClick={() => this.unitChange("c")}
                                >C&#176;</button>
                            </div>
                        </div>

                    </section>

                    {React.Children.map
                        (this.props.children, child =>
                            React.cloneElement(child, { currentTemp: this.state.currentTemp, daily: this.state.daily, unit: this.state.unit }))
                    }

                </div>
            </main>
        )
    }
}

export default Application;