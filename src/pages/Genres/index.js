import { useEffect, useRef, useState } from "react";
import MoviePoster from "~/components/MoviePoster";
import { useParams } from "react-router-dom";
import { genreSelector, genreMOviesSelector } from "~/redux/Selector";
import { useDispatch, useSelector } from "react-redux";
import genreMovieService from "~/apiServices/genreMovieService";
import ShowMore from "~/components/ShowMore";
import genreMoviesSlice from "~/redux/Slice/genreMoviesSlice";
import { findIdGenre } from "~/hooks";

const loadingArr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1];
function Search() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const movies = useSelector(genreMOviesSelector);
  const genresSelector = useSelector(genreSelector);
  const { nameGenre } = useParams();
  const genreId = useRef();
  useEffect(() => {
    setLoading(false);
    if (genresSelector.genres.length > 0) {
      genreId.current = findIdGenre(nameGenre, genresSelector);
      const fetchMovies = async () => {
        const res = await genreMovieService(genreId.current);
        dispatch(genreMoviesSlice.actions.setGenreMovies(res));
        setLoading(true);
      };
      fetchMovies();
    }
  }, [nameGenre, genresSelector]);
  return (
    <div>
      {!loading && (
        <div className="pt-[40px] pb-[80px]">
          <div className="text-[24px] font-[600] ml-[10px] mb-[40px] text-slate-700  ">
            <span className="bg-slate-700">LoadingTime</span>
          </div>
          {loadingArr.map((value, index) => (
            <div
              key={index}
              className="w-[20%] h-[450px] rounded-md inline-block p-[10px] "
            >
              <div className="relative bg-slate-700 h-full rounded-md">
                <div className="absolute bg-slate-500 top-[20px] left-[20px]  w-[60px] h-[30px] rounded-md"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.2)] h-[40px]"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {loading && (
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
          <ShowMore genreId={genreId.current} />
        </div>
      )}
    </div>
  );
}

export default Search;
