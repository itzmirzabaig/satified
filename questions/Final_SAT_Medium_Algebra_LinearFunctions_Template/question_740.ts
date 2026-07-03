import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 740 (620fe971_part2 for the actual question)
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 120, rate: 25, equation y = 120 - 25x]
 * - Difficulty factors: [Interpreting x-intercept in context]
 * - Distractor patterns: [B = rate misinterpretation, C = rate value, D = y-intercept]
 * - Constraints: [None - conceptual interpretation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_740 = {
  metadata: {
    id: "740",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (answer-first: guarantees a clean, integer
    // x-intercept with no retry loop). Pick the whole-hour x-intercept and the
    // hourly rate, then derive the starting amount so y = initial - rate*x hits
    // y = 0 exactly at x = xIntercept.
    const xIntercept = getRandomInt(4, 6);   // whole hours until cargo is cleared
    const rate = getRandomInt(17, 30);       // tons moved per hour (the slope)
    const initial = rate * xIntercept;       // starting tons; lands in [68, 180]
    // Because rate >= 17 and xIntercept <= 6, rate can never equal xIntercept,
    // so the two "tons per hour" distractors below can never read the same.

    // STEP 2: Create options
    const correctText = `The team will have moved all the cargo in about ${xIntercept} hours.`;
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `The team has been moving about ${xIntercept} tons of cargo per hour.`, isCorrect: false, reason: "reads the x-intercept as a rate, but a rate is the slope, not an intercept" },
      { text: `The team has been moving about ${rate} tons of cargo per hour.`, isCorrect: false, reason: "gives the rate (the slope) from the equation, not the x-intercept" },
      { text: `The team started with ${initial} tons of cargo to move.`, isCorrect: false, reason: "describes the starting amount, which is the y-intercept" }
    ];

    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // STEP 4: Return question data
    return {
      questionText: `A team of workers has been moving cargo off of a ship. The equation $y = ${initial} - ${rate}x$ models the approximate number of tons of cargo, $y$, that remains to be moved $x$ hours after the team started working. The graph of this equation in the $xy$-plane is a line. What is the best interpretation of the $x$-intercept in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The $x$-intercept occurs when $y = 0$, meaning 0 tons of cargo remain. This represents the time when all cargo has been moved. Substituting $y = 0$ into $y = ${initial} - ${rate}x$ gives $x = ${xIntercept}$ hours. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
