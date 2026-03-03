import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 628300a9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [5 stations, 6 tsp, 4 tsp (small integers)]
 * - Difficulty factors: [Expression building with remaining stations]
 * - Distractor patterns: [A: 5x, B: 10x, D: 10x+20 (wrong distribution)]
 * - Constraints: [Total stations = 5]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_628300a9 = {
  metadata: {
    // id: "628300a9",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const totalStations = getRandomInt(4, 8);
    const saltA = getRandomInt(4, 8); // Salt for Experiment A
    const saltB = getRandomInt(2, 5); // Salt for Experiment B
    
    // STEP 2: Build expression
    // x stations for A, (total-x) for B
    // Total salt = saltA * x + saltB * (total - x) = saltA*x + saltB*total - saltB*x = (saltA - saltB)*x + saltB*total
    const xCoeff = saltA - saltB;
    const constant = saltB * totalStations;
    
    const correctExpr = xCoeff >= 0 
      ? `${xCoeff}x + ${constant}`
      : `${constant} - ${Math.abs(xCoeff)}x`;
    
    // Alternative correct form if xCoeff is 1 or -1
    const correctExprDisplay = xCoeff === 1 
      ? `x + ${constant}`
      : xCoeff === -1 
      ? `${constant} - x`
      : correctExpr;
    
    // Distractors
    const distractorA = `${totalStations}x`;
    const distractorB = `${saltA + saltB}x`;
    const distractorD = xCoeff >= 0 
      ? `${saltA + saltB}x + ${constant}`
      : `${saltA + saltB}x + ${constant}`;
    
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "this would imply that the salt usage depends solely on the number of stations times ${totalStations}, which doesn't account for the different salt requirements" },
      { text: distractorB, isCorrect: false, reason: "this results from adding the two salt amounts (${saltA}+${saltB}) and multiplying by $x$, which incorrectly assumes all stations use Experiment A" },
      { text: correctExprDisplay, isCorrect: true },
      { text: distractorD, isCorrect: false, reason: "this results from an algebraic error in distributing or combining terms, incorrectly using the sum of salt amounts" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `1. **Identify the given information:**
   * Total number of stations = ${totalStations}.
   * Number of stations for Experiment A = $x$.
   * Salt required for one Experiment A station = ${saltA} teaspoons.
   * Salt required for one Experiment B station = ${saltB} teaspoons.

2. **Determine the number of stations for Experiment B:**
   Since there are ${totalStations} stations in total and $x$ are for Experiment A, the remaining stations are for Experiment B.
   Number of stations for Experiment B = ${totalStations} - $x$.

3. **Formulate the expression for total salt:**
   * Total salt from Experiment A stations = (Number of A stations) $\\\\times$ (Salt per A station) = $x \\\\times ${saltA} = ${saltA}x$.
   * Total salt from Experiment B stations = (Number of B stations) $\\\\times$ (Salt per B station) = (${totalStations} - $x$) $\\\\times ${saltB} = ${saltB}(${totalStations} - x)$.
   * Total salt required = (Salt from A) + (Salt from B) = ${saltA}x + ${saltB}(${totalStations} - x).

4. **Simplify the expression:**
   Total salt = ${saltA}x + ${saltB * totalStations} - ${saltB}x
   Combine like terms (${saltA}x and $-${saltB}x$):
   Total salt = ${correctExprDisplay}.

Therefore, the correct expression is $${correctExprDisplay}$.

Choice ${correctLetter} is correct.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.

Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.

Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `A science teacher is preparing the $${totalStations}$ stations of a science laboratory. Each station will have either Experiment A materials or Experiment B materials, but not both. Experiment A requires $${saltA}$ teaspoons of salt, and Experiment B requires $${saltB}$ teaspoons of salt. If $x$ is the number of stations that will be set up for Experiment A and the remaining stations will be set up for Experiment B, which of the following expressions represents the total number of teaspoons of salt required?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctExprDisplay,
      explanation: explanation
    };
  }
};