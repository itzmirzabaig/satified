import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 497
*
* ORIGINAL ANALYSIS:
* - Number ranges: [t = 4u, asks for 2t, answer: 8u]
* - Difficulty factors: [Algebraic substitution, simple multiplication]
* - Distractor patterns: [A: 8u (correct), B: 2u (divided), C: u (confused relationship), D: 1/2u (inverted)]
* - Constraints: [Simple substitution]
* - Question type: [Multiple Choice Text with algebraic expressions]
* - Figure generation: [None]
*/

export const generator_497 = {
  metadata: {
    id: "497",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Skip coefficient = multiplier^2 (e.g. 4 and 2), where 4 / 2 would equal
    // the multiplier choice.
    let coefficient = 0, multiplier = 0;
    do {
      coefficient = getRandomInt(3, 6);
      multiplier = getRandomInt(2, 4);
    } while (coefficient === multiplier * multiplier || coefficient === multiplier);
    const c = coefficient, k = multiplier;
    const resultCoefficient = k * c;
    const correctAnswer = `${resultCoefficient}u`;

    // Wrong choices are real slips: adding the numbers, dropping the
    // coefficient of u, and dividing the coefficient by the multiplier. Their
    // reasons used to be "incorrect multiplication," "an invalid
    // relationship," and "inversion."
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const g = gcd(c, k);
    const divided = c % k === 0 ? `${c / k}u` : `\\frac{${c / g}}{${k / g}}u`;
    const optionsData = [
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: `${k + c}u`, isCorrect: false, reason: `$${k + c}u$ results from adding ${k} and ${c} instead of multiplying them` },
      { text: `${k}u`, isCorrect: false, reason: `$${k}u$ results from replacing $t$ with $u$ instead of with $${c}u$` },
      { text: divided, isCorrect: false, reason: `$${divided}$ results from dividing ${c} by ${k} instead of multiplying` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Since $t = ${c}u$, substituting $${c}u$ for $t$ in $${k}t$ gives $${k}(${c}u)$, which is equivalent to $${resultCoefficient}u$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `If $t = ${c}u$, which of the following is equivalent to $${k}t$?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
