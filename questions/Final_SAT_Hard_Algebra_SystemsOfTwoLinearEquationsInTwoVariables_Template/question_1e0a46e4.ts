import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 1e0a46e4
 * Skill: Systems Of Two Linear Equations In Two Variables
 * Difficulty: Hard
 * 
 * Description: Identify the system of equations with no solution (parallel lines).
 * Fixes:
 * - Fixed syntax error in SVG generation code.
 * - Ensures correct options logic for "No Solution" (Same slope, different intercept).
 */
export const generator_1e0a46e4 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. GENERATE BASE LINE
    // ----------------------------------------------------------------------
    // Line form: Ax + By = C
    // We want relatively small integers for readability
    const A = getRandomInt(2, 5);
    const B = getRandomInt(2, 5) * (Math.random() > 0.5 ? 1 : -1);
    const C1 = getRandomInt(5, 15);
    
    // ----------------------------------------------------------------------
    // 2. CREATE OPTIONS LOGIC
    // ----------------------------------------------------------------------
    
    // Option: No Solution (Parallel Lines)
    // Same LHS (or scaled LHS), different RHS
    // Equation 1: Ax + By = C1
    // Equation 2: k(Ax + By) = C2 where C2 != k*C1
    // Let's use k=2 for the second equation to make it look slightly different
    const k_no = 2;
    const C2_no = (k_no * C1) + getRandomInt(5, 10); // Ensure it's not consistent
    
    const optNoSol = `
\\begin{cases}
${formatEq(A, B, C1)} \\\\
${formatEq(A * k_no, B * k_no, C2_no)}
\\end{cases}
    `.trim();

    // Option: Infinite Solutions (Same Line)
    // Equation 2 is exact multiple of Equation 1
    const k_inf = 3;
    const C2_inf = k_inf * C1;
    const optInfSol = `
\\begin{cases}
${formatEq(A, B, C1)} \\\\
${formatEq(A * k_inf, B * k_inf, C2_inf)}
\\end{cases}
    `.trim();

    // Option: One Solution (Different Slopes)
    // Change A or B
    const A_one = A + 1;
    const optOneSol = `
\\begin{cases}
${formatEq(A, B, C1)} \\\\
${formatEq(A_one, B, C1)}
\\end{cases}
    `.trim();

    // Option: One Solution (Perpendicular-ish or just random)
    const optOneSol2 = `
\\begin{cases}
${formatEq(B, A, C1)} \\\\
${formatEq(A, B, C1)}
\\end{cases}
    `.trim();

    // ----------------------------------------------------------------------
    // 3. SVG VISUALIZATION (Parallel Lines)
    // ----------------------------------------------------------------------
    // Plot Ax + By = C1 and Ax + By = C2_no (normalized)
    // y = (-A/B)x + C/B
    const slope = -A / B;
    const yInt1 = C1 / B;
    const yInt2 = (C2_no / k_no) / B; // The effective intercept of the second line
    
    // Bounds
    const xMin = -10, xMax = 10;
    const yMin = -10, yMax = 10;

    // ----------------------------------------------------------------------
    // 4. RETURN DATA
    // ----------------------------------------------------------------------
    const optionsData = [
      { text: `$$${optNoSol}$$`, isCorrect: true },
      { text: `$$${optInfSol}$$`, isCorrect: false },
      { text: `$$${optOneSol}$$`, isCorrect: false },
      { text: `$$${optOneSol2}$$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)?.letter;

    return {
      questionText: `Which of the following systems of linear equations has no solution?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        A system of linear equations has <b>no solution</b> if the lines are parallel (same slope) but distinct (different y-intercepts).
        <br/><br/>
        Look at the system in choice ${correctLetter}:
        $$ ${formatEq(A, B, C1)} $$
        $$ ${formatEq(A * k_no, B * k_no, C2_no)} $$
        <br/>
        If we divide the second equation by ${k_no}, we get:
        $$ ${formatEq(A, B, C2_no / k_no)} $$
        <br/>
        Comparing this to the first equation ($${formatEq(A, B, C1)}$), the left sides are identical ($${A}x ${B >= 0 ? '+' : ''}${B}y$), but the right sides are different ($${(C2_no / k_no).toFixed(1)} \\ne ${C1}$).
        <br/>
        This implies the lines have the same slope but different intercepts, so they never intersect. Thus, there is no solution.
      `
    };
  }
};

// Helper
function formatEq(a: number, b: number, c: number) {
  const aStr = a === 1 ? "x" : a === -1 ? "-x" : `${a}x`;
  const bStr = b >= 0 
    ? (b === 1 ? "+ y" : `+ ${b}y`) 
    : (b === -1 ? "- y" : `- ${Math.abs(b)}y`);
  return `${aStr} ${bStr} = ${c}`;
}