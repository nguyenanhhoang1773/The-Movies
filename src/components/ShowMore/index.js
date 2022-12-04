import { useDispatch } from "react-redux";
import genreMoviesSlice from "~/redux/Slice/genreMoviesSlice";
import { getMovieWithGenre } from "~/apiServices/movieService";
import { useRef } from "react";

function ShowMore({ genreId }) {
  const dispatch = useDispatch();
  const page = useRef(2);
  const handleShowMore = () => {
    const fetchMovies = async () => {
      const res = await getMovieWithGenre(genreId, page.current);
      dispatch(genreMoviesSlice.actions.addGenreMovies(res));
    };
    fetchMovies();
    page.current++;
  };
  return (
    <div className="flex justify-center items-center mb:mt-[10px] mt-[26px]">
      <div
        onClick={handleShowMore}
        className="hover:bg-[color:var(--primary)] text-[24px] text-white text-shadow bg-green-500 font-[600] px-[10px] py-[6px] cursor-pointer rounded-[99px]"
      >
        Show more
      </div>
    </div>
  );
}

export default ShowMore;
