import React, { Component } from 'react'
import Navigation from './mini/Navigation';
import Loader from './mini/Loader';
import Error from './mini/Error';
import metric from '../utilities/metric';
import WeekCards from './WeekCards';

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
            error: '',
            isLoaded: false,
            city: '',
            icon: '',
            unit: "fahrenheit",
            currentTemp: '',
            currentDay: '',
            daily: '',
            dailyForcast: 7
        }
    }

    async componentDidMount() {
        if (!this.props.match.params.city) {
            return this.props.history.push('/')
        }

        try {
            // GECODE THE CITY QUERY
            const query = this.props.match.params.city
            // const rawGeocode = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=AIzaSyB_oG1OC4gzj7MvBJyUVQTJqGCAoUmeCeE&libraries=places`)
            const rawGeocode = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${process.env.REACT_APP_GOOGLEAPI}&libraries=places`)
            const { results } = await rawGeocode.json();
            const city = results[0].formatted_address;
            const lat = results[0].geometry.location.lat;
            const lon = results[0].geometry.location.lng;

            // EXTRACT WEATHER DATA FROM THE GECODED ADDRESS
            const rawWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${process.env.REACT_APP_OPENWEATHERAPI}`);
            const parsedWeather = await rawWeather.json();
            const { daily, current } = parsedWeather;
            this.setState({
                isLoaded: true,
                city,
                daily,
                icon: current.weather[0].icon,
                currentTemp: JSON.stringify(Math.floor(current.temp)),
                currentDay: days[(Math.floor((JSON.stringify(current.dt) - 18000) / 86400) + 4) % 7].id
            })
        }

        catch (error) {
            this.setState({
                ...this.state,
                isLoaded: true,
                error: "Something went wrong upon communicating with the APIs. Please check network tab and refresh the browser"
            })
        }
    }

    unitChange = props => {
        props == "f"
            ? this.setState({ ...this.state, unit: "fahrenheit" })
            : this.setState({ ...this.state, unit: "celsius" })
    };

    dailyForcastTo5 = () => this.setState({ ...this.state, dailyForcast: 5 })

    dailyForcastTo7 = () => this.setState({ ...this.state, dailyForcast: 7 })

    render() {
        const { city, icon, currentTemp, unit, daily, dailyForcast, isLoaded, error } = this.state

        if (isLoaded && !error) {
            return (
                <main style={{
                    backgroundImage: (hours >= 20 || hours < 5)
                        ? darkBackground
                        : lightBackground
                }}>

                    <div id="container" >

                        <Navigation
                            dailyForcastTo5={this.dailyForcastTo5}
                            dailyForcastTo7={this.dailyForcastTo7}
                        />

                        <section id="activeDay">
                            <h4 id="city">
                                <b>{city}</b>
                            </h4>

                            <div id="activeTemp">
                                <div id="currentImage">
                                    <img
                                        className='floating'
                                        id="currentIcon"
                                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                                    />
                                </div>

                                <div id="currentTemp">
                                    {
                                        unit == "fahrenheit"
                                            ? currentTemp
                                            : Math.round(metric(currentTemp, "temp"))
                                    }

                                    &#176;

                                    {
                                        unit == "fahrenheit"
                                            ? <span>f</span>
                                            : <span>c</span>
                                    }
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

                        {
                            dailyForcast && daily.length > 0
                                ? <WeekCards
                                    data={daily}
                                    daily={dailyForcast}
                                />
                                : null
                        }

                    </div>
                </main>
            )
        }

        else if (!error && !isLoaded) {
            return <Loader
                dailyForcastTo5={this.dailyForcastTo5}
                dailyForcastTo7={this.dailyForcastTo7}
            />
        }

        else if (error && isLoaded) {
            return <Error
                dailyForcastTo5={this.dailyForcastTo5}
                dailyForcastTo7={this.dailyForcastTo7}
                error={error}
            />
        }

    }
}

export default Application;