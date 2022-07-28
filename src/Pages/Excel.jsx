import React, { useState } from 'react'
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
        <div className=' h-1/2  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
            <ThemeProvider theme={theme}>
                <div className='w-full p-2 bg-gray-600 rounded grid grid-cols-3'>
                    <div>
                        <TextField id="outlined-basic" label="Yer Kantarı" variant="outlined" size='small' color="secondary" sx={{ input: { color: '#ffffff' }, width: '75%' }} focused
                            onChange={handleChangeYerkantar}
                        />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Dara" variant="outlined" size='small' color="secondary" sx={{ input: { color: '#ffffff' }, width: '75%' }} focused
                            onChange={handleChangeDara}
                        />
                    </div>
                    <Button style={{ width: '75%' }} variant="contained" color="success" onClick={() => {
                        alert(yerkantar + dara);
                    }}
                    >Kaydet</Button>

                </div>

                <div style={{ height: '100%', width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
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
                    />
                </div>
            </ThemeProvider>
        </div>
    );
}

const columns = [
    { field: 'name', headerName: 'Name', editable: true, headerAlign: 'center', },
    { field: 'age', headerName: 'Age', type: 'number', editable: true, headerAlign: 'center', },
    {
        field: 'dateCreated',
        headerName: 'Date Created',
        type: 'date',
        headerAlign: 'center',
        editable: true,
    },
    {
        field: 'lastLogin',
        headerName: 'Last Login',
        type: 'dateTime',
        headerAlign: 'center',
        editable: true,
    },
];

const rows = [
    {
        id: 1,
        name: randomTraderName(),
        age: Math.floor(Math.random() * 100),
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
    {
        id: 2,
        name: randomTraderName(),
        age: Math.floor(Math.random() * 100),
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
    {
        id: 3,
        name: randomTraderName(),
        age: Math.floor(Math.random() * 100),
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
    {
        id: 4,
        name: randomTraderName(),
        age: Math.floor(Math.random() * 100),
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
    {
        id: 5,
        name: randomTraderName(),
        age: Math.floor(Math.random() * 100),
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
];
