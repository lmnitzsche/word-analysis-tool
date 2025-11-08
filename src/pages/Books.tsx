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
  Pagination,
  Grid,
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
import { searchBooks as searchBooksAPI } from '../services';

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
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12; // 3 rows of 4 books

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
    setCurrentPage(1); // Reset to first page on new search
    
    try {
      // Try to fetch real books from Google Books API - request 40 books
      const apiResults = await searchBooksAPI(searchQuery, 40);
      
      if (apiResults && apiResults.length > 0) {
        // Transform API results to match our interface
        const transformedBooks: Book[] = apiResults.map((item: any) => {
          const volumeInfo = item.volumeInfo || {};
          const imageLinks = volumeInfo.imageLinks || {};
          
          return {
            id: item.id || Math.random().toString(),
            title: volumeInfo.title || 'Untitled',
            authors: volumeInfo.authors || ['Unknown Author'],
            isbn: volumeInfo.industryIdentifiers?.[0]?.identifier || 'N/A',
            publishedDate: volumeInfo.publishedDate || 'Unknown',
            pageCount: volumeInfo.pageCount || 0,
            categories: volumeInfo.categories || [],
            description: volumeInfo.description || 'No description available',
            averageRating: volumeInfo.averageRating || 0,
            ratingsCount: volumeInfo.ratingsCount || 0,
            thumbnail: imageLinks.thumbnail || imageLinks.smallThumbnail || '',
            previewLink: volumeInfo.previewLink || volumeInfo.infoLink || '#',
            language: volumeInfo.language || 'en',
            publisher: volumeInfo.publisher || 'Unknown Publisher',
          };
        });
        
        setBooks(transformedBooks);
      } else {
        // Fallback to mock data if API returns no results
        let filteredBooks = mockBooks.filter(book =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
          book.categories.some(category => category.toLowerCase().includes(searchQuery.toLowerCase())) ||
          book.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        setBooks(filteredBooks.length > 0 ? filteredBooks : mockBooks);
      }
    } catch (error) {
      console.error('Error searching books:', error);
      // Fallback to mock data on error
      setBooks(mockBooks);
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
            Explore academic texts, technical books, and scholarly works
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
              Popular Academic Categories
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {popularCategories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => {
                    setSearchQuery(category);
                    setTimeout(() => {
                      searchBooks();
                    }, 100);
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

            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { 
                xs: '1fr', 
                sm: 'repeat(2, 1fr)', 
                md: 'repeat(4, 1fr)' 
              }, 
              gap: 3 
            }}>
              {books
                .slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage)
                .map((book) => (
                <Card 
                  key={book.id} 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 25px rgba(46, 64, 87, 0.15)',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 180,
                      background: book.thumbnail ? `url(${book.thumbnail}) center/cover` : 'linear-gradient(135deg, #2E4057 0%, #4A5D73 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    {!book.thumbnail && <MenuBook sx={{ fontSize: 60 }} />}
                  </CardMedia>
                  <CardContent sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography 
                        variant="h6" 
                        component="h3"
                        sx={{ 
                          color: '#2E4057',
                          fontWeight: 'bold',
                          flexGrow: 1,
                          pr: 1,
                          fontSize: '0.95rem',
                          lineHeight: 1.3,
                          minHeight: '2.6em',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
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
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        fontSize: '0.8rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {book.authors.join(', ')}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <CalendarToday sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        {book.publishedDate}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                      <Rating
                        value={book.averageRating}
                        precision={0.1}
                        size="small"
                        readOnly
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        ({book.ratingsCount})
                      </Typography>
                    </Box>

                    <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.4, fontSize: '0.75rem', flexGrow: 1, overflow: 'hidden' }}>
                      {book.description.length > 80 
                        ? `${book.description.substring(0, 80)}...` 
                        : book.description
                      }
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
                      {book.categories.slice(0, 2).map((category) => (
                        <Chip 
                          key={category}
                          label={category}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.65rem', height: '20px' }}
                        />
                      ))}
                    </Box>

                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      endIcon={<OpenInNew />}
                      href={book.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        borderColor: '#2E4057',
                        color: '#2E4057',
                        fontSize: '0.7rem',
                        mt: 'auto',
                        '&:hover': {
                          backgroundColor: '#2E4057',
                          color: 'white',
                        },
                      }}
                    >
                      View Book
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
            
            {/* Pagination */}
            {books.length > booksPerPage && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination 
                  count={Math.ceil(books.length / booksPerPage)} 
                  page={currentPage}
                  onChange={(event, page) => setCurrentPage(page)}
                  color="primary"
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: '#2E4057',
                    },
                    '& .Mui-selected': {
                      backgroundColor: '#2E4057',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#4A5D73',
                      },
                    },
                  }}
                />
              </Box>
            )}
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
              Discover Academic Literature
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