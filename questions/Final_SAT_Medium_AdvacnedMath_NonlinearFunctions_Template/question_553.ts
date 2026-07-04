import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 553
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table: (-1,10), (0,14), (1,20), quadratic f(x) = x² + 5x + 14]
 * - Difficulty factors: [Finding quadratic from three points, testing values]
 * - Distractor patterns: [Various coefficient combinations]
 * - Constraints: [f(0) = 14 gives constant term, test other points]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_553 = {
  metadata: {
    id: "553",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: f(x) = x² + 5x + 14
    // Randomize: quadratic f(x) = ax² + bx + c with a=1, and table values
    const b = getRandomInt(3, 8); // linear coefficient
    const c = getRandomInt(10, 20); // constant/y-intercept
    const a = 1; // keep simple
    
    // STEP 2: Calculate table values
    const y_neg1 = a * 1 + b * (-1) + c; // 1 - b + c
    const y_0 = c;
    const y_1 = a * 1 + b * 1 + c; // 1 + b + c
    
    // STEP 3: Build table code
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">$x$</th><th style="border: 1px solid currentColor; padding: 8px;">$f(x)$</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">-1</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y_neg1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">0</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y_0}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">1</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y_1}</td></tr></tbody></table>`;
    
    // STEP 4: Build question text
    const questionText = `For the quadratic function $f$, the table shows three values of $x$ and their corresponding values of $f(x)$. Which equation defines $f$?`;
    
    // STEP 5: Create options with tracking.
    // Render a quadratic ax^2 + dx + e in canonical form: drop a coefficient of
    // 1, render a leading coefficient of 0 as a linear function, and use proper
    // signs so no two distinct-looking strings are mathematically equal.
    const formatQuadratic = (qa: number, qd: number, qe: number): string => {
      let s = '';
      // leading (x^2) term
      if (qa !== 0) {
        s += qa === 1 ? 'x^2' : qa === -1 ? '-x^2' : `${qa}x^2`;
      }
      // linear (x) term
      if (qd !== 0) {
        const mag = Math.abs(qd) === 1 ? 'x' : `${Math.abs(qd)}x`;
        if (s === '') {
          s += qd < 0 ? `-${mag}` : mag;
        } else {
          s += qd < 0 ? ` - ${mag}` : ` + ${mag}`;
        }
      }
      // constant term
      if (qe !== 0 || s === '') {
        if (s === '') {
          s += `${qe}`;
        } else {
          s += qe < 0 ? ` - ${Math.abs(qe)}` : ` + ${qe}`;
        }
      }
      return `$f(x) = ${s}$`;
    };

    // Correct: a=1, b, c. Distractors are genuinely different quadratics that
    // all FAIL at least one table value, and are guaranteed distinct from the
    // correct function (each changes the x^2 coefficient to something != 1, so
    // f(1)=1+b+c can never be reproduced with the same b and c).
    const correctText = formatQuadratic(1, b, c);
    const optionsData = [
      // wrong x^2 coeff (2), keeps b and c -> f(1) = 2 + b + c != y_1
      { text: formatQuadratic(2, b, c), isCorrect: false, reason: `has a leading coefficient of 2, giving $f(1) = 2 + ${b} + ${c} = ${2 + b + c}$, which does not match the table value of ${y_1}` },
      { text: correctText, isCorrect: true },
      // wrong linear coeff (b+3), keeps a=1 and c -> f(1) = 1 + (b+3) + c != y_1
      { text: formatQuadratic(1, b + 3, c), isCorrect: false, reason: `uses a linear coefficient of ${b + 3}, giving $f(1) = 1 + ${b + 3} + ${c} = ${1 + (b + 3) + c}$, which does not match the table value of ${y_1}` },
      // linear function (no x^2 term), keeps b and c -> f(1) = b + c != y_1
      { text: formatQuadratic(0, b, c), isCorrect: false, reason: `is linear (no $x^2$ term), giving $f(1) = ${b} + ${c} = ${b + c}$, which does not match the table value of ${y_1}` }
    ];
    
    // STEP 6: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = correctText;
    
    // STEP 7: Build explanation with dynamic letters
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. From the table, $f(0) = ${c}$, so the constant term is ${c}. Testing $x=1$ in choice ${correctLetter}: $1^2 + ${b}(1) + ${c} = ${1 + b + c} = ${y_1}$ ✓. Testing $x=-1$: $(-1)^2 + ${b}(-1) + ${c} = 1 - ${b} + ${c} = ${y_neg1}$ ✓. This matches the table. Choice ${incorrectOptions[0].letter} is incorrect because it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because it ${incorrectOptions[2].reason}.`;
    
    // STEP 8: Return question data
    return {
      questionText: questionText,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
