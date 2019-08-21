import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import CandidateList from "./components/CandidateList";
import BecomeCandidate from "./components/BecomeCandidate";
import VoterDetails from "./components/VoterDetails";
import Result from "./components/Result";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/index";
import CheckOtp from "./components/CheckOtp";

const store = createStore(reducer);

const routes = (
  <Router>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/checkotp" component={CheckOtp} />
    <Route path="/voter/details" component={VoterDetails} />
    <Route path="/candidate/list" component={CandidateList} />
    <Route path="/candidate/details" component={BecomeCandidate} />
    <Route path="/results" component={Result} />
  </Router>
);

ReactDOM.render(
  <Provider store={store}>{routes}</Provider>,
  document.getElementById("root")
);
