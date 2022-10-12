import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
function ScrollBar({
  classNameWrapper,
  classNameScrollEle,
  heightContent,
  height,
  children,
}) {
  const { nameGenre } = useParams();
  const scrollBarEle = useRef();
  const wrapperEle = useRef();
  const contentWrapper = useRef();
  useEffect(() => {
    scrollBarEle.current.style.height = height + "px";
    contentWrapper.current.style.height = heightContent;
    scrollBarEle.current.style.top = 0;
  }, [nameGenre]);
  const handleScroll = (e) => {
    const height =
      wrapperEle.current.offsetHeight - scrollBarEle.current.offsetHeight;
    scrollBarEle.current.style.top =
      e.target.scrollTop *
        (height / (e.target.scrollHeight - e.target.offsetHeight)) +
      "px";
  };
  return (
    <div ref={wrapperEle} className={`relative ${classNameWrapper}`}>
      <div
        ref={contentWrapper}
        onScroll={handleScroll}
        className={`overflow-scroll ${classNameScrollEle}`}
      >
        {children}
      </div>
      <div
        ref={scrollBarEle}
        className={`absolute  bg-[color:var(--primary)]  rounded-md w-[4px] right-0 top-0 `}
      ></div>
    </div>
  );
}

export default ScrollBar;
