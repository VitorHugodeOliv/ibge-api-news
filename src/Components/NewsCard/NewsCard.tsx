import './NewsCard.css';

function NewsCard({ news, favorites }: any) {
  const { titulo, introducao, link, data_publicacao: dataPubli } = news;

  const handleClick = () => {
    window.open(link);
  };
  return (
    <div className="news-card">
      <h2 className="news-title">{titulo}</h2>
      <p className="news-intro">{introducao}</p>
      <p className="news-date">
        {dataPubli}
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
