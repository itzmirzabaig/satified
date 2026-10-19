import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 310
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coins: 20-30, stars: 10-15, score1: 500-800, score2: 700-1000]
 * - Difficulty factors: [Setting up system for points calculation]
 * - Distractor patterns: [Swapped items, wrong totals, wrong coefficients]
 * - Constraints: [Valid integer solution]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_310 = {
  metadata: {
    id: "310",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Redraw if the two games' counts are proportional (for example 20 coins
    // and 10 stars, then 30 coins and 15 stars), which leaves the system with
    // no unique solution.
    let coins1 = 18, stars1 = 8, coins2 = 23, stars2 = 10;
    do {
      coins1 = getRandomInt(18, 25);
      stars1 = getRandomInt(8, 12);
      coins2 = getRandomInt(23, 30);
      stars2 = getRandomInt(10, 15);
    } while (coins1 * stars2 === stars1 * coins2);
    const c = getRandomInt(20, 35);
    const s = getRandomInt(40, 60);
    const fmt = (n: number) => n.toLocaleString('en-US');
    const score1 = fmt(coins1 * c + stars1 * s);
    const score2 = fmt(coins2 * c + stars2 * s);

    const correctAnswer = `$\\begin{aligned} ${coins1}c + ${stars1}s &= ${score1} \\\\ ${coins2}c + ${stars2}s &= ${score2} \\end{aligned}$`;
    const optionsData = [
      { text: `$\\begin{aligned} ${stars1}c + ${coins1}s &= ${score1} \\\\ ${stars2}c + ${coins2}s &= ${score2} \\end{aligned}$`, isCorrect: false, reason: `it multiplies the number of stars by $c$, the points for each coin, and the number of coins by $s$, the points for each star; the first game should give $${coins1}c + ${stars1}s$ points` },
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: `$\\begin{aligned} ${coins1}c + ${score1}s &= ${stars1} \\\\ ${coins2}c + ${score2}s &= ${stars2} \\end{aligned}$`, isCorrect: false, reason: `it multiplies each score by $s$ and sets the result equal to a number of stars; each equation should set the points earned equal to the score` },
      { text: `$\\begin{aligned} ${score1}c + ${coins1}s &= ${stars1} \\\\ ${score2}c + ${coins2}s &= ${stars2} \\end{aligned}$`, isCorrect: false, reason: `it multiplies each score by $c$ and each number of coins by $s$, and sets the result equal to a number of stars; each equation should set the points earned equal to the score` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Each coin is worth $c$ points and each star is worth $s$ points. The first time, the student collected ${coins1} coins and ${stars1} stars, worth $${coins1}c + ${stars1}s$ points in all, and scored ${score1} points, so $${coins1}c + ${stars1}s = ${score1}$. In the same way, the second time gives $${coins2}c + ${stars2}s = ${score2}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    // The two games used to be written as "- The first time ...", which
    // showed a literal dash at the start of each line.
    return {
      questionText: `A student is playing a video game. In this game, players can score points only by collecting coins and stars. Each coin is worth $c$ points, and each star is worth $s$ points.\n\nThe first time she played, she scored ${score1} points. She collected ${coins1} coins and ${stars1} stars.\n\nThe second time she played, she scored ${score2} points. She collected ${coins2} coins and ${stars2} stars.\n\nWhich system of equations can be used to correctly determine the values of $c$ and $s$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};