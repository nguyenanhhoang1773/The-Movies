import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderPoster from "../Slider";
import { Link } from "react-router-dom";
function MoviesListType({ children, title, idElement, type }) {
  return (
    <div
      id={idElement}
      className="mb:px-[10px] mb:pt-[10px] mb:pb-0 px-[68px] pt-[30px] pb-[10px]"
    >
      <h3 className="text-shadow mb:mb-0 text-[color:var(--primary)] text-[22px] mb:text-[16px] ml-[12px] mb-[12px] font-[600]">
        {title}
      </h3>
      <div className="flex  flex-wrap">
        <SliderPoster>{children}</SliderPoster>
      </div>
      <div className="flex w-full mt-[16px] justify-center items-center">
        <Link
          to={`movies/alloftype/${type}`}
          className="flex justify-center hover:cursor-pointer hover:bg-green-300 rounded-full text-[20px] font-[500] text-white text-shadow items-center bg-[color:var(--primary)] px-[12px] py-[6px] "
        >
          Show All
        </Link>
      </div>
    </div>
  );
}

export default MoviesListType;
