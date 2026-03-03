import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 44d65912
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coins: 20-30, stars: 10-15, score1: 500-800, score2: 700-1000]
 * - Difficulty factors: [Setting up system for points calculation]
 * - Distractor patterns: [Swapped items, wrong totals, wrong coefficients]
 * - Constraints: [Valid integer solution]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_44d65912 = {
  metadata: {
    // id: "44d65912",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coins1 = getRandomInt(18, 25);
    const stars1 = getRandomInt(8, 12);
    const coins2 = getRandomInt(23, 30);
    const stars2 = getRandomInt(10, 15);
    const c = getRandomInt(20, 35);
    const s = getRandomInt(40, 60);
    const score1 = coins1 * c + stars1 * s;
    const score2 = coins2 * c + stars2 * s;

    const correctAnswer = `${coins1}c + ${stars1}s = ${score1}\n${coins2}c + ${stars2}s = ${score2}`;
    const optionsData = [
      { text: `${stars1}c + ${coins1}s = ${score1}\n${stars2}c + ${coins2}s = ${score2}`, isCorrect: false, reason: "swaps coins and stars in the equations" },
      { text: correctAnswer, isCorrect: true },
      { text: `${coins1}c + ${score1}s = ${stars1}\n${coins2}c + ${score2}s = ${stars2}`, isCorrect: false, reason: "misplaces coefficients and totals" },
      { text: `${score1}c + ${coins1}s = ${stars1}\n${score2}c + ${coins2}s = ${stars2}`, isCorrect: false, reason: "misplaces all values" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Each coin is worth $c$ points and each star is worth $s$ points. From the first game: $${coins1}c + ${stars1}s = ${score1}$. From the second game: $${coins2}c + ${stars2}s = ${score2}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `Angela is playing a video game. In this game, players can score points only by collecting coins and stars. Each coin is worth $c$ points, and each star is worth $s$ points. \n\n- The first time she played, Angela scored ${score1} points. She collected ${coins1} coins and ${stars1} stars.\n\n- The second time she played, Angela scored ${score2} points. She collected ${coins2} coins and ${stars2} stars.\n\nWhich system of equations can be used to correctly determine the values of $c$ and $s$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 4b76c7f1
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2-9, constants: 9-36]
 * - Difficulty factors: [Understanding proportional systems]
 * - Distractor patterns: [First constant, unscaled constant, over-scaled constant]
 * - Constraints: [System must have proportional coefficients]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */