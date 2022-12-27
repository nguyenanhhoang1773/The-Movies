import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Row, Col } from "antd";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  doc,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { faChevronUp, faCircleUp } from "@fortawesome/free-solid-svg-icons";

import { userInforSelector } from "~/redux/Selector";
import { getDetail } from "~/apiServices/movieService";
import Loading from "~/components/Loading";
import ScrollBar from "~/components/ScrollBar";
import RecommentMovie from "~/components/RecommentMovie";
import { getRecommentMovies } from "~/apiServices/movieService";
import MoviePoster from "~/components/MoviePoster";
import Comment from "~/components/Comment/Comment";
import { db } from "~/firebase/config";
import classNames from "classnames/bind";
import style from "./watchMoive.module.scss";
import { convertTimeStamp } from "~/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const cx = classNames.bind(style);
function WatchMovie() {
  let { idMovie } = useParams();
  const userInfor = useSelector(userInforSelector);
  const isMoblie = useMediaQuery({ minWidth: 326, maxWidth: 600 });
  const [recommentMovie, setRecommentMovie] = useState(3);
  const [isOverview, setOverview] = useState(true);
  const [movie, setMovie] = useState({});
  const [recomment, setRecomment] = useState([]);
  const [messages, setMessages] = useState([]);
  const [lastVisible, setlastVisible] = useState("");
  const [showMessages, setShowMessages] = useState(false);
  const scrollBarEle = useRef();
  const video = useRef();
  const wrapperRef = useRef();
  const testRef = useRef();
  const overview = useRef();
  useEffect(() => {
    if (!isMoblie) {
      setShowMessages(true);
    } else {
      setShowMessages(false);
    }
  }, [isMoblie]);
  useEffect(() => {
    const getMess = async () => {
      const q = query(
        collection(db, "message"),
        where("room", "==", idMovie),
        orderBy("timestamp", "desc"),
        limit(5)
      );
      let data = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setlastVisible(lastVisible);
      setMessages(data);
    };
    getMess();
    const q = query(collection(db, "message"), where("room", "==", idMovie));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "modified") {
          console.log(change.doc.data());
          setMessages((mess) => {
            return [change.doc.data(), ...mess];
          });
        }
      });
    });
    return () => unsubscribe();
  }, [idMovie]);
  useEffect(() => {
    const fetchMovie = async () => {
      const res = await getDetail(idMovie);
      setMovie(res);
    };
    const fetchRecomment = async () => {
      const res = await getRecommentMovies(idMovie);
      setRecomment(res);
    };
    fetchMovie();
    fetchRecomment();
  }, [idMovie]);

  const handleScrollCommment = (e) => {
    if (e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight) {
      const getMess = async () => {
        try {
          const q = query(
            collection(db, "message"),
            where("room", "==", idMovie),
            orderBy("timestamp", "desc"),
            startAfter(lastVisible),
            limit(4)
          );
          let data = [];
          const querySnapshot = await getDocs(q);
          const lastVisibleSecond =
            querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          setMessages((prev) => {
            return [...prev, ...data];
          });
          setlastVisible(lastVisibleSecond);
        } catch (error) {
          console.log(error);
        }
      };

      getMess();
    }
  };
  return (
    <Row gutter={[50]}>
      <div ref={testRef}></div>
      <div className="flex mb:block mb:pb-[20px] mb:min-h-[900px] min-h-[1000px] mb:justify-center justify-between px-[40px] py-[60px] mb:py-0 mb:px-[30px]">
        <Col ms={{ span: 24 }} ls={16}>
          <div className=" mt-[50px] mb:flex mb:justify-center mb:flex-col mb:mt-[30px] ">
            <div className="flex w-full justify-center">
              <div className="relative w-full mb:w-[unset]">
                <iframe
                  ref={video}
                  title="Movie"
                  allowFullScreen
                  className="relative mb:w-[300px] mb:h-auto w-full mb:min-w-0 min-w-[400px] h-[500px]  z-10"
                  src={`https://www.2embed.to/embed/tmdb/movie?id=${idMovie}`}
                ></iframe>
                <div className="absolute mb:w-[300px] flex justify-center items-center top-0 bottom-0 left-0 right-0 z-0 bg-zinc-900">
                  <Loading className="w-[40px] h-[40px]" />
                </div>
              </div>
            </div>
            {movie.title && (
              <div className="flex w-full mb:items-center flex-col">
                <h3 className=" text-[color:var(--primary)] font-[600] mt-[16px] text-[24px] mb:w-[300px]">
                  {movie.title}
                </h3>
                <p
                  ref={overview}
                  className="text-white mb:w-[300px] mb:h-[90px] mb:overflow-hidden  mt-6px"
                >
                  <span className="text-[20px] font-[500] text-[color:var(--primary)] mr-[4px]">
                    Overview :
                  </span>
                  {movie.overview}
                </p>
                {isOverview && (
                  <span className="hidden mb:inline w-[300px] text-white">
                    ...
                    <span
                      onClick={() => {
                        overview.current.style.height = "auto";
                        setOverview(false);
                      }}
                      className="hidden mb:inline ml-[4px] underline text-[color:var(--primary)]"
                    >
                      Read more
                    </span>
                  </span>
                )}
                {isMoblie && !showMessages && (
                  <button
                    onClick={() => {
                      setShowMessages(true);
                    }}
                    className="text-[20px] mt-[20px] text-white text-shadow border border-[color:var(--primary)] px-[28px] py-[8px] rounded-full"
                  >
                    Comment
                  </button>
                )}
                {showMessages && (
                  <div className="relative mb-[24px]">
                    {isMoblie && (
                      <FontAwesomeIcon
                        onClick={() => setShowMessages(false)}
                        className="absolute bottom-[-44px]  text-[color:var(--primary)] text-[34px] p-[6px] right-[50%] left-[50%] translate-x-[-50%]"
                        icon={faChevronUp}
                      />
                    )}
                    <div
                      ref={wrapperRef}
                      onScroll={handleScrollCommment}
                      className={`${cx(
                        "wrapper-comments"
                      )} overflow-auto max-h-[400px]  mt-[20px] p-[20px] bg-slate-800 rounded-lg`}
                    >
                      <Comment
                        write
                        email={userInfor.email}
                        room={idMovie}
                        name={userInfor.displayName}
                        photoUrl={userInfor.photoURL}
                      />
                      {messages.map(
                        (
                          { name, photoURL, room, text, timestamp, email },
                          index
                        ) => (
                          <Comment
                            room={room}
                            name={name}
                            email={email}
                            message={text}
                            photoUrl={photoURL}
                            timestamp={timestamp}
                            key={index}
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            {!movie.title && (
              <div>
                <h3 className=" text-slate-500 inline-block  bg-slate-500 font-[600] mt-[16px] text-[16px]">
                  nguyenhoang
                </h3>
                <p className=" mb:w-[300px] mt-[12px]">
                  {!isMoblie && (
                    <span className="text-[10px] font-[500] text-slate-500  bg-slate-500 mr-[4px]">
                      hoang la nguoi vua dep trai vua tot bung anh ay qua la
                      dinh minhf uoc gi anh ay la nguoi yeu cua minh hoang la
                      nguoi vua dep trai vua tot bung anh ay qua la dinh minhf
                      uoc gi anh ay la nguoi yeu cua minh uoc gi anh ay la nguoi
                      yeu cua minhla nguoi vua dep trai vua tot bung anh ay qua
                      la dinh minhf uoc gi anh ay la nguoi yeu cua minh uoc gi
                      anh ay la nguoi yeu cua minhla nguoi vua dep trai vua tot
                      bung anh ay qua la dinh minhf uoc gi anh ay la nguoi yeu
                      cua minh uoc gi anh ay la
                    </span>
                  )}
                  {isMoblie && (
                    <span className="text-[10px] font-[500] text-slate-500  bg-slate-500 mr-[4px]">
                      hoang la nguoi vua dep trai vua tot bung anh ay qua la
                      dinh minhf uoc gi anh ay la nguoi yeu cua minh hoang la
                      nguoi vua dep trai vua tot bung anh ay qua la dinh minhf
                      uoc gi anh ay
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </Col>
        {recomment.length === 0 && !isMoblie && (
          <Col span={8}>
            <div className=" mb:w-full mb:mt-[20px] mb:pl-0  ">
              <h3 className="text-slate-500 w-[280px] h-[30px]  bg-slate-500 mb-[20px] mb:mb-0 mb:text-center text-[26px] font-[500]">
                Recommendations
              </h3>
              <ScrollBar
                classNameWrapper=" bg-[rgba(0,0,0,0.3)] py-[10px] rounded-[4px] pl-[10px] overflow-hidden"
                classNameScrollEle="h-[900px]"
                height={160}
              ></ScrollBar>
            </div>
          </Col>
        )}
        {recomment.length > 0 && (
          <Col ms={{ span: 24 }} lg={8}>
            <div className="  mb:w-full mb:mt-[20px] mb:pl-0  ">
              <h3 className="text-[color:var(--primary)] mb-[6px] mb:text-[24px] mb:mb-0 mb:text-center text-[30px] font-[500]">
                Recommendations
              </h3>
              {!isMoblie && (
                <ScrollBar
                  classNameWrapper=" bg-[rgba(0,0,0,0.3)] py-[10px] rounded-[4px] pl-[10px] overflow-hidden"
                  classNameScrollEle="h-[700px]"
                  height={160}
                >
                  {recomment.map(
                    ({ id, title, poster_path, vote_average }, index) => (
                      <RecommentMovie
                        key={id}
                        id={id}
                        title={title}
                        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                        star={vote_average}
                      />
                    )
                  )}
                </ScrollBar>
              )}
              {isMoblie && (
                <div className="w-full flex flex-wrap justify-between">
                  {recomment.map(
                    ({ id, title, poster_path, vote_average }, index) => {
                      if (index <= recommentMovie) {
                        return (
                          <MoviePoster
                            width="w-[150px]"
                            key={id}
                            id={id}
                            title={title}
                            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                            star={vote_average}
                          />
                        );
                      }
                    }
                  )}
                  {recommentMovie < 4 && (
                    <div className="flex justify-center items-center mt-[8px] w-full">
                      <div
                        onClick={() => setRecommentMovie(99)}
                        className="flex  justify-center items-center hover:bg-green-300 text-white font-[500] text-shadow w-[100px] h-[40px] bg-[color:var(--primary)] rounded-full"
                      >
                        <span>Show more</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Col>
        )}
      </div>
    </Row>
  );
}

export default WatchMovie;
