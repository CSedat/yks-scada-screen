import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { routes } from "./utils/routes";
import moment from "moment";

function App() {
  const [clock, setClock] = useState();
  useEffect(() => {
    setInterval(() => {
      setClock(moment().format("HH:mm:ss DD/MM/YY"));
    }, 1000);
  }, []);

  return (
    <div className="App transition-all select-none h-screen bg-gradient-to-r from-cyan-700 to-blue-900 items-center justfliy-center">
      <Routes>
        {routes.map((r) => (
          <Route path={r.path} element={r.component} />
        ))}
      </Routes>
      <div className=" bg-gray-600 absolute inset-x-0 bottom-0 grid grid-cols-2 gap-4 h-10 place-items-center ">
        <Link
          className="border transition-all p-1 m-1 w-56 text-center bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring focus:ring-yellow-300 text-white cursor-pointer rounded border-white"
          to="/"
        >
          Ana Sayfa
        </Link>
        <Link
          className="border transition-all p-1 m-1 w-56 text-center bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring focus:ring-yellow-300 text-white cursor-pointer rounded border-white"
          to="/kayit"
        >
          Veri Kayıt
        </Link>
        {/* <Link
          className="border transition-all p-1 m-1 w-56 text-center bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring focus:ring-yellow-300 text-white cursor-pointer rounded border-white"
          to="/ayarlar"
        >
          Ayarlar
        </Link>
        <Link
          className="border transition-all p-1 m-1 w-56 text-center bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring focus:ring-yellow-300 text-white cursor-pointer rounded border-white"
          to="/kalibrasyon"
        >
          Kalibrasyon
        </Link> */}
      </div>
      <div className="absolute right-1 bottom-1 text-white bg-gray-800 p-1 rounded border">
        <strong>{clock}</strong>
      </div>
    </div>
  );
}

export default App;
