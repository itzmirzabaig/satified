import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 4dc5c6f9
 * 
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Equations (System of Equations)
 * - Visual: Text-only (System of two equations displayed)
 * - Fixes: Uses \begin{cases} environment to ensure both equations are visible on separate lines.
 */

export const generator_4dc5c6f9 = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate coefficients
    // Parabola: y = -a(x - h)^2 + k  (Opens downward, vertex at (h, k))
    // Line:     y = c
    
    const h = getRandomInt(2, 12);     // Vertex x
    const k = getRandomInt(5, 15);     // Vertex y (max height)
    const a = getRandomInt(2, 5);      // Stretch factor
    
    // Ensure line is strictly above the vertex to create "Zero" intersections
    const lineY = k + getRandomInt(3, 8); 

    // 2. Format the equations using 'cases' environment
    // Note: We use \\\\ to produce a literal \\ for LaTeX newline
    const equations = `$$
    \\begin{cases}
    y = -${a}(x - ${h})^2 + ${k} \\\\
    y = ${lineY}
    \\end{cases}
    $$`;

    // 3. Define Options
    const optionsData = [
      { text: "Zero", isCorrect: true },
      { text: "Exactly one", isCorrect: false },
      { text: "Exactly two", isCorrect: false },
      { text: "Infinitely many", isCorrect: false }
    ];

    // 4. Shuffle Options
    const shuffledOptions = shuffle(optionsData);
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // 5. Build Explanation
    const explanation = `
      We are asked to find the number of intersection points for the system:
      $y = -${a}(x - ${h})^2 + ${k}$ and $y = ${lineY}$.
      <br/><br/>
      <strong>1. Analyze the parabola:</strong><br/>
      The equation $y = -${a}(x - ${h})^2 + ${k}$ is a parabola in vertex form.
      <ul>
        <li>The vertex is at $(${h}, ${k})$.</li>
        <li>Since the coefficient $-${a}$ is negative, the parabola opens <strong>downward</strong>.</li>
        <li>This means the maximum value of $y$ for the parabola is ${k}.</li>
      </ul>
      <br/>
      <strong>2. Analyze the line:</strong><br/>
      The equation $y = ${lineY}$ is a horizontal line where $y$ is always ${lineY}.
      <br/><br/>
      <strong>3. Compare:</strong><br/>
      The maximum height of the parabola is ${k}. The line sits at height ${lineY}.
      Since ${lineY} > ${k}, the line is strictly above the parabola.
      <br/><br/>
      They never touch. Therefore, there are <strong>zero</strong> points of intersection.
    `;

    return {
      questionText: `The system of equations is given by:\n${equations}\nIf the given equations are graphed in the $xy$-plane, at how many points do the graphs of the equations intersect?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};