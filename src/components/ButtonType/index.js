import { Link } from "react-router-dom";

function ButtonType({ title, className, onClick }) {
  return (
    <Link
      to={`/movies/genre/${title}`}
      onClick={onClick}
      className={`${className} text-center w-[25%] hover:text-green-100 cursor-pointer transition-all text-black inline-block text-[16px] font-normal p-1`}
    >
      {title}
    </Link>
  );
}

export default ButtonType;
