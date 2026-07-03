import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 681
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 18, 9 (small integers)]
 * - Difficulty factors: [Converting standard form to slope-intercept, finding perpendicular slope]
 * - Distractor patterns: [A: slope of p, B: reciprocal without sign fix, C: correct answer, D: negation of slope]
 * - Constraints: [Ensure clean integer division for slope]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_681 = {
  metadata: {
    id: "681",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Line p: a*y + b*x = c  with  b = a*slope, so y = -slope*x + c/a.
    // Slope of p is -slope (a negative integer for slope in [2,12]).
    // Line r is perpendicular, so its slope is the negative reciprocal of
    // -slope, which is +1/slope.
    const a = getRandomInt(1, 5);
    const slope = getRandomInt(2, 12);
    const b = a * slope; // guarantees clean division when dividing by a

    let c = getRandomInt(1, 20);
    // Keep the y-intercept c/a from reducing to a whole number so the
    // slope-intercept form clearly shows a fraction (purely cosmetic; the
    // answer only depends on the slope). Bounded retry + fallback.
    let tries = 0;
    while (a !== 1 && c % a === 0 && tries++ < 50) {
      c = getRandomInt(1, 20);
    }
    if (a !== 1 && c % a === 0) c = a + 1; // (a+1) % a === 1 for a >= 2

    // Options.
    // Correct: perpendicular slope = 1/slope.
    // Distractor "slope of p": -slope.
    // Distractor "reciprocal, wrong sign": -1/slope.
    // Distractor "negation of slope of p": slope.
    // For slope in [2,12] these are, respectively, a value in (0, 1/2],
    // a negative integer, a value in [-1/2, 0), and a positive integer —
    // all four are numerically distinct for every draw.
    const optionsData = [
      { text: `$-${slope}$`, isCorrect: false, reason: `is the slope of line \\( p \\) itself, not the negative reciprocal.` },
      { text: `$-\\frac{1}{${slope}}$`, isCorrect: false, reason: `is the reciprocal of the slope of line \\( p \\) but keeps the wrong sign.` },
      { text: `$\\frac{1}{${slope}}$`, isCorrect: true, reason: '' },
      { text: `$${slope}$`, isCorrect: false, reason: `is the negation of the slope of line \\( p \\), not its negative reciprocal.` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Interpolated y-intercept: a whole number when a === 1, else a fraction.
    const interceptTeX = a === 1 ? `${c}` : `\\frac{${c}}{${a}}`;

    const explanation = `Choice ${correctLetter} is correct. The equation of line \\( p \\) is \\( ${a}y+${b}x=${c} \\). Rewrite it in slope-intercept form \\( y=mx+b \\). Subtract \\( ${b}x \\) from both sides: \\( ${a}y=-${b}x+${c} \\). Divide every term by \\( ${a} \\): \\( y=-${slope}x+${interceptTeX} \\). So the slope of line \\( p \\) is \\( -${slope} \\). Line \\( r \\) is perpendicular to line \\( p \\), so its slope is the negative reciprocal of \\( -${slope} \\): \\( -\\frac{1}{-${slope}}=\\frac{1}{${slope}} \\). Therefore the slope of line \\( r \\) is \\( \\frac{1}{${slope}} \\). ${incorrectOptions.map(opt => `Choice ${opt.letter} is incorrect; it ${opt.reason}`).join(' ')}`;

    return {
      questionText: `Line \\( p \\) is defined by \\( ${a}y+${b}x=${c} \\). Line \\( r \\) is perpendicular to line \\( p \\) in the \\( xy \\)-plane. What is the slope of line \\( r \\)?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
