import './App.css';
import { Router } from "@reach/router";
import MapSample from './MapSample/MapSample';
import Autocomplete from './Autocomplete/Autocomplete';
import MarkerSample from "./MakerSample/MarkerSample";
import Direction from "./DirectionSample/DirectionSample"

function App() {

  return (

    <div id="App">
      <Router>
        <MapSample path="/" />
        <MarkerSample path="/marker" />
        <Autocomplete path="/autocomplete" />
        <Direction path="/direction" />
      </Router>
    </div>
  );
}

export default App;
