import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navigation extends Component {

    render() {
        const { dailyForcastTo7, dailyForcastTo5 } = this.props;

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">

                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Weather App</a>
                    </div>


                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/" className="btn">
                                    City Search
                                </Link>
                            </li>

                            <li className="dropdown">

                                <a
                                    href="#"
                                    className="dropdown-toggle"
                                    data-toggle="dropdown"
                                    role="button"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >Forcast <span className="caret"></span></a>

                                <ul className="dropdown-menu">
                                    <li>
                                        <a
                                            href="#"
                                            className="btn btn-custom"
                                            onClick={dailyForcastTo5}
                                        > 5-Day Forecast</a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="btn btn-custom"
                                            onClick={dailyForcastTo7}
                                        > 7-Day Forecast</a>
                                    </li>
                                </ul>

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navigation;