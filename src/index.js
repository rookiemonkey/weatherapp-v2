import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import CitySearch from './components/CitySearch';
import Application from './components/Application';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/scss/main.scss';

ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
      <Switch>

        <Route exact path="/" component={CitySearch} />

        {/* in case there is no input */}
        <Route
          exact
          path="/application"
          render={routerProps => routerProps.history.push('/')}
        />

        <Route path="/application/:city" component={Application} />

      </Switch>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById('root')
);

serviceWorker.register();
