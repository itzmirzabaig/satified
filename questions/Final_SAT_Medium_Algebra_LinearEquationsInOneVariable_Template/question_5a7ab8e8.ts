import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 5a7ab8e8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 66]
 * - Difficulty factors: [Understanding identity equations]
 * - Distractor patterns: [A thinks linear equations have one solution, B confuses with quadratic, D thinks it's a contradiction]
 * - Constraints: [ax = ax is true for all x]
 * - Question type: [Multiple Choice Text]
 */

export const generator_5a7ab8e8 = {
  metadata: {
    // id: "5a7ab8e8",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const coefficient = getRandomInt(10, 99);
    
    const correctText = "Infinitely many";
    const optionsData = [
      { text: "Exactly one", isCorrect: false },
      { text: "Exactly two", isCorrect: false },
      { text: "Infinitely many", isCorrect: true },
      { text: "Zero", isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    
    return {
      questionText: `$$${coefficient}x = ${coefficient}x$$ How many solutions does the given equation have?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The equation $$${coefficient}x = ${coefficient}x$$ is an identity—it is true for any value of $$x$$. Subtracting $$${coefficient}x$$ from both sides gives $$0 = 0$$, which is always true. Therefore, the equation has infinitely many solutions.`
    };
  }
};

/**
 * Question ID: 40049d49
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, 12, a=8]
 * - Difficulty factors: [Infinite solutions condition with fractions]
 * - Distractor patterns: [A gives one solution case, B/D don't match coefficients]
 * - Constraints: [For infinite solutions: 4 = a/2 and 12 = 3a/2, both give a=8]
 * - Question type: [Multiple Choice Text]
 */