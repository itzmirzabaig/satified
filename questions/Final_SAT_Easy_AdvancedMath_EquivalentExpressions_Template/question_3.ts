import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 3
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a: 15-25, b: 3-6, c: 2-5 with c != b]
 * - Difficulty factors: [Distributing negative, combining like terms]
 * - Distractor patterns: [arithmetic slip (result minus 1-3), forgets to distribute negative to cw, adds bw instead of subtracting]
 * - Constraints: [c != b guarantees the two structural distractors a-b+c and a+b-c differ]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_3 = {
  metadata: {
    id: "3",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(15, 25);
    const b = getRandomInt(3, 6);
    // Guard: if c === b, the distractors a-b+c and a+b-c would both equal a.
    let c = getRandomInt(2, 5);
    let tries = 0;
    while (c === b && tries++ < 50) c = getRandomInt(2, 5);
    if (c === b) c = 2; // b >= 3, so 2 is always a distinct fallback

    const innerSum = b + c;
    const result = a - innerSum;          // in [4, 20], always positive
    const slip = result - getRandomInt(1, 3);   // below result, never collides
    const noDistribute = a - b + c;             // = result + 2c
    const addInstead = a + b - c;               // = result + 2b

    const correctText = `$${result}w$`;

    const optionsData = [
      {
        text: `$${slip}w$`,
        isCorrect: false,
        reason: `it does not result from any correct combination of the terms`
      },
      { text: correctText, isCorrect: true, reason: '' },
      {
        text: `$${noDistribute}w$`,
        isCorrect: false,
        reason: `it comes from failing to distribute the subtraction to the last term: $${a}w-${b}w+${c}w=${noDistribute}w$`
      },
      {
        text: `$${addInstead}w$`,
        isCorrect: false,
        reason: `it comes from adding $${b}w$ instead of subtracting it: $${a}w+${b}w-${c}w=${addInstead}w$`
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    const distractorNotes = shuffledOptions
      .filter(opt => !opt.isCorrect)
      .map(opt => `Choice ${opt.letter} is incorrect because ${opt.reason}.`)
      .join(' ');

    return {
      questionText: `Which expression is equivalent to $${a}w - (${b}w + ${c}w)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. First combine the like terms inside the parentheses: $${b}w+${c}w=${innerSum}w$. Then subtract the result from the first term: $${a}w-${innerSum}w=${result}w$. ${distractorNotes}`
    };
  }
};
