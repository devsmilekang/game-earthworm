import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WarmGame from './viewer/WarmGame';

const App: React.FC<{}> = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <WarmGame />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
