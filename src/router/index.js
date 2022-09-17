import Home from "~/pages/Home";
import Profile from "~/pages/Profile";
import User from "~/pages/User";
import routes from "~/config/routes";

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
    path: routes.User,
    Component: User,
  },
];
export default publicRoutes;
