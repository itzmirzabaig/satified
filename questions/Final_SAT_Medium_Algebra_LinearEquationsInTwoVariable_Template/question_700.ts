import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 700
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [equation: A x + B y = C with integer y-intercept, shift 2..8]
 * - Difficulty factors: [Finding y-intercept, understanding vertical shift]
 * - Distractor patterns: [B: shift up instead of down, C: no shift, D: double shift]
 * - Constraints: [Original y-intercept must be an integer]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 *
 * Intent: For A x + B y = C, set x = 0 to get the y-intercept y = C/B.
 * Choosing C = B * yInt makes that intercept the integer yInt. Shifting the
 * graph DOWN by `shift` moves the y-intercept to yInt - shift.
 */

export const generator_700 = {
  metadata: {
    id: "700",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters ensuring a clean (integer) y-intercept.
    const coefX = getRandomInt(10, 40);
    const coefY = getRandomInt(10, 40);
    const yInt = getRandomInt(5, 15);
    const shift = getRandomInt(2, 8);
    const C = coefY * yInt; // so that C / coefY = yInt exactly

    // STEP 2: Answer-first values. All four are integers and provably distinct
    // for every draw because every pairwise difference is a nonzero multiple of
    // `shift` (>= 2):
    //   correct = yInt - shift, up = yInt + shift, noShift = yInt,
    //   doubleDown = yInt - 2*shift.
    const correctY = yInt - shift;      // correct
    const upY = yInt + shift;           // shifted up instead of down
    const noShiftY = yInt;              // forgot to apply the shift
    const doubleDownY = yInt - 2 * shift; // shifted down twice

    const optionsData = [
      { text: `\\( (0, ${correctY}) \\)`, isCorrect: true, reason: "shift the y-intercept down by the given amount" },
      { text: `\\( (0, ${upY}) \\)`, isCorrect: false, reason: "shifted the graph up instead of down" },
      { text: `\\( (0, ${noShiftY}) \\)`, isCorrect: false, reason: "gave the original y-intercept without applying the shift" },
      { text: `\\( (0, ${doubleDownY}) \\)`, isCorrect: false, reason: "subtracted the shift twice" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const upLetter = shuffledOptions.find(o => o.text === `\\( (0, ${upY}) \\)`)!.letter;
    const noShiftLetter = shuffledOptions.find(o => o.text === `\\( (0, ${noShiftY}) \\)`)!.letter;
    const doubleLetter = shuffledOptions.find(o => o.text === `\\( (0, ${doubleDownY}) \\)`)!.letter;

    return {
      questionText: `If the graph of \\( ${coefX}x+${coefY}y=${C} \\) is shifted down ${shift} units in the xy-plane, what is the y-intercept of the resulting graph?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. To find the y-intercept of the original graph, substitute \\( x=0 \\) into \\( ${coefX}x+${coefY}y=${C} \\), which gives \\( ${coefY}y=${C} \\), so \\( y=${yInt} \\). The original y-intercept is \\( (0, ${yInt}) \\). Shifting the graph down ${shift} units decreases the y-coordinate by ${shift}, so the new y-intercept is at \\( y=${yInt}-${shift}=${correctY} \\). Therefore, the y-intercept of the resulting graph is \\( (0, ${correctY}) \\). Choice ${upLetter} is incorrect because it shifts the graph up instead of down. Choice ${noShiftLetter} is incorrect because it is the original y-intercept, before the shift is applied. Choice ${doubleLetter} is incorrect because it subtracts the shift twice.`
    };
  }
};
