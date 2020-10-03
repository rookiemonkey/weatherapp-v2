import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class CitySearch extends Component {
    constructor(props) {
        super(props);
        this.state = { city: '' }
    }

    handleChange = event => {
        this.setState({ ...this.state, city: event.target.value });
    };

    render() {
        const { city } = this.state;

        return (
            <div id="search-main">
                <div>
                    <input
                        id="search-input"
                        placeholder="Enter City"
                        name='city'
                        value={this.state.input}
                        onChange={this.handleChange}
                    />
                    <button
                        id="search-button"
                        className="btn"
                    >
                        <Link to={`/application/${city}`}>
                            Search
                        </Link>
                    </button>
                </div>
            </div>
        )
    }
};

export default CitySearch;