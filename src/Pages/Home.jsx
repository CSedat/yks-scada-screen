import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { FaBell } from 'react-icons/fa';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../assests/polyakeynez.png'

const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#ffffff',
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#ffffff',
        },
        error: {
            // Red.A400 as hex.
            main: '#ff0000',
        }

    },
});

function Home() {

    const [bk1, set1] = useState(false)
    const [bk2, set2] = useState(false)
    const [bk3, set3] = useState(false)
    const [bk4, set4] = useState(false)
    const updatebk1 = () => set1(!bk1)
    const updatebk2 = () => set2(!bk2)
    const updatebk3 = () => set3(!bk3)
    const updatebk4 = () => set4(!bk4)


    return (
        <div className='text-white text-center gap-4 place-items-stretch ' >
            <div className='absolute rounded top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-56 w-96'>
                <img src={logo} alt="" />
            </div>
            <Stack className='absolute top-0 left-0 w-1/4 h-96  m-2'>
                <div className='bg-gray-300 rounded max-h-16 text-black justify-center items-center text-center'>
                    <div className='flex items-center justify-center text-black'>
                        <h1 className='absolute left-0 m-2 p-1 bg-yellow-500 rounded'>BK-01 ARAÜRÜN</h1>
                        <Typography>Otomatik</Typography>
                        <Switch onChange={updatebk1} inputProps={{ 'aria-label': 'ant design' }} />
                        <Typography>Manuel</Typography>
                        <h3 className='absolute right-0 m-2 p-1 bg-yellow-500  rounded cursor-pointer flex justify-center items-center w-28 active:bg-yellow-300'><FaBell /> UYARI</h3>
                    </div>
                    {bk1 ? <Manual id='1' /> : <Auto id='1' />}
                </div>
            </Stack>
            <Stack className='absolute top-0 right-0 w-1/4 h-96  m-2'>
                <div className='bg-gray-300 rounded max-h-16 text-black justify-center items-center text-center'>
                    <div className='flex items-center justify-center text-black'>
                        <h1 className='absolute left-0 m-2 p-1 bg-yellow-500 rounded'>BK-02 TOZ</h1>
                        <Typography>Otomatik</Typography>
                        <Switch onChange={updatebk2} inputProps={{ 'aria-label': 'ant design' }} />
                        <Typography>Manuel</Typography>
                        <h3 className='absolute right-0 m-2 p-1 bg-yellow-500  rounded cursor-pointer flex justify-center items-center w-28 active:bg-yellow-300'><FaBell /> UYARI</h3>
                    </div>
                    {bk2 ? <Manual id='2' /> : <Auto id='2' />}
                </div>
            </Stack>
            <Stack className='absolute bottom-0 left-0 w-1/4 h-96  m-2'>
                <div className='bg-gray-300 rounded max-h-16 text-black justify-center items-center text-center'>
                    <div className='flex items-center justify-center text-black'>
                        <h1 className='absolute left-0 m-2 p-1 bg-yellow-500 rounded'>BK-03 FINDIK</h1>
                        <Typography>Otomatik</Typography>
                        <Switch onChange={updatebk3} inputProps={{ 'aria-label': 'ant design' }} />
                        <Typography>Manuel</Typography>
                        <h3 className='absolute right-0 m-2 p-1 bg-yellow-500  rounded cursor-pointer flex justify-center items-center w-28 active:bg-yellow-300'><FaBell /> UYARI</h3>
                    </div>
                    {bk3 ? <Manual id='3' /> : <Auto id='3' />}
                </div>
            </Stack>
            <Stack className='absolute bottom-0 right-0 w-1/4 h-96  m-2'>
                <div className='bg-gray-300 rounded max-h-16 text-black justify-center items-center text-center'>
                    <div className='flex items-center justify-center text-black'>
                        <h1 className='absolute left-0 m-2 p-1 bg-yellow-500 rounded'>BK-04 CEVİZ</h1>
                        <Typography>Otomatik</Typography>
                        <Switch onChange={updatebk4} inputProps={{ 'aria-label': 'ant design' }} />
                        <Typography>Manuel</Typography>
                        <h3 className='absolute right-0 m-2 p-1 bg-yellow-500  rounded cursor-pointer flex justify-center items-center w-28 active:bg-yellow-300'><FaBell /> UYARI</h3>
                    </div>
                    {bk4 ? <Manual id='4' /> : <Auto id='4' />}
                </div>
            </Stack>
            <div className='absolute rounded bottom-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-64 w-1/3 bg-gray-700  '>
                <h1 className=' bg-gray-300'><strong>ALARMLAR</strong></h1>

                <Stack sx={{ width: '100%', height: '30%' }} spacing={1}>


                    <Alert sx={{ width: '100%', height: '90%' }} severity="error">
                        <AlertTitle>HATA</AlertTitle>
                        Bant kaydı hatası!
                    </Alert>
                    <Alert severity="error">
                        <AlertTitle>HATA</AlertTitle>
                        İp çekti hatası!
                    </Alert>

                </Stack>

            </div>
        </div>
    )
}

function Auto(props) {
    console.log(props.id)
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
    console.log(props.id)
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
            <div className=' p-1 m-1 bg-gray-400 rounded text-black'>
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


export default Home