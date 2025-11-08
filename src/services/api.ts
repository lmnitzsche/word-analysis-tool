/**
 * API Service Layer
 * Handles all external API communication with proper error handling and typing
 */

import { API_ENDPOINTS, API_LIMITS } from '../constants';
import type { WordDefinition, BookItem, ScholarResult } from '../types/api';

const GOOGLE_BOOKS_API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY || '';
const SERPAPI_KEY = process.env.REACT_APP_SERPAPI_KEY || '';

/**
 * Generic API error handler
 */
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public service?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Fetches word definition from Free Dictionary API
 * @param word - The word to look up
 * @returns Word data including phonetics, meanings, definitions
 * @throws ApiError if the request fails
 */
export const fetchWordDefinition = async (
  word: string
): Promise<WordDefinition | null> => {
  if (!word || !word.trim()) {
    console.warn('Empty word provided to fetchWordDefinition');
    return null;
  }

  try {
    const response = await fetch(
      `${API_ENDPOINTS.DICTIONARY}/${encodeURIComponent(word.trim().toLowerCase())}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Word not found is not an error
      }
      throw new ApiError(
        `Dictionary API returned ${response.status}`,
        response.status,
        'Dictionary'
      );
    }

    const data = await response.json();
    return data[0] as WordDefinition;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    console.error('Error fetching word definition:', error);
    return null;
  }
};

/**
 * Searches Google Books API
 * @param query - Search query
 * @param maxResults - Maximum number of results (capped at 40 by Google)
 * @returns Array of book items
 * @throws ApiError if the request fails
 */
export const searchBooks = async (
  query: string,
  maxResults: number = API_LIMITS.MAX_BOOKS_RESULTS
): Promise<BookItem[]> => {
  if (!query || !query.trim()) {
    console.warn('Empty query provided to searchBooks');
    return [];
  }

  try {
    const url = new URL(API_ENDPOINTS.GOOGLE_BOOKS);
    url.searchParams.append('q', query.trim());
    url.searchParams.append(
      'maxResults',
      Math.min(maxResults, API_LIMITS.MAX_BOOKS_RESULTS).toString()
    );

    if (GOOGLE_BOOKS_API_KEY) {
      url.searchParams.append('key', GOOGLE_BOOKS_API_KEY);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new ApiError(
        `Google Books API returned ${response.status}`,
        response.status,
        'GoogleBooks'
      );
    }

    const data = await response.json();
    return (data.items as BookItem[]) || [];
  } catch (error) {
    if (error instanceof ApiError) throw error;
    console.error('Error fetching books:', error);
    return [];
  }
};

/**
 * Searches Google Scholar via SerpApi
 * @param query - Search query
 * @param num - Number of results
 * @returns Array of research papers or null if API key not configured
 * @throws ApiError if the request fails
 */
export const searchScholarPapers = async (
  query: string,
  num: number = API_LIMITS.MAX_SCHOLAR_RESULTS
): Promise<ScholarResult[] | null> => {
  if (!SERPAPI_KEY) {
    console.warn(
      'SerpApi key not configured. Set REACT_APP_SERPAPI_KEY in .env file'
    );
    return null;
  }

  if (!query || !query.trim()) {
    console.warn('Empty query provided to searchScholarPapers');
    return [];
  }

  try {
    const url = new URL(API_ENDPOINTS.SERPAPI);
    url.searchParams.append('engine', 'google_scholar');
    url.searchParams.append('q', query.trim());
    url.searchParams.append('num', num.toString());
    url.searchParams.append('api_key', SERPAPI_KEY);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new ApiError(
        `SerpApi returned ${response.status}`,
        response.status,
        'SerpApi'
      );
    }

    const data = await response.json();
    return (data.organic_results as ScholarResult[]) || [];
  } catch (error) {
    if (error instanceof ApiError) throw error;
    console.error('Error fetching papers:', error);
    return null;
  }
};
