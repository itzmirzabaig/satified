import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 495
*
* ORIGINAL ANALYSIS:
* - Number ranges: [ratio x:y = r:t, x = r*m, answer: y = m*t]
* - Difficulty factors: [Proportion with variables, solving for expression]
* - Distractor patterns: [correct m*t; r*t (used numerator directly); r*m*t (no division); (m+r)*t (added instead)]
* - Constraints: [x = r*m so x/r = m is a clean integer coefficient]
* - Question type: [Multiple Choice Text with algebraic expressions]
* - Figure generation: [None]
*/

export const generator_495 = {
  metadata: {
    id: "495",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const ratioFirst = getRandomInt(10, 16);        // r  (numerator of the given ratio r : t)
    const multiplier = getRandomInt(11, 16);        // m  (the correct coefficient of t)
    const xValue = ratioFirst * multiplier;         // x = r * m  (so x / r = m exactly)
    const correctCoefficient = multiplier;          // y = m * t

    // Candidate distractor coefficients modelling real student errors.
    // Build a set of 4 DISTINCT coefficients so no two options can ever collide.
    const coefficients: number[] = [correctCoefficient];
    const addCoeff = (c: number): boolean => {
      if (c > 0 && !coefficients.includes(c)) { coefficients.push(c); return true; }
      return false;
    };

    // Error 1: read the ratio's first term as the answer (skips the division).
    addCoeff(ratioFirst);
    // Error 2: forget to divide entirely (leave the coefficient as x itself).
    addCoeff(xValue);
    // Error 3: add the two given numbers instead of dividing.
    addCoeff(multiplier + ratioFirst);

    // Backfill (bounded) in the unlikely event any candidate collided, so we
    // always reach exactly 4 distinct positive coefficients.
    let tries = 0;
    while (coefficients.length < 4 && tries++ < 50) {
      addCoeff(correctCoefficient + getRandomInt(1, 40));
    }

    const reasonFor = (c: number): string => {
      if (c === ratioFirst) return "using the first term of the ratio directly instead of dividing $x$ by it";
      if (c === xValue) return "forgetting to divide by the first term of the ratio";
      if (c === multiplier + ratioFirst) return "adding the two given numbers instead of dividing";
      return "a computational error";
    };

    const optionsData = coefficients.map((c, i) => ({
      text: `${c}t`,
      isCorrect: i === 0,
      reason: i === 0 ? null : reasonFor(c),
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Since $x$ to $y$ has the same ratio as the numbers given, you can write $\\frac{x}{y} = \\frac{${ratioFirst}}{t}$. Substituting $x = ${xValue}$ gives $\\frac{${xValue}}{y} = \\frac{${ratioFirst}}{t}$. Solving for $y$: $y = \\frac{${xValue}\\,t}{${ratioFirst}} = ${correctCoefficient}t$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; it results from ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it results from ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it results from ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The ratio $x$ to $y$ is equivalent to $x : y = ${ratioFirst} : t$. When $x = ${xValue}$, what is the value of $y$ in terms of $t$?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: `${correctCoefficient}t`,
      explanation: explanation
    };
  }
};
