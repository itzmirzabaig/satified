import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1421
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: increase 120–199%, decrease 10–30%
 * - Difficulty factors: [Compound percentage changes with increase then decrease]
 * - Distractor patterns: [Adding percentages, subtracting percentages, reversing the order]
 * - Constraints: value increases BY increasePct% (multiplier 1+I/100) then decreases BY decreasePct%.
 *   Net increase = ((1+I/100)(1-D/100) - 1) * 100. Because I and D are integers, this value
 *   equals (I-D) - D*I/100, which has at most two decimal places exactly (no rounding artifact).
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - compound percentage problem]
 */

export const generator_1421 = {
  metadata: {
    id: "1421",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    let increasePct = 0;
    let decreasePct = 0;
    let netIncreasePct = 0;   // correct: ((1+I/100)(1-D/100) - 1) * 100  ==  (I-D) - D*I/100
    let wrongOrderPct = 0;    // reversed order: |((1+D/100)(1-I/100)) - 1| * 100 == (I-D) + D*I/100
    let additiveError = 0;    // subtracting percentages: I - D
    let wrongCalc = 0;        // adding percentages: I + D

    // Bounded retry so the four option values can never collide for any draw.
    // (Algebraically they are already distinct for I in [120,199], D in [10,30];
    // this loop is defensive insurance and always succeeds on the first pass.)
    let tries = 0;
    do {
      increasePct = getRandomInt(120, 199); // Large increase (capped at 199 to keep options distinct)
      decreasePct = getRandomInt(10, 30);   // Moderate decrease

      const multiplier1 = 1 + increasePct / 100;
      const multiplier2 = 1 - decreasePct / 100;
      const finalMultiplier = multiplier1 * multiplier2;

      // Round to 2 decimals; D*I/100 is exact to 2 decimals so this is loss-free.
      netIncreasePct = Math.round((finalMultiplier - 1) * 100 * 100) / 100;
      wrongOrderPct = Math.round(Math.abs((1 + decreasePct / 100) * (1 - increasePct / 100) - 1) * 100 * 100) / 100;
      additiveError = increasePct - decreasePct;
      wrongCalc = increasePct + decreasePct;
      tries++;
    } while (
      new Set([
        netIncreasePct.toFixed(2),
        wrongOrderPct.toFixed(2),
        additiveError.toFixed(2),
        wrongCalc.toFixed(2)
      ]).size < 4 &&
      tries < 50
    );

    // Recompute multipliers for the explanation from the final live values.
    const multiplier1 = 1 + increasePct / 100;
    const multiplier2 = 1 - decreasePct / 100;
    const finalMultiplier = multiplier1 * multiplier2;

    const correctText = netIncreasePct.toFixed(2) + "\\%";

    const optionsData = [
      { text: correctText, isCorrect: true, reason: "" },
      { text: wrongOrderPct.toFixed(2) + "\\%", isCorrect: false, reason: "results from reversing the order of the two changes" },
      { text: additiveError.toFixed(2) + "\\%", isCorrect: false, reason: "results from subtracting the percentages instead of compounding them" },
      { text: wrongCalc.toFixed(2) + "\\%", isCorrect: false, reason: "results from adding the percentages" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The value of a collectible comic book increased by ${increasePct}% from the end of 2011 to the end of 2012 and then decreased by ${decreasePct}% from the end of 2012 to the end of 2013. What was the net percentage increase in the value of the collectible comic book from the end of 2011 to the end of 2013?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. An increase of ${increasePct}% multiplies the value by $1 + \\frac{${increasePct}}{100} = ${multiplier1.toFixed(2)}$, and a decrease of ${decreasePct}% multiplies it by $1 - \\frac{${decreasePct}}{100} = ${multiplier2.toFixed(2)}$. So the value at the end of 2013 is ${multiplier1.toFixed(2)} \\times ${multiplier2.toFixed(2)} = ${finalMultiplier.toFixed(4)} times the original value. The net percentage increase is $(${finalMultiplier.toFixed(4)} - 1) \\times 100\\% = ${netIncreasePct.toFixed(2)}\\%$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
