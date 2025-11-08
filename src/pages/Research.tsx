import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Link,
} from '@mui/material';
import {
  Search,
  Science,
  School,
  Article,
  CalendarToday,
  Person,
  OpenInNew,
  FilterList,
  Star,
  Bookmark,
} from '@mui/icons-material';

interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  abstract: string;
  citationCount: number;
  url: string;
  tags: string[];
}

const Research: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [yearFilter, setYearFilter] = useState('all');
  const [fieldFilter, setFieldFilter] = useState('all');
  const [savedPapers, setSavedPapers] = useState<string[]>([]);

  // Mock research papers data
  const mockPapers: ResearchPaper[] = [
    {
      id: '1',
      title: 'Machine Learning Applications in Natural Language Processing: A Comprehensive Survey',
      authors: ['Smith, J.', 'Johnson, A.', 'Brown, K.'],
      journal: 'Journal of Artificial Intelligence Research',
      year: 2023,
      abstract: 'This paper presents a comprehensive survey of machine learning applications in natural language processing, covering recent advances in transformer models, attention mechanisms, and their applications in various NLP tasks including spell checking and word analysis.',
      citationCount: 247,
      url: 'https://scholar.google.com/example1',
      tags: ['Machine Learning', 'NLP', 'Transformers'],
    },
    {
      id: '2',
      title: 'Deep Learning Architectures for Text Classification and Spell Correction',
      authors: ['Davis, M.', 'Wilson, L.'],
      journal: 'IEEE Transactions on Neural Networks',
      year: 2023,
      abstract: 'We analyze various deep learning architectures for text classification and spell correction tasks, comparing BERT, RoBERTa, and GPT models across multiple datasets and providing insights into their relative performance for word analysis applications.',
      citationCount: 156,
      url: 'https://scholar.google.com/example2',
      tags: ['Deep Learning', 'Text Classification', 'BERT'],
    },
    {
      id: '3',
      title: 'Computational Linguistics and Digital Humanities: Bridging Technology and Literature',
      authors: ['Chen, L.', 'Anderson, R.', 'Thompson, S.'],
      journal: 'Digital Humanities Quarterly',
      year: 2022,
      abstract: 'This work explores the intersection of computational linguistics and digital humanities, examining how NLP technologies can enhance literary analysis, book discovery, and textual research methodologies.',
      citationCount: 89,
      url: 'https://scholar.google.com/example3',
      tags: ['Digital Humanities', 'Computational Linguistics', 'Literary Analysis'],
    },
  ];

  const searchPapers = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter mock papers based on search query
      const filteredPapers = mockPapers.filter(paper =>
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        paper.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      // Apply filters
      let results = filteredPapers;
      
      if (yearFilter !== 'all') {
        const currentYear = new Date().getFullYear();
        if (yearFilter === 'recent') {
          results = results.filter(paper => paper.year >= currentYear - 2);
        } else if (yearFilter === 'older') {
          results = results.filter(paper => paper.year < currentYear - 2);
        }
      }

      setPapers(results);
    } catch (error) {
      console.error('Error searching papers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSavedPaper = (paperId: string) => {
    setSavedPapers(prev => 
      prev.includes(paperId) 
        ? prev.filter(id => id !== paperId)
        : [...prev, paperId]
    );
  };

  const getGoogleScholarUrl = (query: string) => {
    return `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`;
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              mb: 2, 
              color: '#2E4057',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <Science sx={{ fontSize: 48 }} />
            Research Hub
          </Typography>
          <Typography variant="h6" color="text.secondary">
            🦉 Discover, analyze, and organize academic research
          </Typography>
        </Box>

        {/* Search Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search research papers, authors, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchPapers()}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={searchPapers}
              disabled={isLoading || !searchQuery.trim()}
              startIcon={<Search />}
              sx={{
                backgroundColor: '#2E4057',
                minWidth: '140px',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#1A2B3A',
                },
              }}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </Box>

          {/* Filters */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <FilterList sx={{ color: 'text.secondary' }} />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={yearFilter}
                label="Year"
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <MenuItem value="all">All Years</MenuItem>
                <MenuItem value="recent">Recent (2022+)</MenuItem>
                <MenuItem value="older">Older</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<OpenInNew />}
              href={getGoogleScholarUrl(searchQuery)}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ ml: 'auto' }}
            >
              Open in Google Scholar
            </Button>
          </Box>
        </Paper>

        {/* Quick Access */}
        {papers.length === 0 && (
          <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#2E4057' }}>
              🔗 Quick Research Topics
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {[
                'Natural Language Processing',
                'Machine Learning',
                'Computational Linguistics',
                'Digital Humanities',
                'Text Analysis',
                'Word Analysis',
                'Spell Checking',
                'Information Retrieval',
              ].map((topic) => (
                <Chip
                  key={topic}
                  label={topic}
                  onClick={() => {
                    setSearchQuery(topic);
                  }}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#2E4057',
                      color: 'white',
                    },
                  }}
                />
              ))}
            </Box>
          </Paper>
        )}

        {/* Results */}
        {papers.length > 0 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ color: '#2E4057' }}>
                Research Papers ({papers.length})
              </Typography>
              <Button
                variant="outlined"
                startIcon={<OpenInNew />}
                href={getGoogleScholarUrl(searchQuery)}
                target="_blank"
                rel="noopener noreferrer"
              >
                View in Google Scholar
              </Button>
            </Box>

            <Box sx={{ display: 'grid', gap: 3 }}>
              {papers.map((paper) => (
                <Card 
                  key={paper.id}
                  sx={{ 
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 25px rgba(46, 64, 87, 0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography 
                        variant="h6" 
                        component="h3"
                        sx={{ 
                          color: '#2E4057',
                          fontWeight: 'bold',
                          flexGrow: 1,
                          pr: 2,
                        }}
                      >
                        {paper.title}
                      </Typography>
                      <IconButton
                        onClick={() => toggleSavedPaper(paper.id)}
                        sx={{ 
                          color: savedPapers.includes(paper.id) ? '#8B4513' : 'text.secondary',
                        }}
                      >
                        <Bookmark />
                      </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {paper.authors.join(', ')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Article sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {paper.journal}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {paper.year}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Star sx={{ fontSize: 16, color: '#8B4513' }} />
                        <Typography variant="body2" color="text.secondary">
                          {paper.citationCount} citations
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                      {paper.abstract}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {paper.tags.map((tag) => (
                          <Chip 
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        ))}
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<OpenInNew />}
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          borderColor: '#2E4057',
                          color: '#2E4057',
                          '&:hover': {
                            backgroundColor: '#2E4057',
                            color: 'white',
                          },
                        }}
                      >
                        View Paper
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}

        {/* Getting Started */}
        {papers.length === 0 && !isLoading && (
          <Alert 
            severity="info" 
            sx={{ 
              borderRadius: 3,
              '& .MuiAlert-message': {
                width: '100%',
              },
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              🦉 Start Your Research Journey
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Search for academic papers, research topics, or authors. Our platform integrates with Google Scholar 
              and provides advanced filtering and organization tools for linguistic research, NLP papers, and more.
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Features:
            </Typography>
            <Typography variant="body2" component="div">
              • Advanced search with multiple filters<br/>
              • Citation tracking and paper metrics<br/>
              • Save and organize papers<br/>
              • Direct integration with Google Scholar<br/>
              • Topic suggestions for linguistic research
            </Typography>
          </Alert>
        )}

        {/* No Results */}
        {papers.length === 0 && !isLoading && searchQuery && (
          <Alert severity="warning" sx={{ mt: 2, borderRadius: 3 }}>
            <Typography variant="body1">
              No papers found for "{searchQuery}". Try different keywords or check the{' '}
              <Link
                href={getGoogleScholarUrl(searchQuery)}
                target="_blank"
                rel="noopener noreferrer"
              >
                full results on Google Scholar
              </Link>
              .
            </Typography>
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default Research;