import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 276
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, intercept: 5-12 negative]
 * - Difficulty factors: [Constructing equation from m and b]
 * - Distractor patterns: [no intercept, opposite sign intercept, slope and intercept reversed]
 * - Constraints: [None]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 *
 * Slope-intercept construction: pick slope m in [2,5] and a negative
 * y-intercept b in [-12,-5]. The correct equation is f(x) = mx + b, rendered
 * with a signed-term helper so a negative b prints as "- |b|" (never "+ -b")
 * and a zero constant is dropped. Because b is always strictly negative the
 * "omit the intercept" distractor (f(x) = mx) can never equal the answer.
 * Remaining distractors reuse candidate intercepts on the stated themes
 * (wrong sign, shifted value) and are de-duplicated against the answer and
 * each other so no two options ever collide for any draw.
 */

export const generator_276 = {
  metadata: {
    id: "276",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(2, 5);
    const intercept = -getRandomInt(5, 12); // strictly negative, in [-12,-5]

    const c = -intercept;
    const correctEquation = `f(x) = ${slope}x - ${c}`;

    // Every wrong choice is a real slip. The old third choice moved the
    // intercept by 1 or 2 ("an incorrect y-intercept").
    const optionsData = [
      { text: `$${correctEquation}$`, isCorrect: true, reason: '' },
      { text: `$f(x) = ${slope}x$`, isCorrect: false, reason: `its graph passes through $(0, 0)$, not $(0, ${intercept})$; it leaves out the $y$-intercept` },
      { text: `$f(x) = ${slope}x + ${c}$`, isCorrect: false, reason: `its graph passes through $(0, ${c})$, not $(0, ${intercept})$` },
      { text: `$f(x) = ${intercept}x + ${slope}$`, isCorrect: false, reason: `it reverses the slope and the $y$-coordinate of the $y$-intercept; its graph has a slope of $${intercept}$ and passes through $(0, ${slope})$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the function $f$, the graph of $y = f(x)$ in the $xy$-plane has a slope of $${slope}$ and passes through the point $(0, ${intercept})$. Which equation defines $f$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${correctEquation}$`,
      explanation: `Choice ${correctOption.letter} is correct. A linear function can be written in slope-intercept form, $f(x) = mx + b$, where $m$ is the slope of its graph and $(0, b)$ is its $y$-intercept. Since the slope is ${slope} and the graph passes through $(0, ${intercept})$, $m = ${slope}$ and $b = ${intercept}$, which gives $${correctEquation}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
