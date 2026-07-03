import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 276
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, intercept: 5-12 negative]
 * - Difficulty factors: [Constructing equation from m and b]
 * - Distractor patterns: [omitted intercept, incorrect intercept]
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

    // Render "mx + b" with a proper sign: "- |b|" when negative, dropped at 0.
    const buildEquation = (b: number): string => {
      if (b === 0) return `f(x) = ${slope}x`;
      return b > 0
        ? `f(x) = ${slope}x + ${b}`
        : `f(x) = ${slope}x - ${Math.abs(b)}`;
    };

    const correctEquation = buildEquation(intercept);

    // On-theme distractor candidates. Each carries the intercept it uses so the
    // rendered string matches its reason exactly.
    const candidates: { equation: string; reason: string }[] = [];
    // Omits the y-intercept entirely (uses only the slope).
    candidates.push({ equation: buildEquation(0), reason: "omits the y-intercept" });
    // Uses the opposite sign for the y-intercept.
    candidates.push({ equation: buildEquation(-intercept), reason: "uses the opposite sign for the y-intercept" });
    // Shifts the y-intercept by a small amount (a nearby but incorrect value).
    candidates.push({ equation: buildEquation(intercept + 1), reason: "uses an incorrect y-intercept" });
    candidates.push({ equation: buildEquation(intercept - 1), reason: "uses an incorrect y-intercept" });
    candidates.push({ equation: buildEquation(intercept + 2), reason: "uses an incorrect y-intercept" });

    // De-duplicate against the answer and each other; keep the first three.
    const used = new Set<string>([correctEquation]);
    const distractors: { equation: string; reason: string }[] = [];
    for (const cand of candidates) {
      if (!used.has(cand.equation)) {
        used.add(cand.equation);
        distractors.push(cand);
        if (distractors.length === 3) break;
      }
    }

    const optionsData = [
      { text: correctEquation, isCorrect: true, reason: "" },
      { text: distractors[0].equation, isCorrect: false, reason: distractors[0].reason },
      { text: distractors[1].equation, isCorrect: false, reason: distractors[1].reason },
      { text: distractors[2].equation, isCorrect: false, reason: distractors[2].reason }
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
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. In slope-intercept form $f(x) = mx + b$, the slope is $m = ${slope}$ and the $y$-intercept is $b = ${intercept}$ (the point $(0, ${intercept})$), which gives $${correctEquation}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
