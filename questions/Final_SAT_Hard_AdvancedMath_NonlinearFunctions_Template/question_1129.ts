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
    
    // Before: the negative difference r1 - r2 was not a plausible value of x, wrong
    // choices had no reasons, and correctAnswer did not match the option text.
    const sum = r1 + r2;

    const optionsData = [
      { text: `$${r2}$`, isCorrect: false, reason: `$${r2}$ is the larger zero of $f$, where $f(x)=0$, not where the minimum occurs` },
      { text: `$${midpoint}$`, isCorrect: true, reason: '' },
      { text: `$${r1}$`, isCorrect: false, reason: `$${r1}$ is the smaller zero of $f$, where $f(x)=0$, not where the minimum occurs` },
      { text: `$${sum}$`, isCorrect: false, reason: `$${sum}$ is the sum of the zeros, which results from forgetting to divide by $2$ when finding their midpoint` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x)=(x-${r1})(x-${r2})$. For what value of $x$ does $f(x)$ reach its minimum?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Since $f(x)=0$ when $x=${r1}$ and when $x=${r2}$, the graph of $y=f(x)$ has $x$-intercepts at these values. The coefficient of $x^2$ is positive, so the parabola opens upward and its minimum occurs at the vertex. A parabola is symmetric about the vertical line through its vertex, so the vertex lies halfway between the $x$-intercepts: $x=\\frac{${r1}+${r2}}{2}=\\frac{${sum}}{2}=${midpoint}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
