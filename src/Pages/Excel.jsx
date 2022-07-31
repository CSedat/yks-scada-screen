import React, { useState, useEffect } from 'react'
import axios from "axios";
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    return (
        <div >
            <div className='absolute top-2 left-2'>
                <Table urun='araurun' name='Araürün' />
            </div>
            <div className='absolute top-2 right-2'>
                <Table urun='toz' name='Toz' />
            </div>
            <div className='absolute bottom-20 left-2'>
                <Table urun='findik' name='Fındık' />
            </div>
            <div className='absolute bottom-20 right-2'>
                <Table urun='ceviz' name='Ceviz' />
            </div>
        </div>
    );
}


function Table(props) {
    const [yerkantar, setKantar] = useState();
    const [dara, setDara] = useState();
    const [rows, setRows] = useState([]);
    const [v1, setV1] = useState(0);
    const [v2, setV2] = useState(0);
    const [v3, setV3] = useState(0);
    const handleChangeYerkantar = (event) => setKantar(event.target.value);
    const handleChangeDara = (event) => setDara(event.target.value);
    
    function saveData() {
        moment.locale('tr');
        let id
        let h = moment().format('H');
        axios.get(`http://127.0.0.1:8001/get${props.urun}`).then(response => {
            let jsondata = response.data;
            if (jsondata.length > 0) {
                id = jsondata.splice(0)[0].id + 1;
            }else{
                id = 1
            }

        }).then(response => {
            let data = {
                id: id,
                kantar: yerkantar,
                dara: dara,
                urun: props.urun,
                date: moment().format('DD/MM/YY'),
                hour: moment().format('H:MM'),

            }
            axios.post('http://127.0.0.1:8001/saveData', data).then(response => {
                console.log(response);
                refreshData()
            }).catch(error => {
                console.log(error);
            })
        });
    };  


    function refreshData() {
        axios.get(`http://127.0.0.1:8001/get${props.urun}`).then(response => {
            let jsondata = response.data;
            let js = [];
            let oldv1 = 0
            let oldv2 = 0
            let oldv3 = 0;
            for (let i = 0; i < jsondata.length; i++) {
                js.push({
                    id: jsondata[i].id,
                    kantar: jsondata[i].kantar,
                    dara: jsondata[i].dara,
                    net: jsondata[i].kantar - jsondata[i].dara,
                    date: jsondata[i].date,
                    hour: jsondata[i].hour
                });
                let d = jsondata[i].date.split('/')[0]
                let h = jsondata[i].hour.split(':')[0]
                let nowd = moment().format('DD')
                if (d == nowd) { 
                    let net = parseInt(jsondata[i].kantar - jsondata[i].dara)
                    console.log(net)
                    if (h >= 0 && h <= 7) {
                        oldv1 += net
                        setV1(oldv1)
                    } else if (h >= 8 && h <= 15) {
                        oldv2 += net
                        setV2(oldv2)
                        console.log(oldv2)
                    } else if (h >= 16 && h <= 23) {
                        oldv3 += net
                        setV3(oldv3)
                    }
                }

            }
            setRows(js);

        }).catch(error => {
            console.log(error);
        })
    }
    useEffect(() => {
        refreshData()
    }, [])


    useEffect(() => {
        // axios.get(`http://127.0.0.1:8001/get${props.urun}`).then(response => {
        //     let jsondata = response.data;
        //     let h = moment().format('H');
        //     for (let i = 0; i < jsondata.length; i++) {
        //         let net = response.data[i].kantar - response.data[i].dara;
        //         totalnet += net;
        //     }
        //     setV1(totalnet);

         
        // }).catch(error => {
        //     console.log(error);
        // })
    },)


    const columns = [
        {
            field: 'kantar',
            headerName: 'Yer Kantarı',
            type: 'number',
            editable: true,
            headerAlign: 'center',
            flex: 1,
            align: 'center',
            
        },
        {
            field: 'dara',
            headerName: 'Dara',
            type: 'number',
            editable: true,
            headerAlign: 'center',
            flex: 1,
            align: 'center',
        },
        {
            field: 'net',
            headerName: 'Net',
            type: 'number',
            editable: true,
            headerAlign: 'center',
            flex: 1,
            align: 'center',
        },
        {
            field: 'hour',
            headerName: 'Kayıt Saati',
            headerAlign: 'center',
            editable: false,
            flex: 1,
            align: 'center',
        },
        {
            field: 'date',
            headerName: 'Kayıt Tarihi',
            headerAlign: 'center',
            editable: false,
            flex: 1,
            align: 'center',
        },
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
                        console.log(cellValues.id)
                        let data = {
                            id: cellValues.id,
                            urun: props.urun
                        }
                        axios.post('http://127.0.0.1:8001/deleteData', data).then(response => {
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
                <div className=' p-2 bg-gray-600 rounded grid grid-cols-3'>
                    <div>
                        <TextField id="outlined-basic" label="Yer Kantarı" variant="outlined" size='small' color="secondary" type={'number'} sx={{ input: { color: '#ffffff' }, width: '75%' }} focused
                            onChange={handleChangeYerkantar}
                        />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Dara" variant="outlined" size='small' color="secondary" type={'number'} sx={{ input: { color: '#ffffff' }, width: '75%' }} focused
                            onChange={handleChangeDara}
                        />
                    </div>
                    <Button style={{ width: '75%' }} variant="contained" color="success" onClick={() => {
                        if(yerkantar && dara) {
                            saveData()
                        } else {
                            alert('Lütfen boş alanları doldurunuz')
                        }
                    }}
                    >Kaydet</Button>

                </div>

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
                <div className=' grid grid-cols-3 text-white p-2 text-center'>
                    <h1>V1 Toplam: {v1}</h1>
                    <h1>V2 Toplam: {v2}</h1>
                    <h1>V3 Toplam: {v3}</h1>
                </div>
            </ThemeProvider>
        </div>
    );
}






