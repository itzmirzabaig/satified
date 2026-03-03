// Metadata for each question (difficulty, domain, skill)
export interface QuestionMetadata {
  id: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  domain: string;        // e.g., "Algebra", "Geometry"
  skill: string;         // e.g., "Linear Equations", "Circles"
  [key: string]: any;    // Allow extra properties for flexibility
}

// The actual question data returned by generators
export interface QuestionData {
  id: string;
  questionText: string;
  options: (string | { text: string })[];
  correctAnswer: number | string;  // Index or text of correct option
  figureCode?: string;    // Optional Mafs graph code
  explanation?: string;   // Optional explanation shown on answer side
}

// The generator function with metadata attached
export interface QuestionGenerator {
  metadata: QuestionMetadata;
  generate: () => QuestionData;
}

// Internal representation after loading a question file
export interface LoadedQuestion {
  id: string;
  folderPath: string;     // e.g., "Final_SAT_Easy_Algebra_LinearEquations"
  generator: QuestionGenerator;
  metadata: QuestionMetadata;
}

// For filter dropdowns
export type FilterType = 'difficulty' | 'domain' | 'skill';

// Root-level re-export so question files (../../types) resolve correctly
export * from './types';