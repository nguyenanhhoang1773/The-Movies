import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./ButtonGenre.module.scss";
const cx = classNames.bind(style);
function ButtonGenre({ title }) {
  return (
    <Link
      to="/genre"
      className={`bg-[color:var(--primary)] hover:bg-green-300 rounded-[8px] text-white text-shadow p-[6px] ${cx(
        "button_genre"
      )}`}
    >
      {title}
    </Link>
  );
}

export default ButtonGenre;
