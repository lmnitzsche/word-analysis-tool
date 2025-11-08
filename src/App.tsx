import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WordAnalyzer from './pages/WordAnalyzer';
import Research from './pages/Research';
import Books from './pages/Books';
import Footer from './components/Footer';

// Owl/Nerd themed color palette
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2E4057', // Deep blue-gray (like owl feathers)
      light: '#4A5D73',
      dark: '#1A2B3A',
    },
    secondary: {
      main: '#8B4513', // Saddle brown (like tree bark/books)
      light: '#A0522D',
      dark: '#654321',
    },
    background: {
      default: '#F5F5DC', // Beige (like old parchment)
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2E4057',
      secondary: '#5D4E37',
    },
  },
  typography: {
    fontFamily: '"Georgia", "Times New Roman", serif',
    h1: {
      fontFamily: '"Crimson Text", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Crimson Text", serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Crimson Text", serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Lato", sans-serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(46, 64, 87, 0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #F5F5DC 0%, #E6E6FA 100%)',
          }}
        >
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/words" element={<WordAnalyzer />} />
              <Route path="/research" element={<Research />} />
              <Route path="/books" element={<Books />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;