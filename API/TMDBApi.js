const API_TOKEN = "ae6c5a2fbc384a1150ecb84ac6d7f0ae"

export function getFilmsFromApiWithSearchedText (text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr?&query=' + text + '&page='+ page
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
  }


export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
  }

export function getFilmDetailFromApi (id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}