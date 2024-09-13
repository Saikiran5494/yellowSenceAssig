import { Link } from "react-router-dom";
import "./index.css";

const App = () => {
  return (
    <div className="app-container">
      <div className="heading-container">
        <h1 className="heading">Let's Find a best Suitable Job for you!</h1>
        <div className="buttons-container">
          <Link to="/jobs">
            <button type="button" className="button">
              Jobs
            </button>
          </Link>
          <Link to="/bookmarks">
            <button type="button" className="button">
              Bookmarks
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
