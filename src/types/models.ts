/**
 * Domain Model Types
 */

export interface Book {
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

export interface ResearchPaper {
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

export interface WordInfo {
  word: string;
  definition: string;
  phonetic: string;
  partOfSpeech: string;
  examples: string[];
}

export interface WordSuggestion {
  word: string;
  penalty: number;
  confidence: number;
}
