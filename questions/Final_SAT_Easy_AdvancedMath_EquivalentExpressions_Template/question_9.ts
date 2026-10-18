import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [denominator: 14]
 * - Difficulty factors: [Converting rational exponent to radical]
 * - Distractor patterns: [A: coefficient 1/14 multiplied, C: multiplied by 14, D: reciprocal exponent]
 * - Constraints: [Exponent is 1/n meaning nth root]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_9 = {
  metadata: {
    id: "9",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const n = getRandomInt(3, 20);

    const correctText = `$\\sqrt[${n}]{x}$`;

    const optionsData = [
      { text: `$\\frac{1}{${n}} \\cdot x$`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `$${n} \\cdot x$`, isCorrect: false },
      { text: `$(x)^{${n}}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const letterOf = (i: number) => shuffledOptions.find(o => o.text === optionsData[i].text)!.letter;

    return {
      questionText: `Which expression is equivalent to $(x)^{\\frac{1}{${n}}}$, where $x>0$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. For $x>0$, an exponent of $\\frac{1}{n}$ means the $n$th root: $x^{\\frac{1}{n}} = \\sqrt[n]{x}$. Therefore $x^{\\frac{1}{${n}}} = \\sqrt[${n}]{x}$. Choice ${letterOf(0)} is incorrect; it multiplies $x$ by $\\frac{1}{${n}}$ instead of taking a root. Choice ${letterOf(2)} is incorrect; it multiplies $x$ by $${n}$. Choice ${letterOf(3)} is incorrect; it uses $${n}$ as the exponent instead of $\\frac{1}{${n}}$.`
    };
  }
};
