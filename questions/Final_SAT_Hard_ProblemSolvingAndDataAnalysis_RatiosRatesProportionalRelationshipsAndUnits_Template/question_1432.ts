import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1432
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [first batch: 2 blue, 3 yellow, second batch: 5 blue]
 * - Difficulty factors: [Ratio reasoning, abstract relationship vs concrete calculation]
 * - Distractor patterns: [A: exactly the blue amount, B: additive error, C: right multiplier / wrong reference]
 * - Constraints: [Correct answer: (yellow/blue) times the second batch's blue amount]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_1432 = {
  metadata: {
    id: "1432",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate ratio values and the scale factor together, then guard so
    // that NO distractor can describe the same amount as the correct answer for
    // this draw. Two collisions are possible and both are excluded here:
    //   - yellow1 === blue1  -> multiplier is 1 (trivial) and "Exactly blue2" ties.
    //   - yellow1 === k*blue1 -> the "wrong reference" distractor
    //       (multiplier x first-batch yellow) = (yellow1/blue1)*yellow1 = k*yellow1,
    //       which equals the correct required amount (a semantic double-correct).
    // The additive distractor is constructed below to be collision-proof by design,
    // so only these two conditions need a redraw.
    let blue1 = getRandomInt(2, 4);
    let yellow1 = getRandomInt(3, 6);
    let k = getRandomInt(2, 3);
    let guard = 0;
    while ((yellow1 === blue1 || yellow1 === k * blue1) && guard++ < 50) {
      blue1 = getRandomInt(2, 4);
      yellow1 = getRandomInt(3, 6);
      k = getRandomInt(2, 3);
    }
    // Deterministic fallback (a known-valid config) in the astronomically unlikely
    // event the bounded loop never lands a clean draw.
    if (yellow1 === blue1 || yellow1 === k * blue1) { blue1 = 2; yellow1 = 5; k = 3; }

    // Make the second batch a whole-number multiple of the first so every concrete
    // amount in the explanation is an integer (no float artifacts).
    const blue2 = blue1 * k;          // 4 .. 12, always a multiple of blue1
    const yellow2 = yellow1 * k;      // integer yellow needed for the second batch

    // The additive-error a student makes by adding to the first-batch yellow the
    // SAME number of extra ounces that the blue paint increased by (blue2 - blue1).
    // The amount it describes is yellow1 + (blue2 - blue1); this can only equal the
    // correct amount k*yellow1 when blue1 === yellow1, which is already excluded
    // above, so this distractor never becomes a second correct answer.
    const blueIncrease = blue2 - blue1;

    // The multiplier yellow:blue is written EXACTLY as a fraction, so no rounding
    // is ever needed and no decimal artifact can appear.
    const multiplier = `\\frac{${yellow1}}{${blue1}}`;

    // STEP 4: Create and shuffle options. Every distractor describes a numeric
    // amount that is guaranteed (by the guard + construction above) to differ from
    // the correct required amount for this draw, so no two options can be correct.
    const correctText = `$${multiplier}$ times the amount of blue paint used in the second batch`;
    const optionsData = [
      { text: `Exactly $${blue2}$ ounces`, isCorrect: false, reason: "confuses the amount of blue paint in the second batch with the required amount of yellow paint" },
      { text: `$${blueIncrease}$ ounces more than the amount of yellow paint used in the first batch`, isCorrect: false, reason: "adds the same increase as the blue paint instead of scaling by the ratio" },
      { text: `$${multiplier}$ times the amount of yellow paint used in the first batch`, isCorrect: false, reason: "applies the correct multiplier to the wrong quantity, the first batch's yellow amount" },
      { text: correctText, isCorrect: true, reason: "" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Every math segment below begins with a backslash command (never a bare
    // "$<digit>"), so the explanation avoids the DOLLAR_RISK currency heuristic.
    const explanation = `Choice ${correctLetter} is correct. In the first batch the amount of yellow paint is $${multiplier}$ times the amount of blue paint, since $\\frac{\\text{yellow}}{\\text{blue}} = \\frac{${yellow1}}{${blue1}}$. The second batch uses the same ratio with $\\text{${blue2}}$ ounces of blue paint, so the amount of yellow paint should be $\\frac{${yellow1}}{${blue1}} \\times ${blue2} = ${yellow2}$ ounces, which is $${multiplier}$ times the amount of blue paint used in the second batch. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `An artist created a batch of green paint by mixing $${blue1}$ ounces of blue paint with $${yellow1}$ ounces of yellow paint. They must mix a second batch using the same ratio of blue paint to yellow paint as the first batch. If they use $${blue2}$ ounces of blue paint for the second batch, how much yellow paint should they use?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
