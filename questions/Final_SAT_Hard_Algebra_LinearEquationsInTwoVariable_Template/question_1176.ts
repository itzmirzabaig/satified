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
    const den1 = getRandomInt(3, 9);
    let den2 = getRandomInt(3, 9);
    let tries = 0;
    while (den2 === den1 && tries++ < 50) den2 = getRandomInt(3, 9);
    if (den2 === den1) den2 = den1 === 9 ? 8 : den1 + 1; // fallback: force distinct

    const c = getRandomInt(30, 100);

    // Slope of h: -(1/den1) / (1/den2) = -den2/den1.
    // Perpendicular (line j) slope: negative reciprocal = den1/den2.

    const optionsData = [
      { text: `$-\\frac{${den2}}{${den1}}$`, isCorrect: false, reason: "is the slope of line $h$ itself, not of a perpendicular line" },
      { text: `$-\\frac{${den1}}{${den2}}$`, isCorrect: false, reason: "keeps the negative sign but forgets to take the reciprocal" },
      { text: `$\\frac{${den2}}{${den1}}$`, isCorrect: false, reason: "flips the sign of the slope of $h$ instead of taking the negative reciprocal" },
      { text: `$\\frac{${den1}}{${den2}}$`, isCorrect: true }
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
      explanation: `Choice ${correctLetter} is correct. Solving line $h$ for $y$: $\\frac{1}{${den2}}y = -\\frac{1}{${den1}}x + ${c}$, so $y = -\\frac{${den2}}{${den1}}x + ${den2 * c}$. The slope of line $h$ is $-\\frac{${den2}}{${den1}}$. A perpendicular line has the negative reciprocal slope, which is $\\frac{${den1}}{${den2}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
