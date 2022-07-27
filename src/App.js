import { Routes, Route, Link } from "react-router-dom";
import { routes } from "./utils/routes";

function App() {


  return (
    <div className="App transition-all select-none h-screen bg-gradient-to-r from-cyan-800 to-blue-900 items-center justfliy-center">
      <Routes>
        {routes.map((r) => (
          <Route path={r.path} element={r.component} />
        ))}
      </Routes>
      <div className=" bg-gray-600 absolute inset-x-0 bottom-0 grid grid-cols-4 gap-4 h-10 place-items-center ">
        <Link className="border transition-all p-1 m-1 w-56 text-center bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring focus:ring-yellow-300 text-white cursor-pointer rounded border-white" to='/'>Ana Sayfa</Link>
        <Link className="border transition-all p-1 m-1 w-56 text-center bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring focus:ring-yellow-300 text-white cursor-pointer rounded border-white" to='/kayit'>Veri Kayıt</Link>
        <Link className="border transition-all p-1 m-1 w-56 text-center bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring focus:ring-yellow-300 text-white cursor-pointer rounded border-white" to='/ayarlar'>Ayarlar</Link>
        <Link className="border transition-all p-1 m-1 w-56 text-center bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring focus:ring-yellow-300 text-white cursor-pointer rounded border-white" to='/kalibrasyon'>Kalibrasyon</Link>
      </div>
    </div>
  );
}



export default App;
