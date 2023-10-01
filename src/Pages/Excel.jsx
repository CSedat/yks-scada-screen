import React, { useState, useEffect } from 'react'
import axios from "axios";
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  IconButton,
  Select,
  MenuItem,
  Typography
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import toast from 'react-hot-toast';





export default function SaveData() {
  const [yerkantar, setKantar] = useState(0);
  const [kantarconnection, setKantarConnection] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [DaraData, setDaraData] = useState([]);
  const [activePlate, setActivePlate] = useState('');

  const refreshKantarData = () => {
    axios.get('http://10.35.13.108:80/api/GetYksPDCValue').then((response) => {
      let data = response.data;
      setKantar(data.value);
      setKantarConnection(data.kantarconnection)
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    refreshKantarData()
    const timer = setInterval(() => {
      try {
        refreshKantarData()
        GetAktivePlate()
      } catch (error) {
        console.log(error)
      }
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, [])

  const GetAktivePlate = async () => {
    try {
      axios.get('http://10.35.13.108:80/api/GetPlaka').then((response) => {
        setActivePlate(response.data.Plaka)
      });
    } catch (error) {
      console.log(error)
    }
  }

  const GetDaraData = async () => {
    try {
      axios.get('http://10.35.13.108:80/api/GetDaraData').then((response) => {
        setDaraData(response.data);
      });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetDaraData()
  }, [])

  const handleDaraChange = (e, id) => {
    const newValue = e.target.value;

    setDaraData(data => data.map(item =>
      item.Id === id
        ? {
          ...item,
          Dara: parseFloat(newValue)
        }
        : item
    ));
  };

  const SaveDara = () => {
    try {
      axios.post('http://10.35.13.108:80/api/SaveDara', DaraData).then((response) => {
        console.log('Kaydedildi')
        GetDaraData()
      });
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container spacing={4} sx={{p:1}}>
        {/* Sol kısım */}
        <Grid item xs={4.75}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Paper sx={{ height: '43vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgb(31, 41, 55)' }}>
                <DataTable urun='araurun' name='Araürün' yerkantar={yerkantar} activePlate={activePlate} triggerRefresh={triggerRefresh} setTriggerRefresh={setTriggerRefresh} />
              </Paper>
            </Grid>
            <Grid item>
              <Paper sx={{ height: '43vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgb(31, 41, 55)' }}>
                <DataTable urun='findik' name='Fındık' yerkantar={yerkantar} activePlate={activePlate} triggerRefresh={triggerRefresh} setTriggerRefresh={setTriggerRefresh} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Orta kısım */}
        <Grid item xs={2.5}>
          <Paper sx={{ height: '87vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgb(31, 41, 55)' }}>
            <TableContainer component={Paper} sx={{ background: 'rgb(31, 41, 55)' }}>
              <Typography sx={{ textAlign: 'center', color: '#ffffff' }}>
                HGS Dara Bilgileri
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ color: '#ffffff' }}>Plaka</TableCell>
                    <TableCell align="center" sx={{ color: '#ffffff' }}>Dara</TableCell>
                    <TableCell align="center" sx={{ color: '#ffffff' }}>İşlem</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {DaraData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell align="center" sx={{ color: '#ffffff' }}>{item.Plaka}</TableCell>
                      <TableCell align="center" sx={{ color: '#ffffff' }}>
                        <TextField
                          size='small'
                          id={String(item.Id)}
                          variant="standard"
                          type='number'
                          sx={{ width: 100, color: '#ffffff' }}
                          inputProps={{
                            style: { textAlign: 'center', color: 'white' }
                          }}
                          value={item.Dara}
                          onChange={(e) => handleDaraChange(e, item.Id)}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ color: '#ffffff' }}>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ backgroundColor: 'green', color: '#ffffff', width: 50, height: 30, fontSize: '0.8rem' }}
                          onClick={() => {
                            SaveDara()
                          }}
                        >Kaydet</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{ mt: 8, border: 1, borderColor: '#ffffff', borderRadius: 1, p: 1 }}
            >
              {
                kantarconnection ? (
                  <>
                    <Typography sx={{ textAlign: 'center', color: '#ffffff' }}>
                      YER KANTARI ANLIK DEĞER
                    </Typography>
                    <Typography sx={{ textAlign: 'center' }} variant='h3' color='#ffffff'>
                      {yerkantar} kg
                    </Typography>
                    <Typography sx={{ textAlign: 'center', color: '#ffffff' }}>
                      Plaka: <span>{activePlate}</span>
                    </Typography>
                  </>
                ) : (
                  <Typography sx={{ textAlign: 'center', color: '#ffffff', background: 'red' }}>
                    YER KANTARI BAĞLANTISI SAĞLANAMADI
                  </Typography>
                )
              }
            </Box>
          </Paper>
        </Grid>

        {/* Sağ kısım */}
        <Grid item xs={4.75}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Paper sx={{ height: '43vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgb(31, 41, 55)' }}>
                <DataTable urun='toz' name='Toz' yerkantar={yerkantar} activePlate={activePlate} triggerRefresh={triggerRefresh} setTriggerRefresh={setTriggerRefresh} />
              </Paper>
            </Grid>
            <Grid item>
              <Paper sx={{ height: '43vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgb(31, 41, 55)' }}>
                <DataTable urun='ceviz' name='Ceviz' yerkantar={yerkantar} activePlate={activePlate} triggerRefresh={triggerRefresh} setTriggerRefresh={setTriggerRefresh} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}


