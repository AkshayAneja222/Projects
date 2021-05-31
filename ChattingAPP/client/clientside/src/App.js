import React from "react";
import Provider from "./context/Provider";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join";
import Chat from "./components/Chat";

const App = () => {
  return (
    <Provider>
      <Router>
        <Route path="/" exact component={Join} />
        <Route exact path="/Chat" component={Chat} />
      </Router>
    </Provider>
  );
};

export default App;
