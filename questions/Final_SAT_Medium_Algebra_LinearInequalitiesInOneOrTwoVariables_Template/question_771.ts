import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 771
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min width: 7.5, max width: 9.0, curb length: 135]
 * - Difficulty factors: [Inverse relationship, division with decimals, compound inequality]
 * - Distractor patterns: [A=wrong variable range, B=width range not count, C=equated curb length with max spaces]
 * - Constraints: [n must satisfy 135/maxWidth <= n <= 135/minWidth]
 * - Question type: [Word Problem -> Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_771 = {
  metadata: {
    id: "771",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES).
    // Standard width lies between minWidth and maxWidth feet; the curb is
    // curbLength feet long. Redraw (bounded) until the resulting option
    // strings are all distinct.
    let minWidth = 0, maxWidth = 0, curbLength = 0, minSpaces = 0, maxSpaces = 0;
    let optionStrings: string[] = [];
    let tries = 0;
    do {
      minWidth = getRandomInt(6, 9) + getRandomInt(0, 1) * 0.5; // 6.0 .. 9.0 in .5 steps
      maxWidth = minWidth + getRandomInt(1, 3) + getRandomInt(0, 1) * 0.5; // strictly > minWidth
      curbLength = getRandomInt(100, 200);

      // Narrower spaces fit the most: maxSpaces = floor(L / minWidth).
      // Wider spaces fit the fewest: minSpaces = ceil(L / maxWidth).
      maxSpaces = Math.floor(curbLength / minWidth);
      minSpaces = Math.ceil(curbLength / maxWidth);

      // Trim decimals so any width value prints cleanly (e.g. 7.5, 8).
      const minW = Number.isInteger(minWidth) ? `${minWidth}` : minWidth.toFixed(1);
      const maxW = Number.isInteger(maxWidth) ? `${maxWidth}` : maxWidth.toFixed(1);

      optionStrings = [
        `$${minSpaces} \\leq n \\leq ${maxSpaces}$`,          // correct
        `$${minSpaces} \\leq n \\leq ${curbLength}$`,         // curb length as upper bound
        `$${maxSpaces} \\leq n \\leq ${curbLength}$`,         // both bounds wrong (curb-based)
        `$${minW} \\leq n \\leq ${maxW}$`,                    // width range, not a count
      ];
    } while (
      (minSpaces >= maxSpaces || new Set(optionStrings).size !== 4) && tries++ < 50
    );

    const correctText = optionStrings[0];

    // STEP 2: Build options, each carrying its own distractor reason so the
    // explanation stays correct after shuffling.
    const optionsData = [
      { text: optionStrings[0], isCorrect: true, reason: '' },
      { text: optionStrings[1], isCorrect: false,
        reason: `uses the curb length, ${curbLength}, as the upper bound instead of the maximum number of spaces` },
      { text: optionStrings[2], isCorrect: false,
        reason: `uses the curb length, ${curbLength}, as the upper bound and swaps the lower bound` },
      { text: optionStrings[3], isCorrect: false,
        reason: `gives the range of possible widths of one space, not the range of the number of spaces` },
    ];

    // STEP 3: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const minWDisp = Number.isInteger(minWidth) ? `${minWidth}` : minWidth.toFixed(1);
    const maxWDisp = Number.isInteger(maxWidth) ? `${maxWidth}` : maxWidth.toFixed(1);

    // STEP 4: Build explanation from the same live variables.
    const distractorSentences = incorrectOptions
      .map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`)
      .join(' ');

    const explanation = `Choice ${correctOption.letter} is correct. Spaces are as narrow as ${minWDisp} feet, so at most $\\lfloor ${curbLength} \\div ${minWDisp} \\rfloor = ${maxSpaces}$ spaces fit along the ${curbLength}-foot curb. Spaces are as wide as ${maxWDisp} feet, so at least $\\lceil ${curbLength} \\div ${maxWDisp} \\rceil = ${minSpaces}$ spaces are needed to span the same curb. Therefore the number of spaces satisfies $n \\geq ${minSpaces}$ and $n \\leq ${maxSpaces}$. ${distractorSentences}`;

    // STEP 5: Return question data.
    return {
      questionText: `In North America, the standard width of a parking space is at least ${minWDisp} feet and no more than ${maxWDisp} feet. A restaurant owner recently resurfaced the restaurant's parking lot and wants to determine the number of parking spaces, $n$, that could be placed perpendicular to a curb that is ${curbLength} feet long, based on the standard width of a parking space. Which of the following describes all the possible values of $n$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
