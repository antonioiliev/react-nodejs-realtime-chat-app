import React from 'react';
import { Route } from 'react-router-dom';
import routes from '../constants/routes.json';
import axios from 'axios';
import config from '../config';
import DashboardPage from './DashboardPage';
import SignInPage from './SignInPage';

const App = () => {
  // React.useEffect(() => {
  //   console.log('useeffect', process.env.NODE_ENV, config.api_url);
  //   axios.get(config.api_url).then(res => console.log(res));
  // }, []);

  return (
    <div className="App">
      <Route exact path={routes.HOME} component={DashboardPage} />
      <Route path={routes.SIGN_IN} component={SignInPage} />
    </div>
  );
}

export default App;
