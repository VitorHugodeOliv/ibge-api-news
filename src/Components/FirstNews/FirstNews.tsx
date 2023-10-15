import './FirstNews.css';
import moment from 'moment';

function FirstNews({ news, favorites }: any) {
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
        <div className="first-news-button-favorite">
          <button onClick={ () => favorites(news) }>Adicionar aos Favoritos</button>
        </div>
      </div>
    </div>
  );
}

export default FirstNews;
