import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1049
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [simple linear and quadratic system, intersection points]
 * - Difficulty factors: [System with parabola and line, solving by substitution, involves radicals]
 * - Distractor patterns: [Other radical combinations, sign errors]
 * - Constraints: [k must not be a perfect square so radicals stay irrational]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1049 = {
  metadata: {
    id: "1049",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // System: x - y = 1 and x + y = x^2 - k.
    // Substituting x = y + 1 into the second equation:
    //   (y+1) + y = (y+1)^2 - k  =>  2y + 1 = y^2 + 2y + 1 - k  =>  y^2 = k.
    // Solutions: (1 + sqrt(k), sqrt(k)) and (1 - sqrt(k), -sqrt(k)).
    // k is not a perfect square, so every radical stays irrational.
    //
    // Before: the answer was always the + root, the stem said "the system of
    // equations above", two distractors (sqrt(2k) and a "mixed up pattern")
    // were not real slips, and the reasons were vague. Now the root (+ or -)
    // is randomized and each distractor is a named slip:
    //   (s*r, -s*r)      pairs the two y values as an ordered pair
    //   (1 - s*r, s*r)   solves x - y = 1 as x = 1 - y
    //   (s*r, s*r - 1)   assigns sqrt(k) to x instead of to y
    // None of them satisfies the system (checked for both signs, k >= 2).
    const finalK = getRandomElement([2, 3, 5, 6, 7, 10, 11]);
    const s = getRandomElement([1, -1]);
    const r = `\\sqrt{${finalK}}`;
    const sr = s === 1 ? r : `-${r}`;           // y value of the answer
    const negSr = s === 1 ? `-${r}` : r;        // the other y value
    const onePlus = s === 1 ? `1+${r}` : `1-${r}`;   // 1 + s*r
    const oneMinus = s === 1 ? `1-${r}` : `1+${r}`;  // 1 - s*r

    const correctText = `$(${onePlus}, ${sr})$`;
    const pairYs = `$(${sr}, ${negSr})$`;
    const wrongIsolate = `$(${oneMinus}, ${sr})$`;
    const swappedRoot = `$(${sr}, ${sr}-1)$`;

    const optionsData = [
      { text: correctText, isCorrect: true, reason: "" },
      { text: pairYs, isCorrect: false, reason: `${pairYs} uses the two values of $y$, $${r}$ and $-${r}$, as the two coordinates; but $x - y = 1$ requires $x = y + 1$` },
      { text: wrongIsolate, isCorrect: false, reason: `${wrongIsolate} results from solving $x - y = 1$ as $x = 1 - y$ instead of $x = y + 1$; this pair gives $x - y = ${s === 1 ? `1-2${r}` : `1+2${r}`}$, not $1$` },
      { text: swappedRoot, isCorrect: false, reason: `${swappedRoot} results from giving the value $${sr}$ to $x$ instead of to $y$; it satisfies $x - y = 1$, but $x + y = ${s === 1 ? `2${r}-1` : `-2${r}-1`}$ while $x^2 - ${finalK} = 0$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. From the first equation, $x = y + 1$. Substituting into the second equation gives $(y+1) + y = (y+1)^2 - ${finalK}$. Expanding the right side gives $2y + 1 = y^2 + 2y + 1 - ${finalK}$. Subtracting $2y + 1$ from both sides leaves $y^2 - ${finalK} = 0$, so $y = ${r}$ or $y = -${r}$. When $y = ${sr}$, the first equation gives $x = ${onePlus}$, so $(${onePlus}, ${sr})$ is a solution of the system. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `$x - y = 1$\n$x + y = x^2 - ${finalK}$\n\nWhich ordered pair is a solution to the given system of equations?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
