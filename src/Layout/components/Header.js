import { IconMain } from "~/components/icons";
import { Link, useNavigate } from "react-router-dom";
import routes from "~/config/routes/routes";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button";
import {
  faCaretDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import ButtonType from "~/components/ButtonType";
import searchService from "~/apiServices/searchService";
import { useEffect, useRef, useState } from "react";
import SearchItem from "~/components/searchItem";
function Header() {
  const navigate = useNavigate();
  const inputEle = useRef();
  const [listResultSearch, setListResultSearch] = useState([]);
  const [isListSearch, setIsListSearch] = useState(false);
  const handleFocusSearchInput = () => {
    setIsListSearch(true);
  };
  const handleBlurSearchInput = () => {
    setIsListSearch(false);
  };
  const handleSubmitSearch = (e) => {
    if (e.keyCode === 13) {
      console.log(e.target.value);
      e.target.blur();
      navigate(`/movie/search/${e.target.value}`);
    }
  };
  const handleScrollIntoView = (ele) => {
    ele.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };
  const handleSearchMovie = (e) => {
    if (e.target.value.trim()) {
      const searchResult = async () => {
        const result = await searchService(e.target.value);
        setListResultSearch(result);
      };
      searchResult();
    } else {
      setListResultSearch([]);
    }
  };
  return (
    <div className="fixed flex z-10 justify-center items-center h-14 top-0 w-full bg-neutral-900">
      <div className="flex items-center h-full w-11/12 justify-between">
        <div className="flex ">
          <Link to={routes.Home} className="flex items-center justify-center">
            <IconMain />
          </Link>
          <Button to={routes.Home}>Home</Button>
          <Button
            onClick={() =>
              handleScrollIntoView(document.querySelector("#TopRated"))
            }
          >
            Top Rated
          </Button>
          <Button
            onClick={() =>
              handleScrollIntoView(document.querySelector("#UpComing"))
            }
          >
            Up Coming
          </Button>

          <Tippy
            interactive
            render={(attrs) => (
              <div
                className="bg-green-300 relative rounded-md w-[var(--type-row-width)] text-white"
                tabIndex="-1"
                {...attrs}
              >
                <div className="absolute top-[-24px] left-[56%] z-10 border-green-300 border-[12px] border-t-transparent  border-r-transparent border-l-transparent "></div>
                <ButtonType title=" Hành động" />
                <ButtonType title="Lãng mạn" />
                <ButtonType title=" Kinh dị" />
                <ButtonType title="Phưu Lưu" />
                <ButtonType title="Trinh Thám" />
                <ButtonType title="Hoạt hình" />
                <ButtonType title=" Adult" />
                <ButtonType title=" Viễn tưởng" />
              </div>
            )}
          >
            <Button>
              Category
              <span>
                <FontAwesomeIcon
                  className="text-current ml-2"
                  icon={faCaretDown}
                />
              </span>
            </Button>
          </Tippy>
        </div>
        <div className="flex bg-zinc-700 relative rounded-full items-center  ">
          <input
            ref={inputEle}
            onKeyUp={handleSearchMovie}
            placeholder="Tìm kiếm"
            onFocus={handleFocusSearchInput}
            onBlur={handleBlurSearchInput}
            onKeyDown={handleSubmitSearch}
            className="outline-0 rounded-full h-9 w-[280px] bg-inherit text-sm p-2 py-3 text-zinc-200"
          />
          <span className="px-4 border-l-[1px] border-[color:var(--primary)] text-[color:var(--primary)]">
            <FontAwesomeIcon
              onClick={() =>
                navigate(`/movie/search/${inputEle.current.value}`)
              }
              className="cursor-pointer hover:text-green-300"
              icon={faMagnifyingGlass}
            />
          </span>
          {isListSearch && listResultSearch.length > 0 && (
            <div className="bg-green-300  w-[420px] p-[4px] absolute top-[60px] rounded-md w-[var(--type-row-width)] text-white">
              <div className="overflow-auto scroll-bar max-h-[400px] ">
                {listResultSearch.map(
                  ({ poster_path, original_title, vote_average }, index) => {
                    const abc =
                      poster_path || "/mVQTvegiq87kkf1lZGwmD4KFevB.jpg";
                    return (
                      <SearchItem
                        key={index}
                        src={`https://image.tmdb.org/t/p/w500/${abc}`}
                        title={original_title}
                        star={vote_average}
                      />
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center items-center">
          <Button className="mr-2">
            <FontAwesomeIcon className="text-2xl mt-1" icon={faBell} />
          </Button>
          <button className="h-8 flex items-center w-[120px] justify-center rounded-md px-3 transition-all text-white  font-semibold hover:bg-green-300   py-2 bg-green-500">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
