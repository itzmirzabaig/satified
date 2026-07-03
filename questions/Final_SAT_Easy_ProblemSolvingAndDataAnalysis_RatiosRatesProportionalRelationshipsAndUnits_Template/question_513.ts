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
    const ratePerMinute = getRandomInt(3, 6);
    const initialTime = getRandomInt(2, 4);
    const initialPounds = ratePerMinute * initialTime;
    const targetMultiplier = getRandomInt(6, 10);
    const targetPounds = initialPounds * targetMultiplier;
    const correctTime = initialTime * targetMultiplier;   // whole number of minutes

    // Build three DISTINCT wrong answers, none equal to correctTime or each other.
    // targetMultiplier (<= 10) is always < correctTime (>= 12), so it is a safe,
    // pedagogically meaningful distractor (the ratio of amounts, not the time).
    const wrongs: number[] = [];
    const addWrong = (v: number): boolean => {
      if (v > 0 && v !== correctTime && !wrongs.includes(v)) { wrongs.push(v); return true; }
      return false;
    };

    addWrong(targetMultiplier);                     // stopped at the ratio of amounts

    // A plausible value below the answer, then one above — guarded and bounded.
    let tries = 0;
    while (wrongs.length < 2 && tries++ < 50) {
      addWrong(correctTime - getRandomInt(2, 6));   // slightly under the answer
    }
    tries = 0;
    while (wrongs.length < 3 && tries++ < 50) {
      addWrong(correctTime + getRandomInt(2, 8));   // slightly over the answer
    }
    // Final safety backfill (extremely unlikely to be needed).
    tries = 0;
    while (wrongs.length < 3 && tries++ < 50) {
      addWrong(correctTime + getRandomInt(9, 30));
    }

    const reasonFor = (v: number): string => {
      if (v === targetMultiplier) {
        return `dividing ${targetPounds} by ${initialPounds} gives ${targetMultiplier}, the number of times as much cherries, but that is the ratio of the amounts, not the time in minutes`;
      }
      if (v < correctTime) return `this is less than the correct time and comes from a miscalculation of the rate`;
      return `this is more than the correct time and comes from a miscalculation of the rate`;
    };

    const optionsData = [
      { text: correctTime.toString(), isCorrect: true, reason: null },
      { text: wrongs[0].toString(), isCorrect: false, reason: reasonFor(wrongs[0]) },
      { text: wrongs[1].toString(), isCorrect: false, reason: reasonFor(wrongs[1]) },
      { text: wrongs[2].toString(), isCorrect: false, reason: reasonFor(wrongs[2]) },
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Every math span starts with a digit or \frac (never a bare variable right
    // after $), so no currency/math dollar-pairing risk.
    const explanation = `The machine pits cherries at a rate of $\\frac{${initialPounds} \\text{ pounds}}{${initialTime} \\text{ minutes}} = ${ratePerMinute}$ pounds per minute. To pit ${targetPounds} pounds, divide the total pounds by the rate: $\\frac{${targetPounds}}{${ratePerMinute}} = ${correctTime}$ minutes. You can also set up a proportion $\\frac{${initialPounds}}{${initialTime}} = \\frac{${targetPounds}}{t}$, where $t$ is the time; cross-multiplying gives $t \\times ${initialPounds} = ${initialTime * targetPounds}$, so $t = ${correctTime}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect because ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A cherry pitting machine pits ${initialPounds} pounds of cherries in ${initialTime} minutes. At this rate, how many minutes does it take the machine to pit ${targetPounds} pounds of cherries?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctTime.toString(),
      explanation: explanation
    };
  }
};
