import React, { useState, useEffect } from 'react'
import { Search } from 'react-feather';

const SearchInput = ({updateQuery}) => {

  const [inputLength, setInputLength] = useState(0);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [searchState, setSearchState] = useState(false)

  const handleOnChange = event => {
    setQuery(event.target.value);
    event.target.value.length > 0 ? setInputLength(event.target.value.length) : setInputLength(0);
  };

  const handleClick = (string) => {
    setSearchState(true)
    console.log('clicked')
    updateQuery(string)
  }

  const handleKeyPress = (event) => {
    if (event.charCode === 13 && inputLength > 0) {
      handleClick(query)
    }
  }

  const handleClear = () => {
    setSearchState(false)
    setInputLength(0)
    setQuery('')
    updateQuery('')
  }

  useEffect(() => {
    const onScroll = e => {
      let pinState = window.scrollY > window.innerHeight*.8;
      pinState ? setScrolled(true) : setScrolled(false)
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  return (
    <div className={`flex w-full border-gray-400 items-center px-4 bg-white ${scrolled ? 'pinned' : 'un-pinned'}`}>
      <div className={`h-6 w-6 ${inputLength > 0 ? 'text-indigo-500' : 'text-gray-400'}`}>
        <Search/>
      </div>
      {
        searchState ? (
          <span
            className="transition px-3 py-1 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 shadow-inner text-sm rounded-full text-white inline-flex items-center ml-4 my-4"
            role="button"
            onClick={() => setSearchState(false)}
          >
            {query}
            <button className="ml-2 transition rounded-full hover:bg-indigo-500 hover:text-white" onClick={() => handleClear()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </span>
        )
        :
        (
          <input
            className="p-4 text-lg rounded-md w-full flex focus:outline-none"
            type="text"
            placeholder="Search for a theme..."
            value={query} 
            onChange={handleOnChange}
            onKeyPress={handleKeyPress}
          />
        )
      }
      {
        inputLength > 0 && !searchState ?
        (
          <button
            className="button button--sm"
            onClick={() => handleClick(query)}
          >
            Search
          </button>
        )
        :
        null
      }
    </div>
  )
};

export default SearchInput;