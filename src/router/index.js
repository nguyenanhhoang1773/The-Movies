import Home from "~/pages/Home";
import Profile from "~/pages/Profile";
import WatchMovie from "~/pages/WatchMovie";
import routes from "~/config/routes/routes";
import Search from "~/pages/Search";
import Genres from "~/pages/Genres";
import MiniContainer from "~/Layout/MiniContainer";
import AllOfType from "~/pages/AllOfType";
import MovieInfor from "~/pages/MovieInfo";
const publicRoutes = [
  {
    path: routes.Home,
    Component: Home,
  },
  {
    path: routes.Profile,
    Component: Profile,
  },
  {
    path: routes.WatchMovie,
    Component: WatchMovie,
    Layout: MiniContainer,
  },
  {
    path: routes.MovieInfor,
    Component: MovieInfor,
  },
  {
    path: routes.Search,
    Component: Search,
    Layout: MiniContainer,
  },
  {
    path: routes.Genres,
    Component: Genres,
    Layout: MiniContainer,
  },
  {
    path: routes.AllOfType,
    Component: AllOfType,
    Layout: MiniContainer,
  },
];
export default publicRoutes;
