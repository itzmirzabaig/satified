import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 823
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 1/2 (simple fractions), result: single digit]
 * - Difficulty factors: [Simple substitution, elimination method]
 * - Distractor patterns: [close to correct value]
 * - Constraints: [Ensure clean arithmetic with fractions]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 *
 * System:
 *   (1/d) y = r1
 *   x - (1/d) y = r2
 * Adding the two equations eliminates y: x = r1 + r2.
 * All quantities are integers by construction (y = d*k so (1/d)y = k = r1).
 */

export const generator_823 = {
  metadata: {
    id: "823",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Choose a denominator and a clean y so that (1/d)*y is an integer.
    const d = getRandomInt(2, 5);            // denominator of the fractional coefficient
    const k = getRandomInt(2, 7);            // = (1/d) * y
    // r2 must differ from k so the "wrong variable" distractor cannot collide.
    let r2 = getRandomInt(2, 9);
    let guard = 0;
    while (r2 === k && guard++ < 50) r2 = getRandomInt(2, 9);
    if (r2 === k) r2 = k + 1;                // deterministic fallback

    const yValue = d * k;                    // clean: (1/d)*yValue = k
    const r1 = k;                            // right side of equation 1
    const xValue = r1 + r2;                  // solution for x (adding eliminates y)

    // STEP 2: Fraction label with the LIVE denominator.
    const frac = `\\frac{1}{${d}}`;

    // STEP 3: Build question text.
    const questionText = `$$\\begin{cases} ${frac}y=${r1} \\\\ x-${frac}y=${r2} \\end{cases}$$ \n\nThe system of equations above has solution $(x, y)$. What is the value of $x$?`;

    // STEP 4: Distractors (all integers, all distinct from the answer).
    //  - r2:        used only the second equation, forgot to add r1
    //  - r1:        reported the value of the y-term instead of x
    //  - 2*r1 + r2: added the first equation's value twice
    const correctText = xValue.toString();
    const distractors = [r2, r1, 2 * r1 + r2];

    const optionsData = [
      { text: distractors[0].toString(), isCorrect: false },
      { text: distractors[1].toString(), isCorrect: false },
      { text: distractors[2].toString(), isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    // STEP 5: Shuffle and assign letters (letters known only after shuffle).
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;

    // STEP 6: Return question data.
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. From the first equation, $${frac}y=${r1}$, so the $y$-term equals ${r1}. Adding the two equations eliminates $y$: $\\left(${frac}y\\right)+\\left(x-${frac}y\\right)=${r1}+${r2}$, which gives $x=${xValue}$. The value ${r2} comes from using only the second equation, ${r1} is the value of the $y$-term rather than $x$, and ${2 * r1 + r2} results from adding ${r1} twice.`
    };
  }
};
