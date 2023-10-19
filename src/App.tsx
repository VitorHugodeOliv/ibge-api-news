import './App.css';
import { useEffect, useState } from 'react';
import MainPage from './Pages/MainPage';

function App() {
  const [bodyLoaded, setBodyLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setBodyLoaded(true);
    }, 2000);
  }, []);
  return (
    <div>
      {bodyLoaded ? (
        <MainPage />
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
export default App;
