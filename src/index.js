import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import CitySearch from './components/CitySearch';
import WeekCard from './components/WeekCards';
import Application from './components/Application';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/scss/main.scss';

ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
      <Switch>

        <Route exact path="/" component={CitySearch} />

        <Route path="/application/:city" component={Application} />

      </Switch>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById('root')
);

serviceWorker.register();
