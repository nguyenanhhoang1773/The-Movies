import Header from "./components/Header";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="mt-14 bg-slate-900 min-h-[1200px]">{children}</div>
    </div>
  );
}

export default DefaultLayout;
