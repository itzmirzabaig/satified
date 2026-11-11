import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1015
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [complex rational expressions with factoring]
 * - Difficulty factors: [Factoring denominator, finding common denominator, distributing carefully]
 * - Distractor patterns: [Wrong factoring, wrong common denominator, distribution errors]
 * - Constraints: [Must factor xy from second denominator]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_1015 = {
  metadata: {
    id: "1015",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const c = getRandomInt(8, 15);
    const a = getRandomInt(5, 10);

    const linearCoeff = c + 1;

    // STEP 2: Create options
    // Before: the wrong choices were explained only as "conceptual or
    // calculation errors", and one choice was used twice in a nonsense pairing.
    // Each wrong choice now comes from a named slip.
    const correctNumerator = `xy^{2}+${linearCoeff}xy-${a}y`;
    const correctDenominator = `x^{2}y-${a}xy`;
    const correctAnswer = `$\\frac{${correctNumerator}}{${correctDenominator}}$`;

    // Slip 1: product of the two denominators, (x-a)(x^2y-axy) = xy(x-a)^2,
    // used as the denominator while the numerator is built for xy(x-a).
    const productDen = `x^{3}y-${2 * a}x^{2}y+${a * a}xy`;
    // Slip 2: adding numerators and adding denominators straight across.
    const straightNum = `xy-${a - 1}y+${c}`;
    const straightDen = `x^{2}y-${a}xy+x-${a}`;
    // Slip 3: dropping the xy term when expanding y(x-a), leaving only -ay.
    const droppedNum = `xy^{2}+${c}xy-${a}y`;

    const optionsData = [
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: `$\\frac{${correctNumerator}}{${productDen}}$`, isCorrect: false, reason: `this expression uses the product of the two denominators, $(x-${a})(x^{2}y-${a}xy) = ${productDen}$, as the denominator while keeping the numerator built for the common denominator $xy(x-${a})$` },
      { text: `$\\frac{${straightNum}}{${straightDen}}$`, isCorrect: false, reason: `this expression results from adding the numerators, $(y+${c}) + y(x-${a})$, and adding the denominators, $(x-${a}) + (x^{2}y-${a}xy)$, instead of using a common denominator` },
      { text: `$\\frac{${droppedNum}}{${correctDenominator}}$`, isCorrect: false, reason: `this expression results from expanding $y(x-${a})$ as $-${a}y$ only, which drops the $xy$ term, so the $xy$ coefficient is ${c} instead of ${linearCoeff}` }
    ];

    // STEP 3: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 4: Question text
    const questionText = `Which expression is equivalent to $\\frac{y+${c}}{x-${a}}+\\frac{y(x-${a})}{x^{2}y-${a}xy}$?`;

    // STEP 5: Explanation (plain sentences, inline math)
    const explanation = `Choice ${correctOption.letter} is correct. The denominator of the second fraction factors as $x^{2}y-${a}xy = xy(x-${a})$, so $xy(x-${a})$ is a common denominator. Multiplying the numerator and denominator of the first fraction by $xy$ gives $\\frac{xy(y+${c})}{xy(x-${a})}$, and the second fraction is already $\\frac{y(x-${a})}{xy(x-${a})}$. Adding the numerators gives $xy(y+${c}) + y(x-${a}) = xy^{2} + ${c}xy + xy - ${a}y = ${correctNumerator}$. So the sum is $\\frac{${correctNumerator}}{xy(x-${a})}$, which is $\\frac{${correctNumerator}}{${correctDenominator}}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
