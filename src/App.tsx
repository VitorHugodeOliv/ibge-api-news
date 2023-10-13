import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import Favorites from './Components/Favorites/Favorites';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <MainPage /> } />
      <Route path="/favorites" element={ <Favorites /> } />
    </Routes>
  );
}

export default App;
