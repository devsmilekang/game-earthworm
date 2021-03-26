import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./style.scss";
import GameBoard from "./viewer/GameBoard";
const App: React.FC<{}> = () => {
  return <Router>
    <Switch>
      <Route path="/">
        <GameBoard size={100} />
      </Route>
    </Switch>
  </Router>
};
export default App;