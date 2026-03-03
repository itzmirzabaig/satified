import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 7d6928bd
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [max places: 14]
 * - Difficulty factors: [Simple sum constraint, "at most" interpretation]
 * - Distractor patterns: [A=correct f+h<=14, B=wrong sign >=, C=subtraction, D=subtraction with wrong sign]
 * - Constraints: [Must be sum of offices and homes]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_7d6928bd = {
  metadata: {
    // id: "7d6928bd",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const maxPlaces = getRandomInt(10, 20);

    const optionsData = [
      { text: `$f+h \\leq ${maxPlaces}$`, isCorrect: true },
      { text: `$f+h \\ge ${maxPlaces}$`, isCorrect: false, reason: "uses 'at least' instead of 'at most'" },
      { text: `$f-h \\leq ${maxPlaces}$`, isCorrect: false, reason: "subtracts instead of adding the locations" },
      { text: `$f-h \\ge ${maxPlaces}$`, isCorrect: false, reason: "subtracts and uses wrong inequality direction" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The service cleans $f$ offices and $h$ homes, at most ${maxPlaces} places total: $f+h \\leq ${maxPlaces}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A cleaning service that cleans both offices and homes can clean at most ${maxPlaces} places per day. Which inequality represents this situation, where $f$ is the number of offices and $h$ is the number of homes?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};