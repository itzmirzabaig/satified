import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 636
 * 
 * FIXES:
 * - Changed format to "Given Graph -> Identify System" to allow proper use of Mafs.
 * - Used <Mafs>, <Coordinates.Cartesian>, <Plot.OfX> to render the figure dynamically.
 * - Ensured graph viewbox scales with the random constant 'c'.
 */
export const generator_636 = {
  metadata: {
    id: "636",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    // Constant c (e.g., 3)
    const c = getRandomInt(2, 5);
    
    // Correct System: y = x^2 + c  and  y = c - x
    // Distractors based on visual graph properties
    
    // Graph Properties:
    // Parabola: Opens UP, Vertex at (0, c)
    // Line: y-intercept at c, Slope is NEGATIVE (-1)
    
    // 2. Mafs Configuration
    // Viewbox needs to capture vertex (0,c) and other intersection at x=-1
    const yMax = c + 5;
    const yMin = -2;
    const xRange = 6;
    
    const mafsCode = `
      <Mafs viewBox={{ x: [-${xRange}, ${xRange}], y: [${yMin}, ${yMax}] }} preserveAspectRatio={false}>
        <Coordinates.Cartesian subdivisions={2} />
        
        <!-- Parabola: y = x^2 + c -->
        <Plot.OfX 
          y={(x) => x * x + ${c}} 
          color="#3b82f6" 
          weight={2} 
        />
        
        <!-- Line: y = c - x -->
        <Plot.OfX 
          y={(x) => ${c} - x} 
          color="#ef4444" 
          weight={2} 
        />
        
        <!-- Label Vertex/Intercept -->
        <Point x={0} y={${c}} color="#000000" />
        <Text x={0.5} y={${c} + 0.5} attach="nw">(${0}, ${c})</Text>
      </Mafs>
    `;

    // 3. Options
    // Correct
    const optCorrect = `y = x^2 + ${c} \\text{ and } y = ${c} - x`;
    
    // Distractor 1: Parabola opens down
    const optDown = `y = -x^2 + ${c} \\text{ and } y = ${c} - x`;
    
    // Distractor 2: Line has positive slope
    const optPosSlope = `y = x^2 + ${c} \\text{ and } y = x + ${c}`;
    
    // Distractor 3: Wrong intercept (shift down)
    const optShift = `y = x^2 - ${c} \\text{ and } y = ${c} - x`;

    const optionsData = [
      { text: optCorrect, isCorrect: true },
      { text: optDown, isCorrect: false },
      { text: optPosSlope, isCorrect: false },
      { text: optShift, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The graphs of a system of equations are shown in the $xy$-plane above. Which system of equations is represented by the graphs?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Analyze the Parabola:**
    The parabola opens upward, so the coefficient of $x^2$ is positive.
    The vertex is at $(0, ${c})$, so the equation is $y = x^2 + ${c}$.

2.  **Analyze the Line:**
    The line passes through $(0, ${c})$, so the y-intercept is ${c}$.
    The line slopes downward, so it has a negative slope.
    Checking the equation $y = -x + ${c}$ (or $y = ${c} - x$): it has intercept ${c} and slope $-1$, which matches.

Therefore, the system is:
$y = x^2 + ${c}$
$y = ${c} - x$`
    };
  }
};
