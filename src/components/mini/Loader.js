import React, { Component } from 'react';
import Navigation from './Navigation';

const darkBackground = "linear-gradient(#01081C, #002AA0)";
const lightBackground = "linear-gradient(#003D8D, #88D5FE)";
const hours = new Date().getHours();

class Loader extends Component {

    render() {
        const { darkMode, dailyForcastTo5, dailyForcastTo7 } = this.props;

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

                    <div class="loader-container">
                        <div class="loader five"></div>
                        <br />
                        <h5>Please Wait</h5>
                    </div>

                </div>
            </main>
        )
    }
}

export default Loader;