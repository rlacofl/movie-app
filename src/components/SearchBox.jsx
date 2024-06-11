import React from 'react';

const SearchBox = (props) => {
  // const handleChange = (e) => {
  //   props.setSearchValue(e.target.value);
  // };

  return (
    <div className='col col-sm-4'>
      <input
        className='form-control'
        value={props.searchValue}
        // onChange={handleChange}
        onChange={(event) => props.setSearchValue(event.target.value)}
        placeholder='영화 검색...'
      />
    </div>
  );
};

export default SearchBox;
