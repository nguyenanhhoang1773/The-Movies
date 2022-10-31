import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderPoster from "../Slider";
import { Link } from "react-router-dom";
function MoviesListType({ children, title, idElement, type, noShowAll }) {
  return (
    <div
      id={idElement}
      className="mb:px-[10px] mb:pt-[10px] mb:pb-0 px-[68px] pt-[30px] pb-[10px]"
    >
      <h3 className="text-shadow mb:mb-[6px] text-[color:var(--primary)] text-[30px] mb:text-[16px] ml-[12px] mb-[12px] font-[600]">
        {title}
      </h3>
      <div className="flex  flex-wrap">
        <SliderPoster>{children}</SliderPoster>
      </div>
      {!noShowAll && (
        <div className="flex w-full mb:mt-[8px] mt-[16px] justify-center items-center">
          <Link
            to={`movies/alloftype/${type}`}
            className="flex justify-center mb:py-[2px] mb:px-[4px] mb:text-[14px] hover:cursor-pointer hover:bg-green-300 rounded-full text-[20px] font-[500] text-white text-shadow items-center bg-[color:var(--primary)] px-[12px] py-[6px] "
          >
            Show All
          </Link>
        </div>
      )}
    </div>
  );
}

export default MoviesListType;
