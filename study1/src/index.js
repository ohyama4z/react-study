import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
} from "react-router-dom";

import Tutorial from "./components/Tutorial";
import Sugoroku from "./components/Sugoroku";
const Home = (props) => {
  return (
    <Router>
      <div>
        <Link to="/Tutorial">Tutorial</Link>
      </div>
      <div>
        <Link to="/Sugoroku">Sugoroku</Link>
      </div>
      <Redirect from="/" to="/Tutorial" />
      <Route path="/Tutorial" component={Tutorial} />
      <Route path="/Sugoroku" component={Sugoroku} />
    </Router>
  );
};
ReactDOM.render(<Home />, document.getElementById("root"));
