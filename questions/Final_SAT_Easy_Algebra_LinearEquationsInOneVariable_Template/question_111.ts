import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 111
*
* ORIGINAL ANALYSIS:
* - Number ranges: [initial: 50-150, daily: 5-20, days: 3-8]
* - Difficulty factors: [Word problem, arithmetic sequence]
* - Distractor patterns: [A: mult error, C: ignored rate, D: ignored increase]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_111 = {
  metadata: {
    id: "111",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initial = getRandomInt(50, 150);
    const daily = getRandomInt(5, 20);
    const days = getRandomInt(3, 8);
    const result = initial + daily * days;

    const distractorA = initial * days - daily;
    const distractorC = initial + days;
    const distractorD = initial;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "multiplication error" },
      { text: result.toString(), isCorrect: true },
      { text: distractorC.toString(), isCorrect: false, reason: "ignores the daily rate" },
      { text: distractorD.toString(), isCorrect: false, reason: "ignores the increase entirely" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A club starts with ${initial} members. Each day, ${daily} new members join. How many members after ${days} days?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Total = Initial + (Daily × Days) = ${initial} + (${daily} × ${days}) = ${initial} + ${daily * days} = ${result}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
