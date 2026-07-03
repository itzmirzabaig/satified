import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 762
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient a: 3-6, k integer, f(5) given, find f(10)]
 * - Difficulty factors: [Two-step: find k, then evaluate at new point]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [k must be integer for clean arithmetic]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 *
 * FIXED:
 * - Answer-first construction: pick integer k directly, then set f(5) = 5a + 4k.
 *   This guarantees integer k (no float) and removes the previously UNBOUNDED
 *   retry loop that adjusted the target value until k came out integer.
 * - Balanced the explanation's $...$ delimiters (the "4k = ..." step was bare
 *   text with a stray closing $).
 * - Dropped unused getRandomElement/shuffle imports (fill-in needs neither).
 */

export const generator_762 = {
  metadata: {
    id: "762",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (answer-first, all integers)
    // f(x) = a*x + k*(x - 1), with a and k positive integers.
    const a = getRandomInt(3, 6);       // leading coefficient (3..6)
    const k = getRandomInt(2, 7);       // constant multiplier (2..7)
    const knownPoint = 5;
    const evalPoint = 10;

    // STEP 2: Derive the given value f(5) = 5a + 4k (integer by construction).
    // f(x) = a*x + k*(x - 1)  =>  f(5) = 5a + k*(5 - 1) = 5a + 4k
    const givenVal = a * knownPoint + k * (knownPoint - 1);

    // STEP 3: Evaluate at x = 10.  f(10) = 10a + k*(10 - 1) = 10a + 9k
    const fAtEval = a * evalPoint + k * (evalPoint - 1);

    // STEP 4: Return question data (fill-in: plain integer string)
    return {
      questionText: `The function $f$ is defined by $f(x)=${a}x+k(x-1)$, where $k$ is a constant, and $f(${knownPoint})=${givenVal}$. What is the value of $f(${evalPoint})$?`,
      figureCode: null,
      options: [],
      correctAnswer: fAtEval.toString(),
      explanation: `First find $k$. Substituting $x=${knownPoint}$ gives $f(${knownPoint}) = ${a}(${knownPoint}) + k(${knownPoint}-1) = ${a * knownPoint} + ${knownPoint - 1}k$. Setting $f(${knownPoint})=${givenVal}$ and solving gives $k = \\frac{${givenVal} - ${a * knownPoint}}{${knownPoint - 1}} = ${k}$. Then $f(x) = ${a}x + ${k}(x-1) = ${a + k}x - ${k}$, so $f(${evalPoint}) = ${a + k}(${evalPoint}) - ${k} = ${fAtEval}$.`
    };
  }
};
