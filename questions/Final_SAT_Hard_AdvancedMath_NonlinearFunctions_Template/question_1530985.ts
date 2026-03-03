import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 1530985
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [vertex (-3, 6), one x-intercept (-17/4, 0)]
 * - Difficulty factors: [Quadratic symmetry, finding other root]
 * - Distractor patterns: [A: -29/4, B: -7/4, C: 5/4, D: 17/4]
 * - Constraints: [Other root is 2×(-3) - (-17/4) = -6 + 17/4 = -7/4]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1530985 = {
  metadata: {
    // id: "1530985",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const h = -getRandomInt(2, 6);
    const root1 = h - getRandomInt(2, 5) / 4;
    const root2 = 2 * h - root1;
    
    const r1_num = Math.round(root1 * 4);
    const r2_num = Math.round(root2 * 4);
    
    const optionsData = [
      { text: `$\\left(\\frac{${r1_num - 12}}{4}, 0\\right)$`, isCorrect: false },
      { text: `$\\left(\\frac{${r2_num}}{4}, 0\\right)$`, isCorrect: true },
      { text: `$\\left(\\frac{${r2_num + 12}}{4}, 0\\right)$`, isCorrect: false },
      { text: `$\\left(\\frac{${-r1_num}}{4}, 0\\right)$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `When quadratic $f$ is graphed, its vertex is $(${h}, ${getRandomInt(4, 10)})$. One x-intercept is $\\left(\\frac{${r1_num}}{4}, 0\\right)$. What is the other x-intercept?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$\\left(\\frac{${r2_num}}{4}, 0\\right)$`,
      explanation: `Choice ${correctLetter} is correct. The x-coordinate of the vertex is the midpoint of the x-intercepts. If the vertex is at $x=${h}$ and one intercept is at $x=\\frac{${r1_num}}{4}$, then the other is at $x=2(${h})-\\frac{${r1_num}}{4}=\\frac{${r2_num}}{4}$.`
    };
  }
};

/**
 * Question ID: 12345678
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [roots at -20, -4, vertex y-coordinate -64]
 * - Difficulty factors: [Finding vertex x-coordinate from roots]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [r = midpoint of roots = (-20 + -4)/2 = -12]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */