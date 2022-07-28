import React, { useState } from 'react'
import axios from "axios";
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
} from '@mui/x-data-grid-generator';
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
    const [yerkantar, setKantar] = useState();
    const [dara, setDara] = useState();
    const handleChangeYerkantar = (event) => {
        setKantar(event.target.value);
    };
    const handleChangeDara = (event) => {
        setDara(event.target.value);
    };

    return (
        <div className=' h-1/2  absolute top-2 left-2 '>
            <ThemeProvider theme={theme}>
                <div className='w-full p-2 bg-gray-600 rounded grid grid-cols-3'>
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
                        alert(yerkantar + dara);
                    }}
                    >Kaydet</Button>

                </div>

                <div style={{ height: 400 }}>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        rowsPerPageOptions={[]}
                        hideFooter
                        experimentalFeatures={{ newEditingApi: true }}
                        rowHeight={35}
                        headerHeight={35}
                        
                        // onRowClick={(e, row) => {
                        //         console.log(row);
                        //     }
                        // }
                        onRowEditStop={(e, row) => {
                            console.log(row);
                        }}
                        onRowEditStart={(e, row) => {
                            console.log(row);
                        }}
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
    },
    {
        field: 'dara',
        headerName: 'Dara',
        type: 'number',
        editable: true,
        headerAlign: 'center',
    },
    {
        field: 'date',
        headerName: 'Kayıt Tarihi',
        type: 'date',
        headerAlign: 'center',
        editable: true,
    }
];

axios.get('http://127.0.0.1:8001/getData').then(response => {
    let jsondata = response.data;
    let rows = [];
    for (let i = 0; i < jsondata.length; i++) {
        rows.push({
            id: i,
            kantar: jsondata[i].name,
            dara: jsondata[i].age,
            date: jsondata[i].date,
        });
        
    }
    console.log(rows);
});

const rows = [];

function GetLastID() {
    axios.get('http://127.0.0.1:8001/getData').then(response => {
    let jsondata = response.data;
        let newID = jsondata[jsondata.length - 1].id + 1;
        return newID;
    });
}

