import './App.css';
import Map from './components/Map/Map';
import Search from './components/Search/Search';
function App() {
  return (
    <div className="App">
      <h1 id="applicationHeading">Toll Calculator Application</h1>
      <div className="mainContainer">
        <Search />
        <Map />
      </div>
    </div>
  );
}

export default App;
