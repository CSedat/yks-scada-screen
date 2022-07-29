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
    const handleChangeYerkantar = (event) => setKantar(event.target.value);
    const handleChangeDara = (event) => setDara(event.target.value);
    
    function saveData() {
        moment.locale('tr');
        let id
        axios.get(`http://127.0.0.1:8001/get${props.urun}`).then(response => {
            let jsondata = response.data;
            id = jsondata.splice(0)[0].id + 1;
        }).then(response => {
            let data = {
                id: id,
                kantar: yerkantar,
                dara: dara,
                urun: props.urun,
                date: moment().format('DD/MM/YYYY - H:MM:SS')
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
            for (let i = 0; i < jsondata.length; i++) {
                js.push({
                    id: response.data[i].id,
                    kantar: response.data[i].kantar,
                    dara: response.data[i].dara,
                    net: response.data[i].kantar - response.data[i].dara,
                    date: response.data[i].date
                });
            }
            setRows(js);
        }).catch(error => {
            console.log(error);
        })
    }
    useEffect(() => {
        refreshData()
    }, [])
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
            </ThemeProvider>
        </div>
    );
}

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
        field: 'date',
        headerName: 'Kayıt Tarihi',
        type: 'date',
        headerAlign: 'center',
        editable: true,
        flex: 1,
        align: 'center',
    }
];



