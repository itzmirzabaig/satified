import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 05bb1af9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -1/4, y-intercept after shift: 2, f(x) shift: +14]
 * - Difficulty factors: [Understanding vertical shift, reverse engineering f(x)]
 * - Distractor patterns: [A: -1/4x - 12 (correct), B: -1/4x + 16, C: -1/4x + 2, D: -1/4x - 14]
 * - Constraints: [y = f(x) + 14 means f(x) = y - 14]
 * - Question type: [Figure → Multiple Choice Text]
 * - Figure generation: [Line with points at (0,2) and (8,0)]
 */

export const generator_05bb1af9 = {
  metadata: {
    // id: "05bb1af9",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const slopeNum = getRandomInt(1, 3);
    const slopeDen = getRandomInt(2, 5);
    const slope = -slopeNum / slopeDen;
    
    const xIntercept = getRandomInt(4, 12);
    const shift = getRandomInt(10, 20);
    
    // y-intercept of shifted graph
    const bShifted = -slope * xIntercept;
    // Original f(x) has y-intercept bShifted - shift
    const bOriginal = bShifted - shift;
    
    const slopeStr = slopeDen === 1 ? `-${slopeNum}` : `-\\frac{${slopeNum}}{${slopeDen}}`;
    
    const correctText = `f(x) = ${slopeStr}x ${bOriginal >= 0 ? '+' : ''}${bOriginal}`;
    const distractorB = `f(x) = ${slopeStr}x + ${bShifted + shift}`; // Added instead of subtracted
    const distractorC = `f(x) = ${slopeStr}x + ${bShifted}`; // No shift applied
    const distractorD = `f(x) = ${slopeStr}x - ${shift}`; // Just subtracted shift
    
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: distractorB, isCorrect: false, reason: "incorrectly adds the shift instead of subtracting" },
      { text: distractorC, isCorrect: false, reason: "does not account for the vertical shift" },
      { text: distractorD, isCorrect: false, reason: "incorrectly applies the shift without considering the y-intercept" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const mafsCode = `<Mafs pan={true} zoom={true} viewBox={{ x: [-12, 12], y: [-5, 10] }}>
  <Coordinates.Cartesian subdivisions={false} />
  <Plot.OfX y={(x) => ${slope} * x + ${bShifted}} color="#1a7cff" />
  <Point x={0} y={${bShifted}} />
  <Point x={${xIntercept}} y={0} />
</Mafs>`;
    
    return {
      questionText: `The graph of $y = f(x) + ${shift}$ is shown. Which equation defines function $f$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: `${o.letter}. $${o.text}$` })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. The graph has slope $${slopeStr}$ and y-intercept $${bShifted}$, so $y = ${slopeStr}x + ${bShifted}$. Given $y = f(x) + ${shift}$, then $f(x) + ${shift} = ${slopeStr}x + ${bShifted}$, so $f(x) = ${slopeStr}x ${bOriginal >= 0 ? '+' : ''}${bOriginal}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 0b46bad5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope between -1 and 0, y-intercept at 1]
 * - Difficulty factors: [Analyzing ax + by = b with 0 < a < b]
 * - Distractor patterns: [Graph A, B, C, D as visual options]
 * - Constraints: [Slope = -a/b where 0 < a < b, so -1 < slope < 0]
 * - Question type: [Text → Multiple Choice Figure]
 * - Figure generation: [Four graph options, one correct]
 */