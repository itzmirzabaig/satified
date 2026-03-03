import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 184ce5aa
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1/5, 1/7, -70]
 * - Difficulty factors: [Fraction coefficients, finding perpendicular slope]
 * - Distractor patterns: [A: -7/5, B: -5/7, C: 7/5, D: 5/7 (correct)]
 * - Constraints: [Negative reciprocal of -7/5 is 5/7]
 * - Question type: [Text → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_184ce5aa = {
  metadata: {
    // id: "184ce5aa",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const den1 = getRandomInt(3, 9);
    const den2 = getRandomInt(3, 9);
    const c = getRandomInt(30, 100);
    
    // Slope of h: -coeff_x / coeff_y = -(1/den1) / (1/den2) = -den2/den1
    const slopeH = -den2 / den1;
    
    // Perpendicular slope: den1/den2
    const slopeJ = den1 / den2;
    
    const optionsData = [
      { text: `$-\\frac{${den2}}{${den1}}$`, isCorrect: false, reason: "this is the slope of line h, not the perpendicular" },
      { text: `$-\\frac{${den1}}{${den2}}$`, isCorrect: false, reason: "has the negative but not the reciprocal" },
      { text: `$\\frac{${den2}}{${den1}}$`, isCorrect: false, reason: "this is the negative of the slope of h, not the reciprocal" },
      { text: `$\\frac{${den1}}{${den2}}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `Line $h$ is defined by $\\frac{1}{${den1}}x+\\frac{1}{${den2}}y-${c}=0$. Line $j$ is perpendicular to line $h$ in the $xy$-plane. What is the slope of line $j$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: `${o.letter}. ${o.text}` })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. Rewriting: $\\frac{1}{${den2}}y = -\\frac{1}{${den1}}x + ${c}$, so $y = -\\frac{${den2}}{${den1}}x + ${den2 * c}$. The slope of h is $-\\frac{${den2}}{${den1}}$. The perpendicular slope is $\\frac{${den1}}{${den2}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

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