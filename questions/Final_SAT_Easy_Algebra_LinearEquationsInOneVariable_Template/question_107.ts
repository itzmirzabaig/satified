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
    const donors = getRandomInt(50, total - 30);
    const volunteers = total - donors;

    const optionsData = [
      { text: volunteers.toString(), isCorrect: true },
      { text: donors.toString(), isCorrect: false, reason: "is the number of donors" },
      { text: total.toString(), isCorrect: false, reason: "is the total" },
      { text: (total + donors).toString(), isCorrect: false, reason: "incorrectly adds instead of subtracts" }
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
      explanation: `Volunteers = Total - Donors = ${total} - ${donors} = ${volunteers}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
