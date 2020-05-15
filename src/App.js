import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

import Home from './container/Home/Home';
import Orders from './component/Orders';
import Profile from './component/Profile';
import NoMatch from './component/NoMatch';
import Layout from './container/Layout';
import NavigationBar from './container/NavigationBar';

function App() {
  return (
    <React.Fragment>
      <Layout>
        <NavigationBar />
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/orders" component={Orders}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/nomatch" component={NoMatch}/>
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>
  );
}

export default App;
