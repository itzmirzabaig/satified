import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1067
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quadratic with b=-2, c=-9, discriminant gives 40 under radical]
 * - Difficulty factors: [Quadratic formula, simplifying radical, identifying k in form 1+√k]
 * - Distractor patterns: [k-1 = forgot to add 1 when completing the square, 2k = sqrt(4k)/2 taken as sqrt(2k), 4k = left 1 + sqrt(4k)]
 * - Constraints: [Discriminant must be positive but not perfect square, must simplify to form with √k where k is square-free]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1067 = {
  metadata: {
    id: "1067",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Equation x^2 - 2x + (1-k) = 0 has solutions 1 +/- sqrt(k).
    // Fix: before, k could be the perfect square 9 (then 1 + sqrt(9) is just 4),
    // two choices were floor(k/2) and 2k with made up reasons ("might result from
    // dividing the correct value by 2"), the reasons did not follow the
    // "Choice X is incorrect because" form, and they were printed on separate
    // lines. Now k is never a perfect square and every wrong choice is a real slip:
    //  - k-1: completing the square without adding 1 to the right side
    //  - 2k: simplifying sqrt(4k)/2 as sqrt(4k/2)
    //  - 4k: dividing only the 2 by 2, leaving 1 + sqrt(4k)
    const pool = [5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20];
    const k = pool[getRandomInt(0, pool.length - 1)];
    const b = -2;
    const c = 1 - k; // always negative
    const discriminant = 4 * k;

    const optionsData = [
      { text: `${k - 1}`, isCorrect: false, reason: `${k - 1} results from completing the square without adding 1 to both sides, writing $(x-1)^2=${k - 1}$ instead of $(x-1)^2=${k}$` },
      { text: `${k}`, isCorrect: true, reason: '' },
      { text: `${2 * k}`, isCorrect: false, reason: `${2 * k} results from simplifying $\\frac{\\sqrt{${discriminant}}}{2}$ as $\\sqrt{\\frac{${discriminant}}{2}}=\\sqrt{${2 * k}}$; moving the 2 inside the radical requires dividing by 4, not 2` },
      { text: `${4 * k}`, isCorrect: false, reason: `${4 * k} results from dividing only the 2 by 2 in $\\frac{2+\\sqrt{${discriminant}}}{2}$, which gives $1+\\sqrt{${discriminant}}$ instead of $1+\\sqrt{${k}}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. By the quadratic formula with $a=1$, $b=${b}$, and $c=${c}$, the solutions are $x=\\frac{2\\pm\\sqrt{(${b})^2-4(1)(${c})}}{2}=\\frac{2\\pm\\sqrt{${discriminant}}}{2}$. Since $\\sqrt{${discriminant}}=\\sqrt{4}\\cdot\\sqrt{${k}}=2\\sqrt{${k}}$, this is $\\frac{2\\pm2\\sqrt{${k}}}{2}=1\\pm\\sqrt{${k}}$. One solution is $1+\\sqrt{${k}}$, so $k=${k}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `One solution to the given equation can be written as $1 + \\sqrt{k}$, where $k$ is a constant. What is the value of $k$?\n\n$x^2 - 2x - ${-c} = 0$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: `$${o.text}$` })),
      correctAnswer: String(k),
      explanation: explanation
    };
  }
};
