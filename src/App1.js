import { Route, Switch } from "react-router-dom";

import App from "./components/App";
import Jobs from "./components/Jobs";
import specificJobsDetails from "./components/specificJobDetails";
import Bookmarks from "./components/Bookmarks";
import NotFound from "./components/NotFound";
import "./App.css";

function App1() {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/jobs" component={Jobs} />
      <Route exact path="/bookmarks" component={Bookmarks} />
      <Route exact path="/jobs/:id" component={specificJobsDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App1;
