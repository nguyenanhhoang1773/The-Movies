import { useEffect, useRef } from "react";

function ScrollBar({ classNameWrapper, classNameScrollEle, height, children }) {
  const scrollBarEle = useRef();
  const wrapperEle = useRef();
  useEffect(() => {
    scrollBarEle.current.style.height = height + "px";
  }, []);
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
