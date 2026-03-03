import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4e527894
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [8 white, 2 orange, 10 brown, total 20]
 * - Difficulty factors: [Basic probability from text description]
 * - Distractor patterns: [A: 2/20 (orange), C: 10/20 (brown), D: 12/20 (not white)]
 * - Constraints: [Three colors, calculate P(white)]
 * - Question type: [No figure → Text options]
 * - Figure generation: [None]
 */

export const generator_4e527894 = {
  metadata: {
    // id: "4e527894",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const whiteCount = getRandomInt(5, 12);
    const orangeCount = getRandomInt(1, 4);
    const brownCount = getRandomInt(6, 15);
    const totalCount = whiteCount + orangeCount + brownCount;

    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(whiteCount, totalCount);
    const simplifiedNum = whiteCount / divisor;
    const simplifiedDen = totalCount / divisor;
    const correctText = `\\frac{${simplifiedNum}}{${simplifiedDen}}`;

    const optionsData = [
      { text: `\\frac{${orangeCount}}{${totalCount}}`, isCorrect: false, reason: "probability of selecting an orange button" },
      { text: correctText, isCorrect: true },
      { text: `\\frac{${brownCount}}{${totalCount}}`, isCorrect: false, reason: "probability of selecting a brown button" },
      { text: `\\frac{${orangeCount + brownCount}}{${totalCount}}`, isCorrect: false, reason: "probability of selecting a button that isn't white" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. There are $${whiteCount}$ white buttons out of $${totalCount}$ total, giving probability $\\frac{${whiteCount}}{${totalCount}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$. Choice ${incorrectOptions[0].letter} is incorrect; this is the ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this is the ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this is the ${incorrectOptions[2].reason}.`;

    return {
      questionText: `There are $${totalCount}$ buttons in a bag: $${whiteCount}$ white buttons, $${orangeCount}$ orange buttons, and $${brownCount}$ brown buttons. If one of these buttons is selected at random, what is the probability of selecting a white button?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};