import './FirstNews.css';
import moment from 'moment';
import { useEffect, useState } from 'react';
import blackHeart from '../../Imagens/empty_heart.png';
import Heart from '../../Imagens/checked_heart.png';

function FirstNews({ news, favorites }: any) {
  const { titulo, introducao, link, data_publicacao: dataPubli } = news;
  const [isFavorite, setIsFavorite] = useState(false);

  const dataMoment = moment(dataPubli, 'DD/MM/YYYY HH:mm:ss');
  const diasAtras = moment().diff(dataMoment, 'days');

  useEffect(() => {
    const favoriteNews = JSON.parse(localStorage.getItem('favoriteNews') || '[]');
    const isFavorited = favoriteNews.some((favorite: any) => favorite.id === news.id);
    setIsFavorite(isFavorited);
  }, [news.id]);

  const handleClickFavorite = () => {
    favorites({
      id: news.id,
      titulo,
      introducao,
      link,
      data_publicacao: dataPubli,
    });
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
  const indiceFoto = introducao.indexOf('- Foto:');
  const introducaoCurta = indiceFoto !== -1 ? introducao
    .slice(0, indiceFoto) : introducao;

  const handleClick = () => {
    window.open(link);
  };
  return (
    <div className="first-news">
      <h2 className="first-news-title">{titulo}</h2>
      <p className="first-news-intro">{introducaoCurta}</p>
      <p className="first-news-date">
        {formatarData()}
      </p>
      <div className="containe-fist-news-buttons">
        <button
          className="first-news-button-read"
          onClick={ handleClick }
        >
          Ler Mais
        </button>
        <button
          onClick={ handleClickFavorite }
          className="first-news-button-favorite"
        >
          <img src={ isFavorite ? Heart : blackHeart } alt="" />
        </button>
      </div>
    </div>
  );
}

export default FirstNews;
