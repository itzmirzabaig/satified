import { getRandomInt, getRandomElement, shuffle, round } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 448
 * Percentages — percent of an 8-hour-style workday spent in meetings, in MINUTES
 * (multi-step: percent -> hours -> minutes).
 *
 * FIXED:
 * - FLOAT_ARTIFACT: the explanation printed the raw float `hoursInMeetings`
 *   (e.g. 1.7000000000000002). Now `meetingPercent` is restricted to
 *   {10,15,20,25} and hours are shown via round(minutes/60, 2), so every
 *   displayed value is a clean short decimal and `minutes` is an exact integer
 *   (minutes = pct * hours * 60 / 100 is whole for all 20 draws).
 * - Personal name replaced with a generic role ("an employee") + pronoun.
 * - Distractors verified distinct from the answer and each other for all draws.
 *
 * ORIGINAL ANALYSIS:
 * - Distractor patterns: hours (not minutes), the percent value, a miscalculation.
 * - Constraints: clean integer result for minutes. Figure: none.
 */

export const generator_448 = {
  metadata: {
    id: "448",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const workdayHours = getRandomInt(6, 10);
    // Multiples of 5 keep pct/100 clean and guarantee whole minutes.
    const meetingPercent = getRandomElement([10, 15, 20, 25]);

    // Exact integer minutes (pct * hours * 60 / 100). Math.round removes any
    // binary-float dust; the value is mathematically whole for every draw.
    const result = Math.round((meetingPercent * workdayHours * 60) / 100);
    const hoursInMeetings = round(result / 60, 2); // clean short decimal

    const distractorA = hoursInMeetings;               // hours, not minutes
    const distractorB = meetingPercent;                // the percent value
    const distractorC = Math.round(result * 0.65);     // a miscalculation

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: "is the number of hours spent in meetings, not minutes" },
      { text: `${distractorB}`, isCorrect: false, reason: "is the percentage value, not the actual amount of time" },
      { text: `${distractorC}`, isCorrect: false, reason: "results from a miscalculation" },
      { text: `${result}`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const multiplier = `0.${meetingPercent.toString().padStart(2, '0')}`; // 0.10 .. 0.25

    return {
      questionText: `An employee spent ${meetingPercent}% of her ${workdayHours}-hour workday in meetings. How many minutes of her workday did she spend in meetings?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. First, find the number of hours spent in meetings: $${workdayHours} \\times ${multiplier} = ${hoursInMeetings}$ hours. Since there are 60 minutes in an hour, convert hours to minutes: $${hoursInMeetings} \\times 60 = ${result}$ minutes. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
