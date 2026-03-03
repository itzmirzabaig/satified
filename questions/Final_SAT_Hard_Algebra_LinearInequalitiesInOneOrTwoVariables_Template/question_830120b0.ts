import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 830120b0
 * Skill: Linear Inequalities In One Or Two Variables
 * Difficulty: Hard
 * 
 * Description: Finding the range of y-values given a system of inequalities (y > mx + b and x > c).
 * Fix: Replaced broken graph with explicit text-based system of inequalities.
 */
export const generator_830120b0 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. MATHEMATICAL LOGIC
    // ----------------------------------------------------------------------
    // System:
    // 1) y > mx + b
    // 2) x > c
    // Since m > 0, the lower bound of y is found by substituting x = c.
    
    const m = getRandomInt(2, 4); // Slope (positive to maintain direction)
    const b = getRandomInt(-4, 4); // Y-intercept
    const cBase = getRandomInt(1, 3);
    const c = cBase + 0.5; // x-bound (e.g., 1.5, 2.5, 3.5)

    // Calculate correct lower bound for y
    // y > m * c + b
    const yBound = m * c + b;

    // ----------------------------------------------------------------------
    // 2. FORMATTING
    // ----------------------------------------------------------------------
    // Helper to format linear expression "mx + b" cleanly
    const formatLinear = (slope: number, intercept: number) => {
      const sign = intercept >= 0 ? "+" : "-";
      return `${slope}x ${sign} ${Math.abs(intercept)}`;
    };

    // Helper to format numbers (integers vs decimals)
    const formatNum = (n: number) => {
      return Number.isInteger(n) ? n.toString() : n.toFixed(1);
    };

    // ----------------------------------------------------------------------
    // 3. OPTIONS GENERATION
    // ----------------------------------------------------------------------
    
    // Correct Answer: y > yBound
    const optCorrect = `y > ${formatNum(yBound)}`;

    // Distractor A: Substitution error (using x = c + 1)
    const valA = m * (c + 1) + b;
    const optA = `y > ${formatNum(valA)}`;

    // Distractor B: Variable confusion (using the x-bound value as the y-bound)
    // "y > c"
    const optB = `y > ${formatNum(c)}`;

    // Distractor C: Intercept confusion (ignoring slope/x-term, just "y > b")
    const optC = `y > ${formatNum(b)}`;

    // Ensure options are unique (in rare cases they might overlap)
    // If overlap, we just regenerate or adjust, but simple shuffle works for now.
    const optionsData = [
      { text: `$${optCorrect}$`, isCorrect: true },
      { text: `$${optA}$`, isCorrect: false },
      { text: `$${optB}$`, isCorrect: false },
      { text: `$${optC}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption.letter;

    // ----------------------------------------------------------------------
    // 4. RETURN DATA
    // ----------------------------------------------------------------------
    return {
      questionText: `
$$
\\begin{cases}
y > ${formatLinear(m, b)} \\\\
x > ${c}
\\end{cases}
$$
Which of the following consists of the $y$-coordinates of all the points that satisfy the system of inequalities above?
      `.trim(),
      figureCode: null, // Graph removed as explicit system is clearer
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        We are looking for the range of values for $y$ given the system.
        <br/>
        1. From the second inequality, we know that $x > ${c}$.
        <br/>
        2. The first inequality is $y > ${m}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}$.
        <br/><br/>
        Since the slope $${m}$ is positive, the expression $${m}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}$ increases as $x$ increases. Therefore, the minimum boundary for $y$ occurs at the minimum boundary for $x$.
        <br/><br/>
        Substituting the limit $x = ${c}$ into the expression:
        $$ ${m}(${c}) ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${formatNum(yBound)} $$
        <br/>
        Since $x > ${c}$, it follows that $y$ must be greater than this value.
        Thus, $y > ${formatNum(yBound)}$.
      `
    };
  }
};