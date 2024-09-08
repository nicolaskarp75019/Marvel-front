export const getFavorites = (type) => {
  const favorites = localStorage.getItem(`marvel_favorites_${type}`);
  return favorites ? JSON.parse(favorites) : [];
};

export const saveFavorites = (type, items) => {
  localStorage.setItem(`marvel_favorites_${type}`, JSON.stringify(items));
};

export const isFavorite = (type, id) => {
  const favorites = getFavorites(type);
  return favorites.some((item) => item._id === id);
};

export const addFavorite = (type, item) => {
  const favorites = getFavorites(type);
  if (!isFavorite(type, item._id)) {
    favorites.push(item);
    saveFavorites(type, favorites);
  }
};

export const removeFavorite = (type, id) => {
  let favorites = getFavorites(type);
  favorites = favorites.filter((item) => item._id !== id);
  saveFavorites(type, favorites);
};
