import { createContext, useContext, useEffect, useState } from 'react';
import { DataGrid, trTR, GridToolbarContainer, GridToolbar } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import moment from 'moment';
import { styled } from '@mui/system';
import {
  Box,
  Typography,
  Unstable_Grid2 as Grid,
  TextField,
  Divider
} from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Koyu tema modu
    background: {
      default: '#131a29', // Varsayılan arkaplan rengi
    },
    text: {
      primary: '#ffffff', // Varsayılan metin rengi
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: '#ffffff', // Çerçeve rengi
        },
      },
    },
  },
});

const HGScolumns = [
  { align: "center", headerAlign: "center", flex: true, field: "Plaka", headerName: "Plaka" },
  { align: "center", headerAlign: "center", flex: true, field: "Tarih", headerName: "Tarih" },
  { align: "center", headerAlign: "center", flex: true, field: "Saat", headerName: "Kayıt Saati" },
  { align: "center", headerAlign: "center", flex: true, field: "Vardiya", headerName: "Vardiya" },
  { align: "center", headerAlign: "center", flex: true, field: "Brüt", headerName: "Kantar (t)", valueFormatter: (params) => isNaN(params.value) ? params.value : (params.value / 1000).toLocaleString('tr-TR') },
  { align: "center", headerAlign: "center", flex: true, field: "Dara", headerName: "Dara (t)", valueFormatter: (params) => isNaN(params.value) ? params.value : (params.value / 1000).toLocaleString('tr-TR') },
  { align: "center", headerAlign: "center", flex: true, field: "Net", headerName: "Net (t)", valueFormatter: (params) => (params.value / 1000).toLocaleString('tr-TR') },

];

const columns = [
  // { align: "center", headerAlign: "center", flex: true, field: "id", headerName: "No" },
  { align: "center", headerAlign: "center", flex: true, field: "Plaka", headerName: "Plaka" },
  { align: "center", headerAlign: "center", flex: true, field: "date", headerName: "Tarih" },
  { align: "center", headerAlign: "center", flex: true, field: "hour", headerName: "Kayıt Saati" },
  { align: "center", headerAlign: "center", flex: true, field: "vardiya", headerName: "Vardiya" },
  { align: "center", headerAlign: "center", flex: true, field: "kantar", headerName: "Kantar (t)", valueFormatter: (params) => isNaN(params.value) ? params.value : (params.value / 1000).toLocaleString('tr-TR') },
  { align: "center", headerAlign: "center", flex: true, field: "dara", headerName: "Dara (t)", valueFormatter: (params) => (params.value / 1000).toLocaleString('tr-TR') },
  { align: "center", headerAlign: "center", flex: true, field: "net", headerName: "Net (t)", valueFormatter: (params) => (params.value / 1000).toLocaleString('tr-TR') },
];

const vardiyaHesapla = (saat) => {
  if (!saat) return "Bilinmiyor";

  const hour = parseInt(saat.split(":")[0], 10);

  if (hour >= 0 && hour < 8) {
    return "V1";
  } else if (hour >= 8 && hour < 16) {
    return "V2";
  } else if (hour >= 16 && hour <= 23) {
    return "V3";
  } else {
    return "Unknown";
  }
};

const StyledDataGrid = styled(DataGrid)({
  '& .super-app-theme--total': {
    backgroundColor: 'gray',
  },
  border: '1px solid gray',
  '& .MuiDataGrid-columnHeaderTitle': {
    borderBottom: '1px solid white',
  },
});
export const LimitContext = createContext();

