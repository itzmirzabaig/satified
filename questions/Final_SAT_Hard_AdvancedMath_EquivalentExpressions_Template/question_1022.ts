import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1022
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerators: single digit, denominators: linear expressions]
 * - Difficulty factors: [Rational expression subtraction, common denominators, distribution with negatives]
 * - Distractor patterns: [Sign errors, forgetting to distribute negative, wrong common denominator]
 * - Constraints: [None specific]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_1022 = {
  metadata: {
    id: "1022",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Format coeff·x + konst as a clean linear expression string
    const formatLinear = (coeff: number, konst: number): string => {
      if (coeff === 0) return konst.toString();
      const xPart = coeff === 1 ? 'x' : coeff === -1 ? '-x' : `${coeff}x`;
      if (konst === 0) return xPart;
      return `${xPart}${konst >= 0 ? '+' : '-'}${Math.abs(konst)}`;
    };

    // STEP 1: Generate parameters
    // a/(bx-c) - 1/(x+d) = [a(x+d) - (bx-c)] / [(x+d)(bx-c)]
    //                    = [(a-b)x + (ad+c)] / [(x+d)(bx-c)]
    // Guards (bounded retry, then safe fallback):
    //  - a*d - c !== 0, so the sign-error distractor is never the zero fraction
    //  - !(a === b && a*d - c === a - 1), so the sign-error distractor never
    //    collides with the "subtract numerators only" distractor
    let a = 5, b = 2, c = 3, d = 2; // safe fallback satisfying both guards
    for (let tries = 0; tries < 50; tries++) {
      const aT = getRandomInt(3, 6);
      const bT = getRandomInt(2, 5);
      const cT = getRandomInt(2, 6);
      const dT = getRandomInt(1, 4);
      const signErrConst = aT * dT - cT;
      if (signErrConst !== 0 && !(aT === bT && signErrConst === aT - 1)) {
        a = aT; b = bT; c = cT; d = dT;
        break;
      }
    }

    const numCoeff = a - b;
    const numConst = a * d + c;
    const denom = `(x+${d})(${b}x-${c})`;

    // STEP 2: Build the correct answer expression
    const numerator = formatLinear(numCoeff, numConst);
    const correctAnswerText = `\\frac{${numerator}}{${denom}}`;

    // STEP 3: Create distractors
    // Subtracting numerators without rewriting over the common denominator
    const distractorA = `\\frac{${a - 1}}{${denom}}`;

    // Subtracting numerators and denominators separately
    const distractorB = `\\frac{${a - 1}}{${formatLinear(b - 1, -(c + d))}}`;

    // Sign error: negative not distributed across (bx - c)
    const wrongNumerator = formatLinear(numCoeff, a * d - c);
    const distractorC = `\\frac{${wrongNumerator}}{${denom}}`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "results from subtracting the numerators directly without first rewriting each fraction over the common denominator" },
      { text: distractorB, isCorrect: false, reason: "results from incorrectly subtracting the numerators and the denominators separately" },
      { text: distractorC, isCorrect: false, reason: `results from not distributing the negative sign across $(${b}x-${c})$, which changes the constant term of the numerator from ${numConst} to ${a * d - c}` },
      { text: correctAnswerText, isCorrect: true }
    ];
    
    // STEP 4: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 5: Question text
    const questionText = `Which expression is equivalent to $\\frac{${a}}{${b}x-${c}} - \\frac{1}{x+${d}}$?`;
    
    // STEP 6: Explanation
    const explanation = `Choice ${correctLetter} is correct. To subtract these fractions, rewrite them with a common denominator of $(x+${d})(${b}x-${c})$.

The first term: $\\frac{${a}}{${b}x-${c}} \\cdot \\frac{x+${d}}{x+${d}} = \\frac{${a}(x+${d})}{(x+${d})(${b}x-${c})} = \\frac{${a}x+${a * d}}{(x+${d})(${b}x-${c})}$

The second term: $\\frac{1}{x+${d}} \\cdot \\frac{${b}x-${c}}{${b}x-${c}} = \\frac{${b}x-${c}}{(x+${d})(${b}x-${c})}$

Subtracting: $\\frac{${a}x+${a * d}}{(x+${d})(${b}x-${c})} - \\frac{${b}x-${c}}{(x+${d})(${b}x-${c})} = \\frac{(${a}x+${a * d}) - (${b}x-${c})}{(x+${d})(${b}x-${c})}$

Simplifying the numerator: $(${a}x+${a * d}) - (${b}x-${c}) = ${a}x+${a * d}-${b}x+${c} = ${numerator}$

This gives $\\frac{${numerator}}{(x+${d})(${b}x-${c})}$.

Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswerText,
      explanation: explanation
    };
  }
};
