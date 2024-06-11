// React 라이브러리 import. 상태 관리를 위해 useState와 사이드 이펙트를 처리하기 위해 useEffect 훅 사용
import React, { useState, useEffect } from 'react';
// 부트스트랩 먼저, 그 다음 custom css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// 컴포넌트, 패키지 import
import MovieList from './components/MovieList.jsx';
import MovieListHeading from './components/MovieListHeading.jsx';
import SearchBox from './components/SearchBox.jsx';
import ScrollContainer from 'react-indiana-drag-scroll';


function App() {
  // 상태 변수 정의 (movies, searchValue, favorites), 초기값 설정
  // const : 변수 선언 키워드. const로 선언된 변수는 재할당이 불가능하지만 객체나 배열의 경우 내부 값은 변경 가능
  // useState : React 훅(Hook). 함수형 컴포넌트에서 상태 변수를 선언하고 관리하기 위해 사용됨. 상태는 컴포넌트의 동적인 데이터를 저장. 변경 시 컴포넌트의 재렌더링을 트리거함 (('') : 호출하여 초기 상태 값을 빈 문자열로 설정함.)
  // movies, setMovies : useState 훅은 배열을 반환하는데, 이 배열의 첫 번째 요소는 현재 상태 값(movies), 두 번째 요소는 상태 값을 업데이트할 수 있는 함수(setMovies) 
  // const [movies, setMovies]: useState 훅이 반환하는 배열을 구조 분해 할당(destructuring assignment)을 통해 두 개의 변수로 분리함.
  const [movies, setMovies] = useState(''); // movies 상태 변수와 setMovies 상태 업데이트 함수 생성. 초기값을 빈 문자열로 설정. 상태를 업데이트하기 위해 setMovies 함수 사용
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]); // [movie1, movie2, movie3

  // 영화 데이터 가져오기 함수
  const getMovieRequest = async (searchValue) => {
    // searchValue를 사용하여 OMDB API에 요청을 보내고 응답을 받아서 responseJson.Search에 저장
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=c8583b51`;

    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson.Search);

    // 검색 결과가 있으면 movies 상태를 업데이트
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    } else {
      setMovies([]); // 검색 결과가 없으면 빈 배열로 설정
    }
  };


  // 검색 값 변경 시 영화 데이터 가져오기 (searchValue가 3자 이상일 때, getMovieRequest 함수 호출하여 영화 검색)
  useEffect(() => {
    if (searchValue.length > 3) {
      // searchValue가 변경될 때마다 이 효과가 실행됨
      getMovieRequest(searchValue);
    }
  }, [searchValue]);

  // 로컬 스토리지에서 즐겨찾기 불러오기 (컴포넌트가 처음 마운트 될 때, 로컬 스토리지에서 즐겨찾기 목록을 불러와서 favorites 상태를 초기화)
  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (movieFavorites) {
      setFavorites(movieFavorites);
    }
  }, []);

  // 즐겨찾기 목록 로컬 스토리지에 저장 (favorites 목록을 JSON 문자열로 변환하여 로컬 스토리지에 저장하는 함수)
  // const saveToLocalStorage = (items) => {
  //   localStorage.setItem('favorites', JSON.stringify(items));
  // };

  // 즐겨찾기 목록에 영화 추가 (선택된 영화를 즐겨찾기 목록에 추가하고, 상태 업데이트, 로컬 스토리지에 저장)
  const addFavoriteMovie = (movie) => {
    const newList = [...favorites, movie];
    setFavorites(newList);
    localStorage.setItem('favorites', JSON.stringify(newList));  // 저장소 저장
  };

  // 즐겨찾기 목록에 영화 제거 (선택된 영화를 즐겨찾기 목록에서 제거하고, 상태 업데이트, 로컬 스토리지에 저장)
  const removeFavoriteMovie = (movie) => {
    const newList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(newList);
    // saveToLocalStorage(newList);
    localStorage.setItem('favorites', JSON.stringify(newList));  // 저장소 저장 (saveToLocalStorage 대신)
  };


  return (
    // 컴포넌트 렌더링 : MovieListHeading, SearchBox 컴포넌트를 포함하는 첫 번째 행을 렌더링
    <div className='container-fluid movie-app'>
      <div className='row align-items-center my-4'>
        <MovieListHeading heading='영화 검색과 선호작 등록' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      {/* 영화 목록 스크롤 컨테이너 (react-indiana-drag-scroll을 사용하여 스크롤 가능한 영화 목록 렌더링) - MovieList 컴포넌트는 movies 데이터를 받고, 클릭 시 addFavoriteMovie 함수 호출 */}
      <ScrollContainer className="row scroll-container">
        <MovieList
          movies={movies}
          handleClick={addFavoriteMovie}
          addMovie={true}
        />
      </ScrollContainer>

      {/* 즐겨찾기 목록 렌더링 - MovieListHeading 컴포넌트를 사용하여 스크롤 가능한 즐겨찾기 영화 목록을 렌더링. MovieList 컴포넌트를 사용하여 favorites 데이터를 받고 클릭 시 removeFavoriteMovie 함수 호출 */}
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

// App 컴포넌트 내보내기 (App 컴포넌트를 내보내서 다른 파일에서 사용할 수 있도록 함)
export default App;