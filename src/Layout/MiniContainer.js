import Header from "./components/Header";

function MiniContainer({ children }) {
  return (
    <div>
      <Header />
      <div className="mt-14 bg-slate-900 min-h-[1200px]">
        <div className="ml-[160px] mr-[160px]">{children}</div>
      </div>
    </div>
  );
}

export default MiniContainer;
