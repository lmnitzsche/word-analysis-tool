import React from 'react';
import { Box, Typography, Container, IconButton, Link } from '@mui/material';
import { LinkedIn, GitHub } from '@mui/icons-material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(45deg, #2E4057 30%, #1A2B3A 90%)',
        color: 'white',
        py: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Wisdom starts with curiosity
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/logan-nitzsche"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'white', '&:hover': { color: '#0077B5' } }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              component="a"
              href="https://github.com/lmnitzsche"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'white', '&:hover': { color: '#333' } }}
            >
              <GitHub />
            </IconButton>
            <Typography variant="body2" sx={{ ml: 2, opacity: 0.8 }}>
              © {currentYear}{' '}
              <Link
                href="https://logannitzsche.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'white', textDecoration: 'none' }}
              >
                Logan Nitzsche
              </Link>
              . All Rights Reserved.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;