const YKS = () => {
  const [araurunrows, setAraurunrows] = useState([]);
  const [tozrows, setTozrows] = useState([]);
  const [findikrows, setFindikrows] = useState([]);
  const [cevizrows, setCevizrows] = useState([]);

  const [araurunv1, setAraurunv1] = useState(0);
  const [araurunv2, setAraurunv2] = useState(0);
  const [araurunv3, setAraurunv3] = useState(0);

  const [tozv1, setTozv1] = useState(0);
  const [tozv2, setTozv2] = useState(0);
  const [tozv3, setTozv3] = useState(0);

  const [findikv1, setFindikv1] = useState(0);
  const [findikv2, setFindikv2] = useState(0);
  const [findikv3, setFindikv3] = useState(0);

  const [cevizv1, setCevizv1] = useState(0);
  const [cevizv2, setCevizv2] = useState(0);
  const [cevizv3, setCevizv3] = useState(0);

  const [limit, setLimit] = useState(100);

  const [HGSAraurunData, setHGSAraurunData] = useState([]);
  const [HGSTozData, setHGSTozData] = useState([]);
  const [HGSFindikData, setHGSFindikData] = useState([]);
  const [HGSCevizData, setHGSCevizData] = useState([]);

  const [HGSAraurunTotalV1, setHGSAraurunTotalV1] = useState(0);
  const [HGSAraurunTotalV2, setHGSAraurunTotalV2] = useState(0);
  const [HGSAraurunTotalV3, setHGSAraurunTotalV3] = useState(0);

  const [HGSTozTotalV1, setHGSTozTotalV1] = useState(0);
  const [HGSTozTotalV2, setHGSTozTotalV2] = useState(0);
  const [HGSTozTotalV3, setHGSTozTotalV3] = useState(0);

  const [HGSFindikTotalV1, setHGSFindikTotalV1] = useState(0);
  const [HGSFindikTotalV2, setHGSFindikTotalV2] = useState(0);
  const [HGSFindikTotalV3, setHGSFindikTotalV3] = useState(0);

  const [HGSCevizTotalV1, setHGSCevizTotalV1] = useState(0);
  const [HGSCevizTotalV2, setHGSCevizTotalV2] = useState(0);
  const [HGSCevizTotalV3, setHGSCevizTotalV3] = useState(0);



  function fetchData(urun, limit) {
    return new Promise((resolve, reject) => {
      axios.post(`http://10.35.13.108:80/api/getYksData`, { limit, urun }).then((response) => {
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
        resolve({ row, v1Total, v2Total, v3Total });
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  function RefreshData() {
    fetchData('araurun', limit).then((result) => {
      setAraurunrows(result.row);
      setAraurunv1(result.v1Total);
      setAraurunv2(result.v2Total);
      setAraurunv3(result.v3Total);
    }).catch((error) => {
      console.log(error);
    });

    fetchData('toz', limit).then((result) => {
      setTozrows(result.row);
      setTozv1(result.v1Total);
      setTozv2(result.v2Total);
      setTozv3(result.v3Total);
    }).catch((error) => {
      console.log(error);
    });

    fetchData('findik', limit).then((result) => {
      setFindikrows(result.row);
      setFindikv1(result.v1Total);
      setFindikv2(result.v2Total);
      setFindikv3(result.v3Total);
    }).catch((error) => {
      console.log(error);
    });

    fetchData('ceviz', limit).then((result) => {
      setCevizrows(result.row);
      setCevizv1(result.v1Total);
      setCevizv2(result.v2Total);
      setCevizv3(result.v3Total);
    }).catch((error) => {
      console.log(error);
    });

    axios.get(`http://10.35.13.108:80/api/GetHGSTableData`).then(async (response) => {
      let data = await response.data.map(item => {
        let [tarih, saat] = item["KantarSaati"].trim().split(' ');
        return {
          ...item,
          Tarih: tarih,
          Saat: saat,
          Vardiya: vardiyaHesapla(saat)
        };
      });

      const addNetTotals = (filteredData) => {
        let groupedData = filteredData.reduce((acc, item) => {
          let key = `${item.Tarih}-${item.Vardiya}`;
          if (!acc[key]) {
            acc[key] = {
              Id: `total-${key}`,
              Tarih: item.Tarih,
              Plaka: `${item.Vardiya} Toplamı`,
              Vardiya: item.Vardiya,
              Net: 0
            };
          }
          acc[key].Net += item.Net;
          return acc;
        }, {});

        const totalEntries = Object.values(groupedData);

        totalEntries.forEach(totalEntry => {
          const index = filteredData.findIndex(item => item.Tarih === totalEntry.Tarih && item.Vardiya === totalEntry.Vardiya);
          if (index !== -1) {
            filteredData.splice(index, 0, totalEntry);
          }
        });

        return filteredData.sort((a, b) => {
          const dateA = new Date(`${a.Tarih.split('.').reverse().join('-')}T${a.Saat}`);
          const dateB = new Date(`${b.Tarih.split('.').reverse().join('-')}T${b.Saat}`);

          return dateB - dateA;
        });
      }

      setHGSAraurunTotalV1(data.filter(item => item.Vardiya === "V1" && item.Tarih === moment().format('D.MM.YYYY') && item["SiloTürü"].trim() === 'AraÜrün').reduce((acc, item) => acc + item.Net, 0));
      setHGSAraurunTotalV2(data.filter(item => item.Vardiya === "V2" && item.Tarih === moment().format('D.MM.YYYY') && item["SiloTürü"].trim() === 'AraÜrün').reduce((acc, item) => acc + item.Net, 0));
      setHGSAraurunTotalV3(data.filter(item => item.Vardiya === "V3" && item.Tarih === moment().format('D.MM.YYYY') && item["SiloTürü"].trim() === 'AraÜrün').reduce((acc, item) => acc + item.Net, 0));

      setHGSTozTotalV1(data.filter(item => item.Vardiya === "V1" && item.Tarih === moment().format('D.MM.YYYY') && item["SiloTürü"].trim() === 'Toz').reduce((acc, item) => acc + item.Net, 0));
      setHGSTozTotalV2(data.filter(item => item.Vardiya === "V2" && item.Tarih === moment().format('D.MM.YYYY') && item["SiloTürü"].trim() === 'Toz').reduce((acc, item) => acc + item.Net, 0));
      setHGSTozTotalV3(data.filter(item => item.Vardiya === "V3" && item.Tarih === moment().format('D.MM.YYYY') && item["SiloTürü"].trim() === 'Toz').reduce((acc, item) => acc + item.Net, 0));

      setHGSFindikTotalV1(data.filter(item => item.Vardiya === "V1" && item.Tarih === moment().format('D.MM.YYYY') && item["SiloTürü"].trim() === 'Fındık').reduce((acc, item) => acc + item.Net, 0));
      setHGSFindikTotalV2(data.filter(item => item.Vardiya === "V2" && item.Tarih === moment().format('D.MM.YYYY') && item["SiloTürü"].trim() === 'Fındık').reduce((acc, item) => acc + item.Net, 0));
      setHGSFindikTotalV3(data.filter(item => item.Vardiya === "V3" && item.Tarih === moment().format('D.MM.YYYY') && item["SiloTürü"].trim() === 'Fındık').reduce((acc, item) => acc + item.Net, 0));

      setHGSCevizTotalV1(data.filter(item => item.Vardiya === "V1" && item.Tarih === moment().format('D.MM.YYYY') && item["SiloTürü"].trim() === 'Ceviz').reduce((acc, item) => acc + item.Net, 0));
      setHGSCevizTotalV2(data.filter(item => item.Vardiya === "V2" && item.Tarih === moment().format('D.MM.YYYY') && item["SiloTürü"].trim() === 'Ceviz').reduce((acc, item) => acc + item.Net, 0));
      setHGSCevizTotalV3(data.filter(item => item.Vardiya === "V3" && item.Tarih === moment().format('D.MM.YYYY') && item["SiloTürü"].trim() === 'Ceviz').reduce((acc, item) => acc + item.Net, 0));

      const HGSAraurunData = addNetTotals(data.filter(item => item["SiloTürü"].trim() === "AraÜrün"));
      const HGSTozData = addNetTotals(data.filter(item => item["SiloTürü"].trim() === "Toz"));
      const HGSFindikData = addNetTotals(data.filter(item => item["SiloTürü"].trim() === "Fındık"));
      const HGSCevizData = addNetTotals(data.filter(item => item["SiloTürü"].trim() === "Ceviz"));

      setHGSAraurunData(HGSAraurunData);
      setHGSTozData(HGSTozData);
      setHGSFindikData(HGSFindikData);
      setHGSCevizData(HGSCevizData);

    }).catch((error) => {
      console.log(error);
    });

  }

  useEffect(() => {
    RefreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        component="main"
        sx={{
          width: '100%',
        }}

      >
        <Grid container spacing={0} style={{ height: '90%', textAlign: 'center', margin:35 }}>
          <LimitContext.Provider value={{ limit, setLimit }}>
            <Grid item="true" xs={6}>
              <Tonaj title='YKS Araürün' v1={araurunv1} v2={araurunv2} v3={araurunv3} />
              <YKSData rowdata={araurunrows} />
            </Grid>
            <Grid item="true" xs={6}>
              <Tonaj title='HGS Araürün' v1={HGSAraurunTotalV1} v2={HGSAraurunTotalV2} v3={HGSAraurunTotalV3} />
              <HGSData rowdata={HGSAraurunData} />
            </Grid>
            <Grid item="true" xs={6} sx={{ mt: 1, mb: 2 }}>
              <Divider />
            </Grid>
            <Grid item="true" xs={6} sx={{ mt: 1, mb: 2 }}>
              <Divider />
            </Grid>
            <Grid item="true" xs={6}>
              <Tonaj title='YKS Toz' v1={tozv1} v2={tozv2} v3={tozv3} />
              <YKSData rowdata={tozrows} />
            </Grid>
            <Grid item="true" xs={6}>
              <Tonaj title='HGS Toz' v1={HGSTozTotalV1} v2={HGSTozTotalV2} v3={HGSTozTotalV3} />
              <HGSData rowdata={HGSTozData} />
            </Grid>
            <Grid item="true" xs={6} sx={{ mt: 1, mb: 2 }}>
              <Divider />
            </Grid>
            <Grid item="true" xs={6} sx={{ mt: 1, mb: 2 }}>
              <Divider />
            </Grid>
            <Grid item="true" xs={6}>
              <Tonaj title='YKS Fındık' v1={findikv1} v2={findikv2} v3={findikv3} />
              <YKSData rowdata={findikrows} />
            </Grid>
            <Grid item="true" xs={6}>
              <Tonaj title='HGS Fındık' v1={HGSFindikTotalV1} v2={HGSFindikTotalV2} v3={HGSFindikTotalV3} />
              <HGSData rowdata={HGSFindikData} />
            </Grid>
            <Grid item="true" xs={6} sx={{ mt: 1, mb: 2 }}>
              <Divider />
            </Grid>
            <Grid item="true" xs={6} sx={{ mt: 1, mb: 2 }}>
              <Divider />
            </Grid>
            <Grid item="true" xs={6}>
              <Tonaj title='YKS Ceviz' v1={cevizv1} v2={cevizv2} v3={cevizv3} />
              <YKSData rowdata={cevizrows} />
            </Grid>
            <Grid item="true" xs={6}>
              <Tonaj title='HGS Ceviz' v1={HGSCevizTotalV1} v2={HGSCevizTotalV2} v3={HGSCevizTotalV3} />
              <HGSData rowdata={HGSCevizData} />
            </Grid>
          </LimitContext.Provider>
        </Grid>

      </Box>
    </ThemeProvider>
  );
};

const formatNumbers = (text) => {
  const regex = /(\d+)/g;
  return text.replace(regex, (match) => parseInt(match).toLocaleString('tr-TR'));
};

const Tonaj = ({ title, v1, v2, v3 }) => {
  return (
    <Box sx={{ border: '1px solid gray', borderRadius: 1, mx: 1, alignItems: 'center', textAlign: 'center', p: 1 }}>
      <Box>
        <Typography variant="h9" color="textSecondary">{title}</Typography>
        {/* <Typography variant="body2">{`${moment().format('DD/MM/YY')} - bu tonajlar YKS kapak operatörü tarafından elle girilmektedir. `}</Typography> */}
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', alignItems: 'center' }}>
        <Box>
          <Typography variant="body1" color="textSecondary">
            V1
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {formatNumbers(v1.toString() + ' ton')}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" color="textSecondary">
            V2
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {formatNumbers(v2.toString() + ' ton')}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" color="textSecondary">
            V3
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {formatNumbers(v3.toString() + ' ton')}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" color="textSecondary">
            Toplam
          </Typography>
          <Typography variant="body1" color="textSecondary" style={{ textDecoration: 'underline' }}>
            {formatNumbers((v1 + v2 + v3).toString() + ' ton')}
          </Typography>
        </Box>
      </Box>
    </Box>

  );
};


const YKSData = ({ rowdata }) => {
  const transformedData = rowdata.map(row => ({ ...row, id: row._id }));
  return (
    <Box sx={{ height: 330, m: 1 }}>
      <StyledDataGrid
        rows={transformedData}
        columns={columns}
        rowHeight={35}
        headerHeight={35}
        loading={rowdata.length === 0}
        pageSize={100}
        initialState={{
          pagination: {
            pageSize: 30,
          },
        }}
        rowsPerPageOptions={[30, 50, 100]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        getRowClassName={(params) =>
          params.row.vardiya === 'Toplam' ? 'super-app-theme--total' : ''
        }
        localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </Box>
  );
};

const HGSData = ({ rowdata }) => {
  const transformedData = rowdata.map(row => ({ ...row, id: row.Id }));
  return (
    <Box sx={{ height: 330, m: 1 }}>
      <StyledDataGrid
        rows={transformedData}
        columns={HGScolumns}
        rowHeight={35}
        headerHeight={35}
        loading={rowdata.length === 0}
        pageSize={100}
        initialState={{
          pagination: {
            pageSize: 30,
          },
        }}
        rowsPerPageOptions={[30, 50, 100, 200]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        getRowClassName={(params) =>
          params.row.vardiya === 'Toplam' ? 'super-app-theme--total' : ''
        }
        localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
        components={{
          Toolbar: HGSCustomToolbar,
        }}
      />
    </Box>
  );
};


function CustomToolbar() {
  const { limit, setLimit } = useContext(LimitContext);

  const handleChange = (event) => {
    setLimit(event.target.value);
  };

  return (
    <GridToolbarContainer>
      <GridToolbar />
      <TextField
        sx={{ textAlign: 'center', width: '100px' }}
        label="Veri Limiti"
        value={limit}
        onChange={handleChange}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          style: { textAlign: 'center' }
        }}
        size="small"
      />
    </GridToolbarContainer>
  );
}

function HGSCustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbar />
    </GridToolbarContainer>
  );
}

export default YKS;
