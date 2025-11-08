import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Chip,
  Rating,
  IconButton,
  Link,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search,
  MenuBook,
  Person,
  CalendarToday,
  Favorite,
  FavoriteBorder,
  OpenInNew,
  FilterList,
} from '@mui/icons-material';

interface Book {
  id: string;
  title: string;
  authors: string[];
  isbn: string;
  publishedDate: string;
  pageCount: number;
  categories: string[];
  description: string;
  averageRating: number;
  ratingsCount: number;
  thumbnail: string;
  previewLink: string;
  language: string;
  publisher: string;
}

const Books: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [favoriteBooks, setFavoriteBooks] = useState<string[]>([]);

  // Mock books data with focus on nerdy/academic topics
  const mockBooks: Book[] = [
    {
      id: '1',
      title: 'The Elements of Programming Style',
      authors: ['Brian W. Kernighan', 'P. J. Plauger'],
      isbn: '9780070342071',
      publishedDate: '1978',
      pageCount: 168,
      categories: ['Programming', 'Computer Science'],
      description: 'A classic guide to writing clean, readable, and maintainable code. This book provides timeless principles that every programmer should know, covering style guidelines that make code more understandable and less error-prone.',
      averageRating: 4.2,
      ratingsCount: 524,
      thumbnail: 'https://books.google.com/books/content?id=mock1&printsec=frontcover&img=1&zoom=1',
      previewLink: 'https://books.google.com/books?id=mock1',
      language: 'en',
      publisher: 'McGraw-Hill',
    },
    {
      id: '2',
      title: 'Artificial Intelligence: A Modern Approach',
      authors: ['Stuart Russell', 'Peter Norvig'],
      isbn: '9780134610993',
      publishedDate: '2020',
      pageCount: 1152,
      categories: ['Artificial Intelligence', 'Computer Science', 'Machine Learning'],
      description: 'The leading textbook in Artificial Intelligence, used in over 1300 universities in 120 countries. Comprehensive coverage of AI concepts and applications, including natural language processing and computational linguistics.',
      averageRating: 4.5,
      ratingsCount: 892,
      thumbnail: 'https://books.google.com/books/content?id=mock2&printsec=frontcover&img=1&zoom=1',
      previewLink: 'https://books.google.com/books?id=mock2',
      language: 'en',
      publisher: 'Pearson',
    },
    {
      id: '3',
      title: 'The Oxford English Dictionary: A Study in Words',
      authors: ['Simon Winchester'],
      isbn: '9780300097566',
      publishedDate: '1998',
      pageCount: 320,
      categories: ['Linguistics', 'Language', 'Reference'],
      description: 'The fascinating story behind the creation of the Oxford English Dictionary, exploring the dedication of word scholars and the evolution of language documentation.',
      averageRating: 4.3,
      ratingsCount: 1456,
      thumbnail: 'https://books.google.com/books/content?id=mock3&printsec=frontcover&img=1&zoom=1',
      previewLink: 'https://books.google.com/books?id=mock3',
      language: 'en',
      publisher: 'Yale University Press',
    },
    {
      id: '4',
      title: 'Digital Humanities: Knowledge and Criticism in a Digital Age',
      authors: ['Peter Siemens', 'Susan Schreibman'],
      isbn: '9780262536042',
      publishedDate: '2016',
      pageCount: 544,
      categories: ['Digital Humanities', 'Research', 'Technology'],
      description: 'An exploration of how digital technologies are transforming humanistic scholarship, covering computational approaches to text analysis, data visualization, and digital research methods.',
      averageRating: 4.1,
      ratingsCount: 278,
      thumbnail: 'https://books.google.com/books/content?id=mock4&printsec=frontcover&img=1&zoom=1',
      previewLink: 'https://books.google.com/books?id=mock4',
      language: 'en',
      publisher: 'MIT Press',
    },
  ];

  const searchBooks = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter mock books based on search query
      let filteredBooks = mockBooks.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        book.categories.some(category => category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Apply filters
      if (categoryFilter !== 'all') {
        filteredBooks = filteredBooks.filter(book =>
          book.categories.some(category => 
            category.toLowerCase().includes(categoryFilter.toLowerCase())
          )
        );
      }

      if (languageFilter !== 'all') {
        filteredBooks = filteredBooks.filter(book => book.language === languageFilter);
      }

      setBooks(filteredBooks);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavoriteBook = (bookId: string) => {
    setFavoriteBooks(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const getGoogleBooksUrl = (query: string) => {
    return `https://books.google.com/books?q=${encodeURIComponent(query)}`;
  };

  const popularCategories = [
    'Programming',
    'Computer Science',
    'Linguistics',
    'Digital Humanities',
    'Artificial Intelligence',
    'Machine Learning',
    'Language',
    'Research Methods',
  ];

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
            <MenuBook sx={{ fontSize: 48 }} />
            Book Discovery
          </Typography>
          <Typography variant="h6" color="text.secondary">
            🦉 Explore academic texts, technical books, and scholarly works
          </Typography>
        </Box>

        {/* Search Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search books, authors, topics, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchBooks()}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={searchBooks}
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
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="programming">Programming</MenuItem>
                <MenuItem value="computer science">Computer Science</MenuItem>
                <MenuItem value="linguistics">Linguistics</MenuItem>
                <MenuItem value="digital humanities">Digital Humanities</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<OpenInNew />}
              href={getGoogleBooksUrl(searchQuery)}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ ml: 'auto' }}
            >
              Open in Google Books
            </Button>
          </Box>
        </Paper>

        {/* Popular Categories */}
        {books.length === 0 && (
          <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#2E4057' }}>
              📚 Popular Academic Categories
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {popularCategories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => {
                    setSearchQuery(category);
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
        {books.length > 0 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ color: '#2E4057' }}>
                Books Found ({books.length})
              </Typography>
              <Button
                variant="outlined"
                startIcon={<OpenInNew />}
                href={getGoogleBooksUrl(searchQuery)}
                target="_blank"
                rel="noopener noreferrer"
              >
                View in Google Books
              </Button>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
              {books.map((book) => (
                <Card 
                  key={book.id}
                  sx={{ 
                    display: 'flex',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 25px rgba(46, 64, 87, 0.15)',
                    },
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      width: 120,
                      minWidth: 120,
                      background: 'linear-gradient(135deg, #2E4057 0%, #4A5D73 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    <MenuBook sx={{ fontSize: 40 }} />
                  </CardMedia>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography 
                        variant="h6" 
                        component="h3"
                        sx={{ 
                          color: '#2E4057',
                          fontWeight: 'bold',
                          flexGrow: 1,
                          pr: 1,
                          fontSize: '1rem',
                          lineHeight: 1.3,
                        }}
                      >
                        {book.title}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => toggleFavoriteBook(book.id)}
                        sx={{ 
                          color: favoriteBooks.includes(book.id) ? '#8B4513' : 'text.secondary',
                        }}
                      >
                        {favoriteBooks.includes(book.id) ? <Favorite /> : <FavoriteBorder />}
                      </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                      <Person sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {book.authors.join(', ')}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarToday sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {book.publishedDate}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Rating
                          value={book.averageRating}
                          precision={0.1}
                          size="small"
                          readOnly
                        />
                        <Typography variant="body2" color="text.secondary">
                          ({book.ratingsCount})
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.5, fontSize: '0.85rem' }}>
                      {book.description.length > 120 
                        ? `${book.description.substring(0, 120)}...` 
                        : book.description
                      }
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
                      {book.categories.slice(0, 3).map((category) => (
                        <Chip 
                          key={category}
                          label={category}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem', height: '22px' }}
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                        {book.pageCount} pages • {book.publisher}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<OpenInNew />}
                        href={book.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          borderColor: '#2E4057',
                          color: '#2E4057',
                          fontSize: '0.75rem',
                          '&:hover': {
                            backgroundColor: '#2E4057',
                            color: 'white',
                          },
                        }}
                      >
                        Preview
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}

        {/* Getting Started */}
        {books.length === 0 && !isLoading && (
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
              🦉 Discover Academic Literature
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Search through millions of academic books, technical manuals, and scholarly works. Perfect for 
              researchers, students, and curious minds exploring linguistics, computer science, and digital humanities.
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Features:
            </Typography>
            <Typography variant="body2" component="div">
              • Search by title, author, ISBN, or topic<br/>
              • Advanced filtering by category and language<br/>
              • Book ratings and reviews<br/>
              • Save favorites for later<br/>
              • Direct links to Google Books for purchase/preview<br/>
              • Focus on academic and technical literature
            </Typography>
          </Alert>
        )}

        {/* No Results */}
        {books.length === 0 && !isLoading && searchQuery && (
          <Alert severity="warning" sx={{ mt: 2, borderRadius: 3 }}>
            <Typography variant="body1">
              No books found for "{searchQuery}". Try different keywords or browse{' '}
              <Link
                href={getGoogleBooksUrl(searchQuery)}
                target="_blank"
                rel="noopener noreferrer"
              >
                all results on Google Books
              </Link>
              .
            </Typography>
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default Books;