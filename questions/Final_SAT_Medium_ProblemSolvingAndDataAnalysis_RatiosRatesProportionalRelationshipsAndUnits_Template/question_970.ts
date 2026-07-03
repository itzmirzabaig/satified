import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 970
 *
 * ANALYSIS:
 * - Skill: Ratios, Rates, and Proportional Relationships (Interpreting Expressions)
 * - Logic: If Earnings(h) = r * h, then Earnings(k * h) = r * (k * h) = k * (r * h).
 * - Fixes:
 *   1. All math expressions wrapped in '$' for proper rendering.
 *   2. Clean money values (increments of $0.25).
 *   3. Currency symbols escaped as \\$ in prose.
 *   4. Distractor reasons are template literals (live multiplier interpolated).
 *   5. Generic role ("a worker" / "she") instead of a personal name.
 */

export const generator_970 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate clean random values.
    // Hourly rate: $8.00 - $25.00, in increments of $0.25.
    const rateDollars = getRandomInt(8, 25);
    const rateQuarter = getRandomInt(0, 3) * 25; // 0, 25, 50, 75
    const rate = parseFloat(`${rateDollars}.${rateQuarter.toString().padStart(2, '0')}`);
    const rateStr = rate.toFixed(2); // e.g. "12.50" — used as a string throughout

    // Multiplier for the variable (e.g. works 3z hours).
    const multiplier = getRandomInt(2, 5);

    // STEP 2: Define expressions.
    // Base earnings for z hours: rate * z.
    const baseExpression = `${rateStr}z`;

    // Target earnings for (multiplier * z) hours: multiplier * (rate * z).
    // Formatted as k(rz) to emphasize the scaling property.
    const correctExpression = `${multiplier}(${baseExpression})`;

    // STEP 3: Create distractors (each a distinct expression; none equals
    // the correct scaling expression for any rate/multiplier draw).
    // Distractor 1: additive on the input -> rate * (z + k).
    const distractorInputAdd = `${rateStr}(z + ${multiplier})`;
    // Distractor 2: additive on the output -> (rate * z) + k.
    const distractorOutputAdd = `${baseExpression} + ${multiplier}`;
    // Distractor 3: improperly summed terms -> k*z + rate*z.
    const distractorCombine = `${multiplier}z + ${baseExpression}`;

    const optionsData = [
      { text: `$${correctExpression}$`, isCorrect: true },
      { text: `$${distractorOutputAdd}$`, isCorrect: false, reason: `adds the number ${multiplier} as a flat bonus instead of multiplying the number of hours by ${multiplier}` },
      { text: `$${distractorCombine}$`, isCorrect: false, reason: `adds two separate terms as if hours and dollars per hour could be summed together` },
      { text: `$${distractorInputAdd}$`, isCorrect: false, reason: `represents working $(z + ${multiplier})$ hours instead of ${multiplier} times $z$ hours` }
    ];

    // STEP 4: Shuffle.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 5: Return data.
    return {
      questionText: `A worker earns \\$${rateStr} per hour at a part-time job. When she works $z$ hours, she earns $(${baseExpression})$ dollars. Which of the following expressions gives the amount, in dollars, she will earn if she works $(${multiplier}z)$ hours?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The amount earned equals the hourly rate times the number of hours worked. At a rate of \\$${rateStr} per hour for $(${multiplier}z)$ hours, the earnings are $(${rateStr} \\times ${multiplier}z)$, which can be rewritten by factoring out the ${multiplier} as $(${multiplier}(${baseExpression}))$ dollars. This is ${multiplier} times the amount she earns in $z$ hours. Choice ${incorrectOptions[0].letter} is incorrect because it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because it ${incorrectOptions[2].reason}.`
    };
  }
};
