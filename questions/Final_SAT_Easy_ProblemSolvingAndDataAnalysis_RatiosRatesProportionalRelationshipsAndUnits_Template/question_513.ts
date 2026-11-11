import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 513
*
* ORIGINAL ANALYSIS:
* - Number ranges: [rate = ratePerMinute lb/min, initial = rate*initialTime lb in initialTime min]
* - target = initial * targetMultiplier lb, answer time = initialTime * targetMultiplier min
* - Difficulty factors: [Rate calculation, proportion setup, solving for time]
* - Distractor patterns: [targetMultiplier (ratio, not time); a value below the answer; a value above the answer]
* - Constraints: [rate divides target evenly so the time is a whole number]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_513 = {
  metadata: {
    id: "513",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Before: two wrong choices were the answer minus/plus a random offset,
    // explained only as "a miscalculation of the rate", and the explanation
    // said "cross-multiplying". Each wrong choice is now a real slip.
    // Redraw while rate === initialTime, since then dividing by the minutes
    // gives the correct answer.
    let ratePerMinute = getRandomInt(3, 6);
    let initialTime = getRandomInt(2, 4);
    while (ratePerMinute === initialTime) {
      ratePerMinute = getRandomInt(3, 6);
      initialTime = getRandomInt(2, 4);
    }
    const initialPounds = ratePerMinute * initialTime;
    const targetMultiplier = getRandomInt(6, 10);
    const targetPounds = initialPounds * targetMultiplier;
    const correctTime = initialTime * targetMultiplier;   // whole number of minutes
    const fmt = (n: number) => n.toLocaleString('en-US');

    const byMinutes = targetPounds / initialTime;          // divided by the minutes, not the rate
    const timesRate = targetPounds * ratePerMinute;        // multiplied by the rate instead of dividing

    const optionsData = [
      { text: `${correctTime}`, isCorrect: true, reason: '' },
      { text: `${targetMultiplier}`, isCorrect: false, reason: `${targetMultiplier} is $\\frac{${targetPounds}}{${initialPounds}}$, the number of times as many pounds to be pitted, not the time in minutes` },
      { text: `${byMinutes}`, isCorrect: false, reason: `${byMinutes} results from dividing ${targetPounds} pounds by the ${initialTime} minutes instead of by the rate of ${ratePerMinute} pounds per minute` },
      { text: fmt(timesRate), isCorrect: false, reason: `${fmt(timesRate)} results from multiplying ${targetPounds} pounds by the rate of ${ratePerMinute} pounds per minute instead of dividing` },
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The machine pits cherries at a rate of $\\frac{${initialPounds} \\text{ pounds}}{${initialTime} \\text{ minutes}} = ${ratePerMinute}$ pounds per minute. To pit ${targetPounds} pounds, divide the total pounds by the rate: $\\frac{${targetPounds}}{${ratePerMinute}} = ${correctTime}$ minutes. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A cherry pitting machine pits ${initialPounds} pounds of cherries in ${initialTime} minutes. At this rate, how many minutes does it take the machine to pit ${targetPounds} pounds of cherries?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctTime.toString(),
      explanation: explanation
    };
  }
};
