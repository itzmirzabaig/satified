import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: f5c3e3b8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [exponents: 4, 4, -1, 1, 5, 3 (small integers)]
 * - Difficulty factors: [Exponent rules: multiplying powers means adding exponents]
 * - Distractor patterns: [A: multiplying exponents instead of adding, C: random errors, D: inconsistent operations]
 * - Constraints: [Must handle negative exponents correctly]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_f5c3e3b8 = {
  metadata: {
    // id: "f5c3e3b8",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const m1 = getRandomInt(2, 5);
    const m2 = getRandomInt(1, 3);
    const q1 = getRandomInt(2, 5);
    const q2 = getRandomInt(3, 6);
    const z1 = getRandomInt(-3, -1);
    const z2 = getRandomInt(2, 4);

    const mResult = m1 + m2;
    const qResult = q1 + q2;
    const zResult = z1 + z2;

    const m = 'm';
    const q = 'q';
    const z = 'z';

    const correctText = `$m^{${mResult}} q^{${qResult}} z^{${zResult}}$`;

    const optionsData = [
      { text: `$m^{${m1}} q^{${q1 * q2}} z^{${z1 * z2}}$`, isCorrect: false, reason: "multiplying exponents instead of adding" },
      { text: correctText, isCorrect: true, reason: "correctly adds exponents when multiplying like bases" },
      { text: `$m^{${mResult + 1}} q^{${qResult}} z^{${zResult}}$`, isCorrect: false, reason: "calculation error" },
      { text: `$m^{${m1 * m2}} q^{${qResult}} z^{${zResult}}$`, isCorrect: false, reason: "inconsistent operations" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Which expression is equivalent to $\\left(m^{${m1}} q^{${q1}} z^{${z1}}\\right)\\left(m^{${m2}} q^{${q2}} z^{${z2}}\\right)$, where $m$, $q$, and $z$ are positive?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. When multiplying terms with the same base, add their exponents: $x^{a} \\cdot x^{b} = x^{a+b}$. For $m$: $${m1}+${m2}=${mResult}$. For $q$: $${q1}+${q2}=${qResult}$. For $z$: $${z1}+${z2}=${zResult}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} ${incorrectOptions[2].reason}.`
    };
  }
};