import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_0b46bad5 = {
  metadata: {
    // id: "0b46bad5",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // 0 < a < b, so slope = -a/b is between -1 and 0
    const a = getRandomInt(1, 4);
    const b = getRandomInt(a + 1, a + 4);
    
    const slope = -a / b;
    const yIntercept = 1; // Always 1 from equation
    
    // Generate distractor slopes
    const distractorSlope1 = -b / a; // Steep negative, < -1
    const distractorSlope2 = a / b; // Positive shallow
    const distractorSlope3 = -1; // Exactly -1
    
    // Build Mafs code for each option
    const buildGraph = (m: number, bInt: number, color: string = "#1a7cff") => 
      `<Mafs pan={true} zoom={true} viewBox={{ x: [-2, 5], y: [-1, 3] }}>
  <Coordinates.Cartesian subdivisions={false} />
  <Plot.OfX y={(x) => ${m} * x + ${bInt}} color="${color}" />
  <Point x={0} y={${bInt}} />
</Mafs>`;
    
    const correctGraph = buildGraph(slope, yIntercept);
    const distractor1 = buildGraph(distractorSlope1, yIntercept, "#ff6b6b");
    const distractor2 = buildGraph(distractorSlope2, yIntercept, "#4ecdc4");
    const distractor3 = buildGraph(distractorSlope3, yIntercept, "#ffe66d");
    
    const graphs = [
      { code: distractor1, isCorrect: false },
      { code: distractor2, isCorrect: false },
      { code: correctGraph, isCorrect: true },
      { code: distractor3, isCorrect: false }
    ];
    
    const shuffled = shuffle(graphs);
    
    return {
      questionText: `In the equation above, $ax + by = b$, $a$ and $b$ are constants and $0 < a < b$. Which of the following could represent the graph of the equation in the $xy$-plane?`,
      figureCode: null,
      options: shuffled.map((g, i) => ({ 
        text: String.fromCharCode(65 + i),
        figureCode: g.code 
      })),
      correctAnswer: String.fromCharCode(65 + shuffled.findIndex(g => g.isCorrect)),
      explanation: `The equation can be rewritten as $y = -\\frac{a}{b}x + 1$. Since $0 < a < b$, the slope $-\\frac{a}{b}$ is between $-1$ and $0$. The y-intercept is $(0, 1)$. The correct graph shows a line with negative slope greater than $-1$ passing through $(0, 1)$.`
    };
  }
};

/**
 * Question ID: c362c210
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-intercept: 16, y-intercept: 12, total: $24]
 * - Difficulty factors: [Interpreting intercepts as prices]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Price = total/intercept quantity]
 * - Question type: [Figure → Fill in blank]
 * - Figure generation: [Line with labeled intercepts]
 */