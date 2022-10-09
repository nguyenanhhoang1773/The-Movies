import Header from "./components/Header";
import ScrollBar from "~/components/ScrollBar";

function MiniContainer({ children }) {
  return (
    <div>
      <Header />
      <div className="mt-14 bg-slate-900 min-h-[900px]">
        <ScrollBar classNameScrollEle="h-[900px]" height={200}>
          <div className="ml-[160px] mr-[160px]">{children}</div>
        </ScrollBar>
      </div>
    </div>
  );
}

export default MiniContainer;
