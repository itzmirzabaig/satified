import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1161
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [totalStations 4-8, saltA 4-8 tsp, saltB 2-5 tsp]
 * - Difficulty factors: [Expression building with remaining stations]
 * - Distractor patterns: [A: total*x, B: (saltA+saltB)*x, D: (saltA+saltB)x + constant]
 * - Constraints: [x A-stations, (total-x) B-stations; coeff of x = saltA-saltB]
 * - Question type: [Word Problem -> Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1161 = {
  metadata: {
    id: "1161",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values with guards.
    // Total salt = saltA*x + saltB*(total - x) = (saltA - saltB)*x + saltB*total.
    // Guards: xCoeff != 0 (genuine linear-in-x answer, no "0x"),
    //         totalStations != saltA + saltB (keeps distractorA != distractorB).
    let totalStations = 0, saltA = 0, saltB = 0;
    let tries = 0;
    do {
      totalStations = getRandomInt(4, 8);
      saltA = getRandomInt(4, 8);   // teaspoons per Experiment A station
      saltB = getRandomInt(2, 5);   // teaspoons per Experiment B station
      tries++;
    } while (
      tries < 50 &&
      (saltA - saltB === 0 || totalStations === saltA + saltB)
    );

    // STEP 2: Build the simplified expression (saltA - saltB)*x + saltB*total.
    const xCoeff = saltA - saltB;
    const constant = saltB * totalStations;
    const sumSalt = saltA + saltB;

    // Correct expression string (plain math, no surrounding $).
    const correctExpr =
      xCoeff === 1
        ? `x + ${constant}`
        : xCoeff === -1
        ? `${constant} - x`
        : xCoeff > 0
        ? `${xCoeff}x + ${constant}`
        : `${constant} - ${Math.abs(xCoeff)}x`;

    // STEP 3: Distractors.
    // A: treats every station as if it uses the same amount (total * x).
    // B: adds the two per-station amounts and multiplies by x, ignoring the split.
    // D: uses the summed coefficient but keeps the correct constant term.
    const distractorA = `${totalStations}x`;
    const distractorB = `${sumSalt}x`;
    const distractorD = `${sumSalt}x + ${constant}`;

    const optionsData = [
      {
        text: distractorA,
        isCorrect: false,
        reason: `this multiplies the total number of stations by $x$, treating every station as if it needed the same $${totalStations}$ teaspoons and ignoring the two different salt amounts`
      },
      {
        text: distractorB,
        isCorrect: false,
        reason: `this adds the two salt amounts ($${saltA} + ${saltB} = ${sumSalt}$) and multiplies by $x$, which incorrectly assumes all $${totalStations}$ stations use the same combined amount`
      },
      { text: correctExpr, isCorrect: true },
      {
        text: distractorD,
        isCorrect: false,
        reason: `this uses the sum of the two salt amounts ($${sumSalt}$) as the coefficient of $x$ instead of the difference $${saltA} - ${saltB} = ${xCoeff}$, an error when combining like terms`
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Coefficient of x as it appears when combining like terms (handles sign,
    // and renders +/-1 as x / -x rather than 1x / -1x).
    const xTerm =
      xCoeff === 1 ? `x`
      : xCoeff === -1 ? `-x`
      : `${xCoeff}x`;
    const combineStep = `${saltA}x - ${saltB}x = ${xTerm}`;

    const explanation = `1. **Identify the given information:**
   * Total number of stations = ${totalStations}.
   * Number of stations for Experiment A = $x$.
   * Salt required for one Experiment A station = ${saltA} teaspoons.
   * Salt required for one Experiment B station = ${saltB} teaspoons.

2. **Determine the number of Experiment B stations:**
   Since there are ${totalStations} stations in total and $x$ are for Experiment A, the remaining stations are for Experiment B: $${totalStations} - x$.

3. **Formulate the expression for total salt:**
   * Salt from Experiment A stations $= ${saltA} \\times x = ${saltA}x$.
   * Salt from Experiment B stations $= ${saltB}(${totalStations} - x)$.
   * Total salt $= ${saltA}x + ${saltB}(${totalStations} - x)$.

4. **Simplify the expression:**
   Distribute: $${saltA}x + ${constant} - ${saltB}x$.
   Combine like terms: $${combineStep}$, giving a constant of $${constant}$.
   Total salt $= ${correctExpr}$.

Therefore, the correct expression is $${correctExpr}$.

Choice ${correctLetter} is correct.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.

Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.

Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A science teacher is preparing the ${totalStations} stations of a science laboratory. Each station will have either Experiment A materials or Experiment B materials, but not both. Experiment A requires ${saltA} teaspoons of salt, and Experiment B requires ${saltB} teaspoons of salt. If $x$ is the number of stations that will be set up for Experiment A and the remaining stations will be set up for Experiment B, which of the following expressions represents the total number of teaspoons of salt required?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctExpr,
      explanation: explanation
    };
  }
};
