import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1024
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [factor theorem application with parameters]
 * - Difficulty factors: [Factor theorem, substituting root, solving for parameter n]
 * - Distractor patterns: [Wrong sign on n, reciprocal errors, fraction errors]
 * - Constraints: [k > 0, factor is k-x]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_1024 = {
  metadata: {
    id: "1024",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const m = getRandomInt(20, 40);

    // If factor is (k-x), then root is x=k
    // P(k) = -k² + (1/m)nk² = 0
    // So (1/m)n = 1, thus n = m

    // STEP 2: Create options
    // Wrong choices used to carry vague reasons ("may result from confusing
    // the reciprocal relationship"); each now names the actual slip.
    const optionsData = [
      { text: `$-${m}$`, isCorrect: false, reason: `$-${m}$ results from dropping the negative sign on $-x^{2}$, which gives $k^{2}+\\frac{nk^{2}}{${m}}=0$ and so $n=-${m}$` },
      { text: `$-\\frac{1}{${m}}$`, isCorrect: false, reason: `$-\\frac{1}{${m}}$ results from dropping the negative sign on $-x^{2}$ and also dividing by ${m} instead of multiplying by ${m} in the last step` },
      { text: `$\\frac{1}{${m}}$`, isCorrect: false, reason: `$\\frac{1}{${m}}$ results from dividing by ${m} instead of multiplying by ${m} when solving $\\frac{n}{${m}}=1$` },
      { text: `$${m}$`, isCorrect: true, reason: '' }
    ];

    // STEP 3: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 4: Question text
    const questionText = `If $k-x$ is a factor of the expression $-x^{2}+\\frac{1}{${m}}nk^{2}$, where $n$ and $k$ are constants and $k>0$, what is the value of $n$?`;

    // STEP 5: Explanation
    const explanation = `Choice ${correctOption.letter} is correct. By the factor theorem, if $k-x$ is a factor of the expression, then the expression equals $0$ when $x=k$. Substituting $k$ for $x$ gives $-k^{2}+\\frac{nk^{2}}{${m}}=0$. Since $k>0$, $k^{2}$ is not zero, so dividing both sides by $k^{2}$ gives $-1+\\frac{n}{${m}}=0$, or $\\frac{n}{${m}}=1$. Multiplying both sides by ${m} gives $n=${m}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$${m}$`,
      explanation: explanation
    };
  }
};
