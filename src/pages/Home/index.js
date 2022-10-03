import { useEffect } from "react";
import nowPlayingServices from "~/apiServices/nowPlayingServices";
import topRatedServices from "~/apiServices/topRatedServices";
import MoviesListType from "~/components/MoviesListType";
import MoviePoster from "~/components/MoviePoster";
import upComingService from "~/apiServices/upComingService";
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
function Home() {
  const dispatch = useDispatch();
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
        const result = await nowPlayingServices();
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
        const result = await topRatedServices();
        dispatch(TopRatedSilce.actions.setTopRated(result));
      };
      const fetchUpComingMovie = async () => {
        const result = await upComingService();
        dispatch(UpComingSlice.actions.setUpComing(result));
      };
      fetchNowPlayingMovies();
      fetchTopRatedMovie();
      fetchUpComingMovie();
    }
  }, [dispatch]);
  return (
    <div className="pt-[40px]">
      {nowPlayingMovies.length > 0 &&
        upComingMovies.length > 0 &&
        topRatedMovies.length > 0 && (
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
                      <div className="relative m-auto w-[1280px] h-[500px]">
                        <Link to={`/movies/${id}`}>
                          <img
                            alt="Img Error"
                            className="m-auto w-[1280px] h-[500px] hover:cursor-pointer brightness-[0.9] rounded-lg object-cover"
                            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                          />
                        </Link>
                        <div className="absolute ml-[20px] mb-[100px] bottom-0">
                          <h3 className="text-[30px] mb-[20px] font-[600] text-white text-shadow ">
                            {title}
                          </h3>
                          {genres &&
                            genres.map((genre, index) => {
                              return <ButtonGenre key={index} title={genre} />;
                            })}
                        </div>
                      </div>
                    </div>
                  )
                )}
            </SliderPoster>
            {nowPlayingMovies.length > 0 && (
              <MoviesListType title="Now Playing">
                {nowPlayingMovies.map(
                  ({ id, title, poster_path, vote_average }, index) => (
                    <MoviePoster
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
              <MoviesListType idElement="TopRated" title="Top Rated">
                {topRatedMovies.map(
                  ({ id, title, poster_path, vote_average }, index) => (
                    <MoviePoster
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
              <MoviesListType idElement="UpComing" title="Up Coming">
                {upComingMovies.map(
                  ({ id, title, poster_path, vote_average }, index) => (
                    <MoviePoster
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
