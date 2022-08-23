import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState();
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);

  const moviePageNext = e => {
    setPage(page + 1);
    fetchApi(e);
  };
  const moviePagePrev = e => {
    setPage(page - 1);
    fetchApi(e);
  };

  const fetchApi = async e => {
    e.preventDefault();
    const api = "978529128aba72580ed67864b4b12458";
    let result = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api}&language=en-US&query=${query}&page=${page}&include_adult=false`
    );
    result = await result.json();

    setSearch(result.results);

    if (search) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    if (query === "") {
      setShow(false);
    }
  }, [query]);
  return (
    <>
      <form onSubmit={fetchApi} className='flex items-center mx-16 my-8'>
        <div className='relative w-full'>
          <input
            onChange={e => setQuery(e.target.value)}
            type='search'
            id='simple-search'
            className='bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search Movie'
            required
          />
        </div>
        <button
          onClick={fetchApi}
          type='submit'
          className='p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            ></path>
          </svg>
          <span className='sr-only'>Search</span>
        </button>
      </form>
      {show && search.length > 0 && (
        <h4 className='text-center text-2xl'>Search Related</h4>
      )}
      <div className='flex justify-center flex-wrap mx-8'>
        {show &&
          search.length > 0 &&
          search.map(
            item =>
              item.backdrop_path && (
                <div
                  key={item.id}
                  className=' m-4 shadow-lg bg-gray-200 max-w-xs '
                >
                  <Link to={`/movie/${item.id}`}>
                    <img
                      className=''
                      src={`https://images.tmdb.org/t/p/original/${item.backdrop_path}`}
                      alt=''
                    />
                  </Link>
                  <div className='p-6 h-24'>
                    <h5 className='text-gray-900 text-xl font-medium mb-2 text-left'>
                      {item.title.slice(0, 20)}
                      {item.title.length > 20 ? "..." : ""}
                    </h5>
                    <p className='text-gray-700 text-base mb-4 text-left flex  '>
                      <span className='flex items-center mr-2'>
                        <img
                          className='w-4  '
                          src='https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png'
                        />
                      </span>{" "}
                      {item.vote_average} / 10
                    </p>
                  </div>
                </div>
              )
          )}
        {show && !search.length && "No Result Found"}
      </div>
      {show && search.length > 0 && (
        <button
          className='m-4 flex float-right border p-4 w-20 h-4 justify-center items-center mr-20'
          onClick={moviePageNext}
        >
          Next
        </button>
      )}{" "}
      {show && search.length > 0 && (
        <button
          disabled={page > 1 ? false : true}
          className='m-4 flex float-left border p-4 w-20 h-4 justify-center items-center ml-20'
          onClick={moviePagePrev}
        >
          Prev
        </button>
      )}
    </>
  );
};

export default Search;
