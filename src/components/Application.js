import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import metric from '../utilities/metric';

const darkBackground = "linear-gradient(#01081C, #002AA0)";
const lightBackground = "linear-gradient(#003D8D, #88D5FE)";
const hours = new Date().getHours();

const days = [
    { id: "Sunday", abb: "Sun" },
    { id: "Monday", abb: "Mon" },
    { id: "Tuesday", abb: "Tues" },
    { id: "Wednesday", abb: "Wed" },
    { id: "Thursday", abb: "Thurs" },
    { id: "Friday", abb: "Fri" },
    { id: "Saturday", abb: "Sat" }
];

class Application extends Component {
    constructor(props) {
        super(props)
        this.state = {
            city: '',
            icon: '',
            unit: "fahrenheit",
            currentTemp: '',
            currentDay: '',
            daily: ''
        }
    }

    async componentDidMount() {
        // GECODE THE CITY QUERY
        const query = this.props.match.params.city
        const rawGeocode = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=AIzaSyB_oG1OC4gzj7MvBJyUVQTJqGCAoUmeCeE&libraries=places`)
        const { results } = await rawGeocode.json();
        const city = results[0].formatted_address;
        const lat = results[0].geometry.location.lat;
        const lon = results[0].geometry.location.lng;

        // EXTRACT WEATHER DATA FROM THE GECODED ADDRESS
        const rawWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=3daff8b6e93781c1d80277bbed731195`);
        const parsedWeather = await rawWeather.json();
        const { daily, current } = parsedWeather;
        this.setState({
            city,
            daily,
            icon: current.weather[0].icon,
            currentTemp: JSON.stringify(Math.floor(current.temp)),
            currentDay: days[(Math.floor((JSON.stringify(current.dt) - 18000) / 86400) + 4) % 7].id
        })
    }

    unitChange = props => {
        props == "f" ?
            this.setState(state => ({
                unit: "fahrenheit"
            })) :
            this.setState(state => ({
                unit: "celsius"
            }))
    };

    render() {
        const { city, icon, currentTemp, unit } = this.state


        return (
            <main style={{
                backgroundImage: (hours >= 20 || hours < 5)
                    ? darkBackground
                    : lightBackground
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
                                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                            />

                            <div id="currentTemp">
                                {unit == "fahrenheit" ? currentTemp : Math.round(metric(currentTemp, "temp"))}&#176;
                            </div>

                            <div id="unitChange">
                                <button
                                    style={{ fontWeight: unit == "fahrenheit" ? "bold" : "400" }}
                                    className="btn unitBtn"
                                    onClick={() => this.unitChange("f")}
                                >F&#176;</button>

                                <button
                                    style={{ fontWeight: unit == "celsius" ? "bold" : "400" }}
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