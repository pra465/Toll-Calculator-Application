import { useSelector } from 'react-redux';
import './App.css';
import Map from './components/Map/Map';
import Search from './components/Search/Search';
import TripCost from './components/TripCost/TripCost';
function App() {
  const cost = useSelector((state) => state.tollCost.cost);
  return (
    <div className="App">
      <h1 id="applicationHeading">Toll Calculator Application</h1>
      <div className="mainContainer">
        <div>
          <Search />
          {cost && <TripCost />}
        </div>
        <Map />
      </div>
    </div>
  );
}

export default App;
