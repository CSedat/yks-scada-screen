import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { FaBell } from 'react-icons/fa';
import { HiOutlineStatusOnline, HiOutlineStatusOffline, HiRefresh } from "react-icons/hi";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../assests/polyakeynez.png'
import axios from 'axios';


const ipadress = 'http://localhost:8001/';
let serverconnectionok = false;
let plcconneectionok = false;
let status = {}
let alarms = {
    0: {
        value: false,
        text: 'Silo 1 dolu'
    },
    1: {
        value: false,
        text: 'Silo 2 dolu'
    },
    2: {
        value: false,
        text: 'Silo 3 dolu'
    },
    3: {
        value: false,
        text: 'Silo 4 dolu'
    },
    4: {
        value: false,
        text: 'Silo 1 dolu'
    },
    5: {
        value: false,
        text: 'Silo 2 dolu'
    },
    6: {
        value: false,
        text: 'Silo 3 dolu'
    },
    7: {
        value: false,
        text: 'Silo 4 dolu'
    },
    8: {
        value: false,
        text: 'Silo 1 dolu'
    },
    9: {
        value: false,
        text: 'Silo 2 dolu'
    },
    10: {
        value: false,
        text: 'Silo 3 dolu'
    },
    11: {
        value: false,
        text: 'Silo 4 dolu'
    },
    12: {
        value: false,
        text: 'Silo 1 dolu'
    },
    13: {
        value: false,
        text: 'Silo 2 dolu'
    },
    14: {
        value: false,
        text: 'Silo 3 dolu'
    },
    15: {
        value: false,
        text: 'Silo 4 dolu'
    },
    16: {
        value: false,
        text: 'Silo 1 dolu'
    },
    17: {
        value: false,
        text: 'Silo 2 dolu'
    },
    18: {
        value: false,
        text: 'Silo 3 dolu'
    },
    19: {
        value: false,
        text: 'Silo 4 dolu'
    },
    20: {
        value: false,
        text: 'Silo 1 dolu'
    },
    21: {
        value: false,
        text: 'Silo 3 dolu'
    },
    22: {
        value: false,
        text: 'Silo 4 dolu'
    },
    23: {
        value: false,
        text: 'Silo 1 dolu'
    },
    24: {
        value: false,
        text: 'Silo 2 dolu'
    },
    25: {
        value: false,
        text: 'Silo 3 dolu'
    },
    26: {
        value: false,
        text: 'Silo 4 dolu'
    },
    27: {
        value: false,
        text: 'Silo 1 dolu'
    },
    28: {
        value: false,
        text: 'Silo 2 dolu'
    },
    29: {
        value: false,
        text: 'Silo 3 dolu'
    },
    30: {
        value: false,
        text: 'Silo 4 dolu'
    },
    31: {
        value: false,
        text: 'Silo 1 dolu'
    },
    32: {
        value: false,
        text: 'Silo 1 dolu'
    },
    33: {
        value: false,
        text: 'Silo 2 dolu'
    },
    34: {
        value: false,
        text: 'Silo 3 dolu'
    },
    35: {
        value: false,
        text: 'Silo 4 dolu'
    },
    36: {
        value: false,
        text: 'Silo 1 dolu'
    },
    37: {
        value: false,
        text: 'Silo 2 dolu'
    },
    38: {
        value: false,
        text: 'Silo 3 dolu'
    },
    39: {
        value: false,
        text: 'Silo 4 dolu'
    },
    40: {
        value: false,
        text: 'Silo 1 dolu'
    },

}

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#ffffff',
        },
        error: {
            main: '#ff0000',
        }

    },
});

