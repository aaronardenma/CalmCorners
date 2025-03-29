import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Map from './components/Map';  // Import the Map component

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <h1>React Application with Multiple Pages</h1>

        <Switch>
          <Route path="/map" component={Map} />  {/* Map Route */}
          <Route path="/" exact>
            <h2>Welcome to the homepage</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
