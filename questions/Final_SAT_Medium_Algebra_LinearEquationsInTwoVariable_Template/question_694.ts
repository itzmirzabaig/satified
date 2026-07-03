import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 694
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 80, 90, total: 1120]
 * - Difficulty factors: [Interpreting coefficients as point values]
 * - Distractor patterns: [Various wrong interpretations]
 * - Constraints: [Simple subtraction for difference]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_694 = {
  metadata: {
    id: "694",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters. circleVal is worth exactly diff more points
    // than squareVal, so the answer to "how many more points" is diff.
    const squareVal = getRandomInt(50, 100);
    const diff = getRandomInt(5, 20);
    const circleVal = squareVal + diff;     // 55..120, always > squareVal
    const total = getRandomInt(800, 1500);
    const sumVal = squareVal + circleVal;   // "added instead of subtracted" distractor

    // STEP 2: Create options. All four values are pairwise distinct for every
    // draw: diff <= 20 < squareVal < circleVal < sumVal, and circleVal > squareVal
    // because diff >= 5 — so no bounded retry is needed.
    const optionsData = [
      { text: `$${sumVal}$`, isCorrect: false, reason: "added the two token values instead of subtracting" },
      { text: `$${circleVal}$`, isCorrect: false, reason: "value of a circle token, not the difference" },
      { text: `$${squareVal}$`, isCorrect: false, reason: "value of a square token, not the difference" },
      { text: `$${diff}$`, isCorrect: true, reason: "" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `At a state fair, attendees can win tokens that are worth a different number of points depending on the shape. One attendee won some square tokens and some circle tokens worth a total of ${total} points. If S is the number of square tokens and C is the number of circle tokens, the equation $${squareVal}S + ${circleVal}C = ${total}$ represents this situation. How many more points is a circle token worth than a square token?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. In the equation $${squareVal}S + ${circleVal}C = ${total}$, the number of square tokens is multiplied by ${squareVal} and the number of circle tokens is multiplied by ${circleVal}. The term $${squareVal}S$ gives the total points from square tokens, so each square token is worth ${squareVal} points. The term $${circleVal}C$ gives the total points from circle tokens, so each circle token is worth ${circleVal} points.\n\nThe question asks how many more points a circle token is worth than a square token, which is the difference ${circleVal} - ${squareVal} = ${diff} points.\n\nThe distractor ${circleVal} is the value of a circle token and the distractor ${squareVal} is the value of a square token; each is a single token value rather than the difference. The distractor ${sumVal} comes from adding the two token values instead of subtracting them.`
    };
  }
};
