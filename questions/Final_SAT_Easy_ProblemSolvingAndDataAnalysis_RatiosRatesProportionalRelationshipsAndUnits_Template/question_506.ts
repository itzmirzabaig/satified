import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 506
*
* ORIGINAL ANALYSIS:
* - Number ranges: [speed: 64 yards/sec, conversion: 3 feet/yard, answer: 192 feet/sec]
* - Difficulty factors: [Rate conversion, multiplication]
* - Distractor patterns: [A: 61 (64-3), B: 67 (64+3), C: 94 (random), D: 192 (correct, 64×3)]
* - Constraints: [Simple multiplication]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_506 = {
  metadata: {
    id: "506",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Before: one wrong choice was yardsPerSec + 30 ("an unrelated
    // calculation"), the reasons were vague ("adding the values"), and the
    // explanation format was nonstandard. The speed is now a multiple of 3 so
    // the "divided by 3" slip is exact, and the unrelated choice became the
    // slip of multiplying by 36 (inches per yard).
    const yardsPerSec = 3 * getRandomInt(17, 26);
    const feetPerYard = 3;
    const feetPerSec = yardsPerSec * feetPerYard;

    const distractor1 = yardsPerSec / feetPerYard;
    const distractor2 = yardsPerSec + feetPerYard;
    const distractor3 = yardsPerSec * 36;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: `${distractor1} is the result of dividing ${yardsPerSec} by ${feetPerYard} instead of multiplying` },
      { text: distractor2.toString(), isCorrect: false, reason: `${distractor2} is the result of adding ${feetPerYard} to ${yardsPerSec} instead of multiplying` },
      { text: distractor3.toLocaleString('en-US'), isCorrect: false, reason: `${distractor3.toLocaleString('en-US')} is the result of multiplying ${yardsPerSec} by 36, the number of inches in a yard, which gives the speed in inches per second` },
      { text: feetPerSec.toString(), isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Since 1 yard is ${feetPerYard} feet, multiply the speed in yards per second by ${feetPerYard} to find the speed in feet per second: $${yardsPerSec} \\times ${feetPerYard} = ${feetPerSec}$. So the object's speed is ${feetPerSec} feet per second. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `An object's speed is ${yardsPerSec} yards per second. What is the object's speed, in feet per second? (1 yard = ${feetPerYard} feet)`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: feetPerSec.toString(),
      explanation: explanation
    };
  }
};
