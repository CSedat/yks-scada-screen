import React, { useState, useEffect, useRef } from 'react'
import axios from "axios";
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';

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

export default function SaveData() {
    const [yerkantar, setKantar] = useState(0);

    const refreshKantarData = () => {
        axios.get('http://10.35.13.108:80/api/GetYksPDCValue').then((response) => {
            let jsondata = response.data.value;
            setKantar(jsondata);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        refreshKantarData()
        const timer = setInterval(() => {
            try {
                refreshKantarData()
            } catch (error) {
                console.log(error)
            }
        }, 500);
        return () => {
            clearInterval(timer);
        };
    }, [])
    return (
        <div >
            <div className='absolute top-2 left-2'>
                <Table urun='araurun' name='Araürün' yerkantar={yerkantar} />
            </div>
            <div className='absolute top-2 right-2'>
                <Table urun='toz' name='Toz' yerkantar={yerkantar} />
            </div>
            <div className='absolute bottom-20 left-2'>
                <Table urun='findik' name='Fındık' yerkantar={yerkantar} />
            </div>
            <div className='absolute bottom-20 right-2'>
                <Table urun='ceviz' name='Ceviz' yerkantar={yerkantar} />
            </div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72  bg-gray-500 rounded'>
                <Typography sx={{ textAlign: 'center', p: 1 }} color='white'>YER KANTARI ANLIK DEĞER</Typography>
                <Typography sx={{ textAlign: 'center', p: 1 }} variant='h3' color='white'>{yerkantar} kg</Typography>
            </div>
        </div>
    );
}


function Table(props) {
    const [dara, setDara] = useState();
    const [rows, setRows] = useState([]);
    const [v1, setV1] = useState(0);
    const [v2, setV2] = useState(0);
    const [v3, setV3] = useState(0);
    const handleChangeDara = (event) => setDara(event.target.value);

    async function saveData() {
        moment.locale('tr');
        await axios.post('http://10.35.13.108:80/api/saveYKSData', {
            kantar: props.yerkantar,
            dara: dara,
            urun: props.urun,
        }).then(response => {
            refreshData()
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        const storedDara = localStorage.getItem(`${props.urun}Dara`);
        if (storedDara) {
            setDara(storedDara);
        }
    }, []);

    useEffect(() => {
        if (dara) {
            localStorage.setItem(`${props.urun}Dara`, dara);
        }
    }, [dara]);

    function refreshData() {
        return new Promise((resolve, reject) => {
            axios.post(`http://10.35.13.108:80/api/getYksData`, { limit: 50, urun: props.urun }).then((response) => {
                let jsondata = response.data;
                let row = [];
                let v1Total = 0;
                let v2Total = 0;
                let v3Total = 0;
                for (let i = 0; i < jsondata.length; i++) {
                    row.push({ ...jsondata[i] });
                    let d = jsondata[i].date.split('/')[0];
                    let m = jsondata[i].date.split('/')[1];
                    let h = jsondata[i].hour.split(':')[0];
                    let nowd = moment().format('DD');
                    let nowm = moment().format('MM');
                    if (Number(d) === Number(nowd) && Number(m) === Number(nowm)) {
                        if (jsondata[i].kantar.search('V')) {
                            let net = parseInt(jsondata[i].kantar - jsondata[i].dara);
                            if (h >= 0 && h <= 7) {
                                v1Total += net;
                            } else if (h >= 8 && h <= 15) {
                                v2Total += net;
                            } else if (h >= 16 && h <= 23) {
                                v3Total += net;
                            }
                        }
                    }
                }
                setRows(row);
                setV1(Number(v1Total / 1000).toFixed(2));
                setV2(Number(v2Total / 1000).toFixed(2));
                setV3(Number(v3Total / 1000).toFixed(2));
                resolve({ row, v1Total, v2Total, v3Total });
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        });
    }

    useEffect(() => {
        refreshData()
        // eslint-disable-next-line
    }, [])

    const columns = [
        { field: 'date', headerName: 'Kayıt Tarihi', headerAlign: 'center', flex: 1, align: 'center' },
        { field: 'hour', headerName: 'Kayıt Saati', headerAlign: 'center', flex: 1, align: 'center' },
        { field: 'vardiya', headerName: 'Vardiya', headerAlign: 'center', flex: 1, align: 'center' },
        { field: 'kantar', headerName: 'Yer Kantarı', headerAlign: 'center', flex: 1, align: 'center' },
        { field: 'dara', headerName: 'Dara', headerAlign: 'center', flex: 1, align: 'center' },
        { field: 'net', headerName: 'Net', headerAlign: 'center', flex: 1, align: 'center' },
        {
            field: "Sil",
            headerAlign: 'center',

            align: 'center',
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                            axios.post(`http://10.35.13.108/api/deleteYKSData`, {
                                _id: cellValues.row._id,
                                urun: props.urun
                            }).then(response => {
                                console.log(response);
                                refreshData()
                            }).catch(error => {
                                console.log(error);
                            })
                        }
                        }
                    >
                        Sil
                    </Button>
                );
            }
        },
    ];
    return (
        <div className=' h-1/2   '>
            <ThemeProvider theme={theme}>
                <div className=' text-white text-center bg-gray-800 rounded uppercase font-bold'>
                    <h1>{props.name}</h1>
                </div>
                <form action="" className=' p-2 bg-gray-600 rounded grid grid-cols-3' onSubmit={
                    (e) => {
                        e.preventDefault();
                        if (dara) {
                            saveData()
                        } else {
                            alert('Lütfen boş alanları doldurunuz')
                        }
                    }
                }>
                    <div>
                        <TextField id="outlined-basic" label="Yer Kantarı" value={props.yerkantar} variant="outlined" size='small' color="secondary" type={'number'} sx={{ input: { color: '#ffffff' }, width: '75%' }} focused/>
                    </div>
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Dara"
                            variant="outlined"
                            size='small'
                            color="secondary"
                            type={'number'}
                            sx={{ input: { color: '#ffffff' }, width: '75%' }}
                            focused
                            onChange={handleChangeDara}
                            value={dara}
                        />
                    </div>
                    <Button type='submit' style={{ width: '75%' }} variant="contained" color="success">Kaydet</Button>

                </form>
                <div style={{ height: 300 }}>
                    <DataGrid
                        // onCellEditCommit = {handleCommit}
                        columns={columns}
                        rows={rows}
                        align={'center'}
                        rowsPerPageOptions={[]}
                        hideFooter
                        experimentalFeatures={{ newEditingApi: true }}
                        rowHeight={35}
                        headerHeight={35}
                        // pageSize = {5}

                        sx={{
                            color: '#ffffff',
                            boxShadow: 4,
                            border: 1,
                            borderColor: '#ffffff',
                            '& .MuiDataGrid-cell:hover': {
                                color: 'yellow',
                            },

                        }}
                    />
                </div>

                <div className=' bg-gray-600 rounded over grid grid-cols-3 text-white p-2 text-center'>
                    <h1>V1 Toplam: {v1}</h1>
                    <h1>V2 Toplam: {v2}</h1>
                    <h1>V3 Toplam: {v3}</h1>
                </div>
            </ThemeProvider>
        </div>
    );
}






