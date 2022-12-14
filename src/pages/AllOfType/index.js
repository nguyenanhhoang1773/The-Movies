import { useEffect, useState } from "react";
import MoviePoster from "~/components/MoviePoster";
import { useParams } from "react-router-dom";
import NowPlayingSlice from "~/redux/Slice/nowPlayingSlice";
import TopRatedSilce from "~/redux/Slice/TopRatedSLice";
import UpComingSlice from "~/redux/Slice/UpComingSlice";
import { useSelector, useDispatch } from "react-redux";
import { getTypeMovie } from "~/apiServices/movieService";
import {
  nowPlayingSelector,
  topRatedSelector,
  upComingSelector,
} from "~/redux/Selector";

function AllOfType() {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector(topRatedSelector);
  const upComingMovies = useSelector(upComingSelector);
  const nowPlayingMovies = useSelector(nowPlayingSelector);
  const { type } = useParams();
  const [isMovie, setIsMovie] = useState([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
    setIsMovie([]);
    // eslint-disable-next-line default-case
    switch (type) {
      case "top_rated":
        setTitle("Top Rated");
        if (topRatedMovies.length === 0) {
          const fetchMovies = async () => {
            const result = await getTypeMovie("top_rated");
            dispatch(TopRatedSilce.actions.setTopRated(result));
            setIsMovie(result);
          };
          fetchMovies();
        } else {
          setIsMovie(topRatedMovies);
        }
        break;
      case "now_playing":
        setTitle("Now Playing");
        if (nowPlayingMovies.length === 0) {
          const fetchMovies = async () => {
            const result = await getTypeMovie("now_playing");
            dispatch(UpComingSlice.actions.setUpComing(result));
            setIsMovie(result);
          };
          fetchMovies();
        } else {
          setIsMovie(nowPlayingMovies);
        }
        break;
      case "upcoming":
        setTitle("Up Coming");
        if (upComingMovies.length === 0) {
          const fetchMovies = async () => {
            const result = await getTypeMovie("upcoming");
            dispatch(NowPlayingSlice.actions.setNowPlaying(result));
            setIsMovie(result);
          };
          fetchMovies();
        } else {
          setIsMovie(upComingMovies);
        }
        break;
    }
  }, [type]);
  return (
    <div>
      {isMovie.length > 0 && (
        <div>
          <div className="pt-[40px] mb:pt-[20px]">
            <div className="text-[24px] font-[600] ml-[10px] mb-[10px] text-white">
              <span className="text-[color:var(--primary)]">{title}</span>
            </div>
            {isMovie.map(
              ({ id, poster_path, original_title, vote_average }, index) => {
                return (
                  <MoviePoster
                    imgWidth="w-full"
                    width="w-[16.6%] mb:w-[50%]"
                    key={index}
                    id={id}
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    title={original_title}
                    star={vote_average}
                  />
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllOfType;