function Home() {
    
    const [araurunseviye, setAraurunseviye] = useState(10);
    const [tozseviye, setTozseviye] = useState(20);
    const [findikseviye, setFindikseviye] = useState(30);
    const [cevizseviye, setCevizseviye] = useState(40);
    const [bk1, set1] = useState(false);
    const [bk2, set2] = useState(false)
    const [bk3, set3] = useState(false)
    const [bk4, set4] = useState(false)
    const [bell1, setBell1] = useState(false)
    const [bell2, setBell2] = useState(false)
    const [bell3, setBell3] = useState(false)
    const [bell4, setBell4] = useState(false)
    const updatebk1 = () => set1(!bk1)
    const updatebk2 = () => set2(!bk2)
    const updatebk3 = () => set3(!bk3)
    const updatebk4 = () => set4(!bk4)
    const updatebell1 = () => setBell1(!bell1)
    const updatebell2 = () => setBell2(!bell2)
    const updatebell3 = () => setBell3(!bell3)
    const updatebell4 = () => setBell4(!bell4)
    
    useEffect(() => {
        const timer = setInterval(() => {
            try {
                axios.get(`${ipadress}getPLCData`).then(res => {
                    setAraurunseviye(res.data.Ints.araurunseviye)
                    setTozseviye(res.data.Ints.tozseviye)
                    setFindikseviye(res.data.Ints.findikseviye)
                    setCevizseviye(res.data.Ints.cevizseviye)
                    serverconnectionok = true;
                    plcconneectionok = res.data.Connected;
                    status = res.data.Status;
                    for (let j = 0; j < status.length; j++) {
                        const element = status[j];
                        if (element){
                            alarms[j].value = true;
                        }
                        else{
                            alarms[j].value = false;
                        }
                    }
                    Alarms();
                }).catch(err => {
                    console.log(err)
                    serverconnectionok = false;
                })
            } catch (error) {
                console.log(error)
                serverconnectionok = false;
            }
        }, 500);
        axios.get(`${ipadress}getPLCData`).then(res => {
            let bb = res.data;
            set1(bb.bools.bk1)
            set2(bb.bools.bk2)
            set3(bb.bools.bk3)
            set4(bb.bools.bk4)
        }).catch(err => {
            console.log(err)
        })
        return () => {
            clearInterval(timer);
        };


    }, []);

    useEffect(() => {
        axios.post(`${ipadress}writePLCData`, {
            bools: {
                bk1: bk1,
                bk2: bk2,
                bk3: bk3,
                bk4: bk4,
                bell1: bell1,
                bell2: bell2,
                bell3: bell3,
                bell4: bell4
            },
            ints: {
                araurunseviye: araurunseviye,
                tozseviye: tozseviye,
                findikseviye: findikseviye,
                cevizseviye: cevizseviye
            }
        })
    });
    


    return (
        <div className='text-white text-center gap-4 place-items-stretch ' >
            <div className='absolute rounded top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-56 w-96 '>
                <img src={logo} alt="" />
                <div className='grid gap-4'>
                    <div>
                        {serverconnectionok ? <div className='text-green-500 text-center gap-4 place-items-stretch flex justify-center border border-green-500 rounded' > Sunucu Bağlantısı Kuruldu <HiOutlineStatusOnline size={25}/>  </div> : <div className='text-red-500 text-center gap-4 place-items-stretch items-center flex justify-center border border-red-500 rounded' > Sunucu Bağlantısı Koptu <HiOutlineStatusOffline size={25}/></div>}
                    </div>
                    <div>
                        {plcconneectionok ? <div className='text-green-500 text-center gap-4 place-items-stretch flex justify-center border border-green-500 rounded' >PLC Bağlantısı Kuruldu <HiOutlineStatusOnline size={25}/>  </div> : <div className='text-red-500 text-center gap-4 place-items-stretch items-center flex justify-center border border-red-500 rounded' > PLC Bağlantısı Koptu <HiOutlineStatusOffline size={25}/></div>}
                    </div>
                    <button className=' bg-green-700 border hover:bg-green-900 border-white rounded flex justify-center' onClick={() => window.location.reload(false)}>BAĞLANTIYI YENILE   <HiRefresh size={25}/></button>
                </div>
            </div>
            <Stack className='absolute top-0 left-0 w-1/4 h-96  m-2'>
                <div className='bg-gray-300 rounded max-h-16 text-black justify-center items-center text-center'>
                    <div className='flex items-center justify-center text-black'>
                        <h1 className='absolute left-0 m-2 p-1 bg-yellow-500 rounded'>BK-01 ARAÜRÜN</h1>
                        <Typography>Otomatik</Typography>
                        <Switch onChange={updatebk1} checked={bk1}  inputProps={{ 'aria-label': 'ant design' }} />
                        <Typography>Manuel</Typography>
                        <button onMouseDown={ updatebell1 } onMouseUp={ updatebell1 }  className='absolute right-0 m-2 p-1 bg-yellow-500  rounded cursor-pointer flex justify-center items-center w-28 active:bg-yellow-300'><FaBell /> UYARI </button>
                    </div>
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={araurunseviye} />
                    </Box>
                    {bk1 ? <Manual id='1' /> : <Auto id='1' />}
                </div>
            </Stack>
            <Stack className='absolute top-0 right-0 w-1/4 h-96  m-2'>
                <div className='bg-gray-300 rounded max-h-16 text-black justify-center items-center text-center'>
                    <div className='flex items-center justify-center text-black'>
                        <h1 className='absolute left-0 m-2 p-1 bg-yellow-500 rounded'>BK-02 TOZ</h1>
                        <Typography>Otomatik</Typography>
                        <Switch onChange={updatebk2} checked={bk2} inputProps={{ 'aria-label': 'ant design' }} />
                        <Typography>Manuel</Typography>
                        <h3 onMouseDown={ updatebell2 } onMouseUp={ updatebell2 } className='absolute right-0 m-2 p-1 bg-yellow-500  rounded cursor-pointer flex justify-center items-center w-28 active:bg-yellow-300'><FaBell /> UYARI</h3>
                    </div>
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={tozseviye} />
                    </Box>
                    {bk2 ? <Manual id='2' /> : <Auto id='2' />}
                </div>
            </Stack>
            <Stack className='absolute bottom-0 left-0 w-1/4 h-96  m-2'>
                <div className='bg-gray-300 rounded max-h-16 text-black justify-center items-center text-center'>
                    <div className='flex items-center justify-center text-black'>
                        <h1 className='absolute left-0 m-2 p-1 bg-yellow-500 rounded'>BK-03 FINDIK</h1>
                        <Typography>Otomatik</Typography>
                        <Switch onChange={updatebk3} checked={bk3} inputProps={{ 'aria-label': 'ant design' }} />
                        <Typography>Manuel</Typography>
                        <h3 onMouseDown={ updatebell3 } onMouseUp={ updatebell3 } className='absolute right-0 m-2 p-1 bg-yellow-500  rounded cursor-pointer flex justify-center items-center w-28 active:bg-yellow-300'><FaBell /> UYARI</h3>
                    </div>
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={findikseviye} />
                    </Box>
                    {bk3 ? <Manual id='3' /> : <Auto id='3' />}
                </div>
            </Stack>
            <Stack className='absolute bottom-0 right-0 w-1/4 h-96  m-2'>
                <div className='bg-gray-300 rounded max-h-16 text-black justify-center items-center text-center'>
                    <div className='flex items-center justify-center text-black'>
                        <h1 className='absolute left-0 m-2 p-1 bg-yellow-500 rounded'>BK-04 CEVİZ</h1>
                        <Typography>Otomatik</Typography>
                        <Switch onChange={updatebk4} checked={bk4} inputProps={{ 'aria-label': 'ant design' }} />
                        <Typography>Manuel</Typography>
                        <h3 onMouseDown={ updatebell4 } onMouseUp={ updatebell4 } className='absolute right-0 m-2 p-1 bg-yellow-500  rounded cursor-pointer flex justify-center items-center w-28 active:bg-yellow-300'><FaBell /> UYARI</h3>
                    </div>
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={cevizseviye} />
                    </Box>
                    {bk4 ? <Manual id='4' /> : <Auto id='4' />}
                </div>
            </Stack>
            <div className='absolute rounded bottom-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-64 w-1/3 bg-gray-700  '>
                <h1 className=' bg-gray-300'><strong>ALARMLAR</strong></h1>
                <Stack sx={{ width: '100%', height: '30%' }} spacing={1}>
                    {/* <Alarms/> */}
                </Stack>
            </div>
        </div>
    )
}

