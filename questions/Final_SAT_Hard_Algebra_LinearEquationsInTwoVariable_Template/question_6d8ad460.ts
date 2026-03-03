import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 6d8ad460
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope of k: -5/6, perpendicular: 6/5]
 * - Difficulty factors: [Finding perpendicular slope from graph]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Negative reciprocal]
 * - Question type: [Figure → Fill in blank]
 * - Figure generation: [Line k with points only, NO line j]
 */

export const generator_6d8ad460 = {
  metadata: {
    // id: "6d8ad460",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const rise = getRandomInt(-6, -2);
    const run = getRandomInt(4, 8);
    const xInt = -getRandomInt(4, 8); // x-intercept (negative)
    const yInt = -getRandomInt(3, 8); // y-intercept (negative)
    
    const slopeK = (0 - yInt) / (xInt - 0); // rise/run = -yInt/xInt
    
    // Perpendicular slope (for answer only, not for display)
    const slopeJ = -1 / slopeK;
    
    // Simplify
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    // slopeJ = xInt/yInt (since slopeK = yInt/xInt)
    const num = Math.abs(xInt);
    const den = Math.abs(yInt);
    const divisor = gcd(num, den);
    
    const answerStr = `${xInt > 0 === yInt > 0 ? '' : '-'}\\frac{${num / divisor}}{${den / divisor}}`;
    
    // Line j REMOVED - only line k should be visible
    const mafsCode = `<Mafs pan={true} zoom={true} viewBox={{ x: [-8, 2], y: [-6, 2] }}>
  <Coordinates.Cartesian subdivisions={false} />
  <Plot.OfX y={(x) => ${slopeK} * x + ${yInt}} color="#1a7cff" />
  <Point x={${xInt}} y={0} />
  <Point x={0} y={${yInt}} />
</Mafs>`;
    
    return {
      questionText: `Line $k$ is shown in the xy-plane. Line $j$ is perpendicular to line $k$. What is the slope of line $j$?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: answerStr,
      explanation: `Slope of $k$ is $\\frac{${yInt}-0}{0-${Math.abs(xInt)}} = \\frac{${yInt}}{${xInt}} = ${slopeK.toFixed(2)}$. The perpendicular slope is the negative reciprocal: $${answerStr}$.`
    };
  }
};

/**
 * Question ID: 184ce5aa
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1/5, 1/7, -70]
 * - Difficulty factors: [Fraction coefficients, finding perpendicular slope]
 * - Distractor patterns: [A: -7/5, B: -5/7, C: 7/5, D: 5/7 (correct)]
 * - Constraints: [Negative reciprocal of -7/5 is 5/7]
 * - Question type: [Text → Multiple Choice Text]
 * - Figure generation: [None]
 */