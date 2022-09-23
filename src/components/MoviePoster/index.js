import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import movieSlice from "~/redux/movieSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import style from "./MoviePoster.module.scss";
function MoviePoster({ id, title, src, star }) {
  const dispatch = useDispatch();
  return (
    <div className="inline-block hover:scale-105 transition-all p-[10px]">
      <Link
        className="relative"
        onClick={() => {
          dispatch(movieSlice.actions.setIdMovie(id));
          document.querySelector("body").scrollIntoView({
            block: "start",
          });
        }}
        to={`/movies/${id}`}
      >
        <img
          alt="ac"
          className="w-[220px] hover:cursor-pointer drop-shadow-md  rounded-md"
          src={src}
        />
        <div className="absolute flex justify-center items-center top-[10px] left-[10px]  bg-[#6affb996] rounded-lg w-[60px] h-[30px] text-white">
          {star}
          <FontAwesomeIcon className="ml-[4px] mt-[-4px]" icon={faStar} />
        </div>
        <div className="bg-[rgba(0,0,0,0.5)] text-shadow w-full absolute bottom-0  text-white text-center text-[20px] rounded-b-md">
          <p className="h-[34px] overflow-hidden">{title}</p>
        </div>
      </Link>
    </div>
  );
}

export default MoviePoster;
