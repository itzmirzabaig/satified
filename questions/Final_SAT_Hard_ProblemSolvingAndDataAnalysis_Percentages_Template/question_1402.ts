import { getRandomInt, shuffle, round } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1402
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [190%, 80%, 24 (single/two-digit)]
 * - Difficulty factors: ["Percent greater than" vs "percent of", chained calculations]
 * - Distractor patterns: [Forgetting to add original amount, sign errors]
 * - Constraints: [190% greater means multiply by 2.9, 80% less means multiply by 0.2]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_1402 = {
  metadata: {
    id: "1402",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Draw parameters, retrying until the four displayed (2-decimal)
    // option values are pairwise distinct. Every value below is an exact
    // 2-decimal number because base*(100-P2) and *(100+P1) are integers over
    // powers of 100; the final answer is rounded once to 2 decimals.
    let P1 = 0, P2 = 0, baseValue = 0;
    let bValue = 0, aValue = 0;
    let forgotAddBase = 0, usedBaseDirect = 0, wrongLessSign = 0;
    let tries = 0;
    do {
      P1 = getRandomInt(150, 250);        // a is P1% greater than b
      P2 = getRandomInt(60, 90);          // b is P2% less than baseValue
      baseValue = getRandomInt(15, 35);   // base number for the b calculation

      // b is P2% less than baseValue:  b = baseValue * (1 - P2/100)  (exact 2dp)
      bValue = round(baseValue * (100 - P2) / 100, 2);
      // a is P1% greater than b:  a = b * (1 + P1/100)
      aValue = round(bValue * (100 + P1) / 100, 2);

      // Distractors (each a genuinely different mis-step, all rounded to 2dp):
      // (1) computes P1% OF b instead of P1% GREATER THAN b  ->  a - b
      forgotAddBase = round(bValue * P1 / 100, 2);
      // (2) skips the "less than" step and grows the base directly
      usedBaseDirect = round(baseValue * (100 + P1) / 100, 2);
      // (3) treats "P2% less" as "P2% greater" when finding b, then grows it
      wrongLessSign = round(baseValue * (100 + P2) / 100 * (100 + P1) / 100, 2);
    } while (
      new Set([aValue, forgotAddBase, usedBaseDirect, wrongLessSign]).size < 4 &&
      ++tries < 50
    );

    // Fallback (deterministic, all-distinct) if a rare range never separated.
    if (new Set([aValue, forgotAddBase, usedBaseDirect, wrongLessSign]).size < 4) {
      P1 = 190; P2 = 80; baseValue = 24;
      bValue = round(baseValue * (100 - P2) / 100, 2);   // 4.8
      aValue = round(bValue * (100 + P1) / 100, 2);       // 13.92
      forgotAddBase = round(bValue * P1 / 100, 2);        // 9.12
      usedBaseDirect = round(baseValue * (100 + P1) / 100, 2); // 69.6
      wrongLessSign = round(baseValue * (100 + P2) / 100 * (100 + P1) / 100, 2); // 125.28
    }

    // Display-ready 2-decimal values (all exact for integer P1/P2).
    const lessFrac = round(P2 / 100, 2);           // P2%  as a decimal, e.g. 0.8
    const greatFrac = round(P1 / 100, 2);          // P1%  as a decimal, e.g. 1.9
    const lessMult = round((100 - P2) / 100, 2);   // 1 - P2/100, e.g. 0.2
    const greatMult = round((100 + P1) / 100, 2);  // 1 + P1/100, e.g. 2.9

    const optionsData = [
      { text: forgotAddBase.toString(), isCorrect: false, reason: `finds ${P1}% of $b$ instead of the number that is ${P1}% greater than $b$` },
      { text: aValue.toString(), isCorrect: true, reason: "" },
      { text: usedBaseDirect.toString(), isCorrect: false, reason: `applies the increase to ${baseValue} directly and skips the ${P2}% decrease that defines $b$` },
      { text: wrongLessSign.toString(), isCorrect: false, reason: `treats ${P2}% less than ${baseValue} as ${P2}% greater when finding $b$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'A';
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The number $a$ is ${P1}% greater than the number $b$. The number $b$ is ${P2}% less than ${baseValue}. What is the value of $a$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: aValue.toString(),
      explanation: `Choice ${correctLetter} is correct. Because $b$ is ${P2}% less than ${baseValue}, $b = ${baseValue}(1 - ${lessFrac}) = ${baseValue}(${lessMult}) = ${bValue}$. Because $a$ is ${P1}% greater than $b$, $a = ${bValue}(1 + ${greatFrac}) = ${bValue}(${greatMult}) = ${aValue}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
