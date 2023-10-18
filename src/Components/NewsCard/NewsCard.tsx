import './NewsCard.css';
import moment from 'moment';
import { useEffect, useState } from 'react';
import blackHeart from '../../Imagens/empty_heart.png';
import Heart from '../../Imagens/checked_heart.png';

export function NewsCard({ news, favorites }: any) {
  const { titulo, introducao, link, data_publicacao: dataPubli } = news;
  const [isFavorite, setIsFavorite] = useState(false);

  const dataMoment = moment(dataPubli, 'DD/MM/YYYY HH:mm:ss');
  const diasAtras = moment().diff(dataMoment, 'days');
  const indiceFoto = introducao.indexOf('- Foto:');
  const introducaoCurta = indiceFoto !== -1 ? introducao
    .slice(0, indiceFoto) : introducao;

  useEffect(() => {
    const favoriteNews = JSON.parse(localStorage.getItem('favoriteNews') || '[]');
    const isFavorited = favoriteNews.some((favorite: any) => favorite.id === news.id);
    setIsFavorite(isFavorited);
  }, [news.id]);

  const favoriteNews = JSON.parse(localStorage.getItem('favoriteNews') || '[]');
  const index = favoriteNews.findIndex((favorite: any) => favorite.id === news.id);
  if (index !== -1) {
    favoriteNews.splice(index, 1);
  } else {
    favoriteNews.push(
      { id: news.id,
        title: titulo,
        description: introducaoCurta,
        dataPublicacao: dataPubli },
    );
  }
  localStorage.setItem('favoriteNews', JSON.stringify(favoriteNews));

  const handleClickFavorite = () => {
    favorites(news);
    setIsFavorite(!isFavorite);
  };

  const formatarData = () => {
    if (diasAtras === 0) {
      return 'Hoje';
    } if (diasAtras === 1) {
      return 'Ontem';
    }
    return `${diasAtras} dias atrás`;
  };

  const handleClick = () => {
    window.open(link);
  };

  return (
    <div className="news-card">
      <h2 className="news-title">{titulo}</h2>
      <p className="news-intro">{introducaoCurta}</p>
      <p className="news-date">
        {formatarData()}
      </p>
      <div className="button-container">
        <button
          className="read-more"
          onClick={ handleClick }
        >
          Ler Mais
        </button>
        <div>
          <button onClick={ handleClickFavorite }>
            <img src={ isFavorite ? Heart : blackHeart } alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
