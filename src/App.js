
import './App.css';
import Home from './Components/Home';
import { Route, Routes } from 'react-router';
import Watchlist from './Components/Watchlist';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/'element={
          <>
            <Home />
          </>
        }>
        </Route>
        <Route path='/watchlist' element={
          <>
            <Watchlist />
          </>
        }>
        </Route>
      </Routes>
      
    </>
  );
}

export default App;
