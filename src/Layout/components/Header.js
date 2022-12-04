import { IconMain } from "~/components/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import routes from "~/config/routes/routes";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button";
import {
  faBars,
  faCaretDown,
  faCaretRight,
  faCaretUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import ButtonType from "~/components/ButtonType";
import { searchMovie } from "~/apiServices/movieService";
import { useEffect, useRef, useState } from "react";
import SearchItem from "~/components/searchItem";
import { getGenreList } from "~/apiServices/movieService";
import { getPopularMovies } from "~/apiServices/movieService";
import { useDispatch, useSelector } from "react-redux";
import popularSlice from "~/redux/Slice/popularSlice";
import {
  signInSelector,
  genreSelector,
  logInSelector,
  userInforSelector,
} from "~/redux/Selector";
import genreSlice from "~/redux/Slice/genreSlice";
import logInSlice from "~/redux/Slice/logInSlice";
import fireBaseSlice from "~/redux/Slice/fireBaseSlice";
import ModalLogIn from "~/components/Modal";
// import { db } from "~/firebase/config";
import firebase from "firebase/compat/app";
// import { getAuth, signInWithCustomToken } from "firebase/auth";
function Header() {
  // const [user, setUser] = useState("");
  const logIn = useSelector(logInSelector);
  const isSingIn = useSelector(signInSelector);
  const userInfor = useSelector(userInforSelector);
  const genresSelector = useSelector(genreSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const inputEle = useRef();
  const [isNav, setNav] = useState(false);
  // const [isShowHead, setShowHeader] = useState(false);
  const [listResultSearch, setListResultSearch] = useState([]);
  const [isListSearch, setIsListSearch] = useState(false);
  const [showGenreMb, setShowGenreMb] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const genreMb = useRef();
  const barELe = useRef();
  const [showBarList, setShowBarList] = useState(false);
  const typeMovies = useRef();
  const handleFocusSearchInput = (e) => {
    setIsListSearch(true);
  };
  const handleBlurSearchInput = () => {
    setTimeout(() => {
      setIsListSearch(false);
    }, 200);
  };
  const handleSubmitSearch = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
      navigate(`/movies/search/${e.target.value}`);
    }
  };
  const handleClickBtn = (ele, router) => {
    if (location.pathname !== "/") {
      navigate(router);
    } else {
      ele.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };
  const handleSearchMovie = (e) => {
    if (e.target.value.trim()) {
      const searchResult = async () => {
        const result = await searchMovie(e.target.value);
        setListResultSearch(result);
      };
      searchResult();
    } else {
      setListResultSearch([]);
    }
  };
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(fireBaseSlice.actions.setSignIn(!!user));
      dispatch(fireBaseSlice.actions.setUserInfor(user._delegate));
    }
  });
  useEffect(() => {
    if (location.pathname !== "/") {
      setNav(true);
    }
  }, [location.pathname]);
  useEffect(() => {
    const genres = async () => {
      const res = await getGenreList();
      dispatch(genreSlice.actions.setGenres(res));
      dispatch(genreSlice.actions.setLoading());
    };
    const popular = async () => {
      const res = await getPopularMovies();
      dispatch(popularSlice.actions.setPopular(res));
    };
    genres();
    popular();
  }, []);
  useEffect(() => {
    if (showGenreMb) {
      typeMovies.current.style.top = 380 + "px";
    } else {
      typeMovies.current.style.top = 60 + "px";
    }
  }, [showGenreMb]);
  useEffect(() => {
    // db.collection("rooms").add({
    //   displayName: "abc",
    //   mesagge: [{ id: 1, name: "hoang" }],
    // });
    // db.collection("rooms").onSnapshot((snapshot) => {
    //   const data = snapshot.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));
    // });
    // const unregisterAuthObserver = firebase
    //   .auth()
    //   .onAuthStateChanged((user) => {
    //     console.log(user);
    //     if (user) {
    //       dispatch(fireBaseSlice.actions.setSignIn(!!user));
    //       dispatch(fireBaseSlice.actions.setUserInfor(user._delegate));
    //     }
    //   });
    // return () => unregisterAuthObserver();
  }, []);
  return (
    <div className="bg-neutral-900 fixed top-0 w-full z-20 h-14">
      <div className="fixed flex z-10 justify-center items-center h-14 top-0 w-full ">
        {logIn && !isSingIn && <ModalLogIn />}
        <div className="flex mb:w-full mb:pl-[10px] items-center h-full w-11/12 justify-between">
          <div className="flex ">
            <Link to={routes.Home} className="flex items-center justify-center">
              <IconMain />
            </Link>
            <Button className="mb:hidden" to={routes.Home}>
              Home
            </Button>
            {!isNav && (
              <Button
                className="mb:hidden"
                onClick={() =>
                  handleClickBtn(document.querySelector("#TopRated"))
                }
              >
                Top Rated
              </Button>
            )}
            {isNav && (
              <Button to="/movies/alloftype/top_rated" className="mb:hidden">
                Top Rated
              </Button>
            )}
            {!isNav && (
              <Button
                className="mb:hidden"
                onClick={() =>
                  handleClickBtn(document.querySelector("#UpComing"))
                }
              >
                Up Coming
              </Button>
            )}
            {isNav && (
              <Button
                to="/movies/alloftype/upcoming"
                className="mb:hidden"
                onClick={() =>
                  handleClickBtn(
                    document.querySelector("#UpComing"),
                    "/movies/alloftype/upcoming"
                  )
                }
              >
                Up Coming
              </Button>
            )}

            <Tippy
              interactive
              render={(attrs) => (
                <div
                  className="bg-green-300 relative rounded-md w-[600px] text-white"
                  tabIndex="-1"
                  {...attrs}
                >
                  <div className="absolute  top-[-24px] left-[56%] z-10 border-green-300 border-[12px] border-t-transparent  border-r-transparent border-l-transparent "></div>
                  {genresSelector.genres.map(({ id, name }) => {
                    return <ButtonType key={id} title={name} />;
                  })}
                </div>
              )}
            >
              <Button className="mb:hidden">
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
          <div className="flex mb:ml-[10px] bg-zinc-700 relative rounded-full items-center  ">
            <input
              ref={inputEle}
              onBlur={handleBlurSearchInput}
              onKeyUp={handleSearchMovie}
              placeholder="Tìm kiếm"
              onFocus={handleFocusSearchInput}
              onKeyDown={handleSubmitSearch}
              className="outline-0 rounded-full h-9 w-[280px] mb:w-[180px] bg-inherit text-sm p-2 py-3 text-zinc-200"
            />
            <span className="px-4 mb:px-[8px] border-l-[1px] border-[color:var(--primary)] text-[color:var(--primary)]">
              <FontAwesomeIcon
                onClick={() => {
                  if (inputEle.current.value.trim()) {
                    navigate(`/movies/search/${inputEle.current.value}`);
                  }
                }}
                className="cursor-pointer hover:text-green-300"
                icon={faMagnifyingGlass}
              />
            </span>
            {isListSearch && listResultSearch.length > 0 && (
              <div className="bg-green-600 mb:fixed mb:left-0 mb:right-0 mb:top-[56px] mb:w-full  w-[420px] p-[2px] pb-[4px] absolute top-[60px] rounded-md w-[var(--type-row-width)] text-white">
                <div className="overflow-auto scroll-bar max-h-[400px] ">
                  {listResultSearch.map(
                    (
                      { id, poster_path, original_title, vote_average },
                      index
                    ) => {
                      const abc =
                        poster_path || "/mVQTvegiq87kkf1lZGwmD4KFevB.jpg";
                      return (
                        <SearchItem
                          id={id}
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
          <div className="flex mb:hidden justify-center items-center">
            <Button className="mr-2 ">
              <FontAwesomeIcon className="text-2xl mt-1" icon={faBell} />
            </Button>
            {!isSingIn && (
              <button
                // onClick={() => dispatch(logInSlice.actions.setLogIn())}
                className="h-8 flex hover:text-black items-center w-[120px] justify-center rounded-md px-3 transition-all text-white  font-semibold hover:bg-green-300   py-2 bg-green-500"
              >
                Đăng nhập
              </button>
            )}
            {isSingIn && (
              <img
                src={userInfor.photoURL}
                className="w-[30px] h-[30px] rounded-full cursor-pointer"
              />
            )}
          </div>
          <div className="hidden mb:block ">
            <Button
              onClick={() => {
                setShowBar((prev) => !prev);
                if (!showBarList) {
                  barELe.current.style.transform = "translateX(0)";
                } else {
                  barELe.current.style.transform = "translateX(-100%)";
                }
                setShowBarList((prev) => !prev);
                if (showGenreMb) {
                  setShowGenreMb(false);
                  genreMb.current.style.transform = "translateX(-110%)";
                }
              }}
              className="mr-2 mb:px-[10px] mb:w-[54px] mb:m-0 "
            >
              <FontAwesomeIcon className="text-2xl mt-1 " icon={faBars} />
            </Button>
          </div>
          {showBar && (
            <div
              onClick={(e) => {
                if (!e.target.closest(".listMenu")) {
                  setShowBar(false);
                  setShowBarList(false);
                  barELe.current.style.transform = "translateX(-100%)";
                }
              }}
              className="fixed top-[56px] right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.5)]"
            ></div>
          )}
          <div
            ref={barELe}
            className="listMenu fixed transition-all top-[56px] translate-x-[-100%] left-0 bottom-0 w-[85%] bg-[rgba(0,0,0,0.8)]"
          >
            <div className=" px-[16px] py-[20px]">
              <ul className="relative">
                <li className="flex flex-col justify-between text-shadow text-[color:var(--primary)] text-[28px] font-[600]">
                  <div
                    onClick={() => {
                      setShowGenreMb((prev) => !prev);
                      if (showGenreMb) {
                        genreMb.current.style.transform = "translateX(-110%)";
                      } else {
                        genreMb.current.style.transform = "translateX(0)";
                      }
                    }}
                    className="flex justify-between p-[10px]"
                  >
                    <h3 className="text-[color:var(--primary)]">Category</h3>
                    {!showGenreMb && (
                      <span className="px-[16px]">
                        <FontAwesomeIcon icon={faCaretDown} />
                      </span>
                    )}
                    {showGenreMb && (
                      <span className="px-[16px]">
                        <FontAwesomeIcon icon={faCaretUp} />
                      </span>
                    )}
                  </div>

                  <div
                    ref={genreMb}
                    className=" mt-[10px] mb:translate-x-[-110%] transition-all "
                  >
                    {genresSelector.genres.map(({ id, name }) => {
                      return (
                        <ButtonType
                          className="mb:text-white  h-[32px] mb:font-[500]  mb:hover:text-[color:var(--primary)] overflow-hidden mb:w-[33.33%]"
                          onClick={() => {
                            setShowBar(false);
                            barELe.current.style.transform =
                              "translateX(-100%)";
                            setShowBarList((prev) => !prev);
                          }}
                          key={id}
                          title={name}
                        />
                      );
                    })}
                  </div>
                </li>
                <li
                  ref={typeMovies}
                  className="absolute transition-all top-[60px]  w-full  text-shadow text-[color:var(--primary)] text-[28px] font-[600]"
                >
                  <Link
                    onClick={() => {
                      setShowBar(false);
                      barELe.current.style.transform = "translateX(-100%)";
                      setShowBarList((prev) => !prev);
                    }}
                    to="/movies/alloftype/now_playing"
                    className="py-[6px] block"
                  >
                    <span className="mr-[18px] text-green-300">
                      <FontAwesomeIcon icon={faCaretRight} />
                    </span>
                    Now Playing
                  </Link>
                  <Link
                    onClick={() => {
                      setShowBar(false);
                      barELe.current.style.transform = "translateX(-100%)";
                      setShowBarList((prev) => !prev);
                    }}
                    to="/movies/alloftype/top_rated"
                    className="py-[6px] block"
                  >
                    <span className="mr-[18px] text-green-300">
                      <FontAwesomeIcon icon={faCaretRight} />
                    </span>
                    Top Rated
                  </Link>
                  <Link
                    onClick={() => {
                      setShowBar(false);
                      barELe.current.style.transform = "translateX(-100%)";
                      setShowBarList((prev) => !prev);
                    }}
                    to="/movies/alloftype/upcoming"
                    className="py-[6px] block"
                  >
                    <span className="mr-[18px] text-green-300">
                      <FontAwesomeIcon icon={faCaretRight} />
                    </span>
                    Up Coming
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
