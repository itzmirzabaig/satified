import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1161
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [totalStations 4-8, saltA 4-8 tsp, saltB 2-5 tsp]
 * - Difficulty factors: [Expression building with remaining stations]
 * - Constraints: [x A-stations, (total-x) B-stations; coeff of x = saltA-saltB]
 * - Question type: [Word Problem -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * Previously two wrong choices (total*x and (saltA+saltB)*x) were not slips a
 * student would make, the stem did not say the salt amounts are per station,
 * and the explanation used markdown. The wrong choices are now real slips:
 * a sign slip when distributing, forgetting to subtract x, and swapping the
 * two salt amounts.
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
    // STEP 1: Draw values. Total salt = saltA*x + saltB*(total - x)
    //                                  = (saltA - saltB)*x + saltB*total.
    // saltA != saltB keeps a genuine x term and keeps all four choices distinct.
    let totalStations = 0, saltA = 0, saltB = 0;
    do {
      totalStations = getRandomInt(4, 8);
      saltA = getRandomInt(4, 8);   // teaspoons per Experiment A station
      saltB = getRandomInt(2, 5);   // teaspoons per Experiment B station
    } while (saltA === saltB);

    const xCoeff = saltA - saltB;
    const constant = saltB * totalStations;
    const sumSalt = saltA + saltB;

    // Linear expression kx + m (renders +/-1 as x and -x, never 1x).
    const linear = (k: number, m: number): string =>
      k === 1 ? `x + ${m}`
      : k === -1 ? `${m} - x`
      : k > 0 ? `${k}x + ${m}`
      : `${m} - ${Math.abs(k)}x`;
    const correctExpr = linear(xCoeff, constant);

    // STEP 2: Wrong choices, each a specific slip.
    const signSlip = `${sumSalt}x + ${constant}`;                 // saltB(total - x) -> + saltB x
    const noSubtract = `${saltA}x + ${constant}`;                 // B stations taken as all stations
    // amounts swapped: saltB*x + saltA*(total - x)
    const swapped = linear(saltB - saltA, saltA * totalStations);

    const optionsData = [
      { text: correctExpr, isCorrect: true, reason: '' },
      {
        text: signSlip,
        isCorrect: false,
        reason: `$${signSlip}$ comes from a sign slip when distributing, writing $${saltB}(${totalStations} - x)$ as $${constant} + ${saltB}x$ instead of $${constant} - ${saltB}x$`
      },
      {
        text: noSubtract,
        isCorrect: false,
        reason: `$${noSubtract}$ uses all $${totalStations}$ stations for Experiment B instead of the remaining $${totalStations} - x$ stations, so the stations for Experiment A are counted twice`
      },
      {
        text: swapped,
        isCorrect: false,
        reason: `$${swapped}$ swaps the two salt amounts, giving $${saltB}x + ${saltA}(${totalStations} - x)$, which uses $${saltB}$ teaspoons for each Experiment A station and $${saltA}$ teaspoons for each Experiment B station`
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const xTerm = xCoeff === 1 ? `x` : xCoeff === -1 ? `-x` : `${xCoeff}x`;

    const explanation = `Choice ${correctOption.letter} is correct. Since $x$ of the $${totalStations}$ stations are set up for Experiment A, the remaining $${totalStations} - x$ stations are set up for Experiment B. The Experiment A stations need $${saltA}x$ teaspoons of salt, and the Experiment B stations need $${saltB}(${totalStations} - x)$ teaspoons of salt. So the total is $${saltA}x + ${saltB}(${totalStations} - x)$ teaspoons. Distributing gives $${saltA}x + ${constant} - ${saltB}x$, and combining like terms, $${saltA}x - ${saltB}x = ${xTerm}$, gives $${correctExpr}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A science teacher is preparing the ${totalStations} stations of a science laboratory. Each station will have either Experiment A materials or Experiment B materials, but not both. Each station set up for Experiment A requires ${saltA} teaspoons of salt, and each station set up for Experiment B requires ${saltB} teaspoons of salt. If $x$ is the number of stations that will be set up for Experiment A and the remaining stations will be set up for Experiment B, which of the following expressions represents the total number of teaspoons of salt required?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctExpr,
      explanation: explanation
    };
  }
};
