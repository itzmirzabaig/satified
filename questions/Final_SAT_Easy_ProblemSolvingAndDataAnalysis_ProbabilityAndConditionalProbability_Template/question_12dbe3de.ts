import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 12dbe3de
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [1000 players, 4 defective]
 * - Difficulty factors: [Decimal probability, small fraction to decimal conversion]
 * - Distractor patterns: [B: 4/100, C: 4/10, D: 4 (the count itself)]
 * - Constraints: [Must result in 0.004]
 * - Question type: [No figure → Decimal options]
 * - Figure generation: [None]
 */

export const generator_12dbe3de = {
  metadata: {
    // id: "12dbe3de",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const defectiveCount = getRandomInt(2, 8);
    const totalCount = defectiveCount * getRandomInt(200, 300);

    const probability = defectiveCount / totalCount;
    const correctText = probability.toFixed(3).replace(/\.?0+$/, '');

    const wrong1 = (defectiveCount / 100).toFixed(2);
    const wrong2 = (defectiveCount / 10).toFixed(1);
    const wrong3 = defectiveCount.toString();

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: wrong1, isCorrect: false, reason: "equivalent to dividing by 100 instead of the actual total" },
      { text: wrong2, isCorrect: false, reason: "equivalent to dividing by 10 instead of the actual total" },
      { text: wrong3, isCorrect: false, reason: "the number of defective items, not a probability value (which must be between 0 and 1)" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The probability is $\\frac{${defectiveCount}}{${totalCount}} = ${correctText}$. Choice ${incorrectOptions[0].letter} is incorrect; this ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A store received a shipment of $${totalCount}$ MP3 players, $${defectiveCount}$ of which were defective. If an MP3 player is randomly selected from this shipment, what is the probability that it is defective?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 2a08d878
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [n nonfiction, 12 fiction]
 * - Difficulty factors: [Algebraic probability with variable n]
 * - Distractor patterns: [A: n/12 (ratio), C: 12/n (flipped ratio), D: 12/(n+12) (fiction prob)]
 * - Constraints: [Variable n in answer choices]
 * - Question type: [No figure → Algebraic options]
 * - Figure generation: [None]
 */