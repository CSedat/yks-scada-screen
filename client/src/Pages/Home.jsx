import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { FaBell } from "react-icons/fa";
import {
  HiOutlineStatusOnline,
  HiOutlineStatusOffline,
  HiRefresh,
} from "react-icons/hi";
import logo from "../assests/polyakeynez.png";
import gray_belt_conveyor from "../assests/gray_belt_conveyor.svg";
import red_belt_conveyor from "../assests/red_belt_conveyor.svg";
import green_belt_conveyor from "../assests/green_belt_conveyor.svg";
import yellow_belt_conveyor from "../assests/yellow_belt_conveyor.svg";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
    },
    error: {
      main: "#ff0000",
    },
  },
});
const ipadress = "https://yksscada.polyakeynez.com/";
let serverconnectionok = false;
let plcconneectionok = false;

function Home() {
  const [araurunseviye, setAraurunseviye] = useState(10);
  const [tozseviye, setTozseviye] = useState(20);
  const [findikseviye, setFindikseviye] = useState(30);
  const [cevizseviye, setCevizseviye] = useState(40);

  const [bk1, set1] = useState(false); // (bool) Otomatik/Manuel false-oto
  const [bk1autostrt, setBk1autostr] = useState(false);
  const Bk1autostr = () => setBk1autostr(!bk1autostrt); // (bool)
  const [bk1autostp, setBk1autostp] = useState(false);
  const Bk1autostp = () => setBk1autostp(!bk1autostp); // (bool)
  const [bk1hertz, setBk1hertz] = useState(100); // (int) %0-100
  const [bk1localmode, setBk1localmode] = useState(false);
  const updateBk1hertz = (e) => {
    setBk1hertz(e);
    axios.post(`${ipadress}writePLCDataInts`, {
      ints: {
        bk1hertz: e,
        bk2hertz: bk2hertz,
        bk3hertz: bk3hertz,
        bk4hertz: bk4hertz,
      },
    });
  }; // (int) %0-100
  const [bk1manbantstrt, setBk1manbantstrt] = useState(false);
  const Bk1manbantstrt = () => setBk1manbantstrt(!bk1manbantstrt); // (bool)
  const [bk1manbantstp, setBk1manbantstp] = useState(false);
  const Bk1manbantstp = () => setBk1manbantstp(!bk1manbantstp); // (bool)
  const [bk1manklpopen, setBk1manklpopen] = useState(false);
  const Bk1manklpopen = () => setBk1manklpopen(!bk1manklpopen); // (bool)
  const [bk1manklpclose, setBk1manklpclose] = useState(false);
  const Bk1manklpclose = () => setBk1manklpclose(!bk1manklpclose); // (bool)

  const [bk2, set2] = useState(false); // (bool) Otomatik/Manuel false-oto
  const [bk2autostrt, setBk2autostr] = useState(false);
  const Bk2autostr = () => setBk2autostr(!bk2autostrt); // (bool)
  const [bk2autostp, setBk2autostp] = useState(false);
  const Bk2autostp = () => setBk2autostp(!bk2autostp); // (bool)
  const [bk2hertz, setBk2hertz] = useState(100);
  const [bk2localmode, setBk2localmode] = useState(false);
  const updateBk2hertz = (e) => {
    setBk2hertz(e);
    axios.post(`${ipadress}writePLCDataInts`, {
      ints: {
        bk1hertz: bk1hertz,
        bk2hertz: e,
        bk3hertz: bk3hertz,
        bk4hertz: bk4hertz,
      },
    });
  }; // (int) %0-100
  const [bk2manbantstrt, setBk2manbantstrt] = useState(false);
  const Bk2manbantstrt = () => setBk2manbantstrt(!bk2manbantstrt); // (bool)
  const [bk2manbantstp, setBk2manbantstp] = useState(false);
  const Bk2manbantstp = () => setBk2manbantstp(!bk2manbantstp); // (bool)
  const [bk2manklpopen, setBk2manklpopen] = useState(false);
  const Bk2manklpopen = () => setBk2manklpopen(!bk2manklpopen); // (bool)
  const [bk2manklpclose, setBk2manklpclose] = useState(false);
  const Bk2manklpclose = () => setBk2manklpclose(!bk2manklpclose); // (bool)

  const [bk3, set3] = useState(false); // (bool) Otomatik/Manuel false-oto
  const [bk3autostrt, setBk3autostr] = useState(false);
  const Bk3autostr = () => setBk3autostr(!bk3autostrt); // (bool)
  const [bk3autostp, setBk3autostp] = useState(false);
  const Bk3autostp = () => setBk3autostp(!bk3autostp); // (bool)
  const [bk3hertz, setBk3hertz] = useState(100);
  const [bk3localmode, setBk3localmode] = useState(false);
  const updateBk3hertz = (e) => {
    setBk3hertz(e);
    axios.post(`${ipadress}writePLCDataInts`, {
      ints: {
        bk1hertz: bk1hertz,
        bk2hertz: bk2hertz,
        bk3hertz: e,
        bk4hertz: bk4hertz,
      },
    });
  }; // (int) %0-100
  const [bk3manbantstrt, setBk3manbantstrt] = useState(false);
  const Bk3manbantstrt = () => setBk3manbantstrt(!bk3manbantstrt); // (bool)
  const [bk3manbantstp, setBk3manbantstp] = useState(false);
  const Bk3manbantstp = () => setBk3manbantstp(!bk3manbantstp); // (bool)
  const [bk3manklpopen, setBk3manklpopen] = useState(false);
  const Bk3manklpopen = () => setBk3manklpopen(!bk3manklpopen); // (bool)
  const [bk3manklpclose, setBk3manklpclose] = useState(false);
  const Bk3manklpclose = () => setBk3manklpclose(!bk3manklpclose); // (bool)

  const [bk4, set4] = useState(false); // (bool) Otomatik/Manuel false-oto
  const [bk4autostrt, setBk4autostr] = useState(false);
  const Bk4autostr = () => setBk4autostr(!bk4autostrt); // (bool)
  const [bk4autostp, setBk4autostp] = useState(false);
  const Bk4autostp = () => setBk4autostp(!bk4autostp); // (bool)
  const [bk4hertz, setBk4hertz] = useState(100);
  const [bk4localmode, setBk4localmode] = useState(false);
  const updateBk4hertz = (e) => {
    setBk4hertz(e);
    axios.post(`${ipadress}writePLCDataInts`, {
      ints: {
        bk1hertz: bk1hertz,
        bk2hertz: bk2hertz,
        bk3hertz: bk3hertz,
        bk4hertz: e,
      },
    });
  }; // (int) %0-100
  const [bk4manbantstrt, setBk4manbantstrt] = useState(false);
  const Bk4manbantstrt = () => setBk4manbantstrt(!bk4manbantstrt); // (bool)
  const [bk4manbantstp, setBk4manbantstp] = useState(false);
  const Bk4manbantstp = () => setBk4manbantstp(!bk4manbantstp); // (bool)
  const [bk4manklpopen, setBk4manklpopen] = useState(false);
  const Bk4manklpopen = () => setBk4manklpopen(!bk4manklpopen); // (bool)
  const [bk4manklpclose, setBk4manklpclose] = useState(false);
  const Bk4manklpclose = () => setBk4manklpclose(!bk4manklpclose); // (bool)

  const [faultreset, setDaultreset] = useState(false);
  const FaultReset = () => setDaultreset(!faultreset);

  const [bell1, setBell1] = useState(false);
  const [bell2, setBell2] = useState(false);
  const [bell3, setBell3] = useState(false);
  const [bell4, setBell4] = useState(false);

  const updatebk1 = () => set1(!bk1); // (bool)
  const updatebk2 = () => set2(!bk2); // (bool)
  const updatebk3 = () => set3(!bk3); // (bool)
  const updatebk4 = () => set4(!bk4); // (bool)
  const updatebell1 = () => setBell1(!bell1); // (bool)
  const updatebell2 = () => setBell2(!bell2); // (bool)
  const updatebell3 = () => setBell3(!bell3); // (bool)
  const updatebell4 = () => setBell4(!bell4); // (bool)

  const [status1, setStatus1] = useState([]); // (int) 0: Çalışmaya Hazır, 1: Çalıştırılıyor, 2: Çalışıyor, 3: Sürücü Hatası, 4: Çalışma Hatası, 5: İp Çekti Hatası, 6: Acil Stop Basıldı, 7: Bant Hızı Hatası (Devir Bekçisi)
  const [status2, setStatus2] = useState([]); // (int) 0: Çalışmaya Hazır, 1: Çalıştırılıyor, 2: Çalışıyor, 3: Sürücü Hatası, 4: Çalışma Hatası, 5: İp Çekti Hatası, 6: Acil Stop Basıldı, 7: Bant Hızı Hatası (Devir Bekçisi)
  const [status3, setStatus3] = useState([]); // (int) 0: Çalışmaya Hazır, 1: Çalıştırılıyor, 2: Çalışıyor, 3: Sürücü Hatası, 4: Çalışma Hatası, 5: İp Çekti Hatası, 6: Acil Stop Basıldı, 7: Bant Hızı Hatası (Devir Bekçisi)
  const [status4, setStatus4] = useState([]); // (int) 0: Çalışmaya Hazır, 1: Çalıştırılıyor, 2: Çalışıyor, 3: Sürücü Hatası, 4: Çalışma Hatası, 5: İp Çekti Hatası, 6: Acil Stop Basıldı, 7: Bant Hızı Hatası (Devir Bekçisi)
  // const [d709status, setD709Status] = useState([]); // (int) 0: Çalışmaya Hazır, 1: Çalıştırılıyor, 2: Çalışıyor, 3: Sürücü Hatası, 4: Çalışma Hatası, 5: İp Çekti Hatası, 6: Acil Stop Basıldı, 7: Bant Hızı Hatası (Devir Bekçisi)

  // const [d709, setd709] = useState(false);
  // const updated709 = () => setd709(!d709);
  // const [d709start, setd709start] = useState(false);
  // const d709strt = () => setd709start(!d709start); // (bool)
  // const [d709stop, setd709stop] = useState(false);
  // const d709stp = () => setd709stop(!d709stop); // (bool)

  const [bk1referans, setBk1referans] = useState(0);
  const [bk2referans, setBk2referans] = useState(0);
  const [bk3referans, setBk3referans] = useState(0);
  const [bk4referans, setBk4referans] = useState(0);

  const [bk1ropestatus, setBk1ropestatus] = useState(false);
  const [bk2ropestatus, setBk2ropestatus] = useState(false);
  const [bk3ropestatus, setBk3ropestatus] = useState(false);
  const [bk4ropestatus, setBk4ropestatus] = useState(false);

  const [bk1speedswstatus, setBk1speedswstatus] = useState(false);
  const [bk2speedswstatus, setBk2speedswstatus] = useState(false);
  const [bk3speedswstatus, setBk3speedswstatus] = useState(false);
  const [bk4speedswstatus, setBk4speedswstatus] = useState(false);

  const [SystemOK, setSystemOK] = useState(false);

  useEffect(() => {
    axios
      .get(`${ipadress}getPLCData`)
      .then((res) => {
        let bb = res.data;
        set1(bb.bools.bk1);
        set2(bb.bools.bk2);
        set3(bb.bools.bk3);
        set4(bb.bools.bk4);
        // setd709(bb.bools.d709)
        setBk1hertz(bb.Ints.Bk1Hertz);
        setBk2hertz(bb.Ints.Bk2Hertz);
        setBk3hertz(bb.Ints.Bk3Hertz);
        setBk4hertz(bb.Ints.Bk4Hertz);
      })
      .catch((err) => {
        console.log(err);
      });
    const timer = setInterval(() => {
      try {
        axios
          .get(`${ipadress}getPLCData`)
          .then((res) => {
            setAraurunseviye(res.data.Ints.araurunseviye);
            setTozseviye(res.data.Ints.tozseviye);
            setFindikseviye(res.data.Ints.findikseviye);
            setCevizseviye(res.data.Ints.cevizseviye);
            serverconnectionok = true;
            plcconneectionok = res.data.Connected;
            setStatus1(res.data.Status[0]);
            setStatus2(res.data.Status[1]);
            setStatus3(res.data.Status[2]);
            setStatus4(res.data.Status[3]);
            // setD709Status(res.data.Status[4])
            setBk1localmode(res.data.Local_Mode[0]);
            setBk2localmode(res.data.Local_Mode[1]);
            setBk3localmode(res.data.Local_Mode[2]);
            setBk4localmode(res.data.Local_Mode[3]);
            setBk1referans(res.data.Driver_Speeds[0]);
            setBk2referans(res.data.Driver_Speeds[1]);
            setBk3referans(res.data.Driver_Speeds[2]);
            setBk4referans(res.data.Driver_Speeds[3]);
            setSystemOK(res.data.Alarms[0]);
            setBk1ropestatus(res.data.Alarms[1]);
            setBk2ropestatus(res.data.Alarms[2]);
            setBk3ropestatus(res.data.Alarms[3]);
            setBk4ropestatus(res.data.Alarms[4]);
            setBk1speedswstatus(res.data.Alarms[5]);
            setBk2speedswstatus(res.data.Alarms[6]);
            setBk3speedswstatus(res.data.Alarms[7]);
            setBk4speedswstatus(res.data.Alarms[8]);
          })
          .catch((err) => {
            console.log(err);
            serverconnectionok = false;
          });
      } catch (error) {
        console.log(error);
        serverconnectionok = false;
      }
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    axios.post(`${ipadress}writePLCData`, {
      bools: {
        bk1,
        bk1autostrt,
        bk1autostp,
        bk1manbantstrt,
        bk1manbantstp,
        bk1manklpopen,
        bk1manklpclose,

        bk2,
        bk2autostrt,
        bk2autostp,
        bk2manbantstrt,
        bk2manbantstp,
        bk2manklpopen,
        bk2manklpclose,

        bk3,
        bk3autostrt,
        bk3autostp,
        bk3manbantstrt,
        bk3manbantstp,
        bk3manklpopen,
        bk3manklpclose,

        bk4,
        bk4autostrt,
        bk4autostp,
        bk4manbantstrt,
        bk4manbantstp,
        bk4manklpopen,
        bk4manklpclose,

        // d709,
        // d709start,
        // d709stop,

        bell1,
        bell2,
        bell3,
        bell4,
        faultreset,
      },
      ints: {
        bk1hertz,
        bk2hertz,
        bk3hertz,
        bk4hertz,
      },
    });
  });

  return (
    <div className="text-white text-center gap-4 place-items-stretch ">
      <div className="absolute rounded top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-56 w-96 ">
        <img src={logo} alt="" />
        <div className="grid gap-4">
          <div>
            {serverconnectionok ? (
              <div className="text-green-500 text-center gap-4 place-items-stretch flex justify-center border border-green-500 rounded">
                {" "}
                Sunucu Bağlantısı Kuruldu <HiOutlineStatusOnline
                  size={25}
                />{" "}
              </div>
            ) : (
              <div className="text-red-500 text-center gap-4 place-items-stretch items-center flex justify-center border border-red-500 rounded">
                {" "}
                Sunucu Bağlantısı Koptu <HiOutlineStatusOffline size={25} />
              </div>
            )}
          </div>
          <div>
            {plcconneectionok ? (
              <div className="text-green-500 text-center gap-4 place-items-stretch flex justify-center border border-green-500 rounded">
                PLC Bağlantısı Kuruldu <HiOutlineStatusOnline size={25} />{" "}
              </div>
            ) : (
              <div className="text-red-500 text-center gap-4 place-items-stretch items-center flex justify-center border border-red-500 rounded">
                {" "}
                PLC Bağlantısı Koptu <HiOutlineStatusOffline size={25} />
              </div>
            )}
          </div>
          <button
            className=" bg-green-700 border hover:bg-green-900 border-white rounded flex justify-center"
            onClick={() => window.location.reload(false)}
          >
            BAĞLANTIYI YENILE <HiRefresh size={25} />
          </button>
          <button
            className=" bg-gray-700 border hover:bg-yellow-400 hover:scale-110 border-white rounded flex justify-center"
            onMouseDown={FaultReset}
            onMouseUp={FaultReset}
          >
            HATA RESET
          </button>
          {SystemOK ? (
            <p className=" bg-green-500 rounded">Sistem OK</p>
          ) : (
            <p className=" bg-red-500 rounded">Sistem Hata</p>
          )}
          <div className=" border border-1 rounded ">
            <p className=" text-sm bg-black rounded">Saha Sinyalleri</p>
            <div className="rounded grid grid-cols-4 items-center text-xs">
              <p className=" m-2">BK-1 İp Çekti</p>
              <p className=" m-2">BK-2 İp Çekti</p>
              <p className=" m-2">BK-3 İp Çekti</p>
              <p className=" m-2">BK-4 İp Çekti</p>
              <div
                style={{ backgroundColor: bk1ropestatus ? "green" : "red" }}
                className=" h-8 border border-1 rounded-full w-8 mx-auto"
              ></div>
              <div
                style={{ backgroundColor: bk2ropestatus ? "green" : "red" }}
                className=" h-8 border border-1 rounded-full w-8 mx-auto"
              ></div>
              <div
                style={{ backgroundColor: bk3ropestatus ? "green" : "red" }}
                className=" h-8 border border-1 rounded-full w-8 mx-auto"
              ></div>
              <div
                style={{ backgroundColor: bk4ropestatus ? "green" : "red" }}
                className=" h-8 border border-1 rounded-full w-8 mx-auto"
              ></div>
              <p className=" m-2">BK-1 Devir Bekçisi</p>
              <p className=" m-2">BK-2 Devir Bekçisi</p>
              <p className=" m-2">BK-3 Devir Bekçisi</p>
              <p className=" m-2">BK-4 Devir Bekçisi</p>
              <div
                style={{ backgroundColor: bk1speedswstatus ? "green" : "red" }}
                className=" h-8 border border-1 rounded-full w-8 mx-auto"
              ></div>
              <div
                style={{ backgroundColor: bk2speedswstatus ? "green" : "red" }}
                className=" h-8 border border-1 rounded-full w-8 mx-auto"
              ></div>
              <div
                style={{ backgroundColor: bk3speedswstatus ? "green" : "red" }}
                className=" h-8 border border-1 rounded-full w-8 mx-auto"
              ></div>
              <div
                style={{ backgroundColor: bk4speedswstatus ? "green" : "red" }}
                className=" h-8 border border-1 rounded-full w-8 mx-auto"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <Stack className="absolute top-0 left-0 w-1/4 h-96  m-2">
        <div className="bg-gray-300 rounded max-h-16 text-black justify-center items-center text-center">
          <div className="flex items-center justify-center h-10 text-black">
            <h1 className="absolute left-0 m-2 p-1 bg-yellow-500 rounded">
              BK-01 ARAÜRÜN
            </h1>
            <Typography>Otomatik</Typography>
            <Switch
              onChange={updatebk1}
              checked={bk1}
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography>Manuel</Typography>
            <button
              onMouseDown={updatebell1}
              onMouseUp={updatebell1}
              className="absolute right-0 m-2 p-1 bg-yellow-500  rounded cursor-pointer flex justify-center items-center w-28 active:bg-yellow-300"
            >
              <FaBell /> UYARI{" "}
            </button>
          </div>
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={araurunseviye} />
          </Box>
          {bk1 ? (
            <Manual
              id="1"
              status={status1}
              setmanbantstrt={Bk1manbantstrt}
              setmanbantstp={Bk1manbantstp}
              setmanklpopen={Bk1manklpopen}
              setmanklpclose={Bk1manklpclose}
              sethertz={updateBk1hertz}
              hertz={bk1hertz}
              referans={bk1referans}
            />
          ) : (
            <Auto
              id="1"
              status={status1}
              setautostr={Bk1autostr}
              setautostp={Bk1autostp}
              sethertz={updateBk1hertz}
              hertz={bk1hertz}
              referans={bk1referans}
            />
          )}
          {bk1localmode ? (
            <h1 className="m-auto p-1 bg-red-500 text-white rounded">
              Lokal Mod Aktif
            </h1>
          ) : null}
        </div>
      </Stack>
      <Stack className="absolute top-0 right-0 w-1/4 h-96  m-2">
        <div className="bg-gray-300 rounded max-h-16 text-black justify-center items-center text-center">
          <div className="flex items-center justify-center h-10 text-black">
            <h1 className="absolute left-0 m-2 p-1 bg-yellow-500 rounded">
              BK-02 TOZ
            </h1>
            <Typography>Otomatik</Typography>
            <Switch
              onChange={updatebk2}
              checked={bk2}
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography>Manuel</Typography>
            <h3
              onMouseDown={updatebell2}
              onMouseUp={updatebell2}
              className="absolute right-0 m-2 p-1 bg-yellow-500  rounded cursor-pointer flex justify-center items-center w-28 active:bg-yellow-300"
            >
              <FaBell /> UYARI
            </h3>
          </div>
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={tozseviye} />
          </Box>
          {bk2 ? (
            <Manual
              id="2"
              status={status2}
              setmanbantstrt={Bk2manbantstrt}
              setmanbantstp={Bk2manbantstp}
              setmanklpopen={Bk2manklpopen}
              setmanklpclose={Bk2manklpclose}
              sethertz={updateBk2hertz}
              hertz={bk2hertz}
              referans={bk2referans}
            />
          ) : (
            <Auto
              id="2"
              status={status2}
              setautostr={Bk2autostr}
              setautostp={Bk2autostp}
              sethertz={updateBk2hertz}
              hertz={bk2hertz}
              referans={bk2referans}
            />
          )}
          {bk2localmode ? (
            <h1 className="m-auto p-1 bg-red-500 text-white rounded">
              Lokal Mod Aktif
            </h1>
          ) : null}
        </div>
      </Stack>
      <Stack className="absolute bottom-0 left-0 w-1/4 h-[28rem]  m-2">
        <div className="bg-gray-300 rounded max-h-16 text-black justify-center items-center text-center">
          <div className="flex items-center justify-center h-10 text-black">
            <h1 className="absolute left-0 m-2 p-1 bg-yellow-500 rounded">
              BK-03 FINDIK
            </h1>
            <Typography>Otomatik</Typography>
            <Switch
              onChange={updatebk3}
              checked={bk3}
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography>Manuel</Typography>
            <h3
              onMouseDown={updatebell3}
              onMouseUp={updatebell3}
              className="absolute right-0 m-2 p-1 bg-yellow-500  rounded cursor-pointer flex justify-center items-center w-28 active:bg-yellow-300"
            >
              <FaBell /> UYARI
            </h3>
          </div>
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={findikseviye} />
          </Box>
          {bk3 ? (
            <Manual
              id="3"
              status={status3}
              setmanbantstrt={Bk3manbantstrt}
              setmanbantstp={Bk3manbantstp}
              setmanklpopen={Bk3manklpopen}
              setmanklpclose={Bk3manklpclose}
              sethertz={updateBk3hertz}
              hertz={bk3hertz}
              referans={bk3referans}
            />
          ) : (
            <Auto
              id="3"
              status={status3}
              setautostr={Bk3autostr}
              setautostp={Bk3autostp}
              sethertz={updateBk3hertz}
              hertz={bk3hertz}
              referans={bk3referans}
            />
          )}
          {bk3localmode ? (
            <h1 className="m-auto p-1 bg-red-500 text-white rounded">
              Lokal Mod Aktif
            </h1>
          ) : null}
        </div>
      </Stack>
      <Stack className="absolute bottom-0 right-0 w-1/4 h-[28rem] m-2">
        <div className="bg-gray-300 rounded max-h-16 text-black justify-center items-center text-center">
          <div className="flex items-center justify-center h-10 text-black">
            <h1 className="absolute left-0 m-2 p-1 bg-yellow-500 rounded">
              BK-04 CEVİZ
            </h1>
            <Typography>Otomatik</Typography>
            <Switch
              onChange={updatebk4}
              checked={bk4}
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography>Manuel</Typography>
            <h3
              onMouseDown={updatebell4}
              onMouseUp={updatebell4}
              className="absolute right-0 m-2 p-1 bg-yellow-500  rounded cursor-pointer flex justify-center items-center w-28 active:bg-yellow-300"
            >
              <FaBell /> UYARI
            </h3>
          </div>
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={cevizseviye} />
          </Box>
          {bk4 ? (
            <Manual
              id="4"
              status={status4}
              setmanbantstrt={Bk4manbantstrt}
              setmanbantstp={Bk4manbantstp}
              setmanklpopen={Bk4manklpopen}
              setmanklpclose={Bk4manklpclose}
              sethertz={updateBk4hertz}
              hertz={bk4hertz}
              referans={bk4referans}
            />
          ) : (
            <Auto
              id="4"
              status={status4}
              setautostr={Bk4autostr}
              setautostp={Bk4autostp}
              sethertz={updateBk4hertz}
              hertz={bk4hertz}
              referans={bk4referans}
            />
          )}
          {bk4localmode ? (
            <h1 className="m-auto p-1 bg-red-500 text-white rounded">
              Lokal Mod Aktif
            </h1>
          ) : null}
        </div>
      </Stack>
      {/* <Stack className='absolute w-96 h-40 rounded bottom-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='bg-gray-300 rounded max-h-16 text-black justify-center items-center text-center'>
                    <div className='flex items-center justify-center text-black'>
                        <h1 className='absolute left-0 m-2 p-1 bg-yellow-500 rounded'>D709 BANT</h1>
                        <Typography>Local</Typography>
                        <Switch onChange={updated709} checked={d709} inputProps={{ 'aria-label': 'ant design' }} />
                        <Typography>Remote</Typography>
                    </div>
                    {d709 ? <div className='bg-gray-700 text-white h-auto p-2 rounded '>
                        <div className=' p-1 m-1 bg-gray-300 rounded text-black'>
                            <h1 className=' bg-gray-500 rounded text-white'>DURUM & KONTROL</h1>
                            <h1 className=' rounded gap-2 p-1 m-2 text-white uppercase '>
                                {(() => {
                                  switch (d709status) {
                                    case 1:
                                        return <h1 className=' text-white bg-green-500 rounded'>Çalışıyor</h1>;
                                    case 2:
                                      return <h1 className=' text-white bg-gray-500 rounded'>Çalışmaya Hazır</h1>;
                                    case 3:
                                        return <h1 className=' text-white bg-red-500 rounded'>Acil Stop Basıldı</h1>;
                                    case 4:
                                        return <h1 className=' text-white bg-red-500 rounded'>Modül Hatası(Aşırı Akım)</h1>;
                                    default:
                                      return 'null';
                                  }
                                })()}
                            </h1>

                            <div className=' m-1 p-1  grid grid-cols-2 gap-4 place-items-stretch  '>
                                <Button variant="contained" color="success" onMouseDown={ d709strt } onMouseUp={ d709strt } >Başlat</Button> 
                                <Button variant="contained" color="error" onMouseDown={ d709stp } onMouseUp={ d709stp } >Durdur</Button>
                            </div>
                        </div>
                    </div> 
                    : 
                    <div>
                        Local Mod Aktif
                        <div className=' p-1 m-1 bg-gray-300 rounded text-black'>
                            <h1 className=' bg-gray-500 rounded text-white'>DURUM & KONTROL</h1>
                            <h1 className=' rounded gap-2 p-1 m-2 text-white uppercase '>
                                {(() => {
                                  switch (d709status) {
                                    case 1:
                                        return <h1 className=' text-white bg-green-500 rounded'>Çalışıyor</h1>;
                                    case 2:
                                      return <h1 className=' text-white bg-gray-500 rounded'>Çalışmaya Hazır</h1>;
                                    case 3:
                                        return <h1 className=' text-white bg-red-500 rounded'>Acil Stop Basıldı</h1>;
                                    case 4:
                                        return <h1 className=' text-white bg-red-500 rounded'>Modül Hatası(Aşırı Akım)</h1>;
                                    default:
                                      return 'null';
                                  }
                                })()}
                            </h1>
                        </div>
                    </div>}
                </div>
            </Stack> */}
    </div>
  );
}

function Auto(props) {
  return (
    <div>
      <div className="bg-gray-700 text-white h-auto p-2 rounded ">
        <div className=" p-1 m-1 bg-gray-300 rounded text-black">
          <h1 className=" bg-gray-500 rounded-t text-white">DURUM & KONTROL</h1>
          <div className="bg-gray-500 rounded-b p-2 grid grid-cols-2">
            <form>
              <div className="grid grid-cols-2">
                <div className=" grid grid-rows-2">
                  <p className=" text-white text-sm">İstenilen Hız(%):</p>
                  <p className=" text-white text-[0.5rem]">
                    Yazdıktan Sonra Enter'a Basın
                  </p>
                </div>
                <input
                  type="number"
                  className=" rounded bg-gray-700 text-white border text-center h-7 "
                  onKeyPress={(ev) => {
                    if (ev.key === "Enter") {
                      if (ev.target.value > 100 || ev.target.value < 30) {
                        alert("Lütfen 30 ile 100 arasında bir değer giriniz.");
                        return;
                      }
                      ev.preventDefault();
                      props.sethertz(ev.target.value);
                    }
                  }}
                />
              </div>
            </form>
            <p className=" text-white text-sm">İstenen Hız: {props.hertz}%</p>
            <p className=" col-span-2 m-1 text-white ">
              Anlık Hız: {props.referans}%
            </p>
          </div>
          <h1 className=" rounded gap-2 p-1 m-2 text-white uppercase ">
            {(() => {
              switch (props.status) {
                case 0:
                  return (
                    <h1 className=" text-white bg-blue-500 rounded">
                      Çalışmaya Hazır
                    </h1>
                  );
                case 1:
                  return (
                    <h1 className=" text-white bg-yellow-500 rounded">
                      Çalıştırılıyor
                    </h1>
                  );
                case 2:
                  return (
                    <h1 className=" text-white bg-green-500 rounded">
                      Çalışıyor
                    </h1>
                  );
                case 3:
                  return (
                    <h1 className=" text-white bg-red-500 rounded">
                      Sürücü Hatası
                    </h1>
                  );
                case 4:
                  return (
                    <h1 className=" text-white bg-red-500 rounded">
                      Çalışma Hatası
                    </h1>
                  );
                case 5:
                  return (
                    <h1 className=" text-white bg-red-500 rounded">
                      İp Çekti Hatası
                    </h1>
                  );
                case 6:
                  return (
                    <h1 className=" text-white bg-red-500 rounded">
                      Acil Stop Basıldı
                    </h1>
                  );
                case 7:
                  return (
                    <h1 className=" text-white bg-red-500 rounded">
                      Bant Hızı Hatası (Devir Bekçisi)
                    </h1>
                  );
                default:
                  return "null";
              }
            })()}
          </h1>
          <div className=" m-1 p-1  grid grid-cols-2 gap-4 place-items-stretch  ">
            <Button
              variant="contained"
              color="success"
              onMouseDown={props.setautostr}
              onMouseUp={props.setautostr}
            >
              Başlat
            </Button>
            <Button
              variant="contained"
              color="error"
              onMouseDown={props.setautostp}
              onMouseUp={props.setautostp}
            >
              Durdur
            </Button>
          </div>
        </div>
      </div>
      <BeltConveyor status={props.status} id={props.id} />
    </div>
  );
}

function Manual(props) {
  return (
    <div>
      <div className="bg-gray-700 text-white  p-2 rounded ">
        <ThemeProvider theme={theme}>
          <form>
            <TextField
              defaultValue={props.hertz}
              id="outlined-basic"
              type="number"
              label="Bant Hızı (%) Yazdıktan Sonra Enter'a Bas"
              variant="outlined"
              size="small"
              color="secondary"
              sx={{ input: { color: "#ffffff" }, width: 270 }}
              inputProps={{ min: 0, max: 100, style: { textAlign: "center" } }}
              focused
              onKeyPress={(ev) => {
                console.log(ev.target.value);
                if (ev.key === "Enter") {
                  if (ev.target.value > 100 || ev.target.value < 0) {
                    alert("Lütfen 0 ile 100 arasında bir değer giriniz.");
                    return;
                  }
                  ev.preventDefault();
                  props.sethertz(ev.target.value);
                }
              }}
            />
          </form>
        </ThemeProvider>
        <p className=" m-1 text-white ">Anlık Hız: {props.referans}%</p>
        <div className=" p-1 m-1 bg-gray-300 rounded text-black">
          <h1 className=" bg-gray-500 rounded text-white">DURUM & KONTROL</h1>
          <h1 className=" rounded gap-2 p-1 m-2 text-white uppercase ">
            {(() => {
              switch (props.status) {
                case 0:
                  return (
                    <h1 className=" text-white bg-blue-500 rounded">
                      Çalışmaya Hazır
                    </h1>
                  );
                case 1:
                  return (
                    <h1 className=" text-white bg-yellow-500 rounded">
                      Çalıştırılıyor
                    </h1>
                  );
                case 2:
                  return (
                    <h1 className=" text-white bg-green-500 rounded">
                      Çalışıyor
                    </h1>
                  );
                case 3:
                  return (
                    <h1 className=" text-white bg-red-500 rounded">
                      Sürücü Hatası
                    </h1>
                  );
                case 4:
                  return (
                    <h1 className=" text-white bg-red-500 rounded">
                      Çalışma Hatası
                    </h1>
                  );
                case 5:
                  return (
                    <h1 className=" text-white bg-red-500 rounded">
                      İp Çekti Hatası
                    </h1>
                  );
                case 6:
                  return (
                    <h1 className=" text-white bg-red-500 rounded">
                      Acil Stop Basıldı
                    </h1>
                  );
                case 7:
                  return (
                    <h1 className=" text-white bg-red-500 rounded">
                      Bant Hızı Hatası (Devir Bekçisi)
                    </h1>
                  );
                default:
                  return "null";
              }
            })()}
          </h1>
          <div className=" m-1 p-1  grid grid-cols-2 gap-4 place-items-stretch  ">
            <Button
              onMouseDown={props.setmanbantstrt}
              onMouseUp={props.setmanbantstrt}
              variant="contained"
              color="success"
            >
              Bant Start
            </Button>
            <Button
              onMouseDown={props.setmanbantstp}
              onMouseUp={props.setmanbantstp}
              variant="contained"
              color="error"
            >
              Bant Stop
            </Button>
            <Button
              onMouseDown={props.setmanklpopen}
              onMouseUp={props.setmanklpopen}
              variant="contained"
              color="success"
            >
              Klape Aç
            </Button>
            <Button
              onMouseDown={props.setmanklpclose}
              onMouseUp={props.setmanklpclose}
              variant="contained"
              color="error"
            >
              Klape Kapat
            </Button>
          </div>
        </div>
      </div>
      <BeltConveyor status={props.status} id={props.id} />
    </div>
  );
}

function BeltConveyor(props) {
  return (
    <div className=" relative border border-dashed rounded-3xl justfliy-between h-[2.40rem] m-4  ">
      {(() => {
        switch (props.status) {
          case 0:
            return (
              <div className=" relative">
                <div className=" h-9 w-9 rounded-full absolute left-0">
                  <img src={gray_belt_conveyor} alt="" />
                </div>
                <div className=" h-9 w-9 rounded-full absolute right-0 ">
                  <img src={gray_belt_conveyor} alt="" />
                </div>
              </div>
            );
          case 1:
            return (
              <div>
                <div className=" h-9 w-9 rounded-full absolute left-0">
                  <img src={yellow_belt_conveyor} alt="" />
                </div>
                <div className=" h-9 w-9 rounded-full absolute right-0 ">
                  <img src={yellow_belt_conveyor} alt="" />
                </div>
              </div>
            );
          case 2:
            return (
              <div>
                <div className=" animate-spin  h-9 w-9 rounded-full absolute left-0">
                  <img src={green_belt_conveyor} alt="" />
                </div>
                <div className=" animate-spin  h-9 w-9 rounded-full absolute right-0 ">
                  <img src={green_belt_conveyor} alt="" />
                </div>
              </div>
            );
          default:
            return (
              <div>
                <div className=" h-9 w-9 rounded-full absolute left-0">
                  <img src={red_belt_conveyor} alt="" />
                </div>
                <div className=" h-9 w-9 rounded-full absolute right-0 ">
                  <img src={red_belt_conveyor} alt="" />
                </div>
              </div>
            );
        }
      })()}
      <div className=" text-center items-center justify-center p-1 text-white font-semibold ">
        BK-{props.id}
      </div>
    </div>
  );
}

function LinearProgressWithLabel(props) {
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <h1 className=" w-1/2">Silo Seviyesi:</h1>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant="body2"
            color="black"
          >{`${props.value}%`}</Typography>
        </Box>
      </Box>
    </div>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Home;
