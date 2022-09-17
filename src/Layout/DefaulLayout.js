import Header from "./components/Header";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="mt-14">{children}</div>
    </div>
  );
}

export default DefaultLayout;
