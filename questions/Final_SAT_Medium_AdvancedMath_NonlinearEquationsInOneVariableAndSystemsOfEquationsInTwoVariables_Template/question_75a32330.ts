import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 75a32330
 * 
 * FIXES:
 * - Changed format to "Given Graph -> Identify System" to allow proper use of Mafs.
 * - Used <Mafs>, <Coordinates.Cartesian>, <Plot.OfX> to render the figure dynamically.
 * - Ensured graph viewbox scales with the random constant 'c'.
 */
export const generator_75a32330 = {
  metadata: {
    id: "75a32330",
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

/**
 * Question ID: a4f61d75
 * 
 * ANALYSIS:
 * - Context: Factoring Quadratics.
 * - Problem: x^2 + bx + k = 0 has integer solutions. Find possible b.
 * - Logic: If solutions are integers, discriminant is perfect square.
 *   Sum of factors of k = b.
 */
export const generator_a4f61d75 = {
  metadata: {
    id: "a4f61d75",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    // Select k with multiple factor pairs to make it interesting
    const kVals = [12, 18, 20, 24, 30, 36];
    const k = kVals[Math.floor(Math.random() * kVals.length)];
    
    // Find all factor pairs (m, n) such that m*n = k
    // b = m + n
    const possibleBs: number[] = [];
    for (let i = 1; i <= Math.sqrt(k); i++) {
      if (k % i === 0) {
        possibleBs.push(i + (k / i));
        // Also negative factors? "b is a constant". Usually implies magnitude or positive in these multiple choice contexts unless specified.
        // We will stick to positive b for the options.
      }
    }
    
    // Select one valid b as the correct answer
    const correctB = possibleBs[Math.floor(Math.random() * possibleBs.length)];
    
    // Generate distractors
    // 1. k + 2 (often close to k+1)
    const d1 = k + 2;
    // 2. A difference of factors (n - m) instead of sum
    const d2 = Math.abs((k/1) - 1); // k-1
    // 3. Random close number
    let d3 = correctB + 3;
    if (possibleBs.includes(d3)) d3 += 2; // Avoid accidental correct answer

    const optionsData = [
      { text: correctB.toString(), isCorrect: true },
      { text: d1.toString(), isCorrect: false },
      { text: d2.toString(), isCorrect: false },
      { text: d3.toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `In the equation $x^2 + bx + ${k} = 0$, $b$ is a positive constant. If the equation has two integer solutions, which of the following could be the value of $b$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
For the quadratic equation $x^2 + bx + ${k} = 0$ to have integer solutions, it must be factorable into $(x + m)(x + n) = 0$, where $m$ and $n$ are integers.
      
This implies:
1.  $m \\cdot n = ${k}$
2.  $m + n = b$

We look for factor pairs of ${k} whose sum equals one of the options.
The factor pairs of ${k} are:
${possibleBs.map((val, i) => {
   // Reverse engineer factors from sum logic roughly for explanation display? 
   // Actually better to just iterate:
   // We know possibleBs holds the sums.
   return `- Factors adding to ${val}`; 
}).join('\n')}

The value ${correctB} appears in our list of possible sums (factors of ${k} that add up to ${correctB}).`
    };
  }
};