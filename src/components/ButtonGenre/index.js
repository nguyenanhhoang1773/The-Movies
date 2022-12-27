import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./ButtonGenre.module.scss";
import { useMediaQuery } from "react-responsive";
const cx = classNames.bind(style);
function ButtonGenre({ title, className }) {
  const isMoblie = useMediaQuery({ minWidth: 326, maxWidth: 600 });
  return (
    <Link
      to={`/movies/genre/${title}`}
      className={`${className}  bg-[color:var(--primary)] xl:text-[32px] xl:px-[12px] lg:text-[26px] lg:py-[8px] mb:text-[16px] mb:py-[2px] mb:px-[4px] hover:bg-green-300 rounded-[16px] text-white text-shadow p-[6px] ${cx(
        {
          button_genre: !isMoblie,
          button_genre_mb: isMoblie,
        }
      )}`}
    >
      {title}
    </Link>
  );
}

export default ButtonGenre;
