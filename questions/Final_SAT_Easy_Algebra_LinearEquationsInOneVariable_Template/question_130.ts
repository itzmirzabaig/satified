import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 130
*
* ORIGINAL ANALYSIS:
* - Number ranges: [numer/denom: 2-6 (distinct, coprime), multiplier: 2-6]
* - Difficulty factors: [Fractional coefficient, two-step solving]
* - Distractor patterns: [divided by numerator only, multiplied by denominator
*   without dividing, assumed x equals the right-hand side]
* - Constraints: [Clean integer result; numer !== denom and gcd(numer,denom)=1
*   so the fraction is in lowest terms and no option can ever collide]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_130 = {
  metadata: {
    id: "130",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    let numer = getRandomInt(2, 6);
    let denom = getRandomInt(2, 6);
    let tries = 0;
    // Bounded retry: keep the fraction in lowest terms (also forces numer !== denom,
    // which guarantees the "x equals the right-hand side" distractor never equals
    // the correct answer).
    while (gcd(numer, denom) !== 1 && tries++ < 50) {
      numer = getRandomInt(2, 6);
      denom = getRandomInt(2, 6);
    }
    if (gcd(numer, denom) !== 1) { numer = 2; denom = 3; }

    const multiplier = getRandomInt(2, 6);
    const rightSide = numer * multiplier;
    const result = denom * multiplier; // x = rightSide * denom / numer = multiplier * denom

    // Collision-proof by construction (numer >= 2, denom >= 2, numer !== denom):
    //   result = denom*multiplier, dA = multiplier, dB = numer*multiplier*denom, dC = numer*multiplier
    const optionsData = [
      { text: result.toString(), isCorrect: true },
      { text: multiplier.toString(), isCorrect: false, reason: `it results from dividing ${rightSide} by ${numer} but not multiplying by ${denom}` },
      { text: (rightSide * denom).toString(), isCorrect: false, reason: `it results from multiplying ${rightSide} by ${denom} without dividing by ${numer}` },
      { text: rightSide.toString(), isCorrect: false, reason: `it assumes $x$ is equal to the right-hand side of the equation` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `In the equation $\\frac{${numer}x}{${denom}} = ${rightSide}$, what is the value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `To solve $\\frac{${numer}x}{${denom}} = ${rightSide}$ for $x$, multiply both sides of the equation by $\\frac{${denom}}{${numer}}$, the reciprocal of the coefficient of $x$. This gives $x = ${rightSide} \\cdot \\frac{${denom}}{${numer}} = \\frac{${rightSide * denom}}{${numer}} = ${result}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
