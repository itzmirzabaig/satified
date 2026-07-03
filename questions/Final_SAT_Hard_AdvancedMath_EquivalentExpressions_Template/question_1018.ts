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
    // The stem states r and t are POSITIVE, so redraw (bounded) until t >= 1.
    let a = 2, b = 7, num1 = 4, num2 = 2;
    let t = num1 * b - num2 * a;
    let tries = 0;
    do {
      a = getRandomInt(2, 5);
      b = getRandomInt(3, 7);
      num1 = getRandomInt(2, 4);
      num2 = getRandomInt(2, 5);
      t = num1 * b - num2 * a;
      tries++;
    } while (t < 1 && tries < 50);
    if (t < 1) {
      // Deterministic known-good fallback (t = 4*7 - 2*2 = 24)
      a = 2; b = 7; num1 = 4; num2 = 2;
      t = num1 * b - num2 * a;
    }

    const r = num1 + num2;

    // STEP 2: Calculate correct answer
    const rt = r * t;
    const correctText = rt.toString();

    // STEP 3: Distractors — pairwise distinct from the answer and each other
    // for EVERY valid draw (with t >= 1, r in [4,9]):
    //   wrongRt = r*(num1*b + num2*a) >= 40 while rt <= r*t and r+t <= 33,
    //     and wrongRt - rt = 2*r*num2*a > 0;
    //   r + t = r*t would need t = r/(r-1), impossible for integers r >= 4;
    //   -rt < 0 < all others.
    const wrongT = num1 * b + num2 * a;
    const distractors = [
      { text: (r * wrongT).toString(), isCorrect: false, reason: `results from adding instead of subtracting when finding $t$, which gives $t = ${wrongT}$ rather than $t = ${t}$` },
      { text: (r + t).toString(), isCorrect: false, reason: `results from computing the sum $r + t$ instead of the product $rt$` },
      { text: (-rt).toString(), isCorrect: false, reason: `results from a sign error in the second numerator, which gives $t = -${t}$ and a negative product` }
    ];

    const optionsData = [
      { text: correctText, isCorrect: true },
      ...distractors
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 5: Build question text
    const questionText = `The equation $ \\frac{${num1}}{x-${a}}+\\frac{${num2}}{x+${b}}=\\frac{rx+t}{(x-${a})(x+${b})} $ is true for all $x>${a}$, where $r$ and $t$ are positive constants. What is the value of $rt$?`;
    
    // STEP 6: Build explanation
    const explanation = `Choice ${correctLetter} is correct. To combine the rational expressions on the left side, rewrite each with the common denominator $(x-${a})(x+${b})$.

Multiplying the first expression by $ \\frac{x+${b}}{x+${b}} $ gives $ \\frac{${num1}(x+${b})}{(x-${a})(x+${b})} $.

Multiplying the second expression by $ \\frac{x-${a}}{x-${a}} $ gives $ \\frac{${num2}(x-${a})}{(x-${a})(x+${b})} $.

Adding these: $ \\frac{${num1}(x+${b})+${num2}(x-${a})}{(x-${a})(x+${b})} = \\frac{${num1}x+${num1*b}+${num2}x-${num2*a}}{(x-${a})(x+${b})} = \\frac{${r}x+${t}}{(x-${a})(x+${b})} $.

Therefore, $r = ${r}$ and $t = ${t}$, so $rt = ${r} \\times ${t} = ${rt}$.

Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. 
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. 
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
