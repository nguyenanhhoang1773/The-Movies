import movieService from "~/apiServices/movieService";
import { useEffect, useState } from "react";
import RecommentMovie from "~/components/RecommentMovie";
import recommentService from "~/apiServices/recommentService";
import { useParams } from "react-router-dom";
function WatchMovie() {
  const [movie, setMovie] = useState({});
  let { idMovie } = useParams();
  const [recomment, setRecomment] = useState([]);
  useEffect(() => {
    const fetchMovie = async () => {
      const res = await movieService(idMovie);
      setMovie(res);
    };
    const fetchRecomment = async () => {
      const res = await recommentService(idMovie);
      setRecomment(res);
    };
    fetchMovie();
    fetchRecomment();
  }, [idMovie]);
  return (
    <div className="flex justify-between px-[40px] py-[60px]">
      <div className=" mt-[50px]">
        <iframe
          title="Movie"
          allowFullScreen
          className="w-[1000px] h-[500px]"
          src={`https://www.2embed.to/embed/tmdb/movie?id=${idMovie}`}
        ></iframe>
        <h3 className=" text-[color:var(--primary)] font-[600] mt-[16px] text-[24px]">
          {movie.title}
        </h3>
        <p className="text-white w-[1000px] mt-6px">
          <span className="text-[20px] font-[500] text-[color:var(--primary)] mr-[4px]">
            Overview :
          </span>
          {movie.overview}
        </p>
      </div>
      <div className="pl-[40px] w-[30%] ">
        <h3 className="text-[color:var(--primary)] text-[24px] font-[500]">
          Recommendations
        </h3>
        {recomment.map(({ id, title, poster_path, vote_average }, index) => (
          <RecommentMovie
            key={id}
            id={id}
            title={title}
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            star={vote_average}
          />
        ))}
      </div>
    </div>
  );
}

export default WatchMovie;
