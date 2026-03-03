import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: a35c7164
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [System with perpendicular lines using parameters a and b]
 * - Difficulty factors: [Determining which system is perpendicular given original is perpendicular]
 * - Distractor patterns: [A: correct, B: parallel condition, C: different scaling, D: original system]
 * - Constraints: [Must maintain 5a = 7b relationship from original]
 * - Question type: [Text → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_a35c7164 = {
  metadata: {
    // id: "a35c7164",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Based on original analysis: implied original system is 5x - 7y = 1 and ax + by = 1 perpendicular
    // This means 5a = -7b, or 5a = 7b with sign consideration
    
    const aCoeff = getRandomInt(2, 8);
    const bCoeff = getRandomInt(aCoeff + 1, aCoeff + 5);
    // Relationship: aCoeff * a = bCoeff * b for perpendicular to work out
    
    // Option A structure: (2*aCoeff)x + (bCoeff)y = 1 and ax - 2by = 1
    // Actually following original pattern: 10x + 7y = 1 and ax - 2by = 1
    
    const m = getRandomInt(8, 15);
    const n = getRandomInt(4, 9);
    
    // Fixed: Proper LaTeX formatting without raw newlines in strings
    // Using separate lines for readability but proper string concatenation
    const optionsData = [
      { 
        text: `${m}x + ${n}y = 1$ and ax - 2by = 1`, 
        isCorrect: true 
      },
      { 
        text: `${m}x + ${n}y = 1$ and ax + 2by = 1`, 
        isCorrect: false, 
        reason: "this creates parallel lines, not perpendicular" 
      },
      { 
        text: `${m}x + ${n}y = 1$ and 2ax + by = 1`, 
        isCorrect: false, 
        reason: "does not maintain the perpendicular relationship" 
      },
      { 
        text: `${Math.floor(m/2)}x - ${n}y = 1$ and ax + by = 1`, 
        isCorrect: false, 
        reason: "this represents the original system, not a new perpendicular pair" 
      }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `In the given pair of equations, $a$ and $b$ are constants. The graph of this pair of equations in the $xy$-plane is a pair of perpendicular lines. Which of the following pairs of equations also represents a pair of perpendicular lines?`,
      figureCode: null,
      // Fixed: Options as simple strings with proper LaTeX, no object wrapping
      options: shuffledOptions.map(o => `${o.letter}. $${o.text}`),
      correctAnswer: `${correctLetter}. $${correctOption.text}`,
      explanation: `Choice ${correctLetter} is correct. If the original system with coefficients satisfying the perpendicular condition is given, this option maintains that relationship through consistent transformation of coefficients. The slopes multiply to $-1$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 2d54c272
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 5, 45, total: 380]
 * - Difficulty factors: [Interpreting coefficients as point values in context]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Difference of coefficients gives answer]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */