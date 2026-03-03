import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: a7a14e87
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [line k: x+y=0 (slope -1), y-intercept: 3]
 * - Difficulty factors: [Finding perpendicular line equation with given y-intercept]
 * - Distractor patterns: [A: x+y=3, B: x+y=-3, C: x-y=3, D: x-y=-3 (correct)]
 * - Constraints: [Perpendicular to slope -1 is slope 1]
 * - Question type: [Text → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_a7a14e87 = {
  metadata: {
    // id: "a7a14e87",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const b = getRandomInt(2, 6);
    const yInt = getRandomInt(2, 6);
    
    // Line k: x + by = 0 => y = -x/b, slope = -1/b
    // Perpendicular slope = b
    // Line j: y = bx + yInt => bx - y = -yInt or -bx + y = yInt
    
    // For simplicity, use original pattern: x + y = 0, perpendicular has slope 1
    const slopeK = -1; // from x + y = 0
    const slopeJ = 1; // perpendicular
    
    const optionsData = [
      { text: `$x+y=${yInt}$`, isCorrect: false, reason: "has the same slope as line k" },
      { text: `$x+y=-${yInt}$`, isCorrect: false, reason: "has the same slope as line k with wrong intercept" },
      { text: `$x-y=${yInt}$`, isCorrect: false, reason: "has the correct slope but wrong intercept sign" },
      { text: `$x-y=-${yInt}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `In the $xy$-plane, line $k$ is defined by $x+y=0$. Line $j$ is perpendicular to line $k$, and the $y$ intercept of line $j$ is $(0,${yInt})$. Which of the following is an equation of line $j$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: `${o.letter}. ${o.text}` })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. Line $k$ has slope $-1$. A perpendicular line has slope $1$ (negative reciprocal). With y-intercept $(0,${yInt})$, the equation is $y = x + ${yInt}$, which gives $x - y = -${yInt}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 9f70fd47
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 3/7, -5/9, constant: 21]
 * - Difficulty factors: [Finding y-intercept with fraction coefficients]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Set x=0, solve for y]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */