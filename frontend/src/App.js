import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Navbar from "./components/navbar.component";
import Home from "./components/place-list.component";
import PlaceRent from "./components/rent.component";

function App() {
  return (
    <Router>
      <Route
        exact
        path="/login"
        render={(props) => (
          <div>
            <Login {...props} />
          </div>
        )}
      />
      <Route
        exact
        path="/register"
        render={(props) => (
          <div>
            <Register {...props} />
          </div>
        )}
      />
      <Route
        exact
        path="/"
        render={(props) => (
          <div>
            <Navbar />
            <Home {...props} />
          </div>
        )}
      />
      <Route
        exact
        path="/rent/:id"
        render={(props) => (
          <div>
            <Navbar />
            <PlaceRent {...props} />
          </div>
        )}
      />
    </Router>
  );
}

export default App;
