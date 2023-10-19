import './App.css';
import { useEffect, useState } from 'react';
import MainPage from './Pages/MainPage';
import loading from './Video/Design sem nome.mp4';

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
        <video src={ loading } autoPlay muted>
          <track kind="captions" />
        </video>
      )}
    </div>
  );
}

export default App;
