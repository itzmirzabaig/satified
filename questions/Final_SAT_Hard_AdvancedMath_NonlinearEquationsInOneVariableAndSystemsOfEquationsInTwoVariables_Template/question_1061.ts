import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1061
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [-2x²+20x+c=0, exactly one solution, find c]
 * - Difficulty factors: [Negative leading coefficient, discriminant = 0]
 * - Distractor patterns: [A:-68=miscalculated, B:-50=correct, C:-32=miscalculated, D:0=wrong]
 * - Constraints: [Quadratic with negative leading coefficient, discriminant=0]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1061 = {
  metadata: {
    id: "1061",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Equation: ax² + bx + c = 0 with a negative. Exactly one solution requires
    // discriminant b² - 4ac = 0, i.e. c = b²/(4a). Construct b = 2·|a|·m so that
    // c = -|a|·m² is ALWAYS a negative integer (no float artifacts for any draw).

    const aPos = getRandomInt(2, 5);
    const a = -aPos; // Negative leading coefficient
    const m = getRandomInt(3, 6);
    const b = 2 * aPos * m; // guarantees b² divisible by 4|a|

    const cValue = -aPos * m * m; // = b²/(4a), always a negative integer (-18 .. -180)

    // Distractors — constructed to always differ from cValue, from 0, and from each other:
    // signError is positive, cValue is negative, arithError is strictly below cValue.
    const signError = -cValue; // from treating the leading coefficient as +|a|
    const arithError = cValue - getRandomInt(10, 20);
    const distractorZero = 0;

    // STEP 2: Create options
    const optionsData = [
      { text: `$${arithError}$`, isCorrect: false, reason: `results from an arithmetic error when solving for $c$` },
      { text: `$${cValue}$`, isCorrect: true, reason: `` },
      { text: `$${signError}$`, isCorrect: false, reason: `results from a sign error: using $a = ${aPos}$ instead of $a = ${a}$ when solving $b^2 - 4ac = 0$` },
      { text: `$${distractorZero}$`, isCorrect: false, reason: `would make the equation $${a}x^2 + ${b}x = 0$, which factors as $x(${a}x + ${b}) = 0$ and has two distinct solutions` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. A quadratic equation has exactly one solution when its discriminant equals 0. Here $a = ${a}$ and $b = ${b}$, so the discriminant is $b^2 - 4ac = (${b})^2 - 4(${a})c = ${b * b} + ${4 * aPos}c$. Setting this equal to 0 gives $c = -\\frac{${b * b}}{${4 * aPos}} = ${cValue}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `$${a}x^2 + ${b}x + c = 0$\n\nIn the given equation, $c$ is a constant. The equation has exactly one solution. What is the value of $c$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