function DataTable({ yerkantar, activePlate, urun, triggerRefresh, setTriggerRefresh, name }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [dara, setDara] = useState("");
  const [rows, setRows] = useState([]);
  const [v1, setV1] = useState(0);
  const [v2, setV2] = useState(0);
  const [v3, setV3] = useState(0);
  const handleChangeDara = (event) => setDara(event.target.value);

  async function saveData() {
    moment.locale('tr');
    await axios.post('http://10.35.13.108:80/api/saveYKSData', {
      kantar: yerkantar,
      dara: dara,
      urun: urun,
      Plaka: activePlate || "Okunmadı",
    }).then(response => {
      refreshData()
    }).catch(error => {
      console.log(error);
    });
  };

  useEffect(() => {
    const storedDara = localStorage.getItem(`${urun}Dara`);
    if (storedDara) {
      setDara(storedDara);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dara) {
      localStorage.setItem(`${urun}Dara`, dara);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dara]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  function refreshData() {
    return new Promise((resolve, reject) => {
      axios.post(`http://10.35.13.108:80/api/getYksData`, { limit: 50, urun: urun }).then((response) => {
        let jsondata = response.data;
        let v1Total = 0;
        let v2Total = 0;
        let v3Total = 0;
        for (let i = 0; i < jsondata.length; i++) {
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
        setRows(jsondata);
        setV1(Number(v1Total / 1000).toFixed(2));
        setV2(Number(v2Total / 1000).toFixed(2));
        setV3(Number(v3Total / 1000).toFixed(2));
        resolve({ jsondata, v1Total, v2Total, v3Total });
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  useEffect(() => {
    if (triggerRefresh) {
      refreshData();
      setTriggerRefresh(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRefresh]);

  useEffect(() => {
    refreshData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = [
    { field: 'Plaka', headerName: 'Plaka', headerAlign: 'center', flex: 1, align: 'center' },
    { field: 'date', headerName: 'Kayıt Tarihi', headerAlign: 'center', flex: 1, align: 'center' },
    { field: 'hour', headerName: 'Kayıt Saati', headerAlign: 'center', flex: 1, align: 'center' },
    { field: 'vardiya', headerName: 'Vardiya', headerAlign: 'center', flex: 1, align: 'center' },
    { field: 'kantar', headerName: 'Kantar', headerAlign: 'center', flex: 1, align: 'center' },
    { field: 'dara', headerName: 'Dara', headerAlign: 'center', flex: 1, align: 'center' },
    { field: 'net', headerName: 'Net', headerAlign: 'center', flex: 1, align: 'center' },
    {
      field: "Seçenekler",
      headerAlign: 'center',
      align: 'center',
      renderCell: (cellValues) => <TableCellActions cellValues={cellValues} refreshData={refreshData} urun={urun} setTriggerRefresh={setTriggerRefresh} />
    }
  ];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', p: 1 }}>
      <div className=' text-white text-center bg-gray-800 rounded uppercase font-bold'>
        <h1>{name}</h1>
      </div>
      <form action="" className=' p-2 bg-gray-600 rounded grid grid-cols-3'>
        <div>
          <TextField
            id="outlined-basic"
            variant="standard"
            label="Yer Kantarı"
            value={yerkantar}
            size='small'
            type='number'
            sx={{
              input: { color: '#ffffff' },
              width: '75%',
              '& label.Mui-focused': { color: '#ffffff' },
              '& label': { color: '#ffffff' }
            }}
            inputProps={{
              style: { textAlign: 'center', color: 'white' }
            }}
            focused
          />

        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Dara"
            variant="standard"
            size='small'
            type='number'
            sx={{
              input: { color: '#ffffff' },
              width: '75%',
              '& label.Mui-focused': { color: '#ffffff' },
              '& label': { color: '#ffffff' }
            }}
            inputProps={{
              style: { textAlign: 'center', color: 'white' }
            }}
            focused
            onChange={handleChangeDara}
            value={dara}
          />
        </div>
        <Button onClick={handleOpenDialog} style={{ width: '75%' }} variant="contained" color="success">Kaydet</Button>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            {name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p>Yer Kantarı <b>{yerkantar}</b> kg</p>
              <p>Dara <b>{dara}</b> kg</p>
              <p>Net <b>{yerkantar - dara}</b> kg</p>
              <p>Plaka <b>{activePlate}</b></p>
              Kaydetmek istiyor musunuz?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              handleCloseDialog();
              // Veriyi kaydedin
              if (dara) {
                saveData();
              } else {
                alert('Lütfen boş alanları doldurunuz');
              }
            }} color="success">
              Kaydet
            </Button>
            <Button color="error" onClick={handleCloseDialog}>
              İptal
            </Button>
          </DialogActions>
        </Dialog>

      </form>
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={rows}
          align={'center'}
          rowsPerPageOptions={[]}
          hideFooter
          experimentalFeatures={{ newEditingApi: true }}
          rowHeight={35}
          headerHeight={35}
          getRowId={(row) => row._id}
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

    </Box>

  );
}

function TableCellActions({ cellValues, refreshData, urun, setTriggerRefresh }) {
  const [open, setOpen] = useState(false);
  const [moveUrun, setMoveUrun] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    axios.post(`http://10.35.13.108/api/deleteYKSData`, {
      _id: cellValues.row._id,
      urun: urun,
      kantar: cellValues.row.kantar,
      dara: cellValues.row.dara,
      Plaka: cellValues.row.Plaka,
    }).then(response => {
      refreshData();
      toast.success('Kayıt silindi');
    }).catch(error => {
      console.log(error);
    })
  }

  const handleTransfer = () => {
    axios.post(`http://10.35.13.108/api/transferYKSData`, {
      _id: cellValues.row._id,
      urun: urun,
      targetUrun: moveUrun,
      kantar: cellValues.row.kantar,
      dara: cellValues.row.dara,
      Plaka: cellValues.row.Plaka,
    })
      .then(response => {
        console.log(response.data);
        setTriggerRefresh(true)
        handleClose();
        toast.success('Kayıt taşındı');
      })
      .catch(error => {
        console.log(error);
      })
  }


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {!cellValues.row.vardiya.includes('Toplam') && (
        <Tooltip title="Taşı">
          <IconButton
            color="warning"
            onClick={handleOpen}
          >
            <SyncAltIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Sil">
        <IconButton
          color="error"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"Kaydı taşı"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ textAlign: 'center', width: '80%' }}>
              {urun.toUpperCase()} - {cellValues.row.net} net kg
            </Typography>
            <ArrowForwardIosIcon />
            <Select
              key={cellValues.row._id}
              value={moveUrun}
              onChange={(e) => {
                setMoveUrun(e.target.value);
              }}
              fullWidth
            >
              {urun !== 'araurun' && <MenuItem value={'araurun'}>Araürün</MenuItem>}
              {urun !== 'findik' && <MenuItem value={'findik'}>Fındık</MenuItem>}
              {urun !== 'toz' && <MenuItem value={'toz'}>Toz</MenuItem>}
              {urun !== 'ceviz' && <MenuItem value={'ceviz'}>Ceviz</MenuItem>}
            </Select>
          </Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            İptal
          </Button>
          {moveUrun && (
            <Button onClick={handleTransfer} color="success" autoFocus>
              Taşı
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}







