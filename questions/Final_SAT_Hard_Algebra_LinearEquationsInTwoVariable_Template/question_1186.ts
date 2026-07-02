import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1186
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [vertical line x=2]
 * - Difficulty factors: [Understanding perpendicular to vertical is horizontal]
 * - Distractor patterns: [A: 0 (correct), B: -1/2, C: -2, D: undefined]
 * - Constraints: [Horizontal line has slope 0]
 * - Question type: [Text → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1186 = {
  metadata: {
    id: "1186",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const xVal = getRandomInt(1, 10);
    
    const optionsData = [
      { text: "0", isCorrect: true },
      { text: `$-\\frac{1}{${xVal}}$`, isCorrect: false, reason: "incorrectly treats it as reciprocal slope" },
      { text: `-${xVal}`, isCorrect: false, reason: "confuses with negative of the x-value" },
      { text: "The slope of line $\\ell$ is undefined.", isCorrect: false, reason: "confuses perpendicular with parallel" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `Line $\\ell$ in the $xy$-plane is perpendicular to the line with equation $x = ${xVal}$. What is the slope of line $\\ell$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: `${o.letter}. ${o.text}` })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. The equation $x = ${xVal}$ represents a vertical line with undefined slope. A line perpendicular to a vertical line is horizontal, with slope 0. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
