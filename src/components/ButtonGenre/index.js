import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./ButtonGenre.module.scss";
const cx = classNames.bind(style);
function ButtonGenre({ title, className }) {
  return (
    <Link
      to={`/movies/genre/${title}`}
      className={`${className}  bg-[color:var(--primary)] mb:text-[16px] mb:py-[2px] mb:px-[4px] hover:bg-green-300 rounded-[8px] text-white text-shadow p-[6px] ${cx(
        "button_genre"
      )}`}
    >
      {title}
    </Link>
  );
}

export default ButtonGenre;
