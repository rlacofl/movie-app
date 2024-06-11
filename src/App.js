import React, { useState, useEffect } from 'react';
// 부트스트랩 먼저, 그 다음 custom css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList.jsx';
import MovieListHeading from './components/MovieListHeading.jsx';
import SearchBox from './components/SearchBox.jsx';
import ScrollContainer from 'react-indiana-drag-scroll';


function App() {
  const [movies, setMovies] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]); // [movie1, movie2, movie3

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=c8583b51`;

    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson.Search);

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    } else {
      setMovies([]); // 검색 결과가 없으면 빈 배열로 설정
    }
  };



  useEffect(() => {
    if (searchValue.length > 3) {
      getMovieRequest(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (movieFavorites) {
      setFavorites(movieFavorites);
    }
  }, []);

  // const saveToLocalStorage = (items) => {
  //   localStorage.setItem('favorites', JSON.stringify(items));
  // };

  const addFavoriteMovie = (movie) => {
    const newList = [...favorites, movie];
    setFavorites(newList);
    localStorage.setItem('favorites', JSON.stringify(newList));  // 저장소 저장
  };

  const removeFavoriteMovie = (movie) => {
    const newList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(newList);
    // saveToLocalStorage(newList);
    localStorage.setItem('favorites', JSON.stringify(newList));  // 저장소 저장 (saveToLocalStorage 대신)
  };



  return (
    <div className='container-fluid movie-app'>
      <div className='row align-items-center my-4'>
        <MovieListHeading heading='영화 검색과 선호작 등록' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <ScrollContainer className="row scroll-container">
        <MovieList
          movies={movies}
          handleClick={addFavoriteMovie}
          addMovie={true}
        />
      </ScrollContainer>

      <div className='row align-items-center my-4'>
        <MovieListHeading heading='내 선호작' />
      </div>

      <ScrollContainer className="row scroll-container">
        <MovieList
          movies={favorites}
          handleClick={removeFavoriteMovie}
          addMovie={false}
        />
      </ScrollContainer>
    </div>
  );
}

export default App;