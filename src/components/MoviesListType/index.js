import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderPoster from "../Slider";
function MoviesListType({ children, title, idElement }) {
  return (
    <div id={idElement} className="mb:px-[10px] px-[68px] pt-[30px] pb-[10px]">
      <h3 className="text-shadow text-white text-[22px] mb:text-[16px] ml-[12px] mb-[12px] font-[600]">
        {title}
      </h3>
      <div className="flex flex-wrap">
        <SliderPoster>{children}</SliderPoster>
      </div>
    </div>
  );
}

export default MoviesListType;
