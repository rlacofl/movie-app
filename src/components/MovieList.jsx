// React 컴포넌트를 정의, 사용하기 위해 React 라이브러리를 import
import React from 'react';

// MovieList 컴포넌트 정의 : 화살표 함수를 사용. props를 매개변수로 전달받음
const MovieList = (props) => {
  // 영화 목록 유효성 검사 : props.movies가 배열이면 movies에 할당, 아니면 빈 배열 할당 (오류 방지)
  const movies = Array.isArray(props.movies) ? props.movies : []; // 없으니까 오류생김

  // MovieList 컴포넌트가 반환하는 JSX 정의
  return (
    // 컴포넌트 반환: MovieList 컴포넌트가 반환하는 JSX를 정의합니다. 최상위 요소는 div로, 영화 목록을 가로로 스크롤할 수 있게 하기 위해 Bootstrap 클래스인 d-flex flex-row flex-nowrap overflow-auto를 적용합니다.
    <div className='d-flex flex-row flex-nowrap overflow-auto'>
      {/* 영화 목록 순회: movies 배열을 map 함수를 사용하여 순회합니다. 각 영화에 대해 새로운 div 요소를 생성합니다. */}
      {movies.map((movie) => (
        // 영화 컨테이너: 각 영화에 대해 div 요소를 생성하고, Bootstrap 클래스를 사용하여 스타일을 지정합니다. key 속성으로 영화의 imdbID를 설정하여 각 요소가 고유함을 보장합니다.
        <div className='image-container d-flex flex-column m-3' key={movie.imdbID}>
          {/* 영화 포스터: img 요소를 사용하여 영화 포스터를 표시합니다. src 속성은 movie.Poster를 사용하고, alt 속성은 'movie'로 설정합니다. */}
          <img src={movie.Poster} alt='movie'></img>

          {/* 오버레이 컨테이너: div 요소를 사용하여 오버레이를 생성합니다. 이 요소는 영화 포스터 위에 겹쳐지며, 클릭 이벤트가 발생하면 props.handleClick(movie) 함수가 호출됩니다. 오버레이는 Bootstrap 클래스를 사용하여 중앙에 정렬됩니다. */}
          <div
            className='overlay d-flex align-items-center justify-content-center'
            onClick={() => props.handleClick(movie)}
          >
            {/* 오버레이 텍스트: span 요소를 사용하여 오버레이의 텍스트를 설정합니다. props.addMovie가 true이면 '선호작 추가'를, 그렇지 않으면 '선호작 제거'를 표시합니다. */}
            <span className='me-2'>{props.addMovie ? '선호작 추가' : '선호작 제거'}</span>
            {/* 오버레이 아이콘: 또 다른 span 요소를 사용하여 오버레이의 아이콘을 설정합니다. props.addMovie가 true이면 '❤️'를, 그렇지 않으면 '❌'를 표시합니다. */}
            <span>{props.addMovie ? '❤️' : '❌'}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
// MovieList 컴포넌트 내보내기: MovieList 컴포넌트를 내보내서 다른 파일에서 사용할 수 있도록 합니다.
export default MovieList;
