import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import CitySearch from './components/CitySearch';
import WeekCard from './components/WeekCard';
import Application from './components/Application';
import './styles/bootstrap/css/bootstrap.min.css';
import './styles/main.scss';

ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
      <Switch>

        <Route path="/" component={CitySearch} />

        <Route path="/application" component={Application} />

        <Route path="/week" component={WeekCard} />

      </Switch>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById('root')
);

serviceWorker.register();
