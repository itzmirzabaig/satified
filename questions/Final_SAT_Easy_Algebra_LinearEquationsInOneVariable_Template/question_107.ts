import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 107
*
* ORIGINAL ANALYSIS:
* - Number ranges: [total: 100-300, donors: 50-270]
* - Difficulty factors: [Word problem, simple subtraction]
* - Distractor patterns: [B: donors, C: total, D: added instead]
* - Constraints: [Simple integer arithmetic]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_107 = {
  metadata: {
    id: "107",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const total = getRandomInt(100, 300);
    let donors = getRandomInt(50, total - 30);
    // Guard: if donors is exactly half the total, volunteers would equal donors
    // (duplicate option). Nudge by 1; donors + 1 <= total - 30 holds since total >= 100.
    if (donors * 2 === total) donors += 1;
    const volunteers = total - donors;

    const optionsData = [
      { text: volunteers.toString(), isCorrect: true },
      { text: donors.toString(), isCorrect: false, reason: "is the number of people who contributed as a donor" },
      { text: total.toString(), isCorrect: false, reason: "is the total number of people who contributed" },
      { text: (total + donors).toString(), isCorrect: false, reason: `results from adding ${donors} to ${total} instead of subtracting it` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A total of ${total} people contributed to a charity event as either a donor or a volunteer. ${donors} people contributed as a donor. How many people contributed as a volunteer?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: volunteers.toString(),
      explanation: `Choice ${correctLetter} is correct. Each of the ${total} people contributed as either a donor or a volunteer, and ${donors} contributed as a donor. So the number of people who contributed as a volunteer is $${total} - ${donors} = ${volunteers}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`).join(' ')}`
    };
  }
};
