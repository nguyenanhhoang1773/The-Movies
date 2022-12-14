import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
function MoviePoster({ id, title, src, star, width, imgWidth, scroll }) {
  const imgEle = useRef();
  return (
    <div className="inline">
      {!scroll && (
        <div className="inline">
          <div
            className={`${width}  inline-block hover:scale-105 transition-all p-[10px]`}
          >
            <Link
              className="relative "
              onClick={() => {
                document.querySelector("body").scrollIntoView({
                  block: "start",
                });
              }}
              to={`/movies/${id}`}
            >
              <div className="relative pb-[150%]">
                <img
                  ref={imgEle}
                  alt="ac"
                  className={`${
                    imgWidth ? imgWidth : "w-full "
                  }  absolute h-full object-cover hover:cursor-pointer drop-shadow-md  rounded-md`}
                  src={src}
                />
              </div>
              <div className="absolute flex w-[60px] h-[30px] mb:w-[40px] mb:h-[20px] mb:text-[10px] mb:font-[600] justify-center items-center top-[10px] left-[10px]  bg-[#6affb996] rounded-lg  text-white">
                {Math.ceil(star * 10) / 10}
                <FontAwesomeIcon
                  className="mb:mt-[-2px] ml-[4px] mt-[-4px]"
                  icon={faStar}
                />
              </div>
              <div className="bg-[rgba(0,0,0,0.5)] mb:text-[12px] text-shadow w-full absolute bottom-0  text-white text-center text-[20px] rounded-b-md">
                <p className="h-[34px] mb:h-[18px] overflow-hidden">{title}</p>
              </div>
            </Link>
          </div>
        </div>
      )}
      {scroll && (
        <div className="flex justify-center">
          <div
            className={`${width} w-[90%] inline-block hover:scale-105 transition-all p-[10px] mb:p-0`}
          >
            <Link
              className="relative "
              onClick={() => {
                document.querySelector("body").scrollIntoView({
                  block: "start",
                });
              }}
              to={`/movies/${id}`}
            >
              <div className="relative pb-[150%]">
                <img
                  ref={imgEle}
                  alt="ac"
                  className={`${
                    imgWidth ? imgWidth : "w-full"
                  } min-h-[160px] absolute h-full object-cover hover:cursor-pointer drop-shadow-md  rounded-md`}
                  src={src}
                />
              </div>
              <div className="absolute flex w-[60px] h-[30px] mb:w-[40px] mb:h-[20px] mb:text-[10px] mb:font-[600] justify-center items-center top-[10px] left-[10px]  bg-[#6affb996] rounded-lg  text-white">
                {Math.ceil(star * 10) / 10}
                <FontAwesomeIcon
                  className="mb:mt-[-2px] ml-[4px] mt-[-4px]"
                  icon={faStar}
                />
              </div>
              <div className="bg-[rgba(0,0,0,0.5)] mb:text-[12px] text-shadow w-full absolute bottom-0  text-white text-center text-[20px] rounded-b-md">
                <p className="h-[34px] mb:h-[18px] overflow-hidden">{title}</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoviePoster;
