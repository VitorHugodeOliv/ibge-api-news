import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiContext from '../Context/ApiContext';
import NewsCard from './NewsCard/NewsCard';
import { News } from '../types';
import FirstNews from './FirstNews/FirstNews';

export function Index() {
  const { ibgeData } = useContext(ApiContext);
  const [newsCount, setNewsCount] = useState(10);
  const renderNews = ibgeData.slice(0, newsCount);

  const navigate = useNavigate();

  const hanldleClickNavigate = () => {
    navigate('/favorites');
  };

  if (ibgeData.length === 0) {
    return <div>Loading...</div>;
  }
  const loadMore = () => {
    setNewsCount(newsCount + 10);
  };

  const addToFavorites = (newsItem: News) => {
    const isFavorite = JSON.parse(localStorage.getItem('favoriteNews') || '[]');

    // Verifique se a notícia já está nos favoritos
    const index = isFavorite.findIndex((favorite: any) => favorite.id === newsItem.id);

    if (index !== -1) {
      // Se a notícia já está nos favoritos, remova-a da lista
      const updatedFavorites = [...isFavorite];
      updatedFavorites.splice(index, 1);
      localStorage.setItem('favoriteNews', JSON.stringify(updatedFavorites));
    } else {
      // Se a notícia não está nos favoritos, adicione-a à lista
      const { id, title, description, dataPubli } = newsItem;
      const updatedLocalStorage = {
        id,
        title,
        description,
        dataPubli,
      };
      localStorage
        .setItem('favoriteNews', JSON.stringify([...isFavorite, updatedLocalStorage]));
    }
  };

  console.log(ibgeData);
  const firstNews = renderNews[0];
  const remainingNews = renderNews.slice(1);

  return (
    <div>
      {' '}
      <div>
        {firstNews && (
          <div>
            <FirstNews news={ firstNews } favorites={ addToFavorites } />
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
