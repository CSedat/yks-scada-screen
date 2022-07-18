import Admin from "../Pages/Admin/Admin";
import Home from "../Pages/Home/Home";

export const REDIRECT_PATH = {
  HOME: "/",
  ADMIN: "/admin",
};

export const routes = [
  {
    path: REDIRECT_PATH.HOME,
    component: <Home />,
  },
  {
    path: REDIRECT_PATH.ADMIN,
    component: <Admin />,
  },
];
