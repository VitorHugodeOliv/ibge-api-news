import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiContext from '../Context/ApiContext';
import { NewsCard } from './NewsCard/NewsCard';
import { addToFavorites } from '../Service/addToFavorites';
import arrow from '../Imagens/seta-para-baixo.png';
import arrowUp from '../Imagens/seta-para-cima.png';
import FirstNews from './FirstNews/FirstNews';
import './Index.css';

export function Index() {
  const { ibgeData } = useContext(ApiContext);
  const [newsCount, setNewsCount] = useState(10);
  const [isFavorites, setIsFavorites] = useState(false);
  const [reversed, setReversed] = useState(false);
  const reversedIbgeData = [...ibgeData].reverse();
  const renderNewsReversed = reversedIbgeData.slice(0, newsCount);
  const renderNews = ibgeData.slice(0, newsCount);

  const navigate = useNavigate();

  const toggleFavorite = () => {
    setIsFavorites(!isFavorites);
  };

  const toggleReversed = () => {
    setReversed(!reversed);
  };

  const hanldleClickNavigate = () => {
    navigate('/favorites');
  };

  if (ibgeData.length === 0) {
    return <div>Loading...</div>;
  }
  const loadMore = () => {
    setNewsCount(newsCount + 6);
  };

  const firstNews = renderNews[0];
  const remainingNews = renderNews.slice(1);
  const imagensObj = JSON.parse(firstNews.imagens);

  return (
    <div>
      {' '}
      <button onClick={ hanldleClickNavigate }>Favoritos</button>
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
      <div className="container-buttons-filter">
        <button
          onClick={ toggleReversed }
        >
          Data
          <img src={ !reversed ? arrowUp : arrow } alt="" width="30px" />
        </button>
      </div>
      <div className="news-container">
        {!reversed ? (remainingNews.map((res) => {
          return (
            <ul key={ res.id }>
              <NewsCard news={ res } favorites={ addToFavorites } />
            </ul>
          );
        })) : (renderNewsReversed.map((news) => {
          return (
            <ul key={ news.id }>
              <NewsCard news={ news } favorites={ addToFavorites } />
            </ul>
          );
        })) }
      </div>
      {newsCount < ibgeData.length && (
        <button
          className="btn-load-more"
          onClick={ loadMore }
        >
          Mais Notícias

        </button>
      )}
    </div>
  );
}
