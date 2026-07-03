import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1238
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [prices: $5.50, $3.00, $6.50, $8.00, totals: $37, $66, answer: 5]
 * - Difficulty factors: [Word problem, two stores, system of two equations]
 * - Distractor patterns: [Raspberry quantity instead of blackberry, total pints]
 * - Constraints: [System must have integer solution]
 * - Question type: [Figure+Table→Multiple Choice Text]
 * - Figure generation: [Two lines intersecting]
 */

export const generator_1238 = {
  metadata: {
    id: "1238",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Answer-first construction: choose the integer solution (r raspberry pints,
    // b blackberry pints) and clean store prices, then derive the two totals so
    // the system is guaranteed consistent with a unique integer solution.
    let r = 0, b = 0;
    let r1 = 0, b1 = 0, r2 = 0, b2 = 0;
    let total1 = 0, total2 = 0;

    let tries = 0;
    let ready = false;
    while (!ready && tries++ < 50) {
      // r is even so a half-dollar raspberry price still yields whole totals.
      r = 2 * getRandomInt(1, 4);        // {2,4,6,8}
      b = getRandomInt(2, 8);            // {2..8}

      r1 = getRandomInt(4, 7) + 0.5;     // {4.5,5.5,6.5,7.5}
      b1 = getRandomInt(2, 4);           // {2,3,4}
      r2 = r1 + getRandomInt(1, 3);      // Store B raspberries cost more
      b2 = b1 + getRandomInt(3, 6);      // Store B blackberries cost more

      // Unique solution requires a nonzero determinant.
      const det = r1 * b2 - r2 * b1;
      if (det === 0) continue;

      // Distractor distinctness: {b, r, r+b, 2b} must be four different values.
      // Given r,b > 0, r+b differs from both r and b automatically, and
      // (r+b) === 2b iff r === b. So we only need r !== b and r !== 2b.
      if (r === b || r === 2 * b) continue;

      total1 = r1 * r + b1 * b;          // integer by construction
      total2 = r2 * r + b2 * b;          // integer by construction
      ready = true;
    }

    if (!ready) {
      // Deterministic clean fallback (satisfies every guard).
      r = 4; b = 3;
      r1 = 5.5; b1 = 2; r2 = 7.5; b2 = 6;
      total1 = r1 * r + b1 * b;          // 28
      total2 = r2 * r + b2 * b;          // 48
    }

    // Distractors (all provably distinct from the correct answer and each other):
    //   correct = b            (blackberry pints)
    //   r                      (answered raspberries instead)
    //   r + b                  (total pints purchased)
    //   2 * b                  (doubled the blackberry count)
    const optionsData = [
      { text: `${r}`, isCorrect: false },
      { text: `${b}`, isCorrect: true },
      { text: `${r + b}`, isCorrect: false },
      { text: `${2 * b}`, isCorrect: false },
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index),
    }));

    const letterOf = (val: number) =>
      shuffledOptions.find(o => o.text === `${val}`)!.letter;

    const correctLetter = letterOf(b);
    const rLetter = letterOf(r);
    const totalLetter = letterOf(r + b);
    const doubleLetter = letterOf(2 * b);

    // Currency stays escaped (\$) and OUTSIDE math so MathJax cannot pair it.
    const price = (p: number) => `\\$${p.toFixed(2)}`;

    return {
      questionText: `Store A sells raspberries for ${price(r1)} per pint and blackberries for ${price(b1)} per pint. Store B sells raspberries for ${price(r2)} per pint and blackberries for ${price(b2)} per pint. A certain purchase of raspberries and blackberries would cost ${price(total1)} at Store A or ${price(total2)} at Store B. How many pints of blackberries are in this purchase?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${b}`,
      explanation: `Let $r$ be the number of pints of raspberries and $b$ the number of pints of blackberries. The Store A cost gives $(${r1})r + (${b1})b = ${total1}$, and the Store B cost gives $(${r2})r + (${b2})b = ${total2}$. Solving this system (for example, by elimination) gives $r = ${r}$ and $b = ${b}$, and substituting back confirms both totals. So the purchase contains ${b} pints of blackberries, and Choice ${correctLetter} is correct. Choice ${rLetter} is the number of pints of raspberries, not blackberries. Choice ${totalLetter} is the total number of pints, $r + b = ${r + b}$. Choice ${doubleLetter} is twice the number of blackberry pints.`,
    };
  }
};
