import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SingleMovie = () => {
  const params = useParams();
  const [single, setSingle] = useState([]);

  const singleMovie = async () => {
    const api = "978529128aba72580ed67864b4b12458";
    let result = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=${api}&language=en-US`
    );
    result = await result.json();
    setSingle(result);
  };

  useEffect(() => {
    singleMovie();
  }, []);

  return (
    <div className='relative flex flex-col-reverse py-16 lg:py-0 lg:flex-col'>
      <div className='w-full max-w-xl  px-4 mx-auto md:px-0 lg:px-8 lg:py-20 lg:max-w-screen-xl'>
        <Link to='/'>
          <h1 className='text-2xl'> &#8592;</h1>
        </Link>
        <br />
        <div className='mb-0 lg:max-w-lg my-auto lg:pr-8 xl:pr-6'>
          <h2 className='mb-5 text-left font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:text-left'>
            {single.title}
          </h2>
          <div className='flex'>
            <h2 className='mr-4'> Rating</h2>

            <h2>{single.vote_average} / 10</h2>
          </div>{" "}
          <br />
          <p className=' mb-5 text-base text-gray-700 md:text-lg md:text-left'>
            {single.overview}
          </p>
          <div className='flex flex-col '>
            <div className='mb-2 text-sm text-gray-600 md:mb-2'>
              <div className='flex'>
                <strong>
                  <h2 className='mr-24'> Release Date</h2>
                </strong>
                <strong>
                  <h2>{single.release_date}</h2>
                </strong>
              </div>
              <div className='flex mt-8'>
                <strong>
                  <h2 className='mr-24'>Original Language</h2>
                </strong>
                <strong>
                  <h2>{single.original_language}</h2>
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='inset-y-0 top-0 right-0 w-full max-w-xl px-4 mx-auto mb-6 md:px-0 lg:pl-8 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute xl:px-0'>
        <img
          className='object-cover w-full h-96 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-[521px] lg:h-[721px] '
          src={`https://images.tmdb.org/t/p/original/${single.backdrop_path}`}
          alt=''
        />
      </div>
    </div>
  );
};

export default SingleMovie;
