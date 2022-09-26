import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import App from './components/App.jsx';

const theme = createTheme({});
const root = document.getElementById('root');

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  root,
);

