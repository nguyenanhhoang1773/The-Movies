import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import ButtonGenre from "~/components/ButtonGenre";
import { Link, useParams } from "react-router-dom";
import movieService from "~/apiServices/movieService";
import castOfMovieService from "~/apiServices/castOfMovieService";
import similarMovieService from "~/apiServices/similarMovieService";
import MoviePoster from "~/components/MoviePoster";
import MoviesListType from "~/components/MoviesListType";

function MovieInfo() {
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
          <div className="relative w-[90%] m-auto flex justify-center mt-[20px] h-0 pb-[45%] ">
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
                      src={`https://image.tmdb.org/t/p/w500//${PosterPath}`}
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
          <div className="flex flex-col  items-center mt-[20px] py-[50px]">
            <div>
              <h3 className="flex justify-center mb-[12px] text-[28px] text-green-300 font-[600]">
                CASTS
              </h3>
              <div className="flex">
                {cast.map(({ name, profile_path: profilePath }, index) => {
                  if (index < 6) {
                    return (
                      <div key={index} className="px-[20px]">
                        <h4 className="flex justify-center mb-[10px] text-[20px] font-[500] text-[color:var(--primary)] text-shadow ">
                          {name}
                        </h4>
                        <div className="border border-green-300 rounded-xl">
                          <img
                            className="rounded-xl "
                            src={`https://image.tmdb.org/t/p/w200//${profilePath}`}
                          />
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <h3 className="flex justify-center mt-[20px] mb-[-20px] text-green-300 text-shadow font-[600] text-[32px]">
            Similar Movies
          </h3>
          <div className="w-[90%] m-auto">
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
