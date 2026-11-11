import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1018
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerators: 2,3, denominators: linear factors, result: rx+t]
 * - Difficulty factors: [Rational expression addition, common denominators, distributing]
 * - Distractor patterns: [Wrong sign on r or t, not distributing 2 and 3, calculation errors]
 * - Constraints: [x > 2 to avoid division by zero, r and t must be positive]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_1018 = {
  metadata: {
    id: "1018",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate the equation parameters
    // Pattern: num1/(x-a) + num2/(x+b) = (rx+t)/((x-a)(x+b))
    // num1(x+b) + num2(x-a) = (num1+num2)x + (num1*b - num2*a), so
    // r = num1 + num2 and t = num1*b - num2*a.
    // The stem states r and t are POSITIVE, so t >= 1.
    // Before: the choice -rt was explained as "a sign error in the second
    // numerator", but that slip does not give -t. It is replaced by matching
    // each numerator with the wrong factor, which gives t' = num2*b - num1*a.
    // Redraw until all four choices are distinct and t' is positive (so the
    // slip still looks plausible next to "positive constants").
    let a = 0, b = 0, num1 = 0, num2 = 0, t = 0, tSwap = 0, r = 0;
    for (let tries = 0; tries < 500; tries++) {
      a = getRandomInt(2, 5);
      b = getRandomInt(3, 7);
      num1 = getRandomInt(2, 4);
      num2 = getRandomInt(2, 5);
      t = num1 * b - num2 * a;
      tSwap = num2 * b - num1 * a;
      r = num1 + num2;
      const vals = [r * t, r * (num1 * b + num2 * a), r + t, r * tSwap];
      if (t >= 1 && tSwap >= 1 && new Set(vals).size === 4) break;
      if (tries === 499) {
        // Known good fallback: t = 17, t' = 8, r = 5 (choices 85, 125, 22, 40)
        a = 2; b = 7; num1 = 3; num2 = 2;
        t = 17; tSwap = 8; r = 5;
      }
    }

    // STEP 2: Calculate correct answer
    const rt = r * t;
    const correctText = rt.toString();

    // STEP 3: Distractors, each a named slip
    const wrongT = num1 * b + num2 * a;
    const distractors = [
      { text: (r * wrongT).toString(), isCorrect: false, reason: `${r * wrongT} results from distributing $${num2}$ over $x-${a}$ as $${num2}x+${num2 * a}$, which gives $t = ${wrongT}$ instead of $t = ${t}$` },
      { text: (r + t).toString(), isCorrect: false, reason: `${r + t} is the sum $r + t$, not the product $rt$` },
      { text: (r * tSwap).toString(), isCorrect: false, reason: `${r * tSwap} results from multiplying ${num1} by $x-${a}$ and ${num2} by $x+${b}$, which gives $t = ${num2 * b} - ${num1 * a} = ${tSwap}$` }
    ];

    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      ...distractors
    ];

    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 5: Build question text
    const questionText = `The equation $ \\frac{${num1}}{x-${a}}+\\frac{${num2}}{x+${b}}=\\frac{rx+t}{(x-${a})(x+${b})} $ is true for all $x>${a}$, where $r$ and $t$ are positive constants. What is the value of $rt$?`;

    // STEP 6: Build explanation (one paragraph)
    const explanation = `Choice ${correctOption.letter} is correct. Rewrite each fraction on the left side with the common denominator $(x-${a})(x+${b})$. Multiplying the first fraction by $\\frac{x+${b}}{x+${b}}$ gives $\\frac{${num1}(x+${b})}{(x-${a})(x+${b})}$, and multiplying the second fraction by $\\frac{x-${a}}{x-${a}}$ gives $\\frac{${num2}(x-${a})}{(x-${a})(x+${b})}$. Adding the numerators gives $${num1}(x+${b})+${num2}(x-${a}) = ${num1}x+${num1 * b}+${num2}x-${num2 * a} = ${r}x+${t}$. Therefore $r = ${r}$ and $t = ${t}$, so $rt = ${r} \\cdot ${t} = ${rt}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
