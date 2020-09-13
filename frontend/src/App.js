import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Navbar from "./components/navbar.component";
import Home from "./components/place-list.component";
import PlaceRent from "./components/rent.component";
import User from "./components/user.component";

function App() {
  axios.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("tokenAircnc");

      console.log(token);

      if (
        token &&
        (!config.url.endsWith("login") || !config.url.endsWith("register"))
      ) {
        config.headers.authorization = "Bearer " + token;

        console.log(config.headers.authorization);
      }

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        window.location = "/login";
      }
      return Promise.reject(error);
    }
  );
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
        path="/user"
        render={(props) => (
          <div>
            <Navbar />
            <User {...props} />
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
