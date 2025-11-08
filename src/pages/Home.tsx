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
      <Box sx={{ 
        textAlign: 'center', 
        py: { xs: 6, md: 10 },
        mb: 8,
      }}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            mb: 3, 
            color: '#2E4057',
            fontWeight: 700,
            fontSize: { xs: '2.5rem', md: '3.75rem' },
          }}
        >
          Welcome to WordWise
        </Typography>
        <Typography 
          variant="h5" 
          component="p" 
          sx={{ 
            mb: 5, 
            color: '#5D4E37',
            fontWeight: 400,
            maxWidth: '700px',
            mx: 'auto',
            lineHeight: 1.6,
            fontSize: { xs: '1.1rem', md: '1.5rem' },
          }}
        >
          Your comprehensive platform for word analysis, academic research, and literary exploration
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={Link}
            to="/words"
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#2E4057',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: '#4A5D73',
              },
            }}
          >
            Get Started
          </Button>
          <Button
            component={Link}
            to="/books"
            variant="outlined"
            size="large"
            sx={{
              borderColor: '#2E4057',
              color: '#2E4057',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                borderColor: '#4A5D73',
                bgcolor: 'rgba(46, 64, 87, 0.04)',
              },
            }}
          >
            Explore Books
          </Button>
        </Box>
      </Box>
      
      {/* Stats */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 10,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: 4,
        }}
      >
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 4,
          }}
        >
            {stats.map((stat, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Avatar 
                  sx={{ 
                    bgcolor: '#2E4057', 
                    mx: 'auto', 
                    mb: 2,
                    width: 64,
                    height: 64,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E4057', mb: 0.5 }}>
                  {stat.number}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

      {/* Features Section */}
      <Typography 
        variant="h3" 
        component="h2" 
        sx={{ 
          textAlign: 'center', 
          mb: 6, 
          color: '#2E4057',
          fontWeight: 700,
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
          Ready to Expand Your Knowledge?
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