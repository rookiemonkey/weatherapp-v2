import React, { Component } from 'react'
import DelayLink from './mini/Link';

let lat = '';
let lon = '';
let city = '';

class CitySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateCity = this.updateCity.bind(this);
    }

    updateCity() {
        let geoAPI = "https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.input + "&key=AIzaSyB_oG1OC4gzj7MvBJyUVQTJqGCAoUmeCeE&libraries=places";
        let request = new XMLHttpRequest();
        request.open("GET", geoAPI, true);
        request.onload = () => {
            city = JSON.parse(request.response).results[0].formatted_address;
            lat = JSON.parse(request.response).results[0].geometry.location.lat;
            lon = JSON.parse(request.response).results[0].geometry.location.lng;
        }
        request.send();
    };

    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    };

    render() {
        return (
            <div id="search-main">
                <div>
                    <input
                        id="search-input"
                        placeholder="Enter City"
                        value={this.state.input}
                        onChange={this.handleChange} />
                    <button id="search-button" className="btn" onClick={this.updateCity}>
                        <DelayLink to="/application" delay={800} className="btn" />
                    </button>
                </div>
            </div>
        )
    }
};

export default CitySearch;