import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 5ad9eff0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [width: w, length difference: 6]
 * - Difficulty factors: [Perimeter formula application with variables]
 * - Distractor patterns: [A is semi-perimeter + diff, C/D confuse with area]
 * - Constraints: [Perimeter = 2(length + width) = 2(w+6 + w) = 4w + 12]
 * - Question type: [Multiple Choice Text]
 */

export const generator_5ad9eff0 = {
  metadata: {
    // id: "5ad9eff0",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const diff = getRandomInt(4, 10);
    
    // Perimeter = 2(w + (w+diff)) = 2(2w + diff) = 4w + 2*diff
    const coefficient = 4;
    const constant = 2 * diff;
    
    const correctText = `$${coefficient}w+${constant}$`;
    const optionsData = [
      { text: `$${coefficient/2}w+${diff}$`, isCorrect: false },
      { text: `$${coefficient}w+${constant}$`, isCorrect: true },
      { text: `$w^2+${diff}$`, isCorrect: false },
      { text: `$w^2+${diff}w$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    
    const contexts = ["dance floor", "garden bed", "patio", "meeting room"];
    const context = getRandomElement(contexts);
    
    return {
      questionText: `The width of a rectangular ${context} is $w$ feet. The length of the ${context} is $${diff}$ feet longer than its width. Which of the following expresses the perimeter, in feet, of the ${context} in terms of $w$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The width is $w$ and the length is $w+${diff}$. The perimeter of a rectangle is $P=2(\\text{length}+\\text{width})=2(w + w + ${diff})=2(2w+${diff})=${coefficient}w+${constant}$.`
    };
  }
};

/**
 * Question ID: 45bba652
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 3, sum: 5, target: 10]
 * - Difficulty factors: [Solving for expression x-5]
 * - Distractor patterns: [B is the constant in the expression, C is x value, D is x+5]
 * - Constraints: [5(x-5) = 10, so x-5 = 2]
 * - Question type: [Multiple Choice Text]
 */