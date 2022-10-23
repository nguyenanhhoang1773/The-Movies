import Header from "./components/Header";
import ScrollBar from "~/components/ScrollBar";
import { useEffect, useRef, useState } from "react";

function DefaultLayout({ children }) {
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
      <div ref={wrapper} className={`mt-14 bg-slate-900 min-h-[900px]`}>
        <ScrollBar heightContent={resize} height={200}>
          {children}
        </ScrollBar>
      </div>
    </div>
  );
}

export default DefaultLayout;
