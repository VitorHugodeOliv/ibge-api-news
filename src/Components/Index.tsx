import { useContext, useState } from 'react';
import ApiContext from '../Context/ApiContext';
import { NewsCard } from './NewsCard/NewsCard';
import { addToFavorites } from '../Service/addToFavorites';
import arrow from '../Imagens/seta-para-baixo.png';
import arrowUp from '../Imagens/seta-para-cima.png';
import lupaSearch from '../Imagens/lupa.png';
import FirstNews from './FirstNews/FirstNews';
import './Index.css';
import { ApiType } from '../types';

export function Index() {
  const { ibgeData } = useContext(ApiContext);
  const [newsCount, setNewsCount] = useState(10);
  const [isFavorites, setIsFavorites] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [search, setSearch] = useState('');
  const reversedIbgeData = [...ibgeData].reverse();
  const renderNewsReversed = reversedIbgeData.slice(0, newsCount);
  const renderNews = ibgeData.slice(0, newsCount);

  const toggleFavorite = () => {
    setIsFavorites(!isFavorites);
  };

  const toggleReversed = () => {
    setReversed(!reversed);
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
      <label
        htmlFor="searchInput"
        className="search-label"
      >
        <img
          src={ lupaSearch }
          alt="lupa"
          className="lupa-search"
        />
        <input
          type="text"
          placeholder="Pesquise pelo título da notícia"
          name="searchInput"
          value={ search }
          className="search-input"
          onChange={ (e) => setSearch(e.target.value) }
        />
      </label>
      <div className="container-buttons-filter">
        <button
          onClick={ toggleReversed }
          className="btn-filter-date"
        >
          {reversed ? 'Mais Recentes' : 'Mais Antigas'}
          <img
            src={ reversed ? arrowUp : arrow }
            alt="seta para cima e seta para baixo"
            className="arrow-search"
          />
        </button>
        <button
          className="btn-filter-favorites"
        >
          Mostrar noticias Favoritas
        </button>
      </div>
      <div className="news-container">
        {!reversed ? (remainingNews.filter((planet:ApiType) => planet.titulo.toLowerCase()
          .includes(search.toLowerCase()))
          .map((res) => {
            return (
              <ul key={ res.id }>
                <NewsCard news={ res } favorites={ addToFavorites } />
              </ul>
            );
          })) : (renderNewsReversed.filter((planet:ApiType) => planet.titulo.toLowerCase()
          .includes(search.toLowerCase()))
          .map((news) => {
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
