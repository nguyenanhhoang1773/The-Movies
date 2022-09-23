import { useEffect, useState } from "react";
import nowPlayingServices from "~/apiServices/nowPlayingServices";
import topRatedServices from "~/apiServices/topRatedServices";
import MoviesListType from "~/components/MoviesListType";
import MoviePoster from "~/components/MoviePoster";
import upCominService from "~/apiServices/upCominServiceg";
import SliderPoster from "~/components/Slider";
import genresService from "~/apiServices/genresService";
import ButtonGenre from "~/components/ButtonGenre";
import { Link } from "react-router-dom";
function Home() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovie, setTopRatedMovie] = useState([]);
  const [upComingMovie, seUpComingMovie] = useState([]);
  useEffect(() => {
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
      setNowPlayingMovies(result);
    };
    const fetchTopRatedMovie = async () => {
      const result = await topRatedServices();
      setTopRatedMovie(result);
    };
    const fetchUpComingMovie = async () => {
      const result = await upCominService();
      seUpComingMovie(result);
    };
    fetchNowPlayingMovies();
    fetchTopRatedMovie();
    fetchUpComingMovie();
  }, []);
  return (
    <div className="pt-[40px]">
      {nowPlayingMovies.length > 0 &&
        topRatedMovie.length > 0 &&
        upComingMovie.length > 0 && (
          <div>
            <SliderPoster customPrev customNext props={{ slidesToShow: 1 }}>
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
            <MoviesListType idElement="TopRated" title="Top Rated">
              {topRatedMovie.map(
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
            <MoviesListType idElement="UpComing" title="Up Coming">
              {upComingMovie.map(
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
          </div>
        )}
    </div>
  );
}

export default Home;
