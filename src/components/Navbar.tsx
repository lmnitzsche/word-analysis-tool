import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import {
  MenuBook,
  Science,
  Spellcheck,
  Home as HomeIcon,
} from '@mui/icons-material';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <HomeIcon /> },
    { path: '/words', label: 'Word Analysis', icon: <Spellcheck /> },
    { path: '/research', label: 'Research', icon: <Science /> },
    { path: '/books', label: 'Books', icon: <MenuBook /> },
  ];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(45deg, #2E4057 30%, #4A5D73 90%)',
        boxShadow: '0 4px 20px rgba(46, 64, 87, 0.3)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img 
              src="/logo.png" 
              alt="NerdHub Logo" 
              style={{ 
                height: '40px', 
                marginRight: '16px',
                filter: 'brightness(1.2)',
              }} 
            />
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                fontFamily: '"Crimson Text", serif',
                fontWeight: 700,
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              NerdHub
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                ml: 1, 
                color: 'rgba(255,255,255,0.7)',
                fontStyle: 'italic',
              }}
            >
              🦉 Where Knowledge Nests
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: 'white',
                  mx: 1,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor: location.pathname === item.path 
                    ? 'rgba(255,255,255,0.2)' 
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease',
                  },
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;