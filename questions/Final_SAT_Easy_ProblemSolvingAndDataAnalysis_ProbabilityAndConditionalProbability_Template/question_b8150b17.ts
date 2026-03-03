import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b8150b17
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [29 defective out of 100]
 * - Difficulty factors: [Proportion to probability conversion]
 * - Distractor patterns: [A: 1/2900, B: 1/29, D: 29/10]
 * - Constraints: [Maintain 29/100 ratio, reduce if needed]
 * - Question type: [No figure → Text options]
 * - Figure generation: [None]
 */

export const generator_b8150b17 = {
  metadata: {
    // id: "b8150b17",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const defectiveRate = getRandomInt(15, 40);
    const base = 100;

    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(defectiveRate, base);
    const simplifiedNum = defectiveRate / divisor;
    const simplifiedDen = base / divisor;
    const correctText = `\\frac{${simplifiedNum}}{${simplifiedDen}}`;

    const optionsData = [
      { text: `\\frac{1}{${defectiveRate * 100}}`, isCorrect: false, reason: "results from conceptual or computational errors" },
      { text: `\\frac{1}{${defectiveRate}}`, isCorrect: false, reason: "results from conceptual or computational errors" },
      { text: correctText, isCorrect: true },
      { text: `\\frac{${defectiveRate}}{10}`, isCorrect: false, reason: "results from conceptual or computational errors" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. If ${defectiveRate} out of every ${base} beads have a defect, the probability is $\\frac{${defectiveRate}}{${base}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$. Choice ${incorrectOptions[0].letter} is incorrect; this ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this ${incorrectOptions[2].reason}.`;

    return {
      questionText: `For a particular machine that produces beads, $${defectiveRate}$ out of every $${base}$ beads it produces have a defect. A bead produced by the machine will be selected at random. What is the probability of selecting a bead that has a defect?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 1dcea480
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [60 marbles, 0.35 probability]
 * - Difficulty factors: [Reverse probability - find count from probability]
 * - Distractor patterns: [B: wrong calc, C: confuses prob with %, D: wrong calc]
 * - Constraints: [Must result in integer count]
 * - Question type: [No figure → Integer options]
 * - Figure generation: [None]
 */