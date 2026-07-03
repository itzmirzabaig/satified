import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1450
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 201%]
 * - Difficulty factors: [Converting percentage to decimal, recognizing linear vs exponential]
 * - Distractor patterns: [Decreasing exponential (wrong direction), decreasing linear (wrong direction), increasing exponential (wrong model type)]
 * - Constraints: [201% = 2.01, f(x) = 2.01x is linear with positive slope]
 * - Question type: [Conceptual (NO FIGURE)→Multiple Choice Text]
 * - Figure generation: [None - conceptual question]
 *
 * FIXED:
 * - Distractor reasons are now template literals (previously plain strings, so
 *   ${decimal}/${percent} leaked as literal text — TEMPLATE_LEFTOVER).
 * - Reasons rephrased as self-contained clauses so the explanation reads
 *   correctly regardless of shuffle order.
 * - Corrected \frac escaping (single backslash at runtime).
 */

export const generator_1450 = {
  metadata: {
    id: "1450",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate the percentage (over 100% ⇒ positive slope > 1).
    const percentBase = getRandomInt(110, 290);
    const percent = percentBase % 10 === 0 ? percentBase + 1 : percentBase; // avoid round multiples of 10
    const decimal = (percent / 100).toFixed(2);

    // STEP 2: Build options. Reasons are template literals so live values interpolate.
    const optionsData = [
      {
        text: "Decreasing exponential",
        isCorrect: false,
        reason: `describes a function whose values shrink, but multiplying $x$ by the positive constant ${decimal} makes the values grow`
      },
      {
        text: "Decreasing linear",
        isCorrect: false,
        reason: `describes a line with negative slope, but the slope here is ${decimal}, which is positive, so $f$ increases`
      },
      {
        text: "Increasing exponential",
        isCorrect: false,
        reason: `matches the function $f(x)=(${decimal})^{x}$, where each output is ${percent}% of the previous output rather than ${percent}% of $x$`
      },
      {
        text: "Increasing linear",
        isCorrect: true,
        reason: ``
      }
    ];

    // STEP 3: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 4: Return question data (no figure).
    return {
      questionText: `For $x > 0$, the function $f$ is defined so that $f(x)$ equals ${percent}% of $x$. Which of the following best describes the function $f$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "Increasing linear",
      explanation: `Choice ${correctLetter} is correct. Because $f(x)$ is ${percent}% of $x$ for $x>0$, this is equivalent to $f(x)=\\frac{${percent}}{100}x$, or $f(x)=${decimal}x$. As $x$ increases, $f(x)$ also increases, so $f$ is increasing. Moreover, $f(x)$ changes at the constant rate of ${decimal} for every increase of 1 in $x$, and a constant rate of change means the function is linear. Therefore $f$ is an increasing linear function. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
