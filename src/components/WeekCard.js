import React from 'react'

const WeekCard = React.createClass({
    getInitialState() {
        return {
            averageHigh: [],
            active: false,
            morn: 0,
            eve: 0,
            windSpeed: 0,
            dewPoint: 0,
            humidity: 0
        };
    },

    render: function (props) {
        const week = this.props.daily
            .slice(0, this.props.location.query.daily)
            .map(day =>
                <div
                    className="dayCard"
                    onClick={() => {
                        this.setState(state => ({
                            active: true,
                            morn: Math.floor(day.temp.morn),
                            eve: Math.floor(day.temp.eve),
                            windSpeed: (day.wind_speed),
                            dewPoint: Math.floor(day.dew_point),
                            humidity: day.humidity,
                        }))
                    }}>
                    <div id="dayCardCombiner">
                        <p>{days[(Math.floor((day.dt - 18000) / 86400) + 4) % 7].abb}</p>
                        <img
                            id="dailyIcon"
                            src={"http://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png"} />
                    </div>
                    <div
                        id="spacer"
                        style={{
                            minHeight: "15px",
                            height: this.props.currentTemp >= 30 ?
                                this.props.currentTemp >= 100 ?
                                    `${(130 - day.temp.max) * 2}px` :
                                    `${(100 - day.temp.max) * 2}px` :
                                `${(40 - day.temp.max) * 2}px`
                        }} />
                    <div id="temps">
                        <div id="high">{
                            this.props.unit == "fahrenheit" ?
                                Math.round(day.temp.max) :
                                Math.round(metric(day.temp.max, "temp"))}&#176;
					</div>
                        <div id="bar" style={{ height: `${(day.temp.max - day.temp.min) * 3}px` }} />
                        <div id="low">{
                            this.props.unit == "fahrenheit" ?
                                Math.round(day.temp.min) :
                                Math.round(metric(day.temp.min, "temp"))}&#176;</div>
                    </div>
                </div>
            );

        return (
            <div>
                <div id="weekCard">
                    {week}
                </div>
                <section
                    id="hourly"
                    style={{ visibility: this.state.active ? "visible" : "hidden" }}
                >

                    <div className="hourlyCard">
                        <div>{this.props.unit == "fahrenheit" ?
                            this.state.morn :
                            Math.round(metric(this.state.morn, "temp"))}&#176;
					    </div>
                        <div>Morning</div>
                    </div>

                    <div className="hourlyCard">
                        <div>{this.props.unit == "fahrenheit" ?
                            this.state.eve :
                            Math.round(metric(this.state.eve, "temp"))}&#176;
					    </div>
                        <div>Evening</div>
                    </div>

                    <div className="hourlyCard">
                        <div>{this.props.unit == "fahrenheit" ?
                            this.state.windSpeed + "Mph" :
                            metric(this.state.windSpeed, "distance") + "Km/h"}
                        </div>
                        <div>Wind Speed</div>
                    </div>

                    <div className="hourlyCard">
                        <div>{this.props.unit == "fahrenheit" ?
                            this.state.dewPoint :
                            Math.round(metric(this.state.dewPoint, "temp"))}&#176;
					    </div>
                        <div>Dew Point</div>
                    </div>

                    <div className="hourlyCard">
                        <div>{this.state.humidity}%</div>
                        <div>Humidity</div>
                    </div>

                </section>
            </div>
        );
    }
});

export default WeekCard;