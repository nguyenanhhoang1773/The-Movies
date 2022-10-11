import classNames from "classnames/bind";
import style from "./Slider.module.scss";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
const cx = classNames.bind(style);

function PrevArrow(props) {
  const { className, style, onClick, custom } = props;

  return (
    <div
      className={`${className} mb:!hidden ${cx("arrow", {
        custom_arrow: custom,
      })} ${custom} text-[color:var(--primary)]`}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    >
      <FontAwesomeIcon className="w-[46px] h-[48px]" icon={faChevronLeft} />
    </div>
  );
}
function NextArrow(props) {
  const { className, style, onClick, custom } = props;
  return (
    <div
      className={`${className} mb:!hidden  ${cx("arrow", {
        custom_arrow: custom,
      })} ${custom} text-[color:var(--primary)]`}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    >
      <FontAwesomeIcon className="w-[46px] h-[48px]" icon={faChevronRight} />
    </div>
  );
}
function SliderPoster({ children, props, customPrev, customNext, scroll }) {
  const isMoblie = useMediaQuery({ minWidth: 326, maxWidth: 600 });
  const sliderSetting = {
    infinite: true,
    speed: 500,
    autoplay: scroll ? true : false,
    autoplaySpeed: 3000,
    slidesToShow: isMoblie ? 3 : 5,
    slidesToScroll: 1,
    ...props,
    prevArrow: <PrevArrow custom={customPrev} />,
    nextArrow: <NextArrow custom={customNext} />,
  };
  return <Slider {...sliderSetting}>{children}</Slider>;
}
export default SliderPoster;
