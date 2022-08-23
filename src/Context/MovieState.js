import React, { useEffect, useState } from "react";
import { movieContext as MovieContext } from "./MovieContext";

const MovieState = props => {
  const [movie, setMovie] = useState([]);
  const [detail, setDetails] = useState([]);
  const [page, setPage] = useState(1);

  const moviePage = () => {
    setPage(page + 1);
  };
  const moviePagePrev = () => {
    setPage(page - 1);
  };

  const api = "978529128aba72580ed67864b4b12458";
  useEffect(() => {
    const allMovie = async () => {
      let result = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${api}&language=en-US&page=${page}`
      );
      result = await result.json();
      setMovie(result.results);
      setDetails(result);
    };
    allMovie();
  }, [page]);

  return (
    <MovieContext.Provider
      value={{ movie, moviePage, moviePagePrev, page, detail }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
