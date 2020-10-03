import React, { Component } from 'react';
import Navigation from './Navigation';

const darkBackground = "linear-gradient(#01081C, #002AA0)";
const lightBackground = "linear-gradient(#003D8D, #88D5FE)";
const hours = new Date().getHours();

class Error extends Component {

    render() {
        const { dailyForcastTo5, dailyForcastTo7, error } = this.props;

        return (
            <main style={{
                backgroundImage: (hours >= 20 || hours < 5)
                    ? darkBackground
                    : lightBackground
            }}>
                <div id="container">

                    <Navigation
                        dailyForcastTo5={dailyForcastTo5}
                        dailyForcastTo7={dailyForcastTo7}
                    />

                    <div className="loader-container">
                        {error}
                    </div>

                </div>
            </main>
        )
    }
}

export default Error;