import { useEffect, useState } from "react";
import MoviesListType from "~/components/MoviesListType";
import MoviePoster from "~/components/MoviePoster";
import SliderPoster from "~/components/Slider";
import genresService from "~/apiServices/genresService";
import ButtonGenre from "~/components/ButtonGenre";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  nowPlayingSelector,
  topRatedSelector,
  upComingSelector,
} from "~/redux/Selector";
import NowPlayingSlice from "~/redux/Slice/nowPlayingSlice";
import TopRatedSilce from "~/redux/Slice/TopRatedSLice";
import UpComingSlice from "~/redux/Slice/UpComingSlice";
import Loading from "~/components/Loading";
import moviesOfType from "~/apiServices/moviesOfType";

function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const topRatedMovies = useSelector(topRatedSelector);
  const upComingMovies = useSelector(upComingSelector);
  const nowPlayingMovies = useSelector(nowPlayingSelector);

  useEffect(() => {
    if (
      topRatedMovies.length === 0 &&
      upComingMovies.length === 0 &&
      nowPlayingMovies.length === 0
    ) {
      const fetchNowPlayingMovies = async () => {
        const result = await moviesOfType("now_playing");
        const genresApi = await genresService();
        result.forEach((obj) => {
          const genres = [];
          obj.genre_ids.forEach((idGenre) => {
            const genre = genresApi.find(({ id }, index) => {
              return id === idGenre;
            });
            genres.push(genre.name);
          });
          obj.genres = genres;
        });
        dispatch(NowPlayingSlice.actions.setNowPlaying(result));
      };
      const fetchTopRatedMovie = async () => {
        const result = await moviesOfType("top_rated");
        dispatch(TopRatedSilce.actions.setTopRated(result));
      };
      const fetchUpComingMovie = async () => {
        const result = await moviesOfType("upcoming");
        dispatch(UpComingSlice.actions.setUpComing(result));
      };

      fetchNowPlayingMovies();
      fetchTopRatedMovie();
      fetchUpComingMovie();
    }
    if (
      nowPlayingMovies.length > 0 &&
      upComingMovies.length > 0 &&
      topRatedMovies.length > 0
    ) {
      setIsLoading(true);
    }
  }, [
    dispatch,
    nowPlayingMovies.length,
    upComingMovies.length,
    topRatedMovies.length,
  ]);
  return (
    <div className="pt-[20px] pb-[28px] mb:pt-[20px]">
      {!isLoading && <Loading Home />}
      {isLoading && (
        <div>
          <SliderPoster
            customPrev
            scroll
            customNext
            props={{ slidesToShow: 1 }}
          >
            {nowPlayingMovies.length > 0 &&
              nowPlayingMovies.map(
                ({ id, title, backdrop_path, genres }, index) => (
                  <div key={index}>
                    <div className="m-auto relative  w-[95%] mb:px-[10px] mb:w-full mb:h-auto h-[750px] ">
                      <Link to={`/movies/${id}`}>
                        <img
                          alt="Img Error"
                          className="m-auto w-[95%] mb:w-full h-[750px] mb:h-auto hover:cursor-pointer brightness-[0.9] rounded-lg object-cover"
                          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                        />
                      </Link>
                      <div className="absolute mb:mb-[20px] mb:ml-[20px] ml-[100px] mb-[180px] bottom-0">
                        <h3 className="text-[30px] mb-[20px] mb:mb-[10px] mb:text-[24px] font-[600] text-white text-shadow ">
                          {title}
                        </h3>
                        <div>
                          {genres &&
                            genres.map((genre, index) => {
                              if (index <= 2) {
                                return (
                                  <ButtonGenre key={index} title={genre} />
                                );
                              }
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
          </SliderPoster>
          {nowPlayingMovies.length > 0 && (
            <MoviesListType type="now_playing" title="Now Playing">
              {nowPlayingMovies.map(
                ({ id, title, poster_path, vote_average }, index) => (
                  <MoviePoster
                    scroll
                    id={id}
                    title={title}
                    key={index}
                    star={vote_average}
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  />
                )
              )}
            </MoviesListType>
          )}
          {topRatedMovies.length > 0 && (
            <MoviesListType
              type="top_rated"
              idElement="TopRated"
              title="Top Rated"
            >
              {topRatedMovies.map(
                ({ id, title, poster_path, vote_average }, index) => (
                  <MoviePoster
                    scroll
                    id={id}
                    title={title}
                    key={index}
                    star={vote_average}
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  />
                )
              )}
            </MoviesListType>
          )}
          {upComingMovies.length > 0 && (
            <MoviesListType
              type="upcoming"
              idElement="UpComing"
              title="Up Coming"
            >
              {upComingMovies.map(
                ({ id, title, poster_path, vote_average }, index) => (
                  <MoviePoster
                    scroll
                    id={id}
                    title={title}
                    key={index}
                    star={vote_average}
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  />
                )
              )}
            </MoviesListType>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
