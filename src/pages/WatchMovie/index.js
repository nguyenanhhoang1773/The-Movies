import movieService from "~/apiServices/movieService";
import { useEffect, useRef, useState } from "react";
import RecommentMovie from "~/components/RecommentMovie";
import recommentService from "~/apiServices/recommentService";
import { useParams } from "react-router-dom";
import Loading from "~/components/Loading";
import ScrollBar from "~/components/ScrollBar";
function WatchMovie() {
  const scrollBarEle = useRef();
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
    <div className="flex min-h-[1000px] justify-between px-[40px] py-[60px]">
      <div className=" mt-[50px]">
        <div className="relative">
          <iframe
            title="Movie"
            allowFullScreen
            className="relative w-[1000px] h-[500px] z-10"
            src={`https://www.2embed.to/embed/tmdb/movie?id=${idMovie}`}
          ></iframe>
          <div className="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 z-0 bg-zinc-900">
            <Loading className="w-[40px] h-[40px]" />
          </div>
        </div>
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
        <h3 className="text-[color:var(--primary)] mb-[16px] text-[24px] font-[500]">
          Recommendations
        </h3>
        <ScrollBar
          classNameWrapper=" bg-[rgba(0,0,0,0.3)] py-[10px] rounded-[4px] pl-[10px] overflow-hidden"
          classNameScrollEle="h-[700px]"
          height={160}
        >
          {recomment.map(({ id, title, poster_path, vote_average }, index) => (
            <RecommentMovie
              key={id}
              id={id}
              title={title}
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              star={vote_average}
            />
          ))}
        </ScrollBar>
      </div>
    </div>
  );
}

export default WatchMovie;
