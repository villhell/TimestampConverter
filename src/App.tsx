import { useState } from 'react';
import {
  Grid,
  Button,
  TextField,
  Typography,
  Snackbar,
  SnackbarCloseReason,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from 'react';
import { getTimeStamp } from './converter/TimestampConverter';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />
));

function App() {
  const [network, setNetwork] = useState(104);
  const [timestamp, setTimestamp] = useState(73548315816);
  const [convertTimestamp, setConvertTimestamp] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const changeNetwork = (network: number) => {
    setNetwork(network);
  };
  const changeTimestamp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimestamp(parseInt(e.target.value, 10));
  };

  const btnConvert_Click = () => {
    try {
      const convertTimestamp = getTimeStamp(timestamp, network);
      setConvertTimestamp(convertTimestamp);
    } catch (e) {
      setError('An error occurred during conversion');
      setOpen(true);
    }
  };

  // SnackbarのonCloseハンドラー
  const handleSnackbarClose = (reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // AlertのonCloseハンドラー
  const handleAlertClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      spacing={6}
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      marginTop={10}
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} md={6}>
        <Typography variant="h4" component="h1" gutterBottom>
          Symbol Timestamp Converter
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Network</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={network}
            label="Network"
            onChange={(e) => changeNetwork(e.target.value as number)}
          >
            <MenuItem value={104}>Mainnet</MenuItem>
            <MenuItem value={152}>Testnet</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} style={{ width: '40%' }}>
        <TextField
          id="address"
          name="address"
          label="Address"
          variant="outlined"
          required
          fullWidth
          onChange={changeTimestamp}
          value={timestamp}
          style={{ width: '100%', maxWidth: '100%' }}
        />
        <Grid container item justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={btnConvert_Click}
            style={{ marginTop: '10px' }}
          >
            Convert
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="body1" gutterBottom>
          Convert Timestamp:
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom>
          {convertTimestamp}
        </Typography>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={(_, reason) => handleSnackbarClose(reason)}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default App;
