import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import CitySearch from './components/CitySearch';
import WeekCard from './components/WeekCard';
import Application from './components/Application';

ReactDOM.render(

  <React.StrictMode>
    <Switch>

      <Route path="/" component={CitySearch} />

      <Route path="/application" component={Application} />

      <Route path="/week" component={WeekCard} />

    </Switch>
  </React.StrictMode>,

  document.getElementById('root')
);

serviceWorker.register();
