import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import { Toaster as HotToaster } from 'react-hot-toast';
import { routes } from "./utils/routes";
import moment from "moment";
import { Box, Button } from "@mui/material";

function App() {
  const [clock, setClock] = useState();
  useEffect(() => {
    setInterval(() => {
      setClock(moment().format("HH:mm:ss DD/MM/YY"));
    }, 1000);
  }, []);


  return (
    <Box
      className="App"
      sx={{
        transition: 'all',
        userSelect: 'none',
        height: '100%',
        minHeight: '100vh', // Ekranın tamamını kapsayan minimum yükseklik
        backgroundColor: '#131a29',
        overflowY: 'auto', // İçerik, kutunun boyutlarını aştığında dikey olarak kaydırma özelliği
      }}
    >
      <Routes>
        {routes.map((r) => (
          <Route key={r.path} path={r.path} element={r.component} />
        ))}
      </Routes>

      <Box
        sx={{
          position: 'fixed', // Sabit pozisyon
          width: '100%', 
          bottom: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#131a29',
        }}
      >
        {[
          { to: '/', label: 'Ana Sayfa' },
          { to: '/kayit', label: 'Veri Kayıt' },
          { to: '/yks_hgs', label: 'YKS-HGS' }
        ].map((item) => (
          <Button
            variant="outlined"
            component={RouterLink}
            to={item.to}
            key={item.to}
            sx={{
              width: 224,
              textAlign: 'center',
              color: 'white',
              borderRadius: 1,
            }}
          >
            {item.label}
          </Button>
        ))}
        <Box
          sx={{
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {clock}
        </Box>
      </Box>



      <HotToaster
        position="bottom-right"
        toastOptions={{
          style: {
            backdropFilter: 'blur(6px)',
            background: '#7a7a7a',
            color: '#ffffff',
            boxShadow: '#4d4d4d 0px 0px 10px 1px'
          }
        }}
      />
    </Box>
  );
  // return (
  //   <div className="App transition-all select-none h-screen bg-gradient-to-r from-gray-700 to-gray-900 items-center justfliy-center">
  //     <Routes>
  //       {routes.map((r) => (
  //         <Route key={r.path} path={r.path} element={r.component} />
  //       ))}
  //     </Routes>
  //     <div className=" bg-gray-600 absolute inset-x-0 bottom-0 grid grid-cols-2 gap-4 h-10 place-items-center ">
  //       <Link
  //         className="border transition-all p-1 m-1 w-56 text-center bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring focus:ring-yellow-300 text-white cursor-pointer rounded border-white"
  //         to="/"
  //       >
  //         Ana Sayfa
  //       </Link>
  //       <Link
  //         className="border transition-all p-1 m-1 w-56 text-center bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring focus:ring-yellow-300 text-white cursor-pointer rounded border-white"
  //         to="/kayit"
  //       >
  //         Veri Kayıt
  //       </Link>
  //       <Link
  //         className="border transition-all p-1 m-1 w-56 text-center bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring focus:ring-yellow-300 text-white cursor-pointer rounded border-white"
  //         to="/yks_hgs"
  //       >
  //         YKS-HGS
  //       </Link>
  //     </div>
  //     <div className="absolute right-1 bottom-1 text-white bg-gray-800 p-1 rounded border">
  //       <strong>{clock}</strong>
  //     </div>

  //   </div>
  // );
}

export default App;
