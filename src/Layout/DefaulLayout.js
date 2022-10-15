import Header from "./components/Header";
import ScrollBar from "~/components/ScrollBar";
import { useEffect, useRef, useState } from "react";

function DefaultLayout({ children }) {
  const wrapper = useRef();
  const heightWindow = window.innerHeight - 56 + "px";
  useEffect(() => {
    wrapper.current.style.minHeight = heightWindow;
  }, []);
  return (
    <div>
      <Header />
      <div ref={wrapper} className={`mt-14 bg-slate-900 min-h-[900px]`}>
        <ScrollBar heightContent={heightWindow} height={200}>
          {children}
        </ScrollBar>
      </div>
    </div>
  );
}

export default DefaultLayout;
