import './FirstNews.css';
import moment from 'moment';
import { useEffect, useState } from 'react';
import blackHeart from '../../Imagens/empty_heart.png';
import Heart from '../../Imagens/checked_heart.png';

function FirstNews({ news, favorites }: any) {
  const { titulo, introducao, link, data_publicacao: dataPubli } = news;
  const [isFavorites, setIsFavorites] = useState(false);

  const dataMoment = moment(dataPubli, 'DD/MM/YYYY HH:mm:ss');
  const diasAtras = moment().diff(dataMoment, 'days');

  useEffect(() => {
    // Verifique o localStorage ao montar o componente
    const favoriteNews = JSON.parse(localStorage.getItem('favoriteNews') || '[]');
    const isFavorited = favoriteNews.some((favorite: any) => favorite.id === news.id);
    setIsFavorites(isFavorited);
  }, [news.id]);

  const favoriteNews = JSON.parse(localStorage.getItem('favoriteNews') || '[]');
  const index = favoriteNews.findIndex((favorite: any) => favorite.id === news.id);
  if (index !== -1) {
    favoriteNews.splice(index, 1);
  } else {
    const { id, title, description, data_publicacao: dataPublic } = news;
    favoriteNews.push({ id, title, description, dataPublic });
  }
  localStorage.setItem('favoriteNews', JSON.stringify(favoriteNews));

  const handleClickFavorite = () => {
    favorites(news); // Chame a função de favoritos para adicionar ou remover da lista de favoritos
    setIsFavorites(!isFavorites); // Alterne o estado de favoritos
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
      <div className="">
        <button
          className="first-news-button-read"
          onClick={ handleClick }
        >
          Ler Mais
        </button>
        <div>
          <button onClick={ handleClickFavorite }>
            <img src={ isFavorites ? Heart : blackHeart } alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FirstNews;
