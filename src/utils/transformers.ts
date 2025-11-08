/**
 * Utility functions for transforming API data to domain models
 */

import type { BookItem, ScholarResult, WordDefinition } from '../types/api';
import type { Book, ResearchPaper, WordInfo } from '../types/models';

/**
 * Transforms Google Books API response to Book model
 */
export const transformBookItem = (item: BookItem): Book => {
  const { volumeInfo } = item;
  
  return {
    id: item.id,
    title: volumeInfo.title || 'Untitled',
    authors: volumeInfo.authors || ['Unknown Author'],
    isbn: volumeInfo.industryIdentifiers?.[0]?.identifier || 'N/A',
    publishedDate: volumeInfo.publishedDate || 'Unknown',
    pageCount: volumeInfo.pageCount || 0,
    categories: volumeInfo.categories || [],
    description: volumeInfo.description || 'No description available',
    averageRating: volumeInfo.averageRating || 0,
    ratingsCount: volumeInfo.ratingsCount || 0,
    thumbnail: volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail || '',
    previewLink: volumeInfo.previewLink || volumeInfo.infoLink || '#',
    language: volumeInfo.language || 'en',
    publisher: volumeInfo.publisher || 'Unknown Publisher',
  };
};

/**
 * Transforms SerpApi Scholar result to ResearchPaper model
 */
export const transformScholarResult = (result: ScholarResult): ResearchPaper => {
  const yearMatch = result.publication_info?.summary?.match(/\d{4}/);
  
  return {
    id: result.result_id || `paper-${Date.now()}-${Math.random()}`,
    title: result.title || 'Untitled',
    authors: result.publication_info?.authors?.map((a) => a.name) || ['Unknown Author'],
    journal: result.publication_info?.summary || 'Unknown Journal',
    year: yearMatch ? parseInt(yearMatch[0], 10) : new Date().getFullYear(),
    abstract: result.snippet || 'No abstract available',
    citationCount: parseInt(result.inline_links?.cited_by?.total || '0', 10),
    url: result.link || '#',
    tags: result.resources?.map((r) => r.title) || [],
  };
};

/**
 * Transforms Dictionary API response to WordInfo model
 */
export const transformWordDefinition = (data: WordDefinition): WordInfo => {
  const firstMeaning = data.meanings?.[0];
  const firstDefinition = firstMeaning?.definitions?.[0];
  
  return {
    word: data.word || '',
    definition: firstDefinition?.definition || 'No definition available',
    phonetic: data.phonetic || data.phonetics?.[0]?.text || '',
    partOfSpeech: firstMeaning?.partOfSpeech || '',
    examples: firstDefinition?.example ? [firstDefinition.example] : [],
  };
};
