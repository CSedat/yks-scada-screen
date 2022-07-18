import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FaBell } from 'react-icons/fa';

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
            <Stack className='absolute top-0 left-0 w-1/4 h-96  m-2'>
                <div className='bg-gray-400 rounded max-h-16 text-black justify-center items-center text-center'>
                    <div className='flex items-center justify-center text-black'>
                        <h1 className='absolute left-0 m-2 p-1 bg-yellow-500 rounded'>BK-01 ARAÜRÜN</h1>
                        <Typography>Otomatik</Typography>
                        <Switch onChange={updatebk1} inputProps={{ 'aria-label': 'ant design' }} />
                        <Typography>Manuel</Typography>
                        <h3 className='absolute right-0 m-2 p-1 bg-yellow-500  rounded cursor-pointer flex justify-center items-center w-28'><FaBell/> UYARI</h3>
                    </div>
                    {bk1 ? <Manual id='1' /> : <Auto id='1' />}
                </div>
            </Stack>
            <Stack className='absolute top-0 right-0 w-1/4 h-96  m-2'>
                <div className='bg-gray-400 rounded max-h-16 text-black justify-center items-center text-center'>
                    <div className='flex items-center justify-center text-black'>
                        <h1 className='absolute left-0 m-2 p-1 bg-yellow-500 rounded'>BK-02 TOZ</h1>
                        <Typography>Otomatik</Typography>
                        <Switch onChange={updatebk2} inputProps={{ 'aria-label': 'ant design' }} />
                        <Typography>Manuel</Typography>
                        <h3 className='absolute right-0 m-2 p-1 bg-yellow-500  rounded cursor-pointer flex justify-center items-center w-28'><FaBell/> UYARI</h3>
                    </div>
                    {bk2 ? <Manual id='2' /> : <Auto id='2' />}
                </div>
            </Stack>
            <Stack className='absolute bottom-0 left-0 w-1/4 h-96  m-2'>
                <div className='bg-gray-400 rounded max-h-16 text-black justify-center items-center text-center'>
                    <div className='flex items-center justify-center text-black'>
                        <h1 className='absolute left-0 m-2 p-1 bg-yellow-500 rounded'>BK-03 FINDIK</h1>
                        <Typography>Otomatik</Typography>
                        <Switch onChange={updatebk3} inputProps={{ 'aria-label': 'ant design' }} />
                        <Typography>Manuel</Typography>
                        <h3 className='absolute right-0 m-2 p-1 bg-yellow-500  rounded cursor-pointer flex justify-center items-center w-28'><FaBell/> UYARI</h3>
                    </div>
                    {bk3 ? <Manual id='3' /> : <Auto id='3' />}
                </div>
            </Stack>
            <Stack className='absolute bottom-0 right-0 w-1/4 h-96  m-2'>
                <div className='bg-gray-400 rounded max-h-16 text-black justify-center items-center text-center'>
                    <div className='flex items-center justify-center text-black'>
                        <h1 className='absolute left-0 m-2 p-1 bg-yellow-500 rounded'>BK-04 CEVİZ</h1>
                        <Typography>Otomatik</Typography>
                        <Switch onChange={updatebk4} inputProps={{ 'aria-label': 'ant design' }} />
                        <Typography>Manuel</Typography>
                        <h3 className='absolute right-0 m-2 p-1 bg-yellow-500  rounded cursor-pointer flex justify-center items-center w-28'><FaBell/> UYARI</h3>
                    </div>
                    {bk4 ? <Manual id='4' /> : <Auto id='4' />}
                </div>
            </Stack>
            <div className='absolute rounded bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-64 w-1/3 bg-gray-700  '>
                <h1 className=' bg-gray-400'>ALARMLAR</h1>
            </div>
        </div>
    )
}

function Auto(props) {
    console.log(props.id)
    return (
        <div className='bg-gray-700 text-white h-64 p-2 rounded '>
            <div className='   p-1 m-1'>
                <TextField id="outlined-basic" label="İstenilen" variant="outlined" size='small' color='' />
                <TextField id="outlined-basic" label="Yüklenen" variant="outlined" size='small' color='' />
            </div>
            
        </div>
    )
}


function Manual(props) {
    console.log(props.id)
    return (

        <div className='bg-gray-700 text-white h-64 p-2 rounded '>
            manual {props.id}
        </div>
    )
}

export default Home