import Home from "~/pages/Home";
import Profile from "~/pages/Profile";
import WatchMovie from "~/pages/WatchMovie";
import routes from "~/config/routes/routes";

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
];
export default publicRoutes;
