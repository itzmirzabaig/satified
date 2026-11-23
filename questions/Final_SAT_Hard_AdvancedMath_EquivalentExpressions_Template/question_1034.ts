import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1034
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [difference of squares pattern with substitution]
 * - Difficulty factors: [Recognizing hidden difference of squares, substitution, factoring pattern]
 * - Distractor patterns: [squaring the sum, squaring the difference, subtracting the squares in the wrong order]
 * - Constraints: [a = c + d or a = c - d; leading term m^2 x^2 with m from 1 to 5]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_1034 = {
  metadata: {
    id: "1034",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Before: the question was fully fixed (same stem and answer every draw),
    // one wrong choice (x^2 - ax - a^2) was not a real student slip and had a
    // vague reason, and the explanation used display math split over lines.
    // Now the leading coefficient and the sign of d vary, every wrong choice
    // is a named slip, and the explanation is one paragraph.

    // STEP 1: Parameters
    const m = getRandomInt(1, 5);               // leading term is (m x)^2
    const plus = getRandomElement([true, false]); // a = c + d or a = c - d
    const mx = m === 1 ? 'x' : `${m}x`;
    const m2x2 = m === 1 ? 'x^{2}' : `${m * m}x^{2}`;
    const twoAx = `${2 * m}ax`;                 // middle term 2(m x)(a)

    const aDef = plus ? 'c+d' : 'c-d';
    const middleSign = plus ? '-' : '+';        // x^2 - c^2 -/+ 2cd - d^2
    const trinomial = plus ? 'c^{2}+2cd+d^{2}' : 'c^{2}-2cd+d^{2}';
    const expr = `${m2x2}-c^{2}${middleSign}2cd-d^{2}`;

    // STEP 2: Options
    const optionsData = [
      { text: `$(${mx}+a)(${mx}-a)$`, isCorrect: true, reason: '' },
      { text: `$(${mx}+a)^{2}$`, isCorrect: false, reason: `$(${mx}+a)^{2}$ expands to $${m2x2}+${twoAx}+a^{2}$, which squares a sum instead of factoring the difference of squares $${m2x2}-a^{2}$` },
      { text: `$(${mx}-a)^{2}$`, isCorrect: false, reason: `$(${mx}-a)^{2}$ expands to $${m2x2}-${twoAx}+a^{2}$, which squares a difference instead of factoring the difference of squares $${m2x2}-a^{2}$` },
      { text: `$(a+${mx})(a-${mx})$`, isCorrect: false, reason: `$(a+${mx})(a-${mx})$ equals $a^{2}-${m2x2}$, the opposite of the expression, which comes from subtracting the squares in the wrong order` }
    ];

    // STEP 3: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 4: Question text
    const questionText = `If $a=${aDef}$, which of the following is equivalent to the expression $${expr}$?`;

    // STEP 5: Explanation
    const explanation = `Choice ${correctOption.letter} is correct. Grouping the last three terms gives $${m2x2}-(${trinomial})$. The expression in parentheses is a perfect square trinomial: $${trinomial}=(${aDef})^{2}$. Since $a=${aDef}$, the expression becomes $${m2x2}-a^{2}$${m === 1 ? '' : `, which is $(${mx})^{2}-a^{2}$`}. This is a difference of squares, so it factors as $(${mx}+a)(${mx}-a)$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
