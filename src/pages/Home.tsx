import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  Avatar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Spellcheck,
  Science,
  MenuBook,
  Psychology,
  AutoAwesome,
} from '@mui/icons-material';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Spellcheck sx={{ fontSize: 40, color: '#2E4057' }} />,
      title: 'Advanced Word Analysis',
      description: 'Deep dive into etymology, phonetics, and linguistic patterns with AI-powered insights.',
      link: '/words',
      linkText: 'Explore Words',
    },
    {
      icon: <Science sx={{ fontSize: 40, color: '#8B4513' }} />,
      title: 'Academic Research',
      description: 'Access scholarly articles, papers, and research from Google Scholar and beyond.',
      link: '/research',
      linkText: 'Start Research',
    },
    {
      icon: <MenuBook sx={{ fontSize: 40, color: '#2E4057' }} />,
      title: 'Book Discovery',
      description: 'Find, analyze, and explore books with detailed metadata and recommendations.',
      link: '/books',
      linkText: 'Discover Books',
    },
  ];

  const stats = [
    { number: '500K+', label: 'Words Analyzed', icon: <Psychology /> },
    { number: '2.5M+', label: 'Research Papers', icon: <Science /> },
    { number: '10M+', label: 'Books Indexed', icon: <MenuBook /> },
    { number: 'AI-Powered', label: 'Smart Suggestions', icon: <AutoAwesome /> },
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8, mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <img 
            src="/logo.png" 
            alt="NerdHub Logo" 
            style={{ 
              height: '120px',
              filter: 'drop-shadow(0 4px 8px rgba(46, 64, 87, 0.3))',
            }} 
          />
        </Box>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            mb: 2, 
            color: '#2E4057',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Welcome to NerdHub 🦉
        </Typography>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            mb: 4, 
            color: '#5D4E37',
            fontStyle: 'italic',
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          Your comprehensive platform for word analysis, academic research, and literary exploration
        </Typography>
        
        {/* Stats */}
        <Paper 
          elevation={3}
          sx={{ 
            p: 3, 
            mb: 6,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(230,230,250,0.9) 100%)',
            borderRadius: 3,
          }}
        >
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
              justifyItems: 'center',
            }}
          >
            {stats.map((stat, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Avatar 
                  sx={{ 
                    bgcolor: '#2E4057', 
                    mx: 'auto', 
                    mb: 1,
                    width: 56,
                    height: 56,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E4057' }}>
                  {stat.number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Features Section */}
      <Typography 
        variant="h3" 
        component="h2" 
        sx={{ 
          textAlign: 'center', 
          mb: 6, 
          color: '#2E4057',
        }}
      >
        Explore Our Tools
      </Typography>
      
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 4,
          mb: 8,
        }}
      >
        {features.map((feature, index) => (
          <Card 
            key={index}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 8px 25px rgba(46, 64, 87, 0.2)',
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
              <Box sx={{ mb: 2 }}>
                {feature.icon}
              </Box>
              <Typography variant="h5" component="h3" sx={{ mb: 2, color: '#2E4057' }}>
                {feature.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {feature.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
              <Button
                component={Link}
                to={feature.link}
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: '#2E4057',
                  '&:hover': {
                    backgroundColor: '#1A2B3A',
                  },
                }}
              >
                {feature.linkText}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* Call to Action */}
      <Paper 
        elevation={6}
        sx={{ 
          p: 6, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #2E4057 0%, #4A5D73 100%)',
          color: 'white',
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Ready to Expand Your Knowledge? 🧠
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
          Join thousands of researchers, writers, and curious minds
        </Typography>
        <Button
          component={Link}
          to="/words"
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#8B4513',
            color: 'white',
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            '&:hover': {
              backgroundColor: '#654321',
            },
          }}
        >
          Start Exploring Words
        </Button>
      </Paper>
    </Container>
  );
};

export default Home;