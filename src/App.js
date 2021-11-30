import styled from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import TheGraph from "./TheGraph";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<TheGraph/>}/>
          {/* <Route path="/api">
            <DatasetApi />
          </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
