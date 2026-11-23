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

    // Before: one wrong choice was cValue minus a random offset, explained only
    // as "an arithmetic error". It is now the value from leaving the 4 out of
    // the discriminant: b^2 + |a|c = 0 gives c = -b^2/|a| = 4 * cValue.
    // cValue < 0, so cValue, -cValue, 4 * cValue and 0 are always distinct.
    const signError = -cValue; // from treating the leading coefficient as +|a|
    const noFourError = 4 * cValue;
    const distractorZero = 0;

    // b^2 reaches 3,600; inside math a comma must be written {,}.
    const bSq = (b * b).toLocaleString('en-US').replace(/,/g, '{,}');

    // STEP 2: Create options
    const optionsData = [
      { text: `$${noFourError}$`, isCorrect: false, reason: `$${noFourError}$ results from leaving the 4 out of the discriminant and solving $${bSq} + ${aPos}c = 0$` },
      { text: `$${cValue}$`, isCorrect: true, reason: `` },
      { text: `$${signError}$`, isCorrect: false, reason: `$${signError}$ results from using $a = ${aPos}$ instead of $a = ${a}$ when solving $b^2 - 4ac = 0$` },
      { text: `$${distractorZero}$`, isCorrect: false, reason: `$0$ results from assuming the constant term must vanish for a single solution, but $${a}x^2 + ${b}x = 0$ factors as $x(${a}x + ${b}) = 0$ and has two solutions, $x = 0$ and $x = ${2 * m}$` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. A quadratic equation has exactly one solution when its discriminant equals 0. Here $a = ${a}$ and $b = ${b}$, so the discriminant is $b^2 - 4ac = (${b})^2 - 4(${a})c = ${bSq} + ${4 * aPos}c$. Setting this equal to 0 gives $c = -\\frac{${bSq}}{${4 * aPos}} = ${cValue}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `$${a}x^2 + ${b}x + c = 0$\n\nIn the given equation, $c$ is a constant. The equation has exactly one solution. What is the value of $c$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
