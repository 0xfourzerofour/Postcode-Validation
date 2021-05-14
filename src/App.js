import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Landing, Form } from './Components';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/form" component={Form} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
