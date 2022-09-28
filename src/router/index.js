import Home from "~/pages/Home";
import Profile from "~/pages/Profile";
import WatchMovie from "~/pages/WatchMovie";
import routes from "~/config/routes/routes";
import Search from "~/pages/Search";
import MiniContainer from "~/Layout/MiniContainer";

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
  },
  {
    path: routes.Search,
    Component: Search,
    Layout: MiniContainer,
  },
];
export default publicRoutes;
