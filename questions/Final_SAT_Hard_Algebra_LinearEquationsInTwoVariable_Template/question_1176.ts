import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1176
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1/den1, 1/den2 with den1,den2 in 3..9 (den1 != den2), constant c in 30..100]
 * - Difficulty factors: [Fraction coefficients, finding perpendicular slope]
 * - Distractor patterns: [-den2/den1 (slope of h), -den1/den2 (neg, no reciprocal), den2/den1 (neg of slope), den1/den2 (correct)]
 * - Constraints: [slope of h = -den2/den1; perpendicular slope = negative reciprocal = den1/den2]
 * - Question type: [Text -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * Guard: den1 != den2 guarantees all four options are numerically distinct
 * (the two positive options differ, the two negative options differ, and
 * positive vs negative never collide).
 */

export const generator_1176 = {
  metadata: {
    id: "1176",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Distinct denominators so the answer choices cannot collide.
    // FIXED (review): den1 and den2 could share a factor (4 and 8), so every
    // choice showed an unreduced fraction such as 8/4. They are now coprime,
    // which keeps all four slopes in lowest terms. The reasons for the two
    // middle choices were swapped (-den1/den2 IS the reciprocal with the sign
    // kept; den2/den1 changes the sign without taking the reciprocal).
    const gcd = (p: number, q: number): number => (q === 0 ? p : gcd(q, p % q));
    let den1 = 3, den2 = 4;
    do {
      den1 = getRandomInt(3, 9);
      den2 = getRandomInt(3, 9);
    } while (den1 === den2 || gcd(den1, den2) !== 1);

    const c = getRandomInt(30, 100);

    // Slope of h: -(1/den1) / (1/den2) = -den2/den1.
    // Perpendicular (line j) slope: negative reciprocal = den1/den2.

    const optionsData = [
      { text: `$-\\frac{${den2}}{${den1}}$`, isCorrect: false, reason: `$-\\frac{${den2}}{${den1}}$ is the slope of line $h$ itself, not of a line perpendicular to it` },
      { text: `$-\\frac{${den1}}{${den2}}$`, isCorrect: false, reason: `$-\\frac{${den1}}{${den2}}$ is the reciprocal of the slope of line $h$ without the change of sign` },
      { text: `$\\frac{${den2}}{${den1}}$`, isCorrect: false, reason: `$\\frac{${den2}}{${den1}}$ is the slope of line $h$ with its sign changed but without taking the reciprocal` },
      { text: `$\\frac{${den1}}{${den2}}$`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const displayOptions = shuffledOptions.map(o => ({ text: `${o.letter}. ${o.text}` }));

    return {
      questionText: `Line $h$ is defined by $\\frac{1}{${den1}}x+\\frac{1}{${den2}}y-${c}=0$. Line $j$ is perpendicular to line $h$ in the $xy$-plane. What is the slope of line $j$?`,
      figureCode: null,
      options: displayOptions,
      correctAnswer: correctOption ? `${correctOption.letter}. ${correctOption.text}` : "",
      explanation: `Choice ${correctLetter} is correct. To find the slope of line $h$, solve its equation for $y$. Subtracting $\\frac{1}{${den1}}x$ from both sides and adding $${c}$ to both sides gives $\\frac{1}{${den2}}y = -\\frac{1}{${den1}}x + ${c}$. Multiplying both sides by $${den2}$ gives $y = -\\frac{${den2}}{${den1}}x + ${den2 * c}$, so the slope of line $h$ is $-\\frac{${den2}}{${den1}}$. Perpendicular lines have slopes that are negative reciprocals of each other, so the slope of line $j$ is $\\frac{${den1}}{${den2}}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