function Auto(props) {
    return (
        <div className='bg-gray-700 text-white h-auto p-2 rounded '>
            <ThemeProvider theme={theme}>
                <div className=' grid grid-cols-2'>
                    <div>
                        <TextField id="outlined-basic" label="İstenilen (Ton)" variant="outlined" size='small' color="secondary" sx={{ input: { color: '#ffffff' }, width: 150 }} focused />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Yüklenen (Ton)" variant="outlined" size='small' color="secondary" sx={{ input: { color: '#ffffff' }, width: 150 }} focused />
                    </div>
                </div>
            </ThemeProvider>
            <div className=' p-1 m-1 bg-gray-300 rounded text-black'>
                <h1 className=' bg-gray-500 rounded text-white'>DURUM & KONTROL</h1>
                <h1 className=' bg-gray-500 rounded gap-2 p-1 m-2 text-white uppercase '>Sıfırlandı</h1>
                <div className=' m-1 p-1  grid grid-cols-2 gap-4 place-items-stretch  '>
                    <Button variant="contained" color="success" >Başlat</Button>
                    <Button variant="contained" color="error">Durdur</Button>
                </div>
            </div>
        </div>
    )
}

function Manual(props) {
    return (
        <div className='bg-gray-700 text-white h-auto p-2 rounded '>
            <ThemeProvider theme={theme}>
                <div className=' grid grid-cols-2'>
                    <div>
                        <TextField id="outlined-basic" label="Bant Hızı (%)" variant="outlined" size='small' color="secondary" sx={{ input: { color: '#ffffff' }, width: 150 }} focused />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Yüklenen (Ton)" variant="outlined" size='small' color="secondary" sx={{ input: { color: '#ffffff' }, width: 150 }} focused />
                    </div>
                </div>
            </ThemeProvider>
            <div className=' p-1 m-1 bg-gray-300 rounded text-black'>
                <h1 className=' bg-gray-500 rounded text-white'>DURUM & KONTROL</h1>
                <div className=' m-1 p-1  grid grid-cols-2 gap-4 place-items-stretch  '>
                    <Button variant="contained" color="success" >Bant Start</Button>
                    <Button variant="contained" color="error">Bant Stop</Button>
                    <Button variant="contained" color="success" >Klape Aç</Button>
                    <Button variant="contained" color="error">Klape Kapat</Button>
                </div>
            </div>
        </div>
    )
}

function LinearProgressWithLabel(props) {
    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <h1 className=' w-1/2'>Silo Seviyesi:</h1>  
                <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                <Typography variant='body2' color="black">{`${props.value}%`}</Typography>
                </Box>
            </Box>
        </div>
    );
}
let array = []
setInterval(() => {
    for (let k = 0; k < 30; k++) {
        const element = array[k];
        array.push({
            text: 'Uyarı',
            value: false
        })
    }
    console.log(array)
} , 1000)

function Alarms(props) {
    
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};


export default Home