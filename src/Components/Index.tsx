import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiContext from '../Context/ApiContext';
import { NewsCard } from './NewsCard/NewsCard';
import { addToFavorites } from '../Service/addToFavorites';
import FirstNews from './FirstNews/FirstNews';
import './Index.css';

export function Index() {
  const { ibgeData } = useContext(ApiContext);
  const [newsCount, setNewsCount] = useState(10);
  const [isFavorites, setIsFavorites] = useState(false);
  const renderNews = ibgeData.slice(0, newsCount);

  const navigate = useNavigate();

  const toggleFavorite = () => {
    setIsFavorites(!isFavorites);
  };

  const hanldleClickNavigate = () => {
    navigate('/favorites');
  };

  if (ibgeData.length === 0) {
    return <div>Loading...</div>;
  }
  const loadMore = () => {
    setNewsCount(newsCount + 10);
  };

  const firstNews = renderNews[0];
  const remainingNews = renderNews.slice(1);
  const imagensObj = JSON.parse(firstNews.imagens);

  return (
    <div>
      {' '}
      <div>
        {firstNews && (
          <div className="container-first-news">
            <img
              className="img-first-news"
              src={ `https://agenciadenoticias.ibge.gov.br/${imagensObj.image_intro}` }
              alt="errode"
            />
            <FirstNews
              news={ firstNews }
              favorites={ addToFavorites }
              saveFavorites={ toggleFavorite }
            />
          </div>
        )}
      </div>
      <div>
        <button onClick={ hanldleClickNavigate }>Favoritos</button>
      </div>
      <div className="news-container">
        {remainingNews.map((res) => {
          return (
            <ul key={ res.id }>
              <NewsCard news={ res } favorites={ addToFavorites } />
            </ul>
          );
        })}
      </div>
      {newsCount < ibgeData.length && (
        <button onClick={ loadMore }>Mais Notícias</button>
      )}

    </div>
  );
}
