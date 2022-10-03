import { Link } from "react-router-dom";

function ButtonType({ title }) {
  return (
    <Link
      to={`/movies/genre/${title}`}
      className="text-center w-[25%] hover:text-green-100 cursor-pointer transition-all text-black inline-block text-[16px] font-normal p-1 "
    >
      {title}
    </Link>
  );
}

export default ButtonType;
