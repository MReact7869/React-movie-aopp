import React, { useContext, useEffect } from "react";
import { movieContext } from "../../Context/MovieContext";
import { Link } from "react-router-dom";
import Search from "../Search/Search";

const Home = () => {
  const { movie, moviePage, moviePagePrev, page, detail } =
    useContext(movieContext);

  const nextPage = () => {
    moviePage();
  };
  const prevPage = () => {
    moviePagePrev();
  };

  return (
    <>
      <Search />
      <br />
      <br />
      <br />
      <strong>
        <h1 className='ml-20 mb-4 font-thin text-4xl'>Tranding</h1>
      </strong>
      <div className='flex justify-center flex-wrap mx-8'>
        {movie.map(
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
      </div>
      <button
        disabled={detail.total_pages < 34820 ? true : false}
        className='m-4 flex float-right border p-4 w-20 h-4 justify-center items-center mr-20'
        onClick={nextPage}
      >
        Next
      </button>{" "}
      <button
        disabled={page > 1 ? false : true}
        className='m-4 flex float-left border p-4 w-20 h-4 justify-center items-center ml-20'
        onClick={prevPage}
      >
        Prev
      </button>
    </>
  );
};

export default Home;
