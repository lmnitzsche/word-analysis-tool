/**
 * Application Constants
 */

export const API_ENDPOINTS = {
  DICTIONARY: 'https://api.dictionaryapi.dev/api/v2/entries/en',
  GOOGLE_BOOKS: 'https://www.googleapis.com/books/v1/volumes',
  SERPAPI: 'https://serpapi.com/search.json',
} as const;

export const API_LIMITS = {
  MAX_BOOKS_RESULTS: 40,
  MAX_SCHOLAR_RESULTS: 10,
  BOOKS_PER_PAGE: 12,
} as const;

export const ROUTES = {
  HOME: '/',
  WORDS: '/words',
  RESEARCH: '/research',
  BOOKS: '/books',
} as const;

export const THEME_COLORS = {
  PRIMARY: '#2E4057',
  SECONDARY: '#4A5D73',
  ACCENT: '#8B4513',
  BACKGROUND: '#F5F5DC',
} as const;
