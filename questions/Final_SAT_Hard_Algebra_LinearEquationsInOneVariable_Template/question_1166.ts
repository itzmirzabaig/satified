import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1166
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [6, 3, 13 (small integers)]
 * - Difficulty factors: [Recognizing x+6=0 is the only solution, value is 0]
 * - Distractor patterns: [B contains 0, others don't]
 * - Constraints: [x+6 must equal 0]
 * - Question type: [Equation→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1166 = {
  metadata: {
    id: "1166",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation of form (x+a)/b = (x+a)/c where b ≠ c
    // This forces x+a = 0, so x = -a
    
    // b in [2,5] and c in [6,15] are disjoint, so b !== c always holds and the
    // denominators genuinely differ — no retry needed. With different, nonzero
    // denominators, (x+a)/b = (x+a)/c forces x + a = 0.
    const a = getRandomInt(3, 10);
    const b = getRandomInt(2, 5);
    const c = getRandomInt(6, 15);

    // The value of x + a is 0. Exactly one pair of bounds brackets 0; the
    // three distractor pairs deliberately exclude 0. Each option carries its
    // numeric bounds so the explanation can be built from the SHUFFLED order
    // (its letters are only known after the shuffle).
    // Distractor pairs (all exclude 0):
    //   below zero:   [-a-3, -a-1]  (a >= 3  =>  high <= -4, both negative)
    //   above zero A: [2, 7]
    //   above zero B: [8, 13]
    const optionsData = [
      { low: -a - 3, high: -a - 1, isCorrect: false },
      { low: -2, high: 2, isCorrect: true },
      { low: 2, high: 7, isCorrect: false },
      { low: 8, high: 13, isCorrect: false }
    ].map(o => ({ ...o, text: `$${o.low}$ and $${o.high}$` }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    // Build the interval-check list in the exact shuffled order / letters.
    const intervalChecks = shuffledOptions.map(opt => {
      const inRange = opt.low < 0 && opt.high > 0;
      return `Choice ${opt.letter} ($${opt.low}$ and $${opt.high}$): $0$ ${inRange ? `is between $${opt.low}$ and $${opt.high}$` : 'is not in this range'}.`;
    }).join('\n');

    const explanation = `To solve the given equation $\\frac{x+${a}}{${b}} = \\frac{x+${a}}{${c}}$, let's consider the term $x+${a}$ as a single entity, say $y$. So, the equation becomes $\\frac{y}{${b}} = \\frac{y}{${c}}$.

Multiply both sides by the least common multiple of the denominators, which is $${b * c}$:
$${c}y = ${b}y$

Subtract $${b}y$ from both sides:
$${c - b}y = 0$

Divide by $${c - b}$:
$y = 0$

Substituting back $x+${a}$ for $y$, we find that the value of $x+${a}$ is $0$.

Now we check which pair of values brackets $0$:
${intervalChecks}

Therefore, the correct option is Choice ${correctLetter}.`;

    return {
      questionText: `If $\\frac{x+${a}}{${b}} = \\frac{x+${a}}{${c}}$, the value of $x+${a}$ is between which of the following pairs of values?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
