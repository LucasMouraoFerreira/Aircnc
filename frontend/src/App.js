import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/login.component";
import Register from "./components/register.component";

function App() {
  return (
    <Router>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <div className="container"></div>
    </Router>
  );
}

export default App;
