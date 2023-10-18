export const getFavoriteNews = () => {
  return JSON.parse(localStorage.getItem('favoriteNews') || '[]');
};

export const addToFavorites = (newsItem: any) => {
  const favoriteNews = getFavoriteNews();
  const index = favoriteNews.findIndex((favorite: any) => favorite.id === newsItem.id);

  if (index !== -1) {
    favoriteNews.splice(index, 1);
  } else {
    favoriteNews.push(newsItem);
  }

  localStorage.setItem('favoriteNews', JSON.stringify(favoriteNews));
};
