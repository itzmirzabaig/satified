import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 583
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 15000, growth rate: 4%, p = 15000(1.04)^x]
 * - Difficulty factors: [Exponential growth, percentage to growth factor]
 * - Distractor patterns: [A/B: swapped structure, C: decay instead of growth]
 * - Constraints: [Growth factor = 1 + 0.04 = 1.04]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - word problem]
 *
 * FIXED:
 * - Distractor reason was a plain double-quoted string, so "${rate}" leaked
 *   literally into the explanation (TEMPLATE_LEFTOVER) and its stray "$"
 *   made the explanation's math-$ count odd (TEX_UNBALANCED). Reasons are
 *   template literals now.
 * - Plain numerals (population, percentages, factors) moved out of math
 *   mode so no unescaped "$" is followed by a digit (DOLLAR_RISK).
 * - Growth/decay factors built with toFixed(2) once and reused everywhere,
 *   commas rendered as {,} inside math mode, exponent written ^x with the
 *   \leq constraint using a single-backslash TeX command.
 * - Replaced the place name with a generic "a certain town".
 */

export const generator_583 = {
  metadata: {
    id: "583",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Randomize: initial population (10000-20000), growth rate (3-6%).
    const initial = getRandomInt(10, 20) * 1000;
    const rate = getRandomInt(3, 6);
    const growthStr = (1 + rate / 100).toFixed(2); // "1.03".."1.06"
    const decayStr = (1 - rate / 100).toFixed(2);  // "0.97".."0.94" — never equals growthStr
    const initialProse = initial.toLocaleString('en-US');            // e.g. "15,000"
    const initialTex = initialProse.replace(/,/g, '{,}');            // e.g. "15{,}000"

    const questionText = `A model predicts that the population of a certain town was ${initialProse} in 2005. The model also predicts that each year for the next 5 years, the population $p$ increased by ${rate}% of the previous year's population. Which equation best represents this model, where $x$ is the number of years after 2005 and $x \\leq 5$?`;

    const optionsData = [
      { text: `$p = ${decayStr}(${initialTex})^x$`, isCorrect: false, reason: `reverses the roles of the initial population and the base of the exponent, and uses a decay factor instead of a growth factor` },
      { text: `$p = ${growthStr}(${initialTex})^x$`, isCorrect: false, reason: `reverses the roles of the initial population and the base of the exponent` },
      { text: `$p = ${initialTex}(${decayStr})^x$`, isCorrect: false, reason: `uses the base ${decayStr}, which would model a ${rate}% decrease each year, not a ${rate}% increase` },
      { text: `$p = ${initialTex}(${growthStr})^x$`, isCorrect: true, reason: `` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const correctAnswer = correctOption.text;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. An exponential growth model can be written as $p = a(b)^x$, where $a$ is the initial population and $b$ is the growth factor for each year. The model predicts the population was ${initialProse} in 2005, so the initial value is ${initialProse}. Because the population increases by ${rate}% each year, each year's population is ${100 + rate}% of the previous year's population, so the growth factor is $b = ${growthStr}$. Therefore, the equation $p = ${initialTex}(${growthStr})^x$ best represents the model. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
