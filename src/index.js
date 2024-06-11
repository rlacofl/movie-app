// React 라이브러리 import해서 JSX 구문 사용하게 함
import React from 'react';
// ReactDOM 라이브러리의 새로운 루트 API를 import. React 컴포넌트를 실제 DOM에 렌더링하는 데 사용됨
import ReactDOM from 'react-dom/client';
// App 컴포넌트를 import. 애플리케이션의 최상위 컴포넌트(모든 하위 컴포넌트를 포함함)
import App from './App';

// 루트 생성
// index.html 파일 내의 id가 "root"인 <div> 요소를 가져옴
const root = ReactDOM.createRoot(document.getElementById('root'));

// App 컴포넌트를 렌더링 (이 컴포넌트와 그 하위 컴포넌트들이 #root 요소 내에 렌더링됨)
// 애플리케이션을 화면에 표시함
root.render(
  <App />
);

