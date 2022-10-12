import Header from "./components/Header";
import ScrollBar from "~/components/ScrollBar";

function MiniContainer({ children }) {
  const heightWindow = window.innerHeight - 56 + "px";
  return (
    <div>
      <Header />
      <div className={`mt-14 bg-slate-900 min-h-[${heightWindow}]`}>
        <ScrollBar classNameScrollEle={`h-[${heightWindow}]`} height={200}>
          <div className="ml-[160px] mr-[160px]">{children}</div>
        </ScrollBar>
      </div>
    </div>
  );
}

export default MiniContainer;
