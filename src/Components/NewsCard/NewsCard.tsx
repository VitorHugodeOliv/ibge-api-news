import './NewsCard.css';
import moment from 'moment';

function NewsCard({ news, favorites }: any) {
  const { titulo, introducao, link, data_publicacao: dataPubli } = news;

  const dataMoment = moment(dataPubli, 'DD/MM/YYYY HH:mm:ss');
  const diasAtras = moment().diff(dataMoment, 'days');

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
      <p className="news-intro">{introducao}</p>
      <p className="news-date">
        {formatarData()}
      </p>
      <button
        className="read-more"
        onClick={ handleClick }
      >
        Ler Mais
      </button>
      <div className="favorite-button">
        <button onClick={ () => favorites(news) }>Adicionar aos Favoritos</button>
      </div>
    </div>
  );
}

export default NewsCard;
