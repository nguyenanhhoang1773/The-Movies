import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultLayout from "./Layout/DefaulLayout";
import publicRoutes from "./router";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map(
            ({ path, Component, Layout = DefaultLayout }, index) => {
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Layout>
                      <Component />
                    </Layout>
                  }
                ></Route>
              );
            }
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
