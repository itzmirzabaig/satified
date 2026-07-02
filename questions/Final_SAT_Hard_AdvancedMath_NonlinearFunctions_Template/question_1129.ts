import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1129
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [roots: 44, 46]
 * - Difficulty factors: [Quadratic in factored form, vertex/minimum]
 * - Distractor patterns: [A: 46 (root), B: 45 (correct), C: 44 (root), D: -1 (difference)]
 * - Constraints: [Minimum is at midpoint of roots]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1129 = {
  metadata: {
    id: "1129",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // f(x) = (x-r1)(x-r2), minimum at midpoint (r1+r2)/2
    
    const r1 = getRandomInt(10, 40);
    const r2 = r1 + getRandomInt(2, 10);
    const midpoint = (r1 + r2) / 2;
    
    const optionsData = [
      { text: `$${r2}$`, isCorrect: false },
      { text: `$${midpoint}$`, isCorrect: true },
      { text: `$${r1}$`, isCorrect: false },
      { text: `$${r1 - r2}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `The function $f$ is defined by $f(x)=(x-${r1})(x-${r2})$. For what value of $x$ does $f(x)$ reach its minimum?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: midpoint.toString(),
      explanation: `Choice ${correctLetter} is correct. The x-intercepts are at $x=${r1}$ and $x=${r2}$. Since the parabola opens upward, the minimum occurs at the vertex, which is at the midpoint: $x=\\frac{${r1}+${r2}}{2}=${midpoint}$.`
    };
  }
};
