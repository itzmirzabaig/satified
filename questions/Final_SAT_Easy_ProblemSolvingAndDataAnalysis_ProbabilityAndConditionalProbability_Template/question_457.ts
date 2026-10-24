import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 457
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [1000 players, 4 defective]
 * - Difficulty factors: [Decimal probability, small fraction to decimal conversion]
 * - Distractor patterns: [B: 4/100, C: 4/10, D: 4 (the count itself)]
 * - Constraints: [Must result in 0.004]
 * - Question type: [No figure → Decimal options]
 * - Figure generation: [None]
 */

export const generator_457 = {
  metadata: {
    id: "457",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    // The shipment is 500, 1,000, or 2,000 players, so the probability is an
    // exact decimal. It used to be any multiple of the defective count, and
    // the rounded answer was wrong (4/1044 is about 0.0038, not 0.004).
    const defectiveCount = getRandomInt(2, 9);
    const totalCount = [500, 1000, 2000][getRandomInt(0, 2)];
    const fmt = (n: number) => n.toLocaleString('en-US');
    const dec = (x: number) => String(+x.toFixed(6));

    const probability = defectiveCount / totalCount;
    const correctText = dec(probability);
    const wrong10 = dec(probability * 10);
    const wrong100 = dec(probability * 100);

    // Wrong choices: the quotient with the total off by a factor of 10 or 100
    // (decimal point slips) and the number of defective players.
    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: wrong10, isCorrect: false, reason: `${wrong10} results from dividing ${defectiveCount} by ${fmt(totalCount / 10)} instead of by ${fmt(totalCount)}` },
      { text: wrong100, isCorrect: false, reason: `${wrong100} results from dividing ${defectiveCount} by ${fmt(totalCount / 100)} instead of by ${fmt(totalCount)}` },
      { text: `${defectiveCount}`, isCorrect: false, reason: `${defectiveCount} is the number of defective players, not the probability; a probability is between 0 and 1` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Of the ${fmt(totalCount)} players, ${defectiveCount} were defective, so the probability that a randomly selected player is defective is $\\frac{${defectiveCount}}{${fmt(totalCount).replace(/,/g, '{,}')}} = ${correctText}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A store received a shipment of ${fmt(totalCount)} MP3 players, ${defectiveCount} of which were defective. If an MP3 player is randomly selected from this shipment, what is the probability that it is defective?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
