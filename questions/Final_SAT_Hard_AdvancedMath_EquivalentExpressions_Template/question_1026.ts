import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1026
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [single fraction addition]
 * - Difficulty factors: [Common denominator, factoring, combining terms]
 * - Distractor patterns: [Adding denominators, wrong factoring, forgetting to multiply second term]
 * - Constraints: [k > 0]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_1026 = {
  metadata: {
    id: "1026",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters ($a$ and $k$ stay symbolic in the expression)
    const n = getRandomInt(30, 50);

    // STEP 2: Create options
    // na/k + nak = na/k + nak^2/k = na(k^2+1)/k
    const correctAnswer = `\\frac{${n}a(k^{2}+1)}{k}`;

    // Reasons used to start with "this would be equivalent to" and the
    // explanation used "is incorrect;" on separate lines; each reason now
    // names the value and the slip, in the standard one paragraph format.
    const optionsData = [
      { text: `\\frac{${2 * n}a}{k}`, isCorrect: false, reason: `$\\frac{${2 * n}a}{k}$ results from treating $${n}ak$ as if it were $\\frac{${n}a}{k}$, dividing by $k$ instead of multiplying by $k$` },
      { text: `\\frac{${2 * n}ak^{2}}{k}`, isCorrect: false, reason: `$\\frac{${2 * n}ak^{2}}{k}$ results from combining $${n}a$ and $${n}ak^{2}$ in the numerator as if they were like terms` },
      { text: `\\frac{${n}a(k+1)}{k}`, isCorrect: false, reason: `$\\frac{${n}a(k+1)}{k}$ results from rewriting $${n}ak$ as $\\frac{${n}ak}{k}$ without multiplying its numerator by $k$` },
      { text: correctAnswer, isCorrect: true, reason: '' }
    ];

    // STEP 3: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 4: Question text
    const questionText = `Which expression is equivalent to $\\frac{${n}a}{k} + ${n}ak$, where $k > 0$?`;

    // STEP 5: Explanation
    const explanation = `Choice ${correctOption.letter} is correct. To add the two terms, rewrite them with the common denominator $k$. Multiplying $${n}ak$ by $\\frac{k}{k}$, which equals $1$, gives $\\frac{${n}ak^{2}}{k}$. Adding the numerators gives $\\frac{${n}a}{k} + \\frac{${n}ak^{2}}{k} = \\frac{${n}a + ${n}ak^{2}}{k}$. Factoring $${n}a$ out of the numerator gives $\\frac{${n}a(k^{2}+1)}{k}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
