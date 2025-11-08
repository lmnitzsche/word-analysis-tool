import React, { useState, useEffect } from 'react';
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
  ListItemIcon,
  Divider,
  Alert,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import {
  Search,
  Spellcheck,
  VolumeUp,
  Psychology,
  History,
  TrendingUp,
  Book,
  Language,
  Link as LinkIcon,
} from '@mui/icons-material';

interface WordSuggestion {
  word: string;
  penalty: number;
  confidence: number;
}

interface WordInfo {
  word: string;
  definition?: string;
  etymology?: string;
  phonetic?: string;
  partOfSpeech?: string;
  examples?: string[];
}

const WordAnalyzer: React.FC = () => {
  const [inputWord, setInputWord] = useState('');
  const [suggestions, setSuggestions] = useState<WordSuggestion[]>([]);
  const [wordInfo, setWordInfo] = useState<WordInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [dictionary, setDictionary] = useState<string[]>([]);

  // Load dictionary on component mount
  useEffect(() => {
    fetch('/word.txt')
      .then(response => response.text())
      .then(data => {
        const words = data.split('\n').map(word => word.toLowerCase().trim()).filter(word => word.length > 0);
        setDictionary(words);
      })
      .catch(error => console.error('Error loading dictionary:', error));
  }, []);

  // Enhanced spell check algorithm (from your original code)
  const calculatePenalty = (a: string, b: string): number => {
    if (a === b) return 0;
    const isVowel = (char: string) => 'aeiouAEIOU'.indexOf(char) !== -1;
    
    if ((isVowel(a) && isVowel(b)) || (!isVowel(a) && !isVowel(b))) {
      return 1;
    }
    return 3;
  };

  const calculateAlignmentPenalty = (a: string, b: string): number => {
    const lengthFirst = a.length;
    const lengthSecond = b.length;
    const costArray = Array(lengthFirst + 1).fill(null).map(() => Array(lengthSecond + 1).fill(0));

    for (let i = 0; i <= lengthFirst; i++) {
      costArray[i][0] = i * 2; // Gap penalty
    }

    for (let j = 0; j <= lengthSecond; j++) {
      costArray[0][j] = j * 2; // Gap penalty
    }

    for (let i = 1; i <= lengthFirst; i++) {
      for (let j = 1; j <= lengthSecond; j++) {
        const cost = calculatePenalty(a[i - 1], b[j - 1]);
        costArray[i][j] = Math.min(
          costArray[i - 1][j - 1] + cost,
          costArray[i - 1][j] + 2, // Gap
          costArray[i][j - 1] + 2  // Gap
        );
      }
    }
    return costArray[lengthFirst][lengthSecond];
  };

  const analyzeWord = async (word: string) => {
    if (!word.trim() || dictionary.length === 0) return;

    setIsLoading(true);
    const normalizedWord = word.toLowerCase().trim();

    try {
      // Add to search history
      setSearchHistory(prev => {
        const newHistory = [word, ...prev.filter(w => w !== word)].slice(0, 10);
        return newHistory;
      });

      // Calculate suggestions using your original algorithm
      const wordSuggestions: WordSuggestion[] = dictionary
        .map(dictWord => {
          const penalty = calculateAlignmentPenalty(normalizedWord, dictWord);
          const maxLength = Math.max(normalizedWord.length, dictWord.length);
          const confidence = Math.max(0, (maxLength - penalty) / maxLength * 100);
          return { word: dictWord, penalty, confidence };
        })
        .sort((a, b) => a.penalty - b.penalty)
        .slice(0, 10);

      setSuggestions(wordSuggestions);

      // Mock word information (you can enhance this with real API calls)
      setWordInfo({
        word: normalizedWord,
        definition: `Definition for "${normalizedWord}" - A word from our comprehensive dictionary`,
        etymology: `Etymology: The word "${normalizedWord}" has interesting linguistic origins...`,
        phonetic: `/ˈfʌŋkʃən/`,
        partOfSpeech: 'noun',
        examples: [
          `The ${normalizedWord} works perfectly in this context.`,
          `Understanding ${normalizedWord} is important for comprehension.`,
        ],
      });

    } catch (error) {
      console.error('Error analyzing word:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const externalLinks = [
    { name: 'Dictionary.com', url: `https://www.dictionary.com/browse/${inputWord}`, icon: <Book /> },
    { name: 'Thesaurus', url: `https://www.thesaurus.com/browse/${inputWord}`, icon: <Language /> },
    { name: 'Etymology', url: `https://www.etymonline.com/search?q=${inputWord}`, icon: <History /> },
    { name: 'Google Trends', url: `https://trends.google.com/trends/explore?q=${inputWord}`, icon: <TrendingUp /> },
    { name: 'Urban Dictionary', url: `https://www.urbandictionary.com/define.php?term=${inputWord}`, icon: <Language /> },
    { name: 'Rhyme Zone', url: `https://www.rhymezone.com/r/rhyme.cgi?Word=${inputWord}&typeofrhyme=perfect&org1=syl&org2=l&org3=y`, icon: <VolumeUp /> },
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
            <Spellcheck sx={{ fontSize: 48 }} />
            Word Analysis Hub
          </Typography>
          <Typography variant="h6" color="text.secondary">
            🦉 Enhanced with your original algorithm - now with {dictionary.length.toLocaleString()}+ words
          </Typography>
        </Box>

        {/* Search Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter a word to analyze..."
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && analyzeWord(inputWord)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={() => analyzeWord(inputWord)}
              disabled={isLoading || !inputWord.trim()}
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
              {isLoading ? 'Analyzing...' : 'Analyze'}
            </Button>
          </Box>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Recent searches:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {searchHistory.slice(0, 5).map((word, index) => (
                  <Chip
                    key={index}
                    label={word}
                    size="small"
                    onClick={() => {
                      setInputWord(word);
                      analyzeWord(word);
                    }}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Paper>

        {/* Results */}
        {suggestions.length > 0 && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4 }}>
            {/* Suggestions */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 3, color: '#2E4057', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Psychology />
                  Smart Suggestions
                </Typography>
                <List>
                  {suggestions.map((suggestion, index) => (
                    <React.Fragment key={index}>
                      <ListItem
                        sx={{
                          cursor: 'pointer',
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: 'rgba(46, 64, 87, 0.05)',
                          },
                        }}
                        onClick={() => {
                          setInputWord(suggestion.word);
                          analyzeWord(suggestion.word);
                        }}
                      >
                        <ListItemIcon>
                          <Chip
                            label={`${suggestion.confidence.toFixed(0)}%`}
                            size="small"
                            color={suggestion.confidence > 80 ? 'success' : suggestion.confidence > 60 ? 'warning' : 'default'}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={suggestion.word}
                          secondary={`Penalty: ${suggestion.penalty} | Confidence: ${suggestion.confidence.toFixed(1)}%`}
                          primaryTypographyProps={{
                            fontWeight: index === 0 ? 'bold' : 'normal',
                            color: index === 0 ? '#2E4057' : 'inherit',
                          }}
                        />
                        <IconButton size="small">
                          <VolumeUp fontSize="small" />
                        </IconButton>
                      </ListItem>
                      {index < suggestions.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Word Information */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
                  <Tab label="Definition" />
                  <Tab label="Etymology" />
                  <Tab label="External Links" />
                </Tabs>

                {activeTab === 0 && wordInfo && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, color: '#2E4057' }}>
                      {wordInfo.word}
                      {wordInfo.phonetic && (
                        <Typography component="span" variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                          {wordInfo.phonetic}
                        </Typography>
                      )}
                    </Typography>
                    {wordInfo.partOfSpeech && (
                      <Chip label={wordInfo.partOfSpeech} size="small" sx={{ mb: 2 }} />
                    )}
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {wordInfo.definition}
                    </Typography>
                    {wordInfo.examples && (
                      <Box>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                          Examples:
                        </Typography>
                        {wordInfo.examples.map((example, index) => (
                          <Typography key={index} variant="body2" sx={{ fontStyle: 'italic', mb: 0.5 }}>
                            • {example}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </Box>
                )}

                {activeTab === 1 && wordInfo && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, color: '#2E4057' }}>
                      Etymology
                    </Typography>
                    <Typography variant="body1">
                      {wordInfo.etymology}
                    </Typography>
                  </Box>
                )}

                {activeTab === 2 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, color: '#2E4057' }}>
                      External Resources
                    </Typography>
                    <List>
                      {externalLinks.map((link, index) => (
                        <ListItem
                          key={index}
                          component="a"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                            borderRadius: 2,
                            '&:hover': {
                              backgroundColor: 'rgba(46, 64, 87, 0.05)',
                            },
                          }}
                        >
                          <ListItemIcon>
                            {link.icon}
                          </ListItemIcon>
                          <ListItemText primary={link.name} />
                          <LinkIcon fontSize="small" />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Getting Started */}
        {suggestions.length === 0 && (
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
              🦉 Enhanced Word Analysis Ready!
            </Typography>
            <Typography variant="body2">
              This enhanced version uses your original spell-checking algorithm with improved UI and additional features. 
              Enter any word above to get intelligent suggestions using the same penalty calculation system you built, 
              plus access to external dictionaries and linguistic resources.
              {dictionary.length > 0 && (
                <><br/><strong>Dictionary loaded:</strong> {dictionary.length.toLocaleString()} words available for analysis.</>
              )}
            </Typography>
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default WordAnalyzer;