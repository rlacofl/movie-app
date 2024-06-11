import React from 'react';

const MovieList = (props) => {
  // Check if props.movies is an array before trying to map over it
  const movies = Array.isArray(props.movies) ? props.movies : []; // 없으니까 오류생김

  return (
    <div className='d-flex flex-row flex-nowrap overflow-auto'>
      {movies.map((movie) => (
        <div className='image-container d-flex flex-column m-3' key={movie.imdbID}>
          <img src={movie.Poster} alt='movie'></img>

          <div
            className='overlay d-flex align-items-center justify-content-center'
            onClick={() => props.handleClick(movie)}
          >
            <span className='me-2'>{props.addMovie ? '선호작 추가' : '선호작 제거'}</span>
            <span>{props.addMovie ? '❤️' : '❌'}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
