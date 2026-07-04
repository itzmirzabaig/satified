import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 943
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [part: 432, percent: 96%, whole: 450]
 * - Difficulty factors: [Finding the whole given the part and percentage]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [whole = part / (percent/100)]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [No figure]
 */

export const generator_943 = {
  metadata: {
    id: "943",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values.
    // Original: 432 is 96% of 450 ("part is percent% of whole?").
    // The answer to "part is percent% of what number?" is uniquely
    // part / (percent/100). To keep this exact (no rounding drift that would
    // make part/(percent/100) fail to recover the whole), pick a percent that
    // divides 100 evenly and a whole that is a multiple of that percent, so
    // part = percent% * whole is always an exact integer.
    const percent = getRandomElement([80, 85, 90, 92, 95, 96]); // clean high %
    // whole chosen so that (percent/100)*whole is an integer.
    // percent/100 = percent/100; part = percent*whole/100 integer requires
    // whole divisible by 100/gcd(percent,100).
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const step = 100 / gcd(percent, 100); // whole must be a multiple of this
    // Build a range of valid wholes in [200, 500] that are multiples of `step`.
    const wholeChoices: number[] = [];
    for (let w = Math.ceil(200 / step) * step; w <= 500; w += step) {
      wholeChoices.push(w);
    }
    const whole = getRandomElement(wholeChoices);

    // part is exact by construction.
    const part = (percent * whole) / 100;

    // STEP 2: Answer is a LIVE computation from the displayed values.
    // x = part / (percent/100). Guard that it recovers the whole exactly.
    const answer = Math.round(part / (percent / 100));
    const correctAnswer = answer.toString();

    // Decimal form of the percent for the explanation (e.g. 0.95, 0.8).
    const decimal = (percent / 100).toString();

    // STEP 3: Return question data
    return {
      questionText: `${part} is ${percent}% of what number?`,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. Let x represent the number that ${part} is ${percent}% of. This can be written as \\( \\frac{${percent}}{100}x = ${part} \\), or \\( ${decimal}x = ${part} \\). Dividing both sides of this equation by ${decimal} yields \\( x = ${correctAnswer} \\). Therefore, ${part} is ${percent}% of ${correctAnswer}.`
    };
  }
};
