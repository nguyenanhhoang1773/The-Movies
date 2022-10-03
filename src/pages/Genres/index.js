import { useEffect, useState } from "react";
import MoviePoster from "~/components/MoviePoster";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { genreSelector } from "~/redux/Selector";
import genreMovieService from "~/apiServices/genreMovieService";
import ShowMore from "~/components/ShowMore";

function Search() {
  const genresSelector = useSelector(genreSelector);
  const [movies, setMovies] = useState([]);
  const { nameGenre } = useParams();

  useEffect(() => {
    if (genresSelector.genres.length > 0) {
      const moviesId = genresSelector.genres.find((obj) => {
        return obj.name === nameGenre;
      }).id;
      const fetchMovies = async () => {
        const res = await genreMovieService(moviesId);
        setMovies(res);
      };
      fetchMovies();
    }
  }, [nameGenre, genresSelector]);
  return (
    <div>
      <div className="pt-[40px] pb-[80px]">
        <div className="text-[24px] font-[600] ml-[10px] mb-[40px] text-[color:var(--primary)]">
          {nameGenre}
        </div>
        {movies.map(
          ({ id, poster_path, original_title, vote_average }, index) => {
            return (
              <MoviePoster
                width="w-[20%]"
                key={index}
                id={id}
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                title={original_title}
                star={vote_average}
              />
            );
          }
        )}
        <ShowMore />
      </div>
    </div>
  );
}

export default Search;
