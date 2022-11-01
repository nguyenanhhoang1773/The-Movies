import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import ButtonGenre from "~/components/ButtonGenre";
import { Link, useParams } from "react-router-dom";
import movieService from "~/apiServices/movieService";
import castOfMovieService from "~/apiServices/castOfMovieService";
import similarMovieService from "~/apiServices/similarMovieService";
import MoviePoster from "~/components/MoviePoster";
import { useMediaQuery } from "react-responsive";
import MoviesListType from "~/components/MoviesListType";

function MovieInfo() {
  const isMoblie = useMediaQuery({ minWidth: 326, maxWidth: 600 });
  const { idMovie } = useParams();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);
  const {
    backdrop_path: backDropPath,
    poster_path: PosterPath,
    title,
    genres = [],
    overview,
  } = movie;
  useEffect(() => {
    const fetchCast = async () => {
      const casts = await castOfMovieService(idMovie);
      setCast(casts);
    };
    const fetchMovieInfor = async () => {
      const movie = await movieService(idMovie);
      setMovie(movie);
    };
    const fetchSemilarMovie = async () => {
      const movie = await similarMovieService(idMovie);
      setSimilarMovie(movie);
    };
    fetchCast();
    fetchMovieInfor();
    fetchSemilarMovie();
  }, [idMovie]);
  return (
    <div className="pb-[60px]">
      {cast.length > 0 && similarMovie.length > 0 && backDropPath && (
        <div>
          {!isMoblie && (
            <div className="relative mb:w-full mb:pb-[60%] w-[90%] m-auto flex justify-center mt-[20px] h-0 pb-[45%] ">
              <img
                className="absolute  rounded-lg  object-cover w-full  h-full"
                src={`https://image.tmdb.org/t/p/original//${backDropPath}`}
              />
              <div className="absolute w-full bg-[rgba(0,0,0,0.8)] rounded-lg h-full  z-10"></div>
              <div className="absolute right-0 bottom-[5%] left-[5%] z-20">
                <Row gutter={[48]}>
                  <Col span={5} className="flex justify-end ">
                    <div className="flex max-h-[440px] border-[2px] brightness-110 border-green-300 rounded-2xl">
                      <img
                        className="w-[280px] h-auto    rounded-xl "
                        src={
                          PosterPath
                            ? `https://image.tmdb.org/t/p/w500//${PosterPath}`
                            : `https://i.pinimg.com/550x/77/ba/ec/77baecdea3e0a230b1470b4d4d4440a4.jpg`
                        }
                      />
                    </div>
                  </Col>
                  <Col className="flex " span={16}>
                    <div className=" flex flex-col ">
                      <h3 className="text-[30px] font-[600] text-[color:var(--primary)]">
                        {movie.title}
                      </h3>
                      <div className="mt-[20px]">
                        {genres.map(({ name: title }, index) => {
                          return (
                            <ButtonGenre
                              className="text-[30px] font-[500]"
                              key={index}
                              title={title}
                            />
                          );
                        })}
                      </div>
                      <div className="text-white text-shadow text-[20px] mt-[20px]">
                        <span className="text-[color:var(--primary)] mr-[6px] text-[24px] font-[500]">
                          Overview:
                        </span>
                        {overview}
                      </div>
                      <div
                        className="flex 
                 items-center flex-1"
                      >
                        <Link
                          to={`/movies/${idMovie}/watch`}
                          className="py-[8px]  hover:bg-green-300 mt-[10px] px-[6px] w-[260px] bg-[color:var(--primary)] text-[34px] font-[600] text-white  text-shadow flex justify-center items-center rounded-xl"
                        >
                          Watch movie
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )}
          {isMoblie && (
            <div className=" relative mt-[10px]">
              <img
                className="blur-[2px]"
                src={`https://image.tmdb.org/t/p/original//${backDropPath}`}
              />
              <div className="absolute flex items-center left-[20px]  bottom-[50%] translate-y-1/2 ">
                <img
                  className=" w-[120px] h-[180px] rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500//${PosterPath}`}
                />
                <div className="flex flex-col ml-[10px]">
                  <h3 className="text-[20px] text-shadow font-[600] text-[color:var(--primary)]">
                    {movie.title}
                  </h3>
                  <div className="mt-[8px]">
                    {genres.map(({ name: title }, index) => {
                      if (index <= 2 && title.length < 10) {
                        return (
                          <ButtonGenre
                            className="text-[8px] font-[500]"
                            key={index}
                            title={title}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="text-white max-h-[40px] overflow-auto text-shadow text-[10px] mt-[10px]">
                    <span className="text-[color:var(--primary)] mr-[6px] text-[12px] font-[500]">
                      Overview:
                    </span>
                    {overview}
                  </div>
                  <div
                    className="flex 
                 items-center flex-1"
                  >
                    <Link
                      to={`/movies/${idMovie}/watch`}
                      className="py-[8px]  hover:bg-green-300 mt-[10px] px-[2px] w-[120px] bg-[color:var(--primary)] text-[16px] font-[600] text-white  text-shadow flex justify-center items-center rounded-xl"
                    >
                      Watch movie
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col mb:py-[10px]  items-center mt-[20px] py-[50px]">
            <div>
              <h3 className="flex justify-center mb:text-[24px] mb:mb-0 mb-[12px] text-[28px] text-green-300 font-[600]">
                CASTS
              </h3>
              <div className="flex mb:flex-wrap">
                {cast.map(({ name, profile_path: profilePath }, index) => {
                  const num = isMoblie ? 4 : 6;
                  if (index < num) {
                    return (
                      <div
                        key={index}
                        className="px-[12px] mb:mt-[20px] mb:w-[50%]"
                      >
                        <div className="flex ">
                          <span className="max-w-[168px] max-h-[30px] overflow-hidden  mb:h-[30px] mb:overflow-hidden mb-[10px] text-[20px] font-[500] text-[color:var(--primary)] text-shadow ">
                            {name}
                          </span>
                        </div>
                        <div className="border w-[170px]  border-green-300 rounded-xl">
                          <img
                            alt="https://image.tmdb.org/t/p/w200///z82y3Nxm7VZjfaMPMdUtbyoAyls.jpg"
                            className="rounded-xl max-h-[254px] w-[170px]"
                            src={
                              profilePath
                                ? `https://image.tmdb.org/t/p/w200//${profilePath}`
                                : "https://w0.peakpx.com/wallpaper/27/386/HD-wallpaper-naruto-anime-error-skyline-thumbnail.jpg"
                            }
                          />
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <h3 className="flex justify-center mb:mb-[0px] mt-[20px] mb-[-20px] text-green-300 text-shadow font-[600] text-[32px] mb:text-[24px] ">
            Similar Movies
          </h3>
          <div className="w-[90%] mb:w-full m-auto">
            <MoviesListType noShowAll>
              {similarMovie.map(
                (
                  { id, poster_path: posterPath, title, vote_average: star },
                  index
                ) => {
                  return (
                    <MoviePoster
                      scroll
                      key={index}
                      id={id}
                      title={title}
                      src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
                      star={star}
                    />
                  );
                }
              )}
            </MoviesListType>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieInfo;
