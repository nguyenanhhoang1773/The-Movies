import Header from "./components/Header";
import ScrollBar from "~/components/ScrollBar";
import { useEffect, useRef, useState } from "react";

function MiniContainer({ children }) {
  const heightWindow = window.innerHeight - 56 + "px";
  const [resize, setResize] = useState(heightWindow);
  const wrapper = useRef();
  useEffect(() => {
    wrapper.current.style.minHeight = heightWindow;
    window.onresize = () => {
      const heightWindow = window.innerHeight - 56 + "px";
      wrapper.current.style.minHeight = heightWindow;
      setResize(heightWindow);
    };
  }, []);
  return (
    <div>
      <Header />
      <div ref={wrapper} className={`mt-14 bg-slate-900`}>
        <ScrollBar heightContent={resize} height={200}>
          <div className="mb:m-0 ml-[160px] mr-[160px]">{children}</div>
        </ScrollBar>
      </div>
    </div>
  );
}

export default MiniContainer;
