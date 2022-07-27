import Home from "../Pages/Home";
import Settings from "../Pages/Settings";
import Calibration from "../Pages/Calibration";
import Excel from "../Pages/Excel";

export const REDIRECT_PATH = {
  HOME: "/",
  SETTINGS: "/ayarlar",
  KALIBRATION: "/kalibrasyon",
  EXCEL: "/kayit",
};

export const routes = [
  {
    path: REDIRECT_PATH.HOME,
    component: <Home />,
  },
  {
    path: REDIRECT_PATH.SETTINGS,
    component: <Settings />,
  },
  {
    path: REDIRECT_PATH.KALIBRATION,
    component: <Calibration />,
  },
  {
    path: REDIRECT_PATH.EXCEL,
    component: <Excel />,
  },
];
