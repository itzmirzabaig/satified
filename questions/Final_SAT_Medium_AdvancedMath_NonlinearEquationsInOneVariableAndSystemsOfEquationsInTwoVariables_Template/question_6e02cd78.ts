import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 6e02cd78
 * 
 * FIXES:
 * - Ensured integer arithmetic by forcing the line slope ($m$) to be even.
 * - Improved LaTeX formatting to handle negative signs cleanly (avoiding "+ -" or "- -").
 * - Changed `options` to `[]` to prevent potential null-reference errors in frontend renderers.
 * - Simplified logic to guarantee a single intersection point (tangency).
 */
export const generator_6e02cd78 = {
  metadata: {
    id: "6e02cd78",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup: Intersection of Parabola and Line (Tangent Case)
    // We start with the intersection point (xSol, ySol).
    const xSol = getRandomInt(-5, 5);
    
    // Define the Line: y = mx + b
    // Slope m must be even to ensure the parabola's vertex h is an integer (derived below).
    const m = getRandomInt(1, 3) * 2 * (Math.random() < 0.5 ? 1 : -1); // e.g., -4, -2, 2, 4
    const b = getRandomInt(-10, 15);
    const ySol = m * xSol + b;
    
    // Define the Parabola: y = (x - h)^2 + k
    // 1. Tangency condition: Slope of parabola at xSol must equal line slope m.
    //    y' = 2(x - h) -> 2(xSol - h) = m -> xSol - h = m/2 -> h = xSol - m/2
    const h = xSol - (m / 2);
    
    // 2. Intersection condition: Parabola passes through (xSol, ySol).
    //    ySol = (xSol - h)^2 + k -> k = ySol - (xSol - h)^2
    //    Since (xSol - h) = m/2, then k = ySol - (m/2)^2
    const k = ySol - Math.pow(m / 2, 2);

    // 2. String Formatting
    // Helper to format signed numbers: e.g., -3 -> "- 3", 3 -> "+ 3"
    const formatSigned = (num: number) => num >= 0 ? `+ ${num}` : `- ${Math.abs(num)}`;
    
    // Format Parabola: y = (x - h)^2 + k
    // If h is 0, write x^2. If k is 0, omit it.
    let termH = `x^2`;
    if (h !== 0) {
      termH = h > 0 ? `(x - ${h})^2` : `(x + ${Math.abs(h)})^2`;
    }
    const termK = k === 0 ? '' : formatSigned(k);
    const parabolaEq = `y = ${termH} ${termK}`.trim();

    // Format Line: y = mx + b
    const termMx = `${m}x`;
    const termB = b === 0 ? '' : formatSigned(b);
    const lineEq = `y = ${termMx} ${termB}`.trim();

    // Explanation helpers
    const polyExpansion = `x^2 ${formatSigned(-2 * h)}x ${formatSigned(h * h + k)}`;
    const lineTerms = `${m}x ${formatSigned(b)}`;
    
    return {
      questionText: `In the $xy$-plane, what is the $y$-coordinate of the point of intersection of the graphs of $${parabolaEq}$ and $${lineEq}$?`,
      figureCode: null,
      options: [], // Empty array for fill-in-the-blank
      correctAnswer: ySol.toString(),
      explanation: `To find the intersection, set the equations equal to each other:
      
$${termH} ${termK} = ${termMx} ${termB}$

Expand the quadratic side:
$x^2 ${formatSigned(-2 * h)}x ${formatSigned(h * h)} ${termK} = ${termMx} ${termB}$
$${polyExpansion} = ${lineTerms}$

Move all terms to one side to form a quadratic equation equal to zero:
$x^2 ${formatSigned(-2 * h - m)}x ${formatSigned((h * h + k) - b)} = 0$

Factoring the perfect square trinomial:
$(x - ${xSol})^2 = 0$

Solving for $x$:
$x = ${xSol}$

Substitute $x = ${xSol}$ into the linear equation to find $y$:
$y = ${m}(${xSol}) ${termB} = ${ySol}$

The $y$-coordinate of the point of intersection is $${ySol}$.`
    };
  }
};

/**
 * Question ID: 11ccf3e1
 * 
 * ANALYSIS:
 * - Context: Literal Equations.
 * - Task: Solve for variable x in P = ax + b.
 * - Logic: x = (P - b) / a.
 */
export const generator_11ccf3e1 = {
  metadata: {
    id: "11ccf3e1",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const a = getRandomInt(2, 9);
    const b = getRandomInt(2, 9);
    
    // Variable names (e.g., P = 14x + 5)
    const yVar = 'P';
    const xVar = 'n';
    
    // Equation: P = an + b
    const equation = `${yVar} = ${a}${xVar} + ${b}`;
    
    // Solution: n = (P - b) / a
    const correctSol = `\\frac{${yVar} - ${b}}{${a}}`;
    
    // Distractors
    const d1 = `\\frac{${yVar} + ${b}}{${a}}`; // Sign error
    const d2 = `\\frac{${yVar}}{${a}} - ${b}`; // Division error
    const d3 = `${a}${yVar} - ${b}`; // Wrong operation
    
    const optionsData = [
      { text: correctSol, isCorrect: true },
      { text: d1, isCorrect: false },
      { text: d2, isCorrect: false },
      { text: d3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The equation $${equation}$ gives the value of $${yVar}$ in terms of $${xVar}$. Which of the following gives the value of $${xVar}$ in terms of $${yVar}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
To solve for $${xVar}$, isolate it on one side of the equation:

1.  Start with the given equation:
    $${yVar} = ${a}${xVar} + ${b}$

2.  Subtract ${b} from both sides:
    $${yVar} - ${b} = ${a}${xVar}$

3.  Divide both sides by ${a}:
    $\\frac{${yVar} - ${b}}{${a}} = ${xVar}$

Therefore, $${xVar} = ${correctSol}$.`
    };
  }
};