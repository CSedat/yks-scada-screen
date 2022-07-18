import { Routes, Route, Link } from "react-router-dom";
import { routes } from "./utils/rotes";

function App() {
  return (
    <div className="App transition-all select-none h-screen bg-gradient-to-r from-cyan-800 to-blue-900 items-center justfliy-center">
      <Routes>
        {routes.map((r) => (
          <Route path={r.path} element={r.component} />
        ))}
      </Routes>
      <div className=" bg-gray-600 absolute inset-x-0 bottom-0 grid grid-cols-3 gap-4 h-10 place-items-center ">
        <h2 className="border transition-all p-1 m-1 bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring focus:ring-violet-300 text-white cursor-pointer rounded border-white">
          Ana Sayfa
        </h2>
        <h2 className="border transition-all p-1 m-1 bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring focus:ring-violet-300 text-white cursor-pointer rounded border-white">
          Ayarlar
        </h2>
        <h2 className="border transition-all p-1 m-1 bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring focus:ring-violet-300 text-white cursor-pointer rounded border-white">
          Kalibrasyon
        </h2>
      </div>
    </div>
  );
}

export default App;
