import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 448
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [workday: 8 hours, meeting percentage: 15%]
 * - Difficulty factors: [Multi-step calculation, unit conversion (hours to minutes)]
 * - Distractor patterns: [1.2 = hours result, 15 = percentage value, 48 = miscalculation, 72 = correct minutes]
 * - Constraints: [Clean integer result for minutes]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
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
    const meetingPercent = getRandomInt(10, 25);
    const hoursInMeetings = (meetingPercent / 100) * workdayHours;
    const result = Math.round(hoursInMeetings * 60);

    const distractorA = hoursInMeetings.toFixed(1);
    const distractorB = meetingPercent;
    const distractorC = Math.round(result * 0.65);

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: "is the number of hours spent in meetings, not minutes" },
      { text: `${distractorB}`, isCorrect: false, reason: "is the percentage value, not the actual amount of time" },
      { text: `${distractorC}`, isCorrect: false, reason: "might result from a miscalculation" },
      { text: `${result}`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Lani spent ${meetingPercent}% of her ${workdayHours}-hour workday in meetings. How many minutes of her workday did she spend in meetings?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. First, calculate the number of hours spent in meetings: $${meetingPercent/100} \\times ${workdayHours} = ${hoursInMeetings}$ hours. Since there are 60 minutes in an hour, convert the hours to minutes: $${hoursInMeetings} \\times 60 = ${result}$ minutes. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
