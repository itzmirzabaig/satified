import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 293
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [max places: 14]
 * - Difficulty factors: [Simple sum constraint, "at most" interpretation]
 * - Distractor patterns: [A=correct f+h<=14, B=wrong sign >=, C=subtraction, D=subtraction with wrong sign]
 * - Constraints: [Must be sum of offices and homes]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_293 = {
  metadata: {
    id: "293",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const maxPlaces = getRandomInt(10, 20);

    const optionsData = [
      { text: `$f+h \\leq ${maxPlaces}$`, isCorrect: true },
      { text: `$f+h \\ge ${maxPlaces}$`, isCorrect: false, reason: `it says the service cleans at least ${maxPlaces} places per day; "at most" means the total is less than or equal to ${maxPlaces}` },
      { text: `$f-h \\leq ${maxPlaces}$`, isCorrect: false, reason: `$f - h$ is the difference between the numbers of offices and homes, not the total number of places cleaned, which is $f + h$` },
      { text: `$f-h \\ge ${maxPlaces}$`, isCorrect: false, reason: `$f - h$ is not the total number of places cleaned, and this inequality says at least ${maxPlaces} instead of at most ${maxPlaces}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The total number of places cleaned in a day is the number of offices plus the number of homes, $f + h$. The service can clean at most ${maxPlaces} places, so this total must be less than or equal to ${maxPlaces}: $f + h \\leq ${maxPlaces}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A cleaning service that cleans both offices and homes can clean at most ${maxPlaces} places per day. Which inequality represents this situation, where $f$ is the number of offices and $h$ is the number of homes?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};