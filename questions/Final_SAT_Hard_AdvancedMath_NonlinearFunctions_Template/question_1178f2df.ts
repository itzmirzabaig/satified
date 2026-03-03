import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 1178f2df
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table with y = f(x)+4, find f's y-intercept]
 * - Difficulty factors: [Transformed function, table analysis, vertex form]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must have HTML table]
 * - Question type: [Table→Fill-in-the-blank]
 * - Figure generation: [HTML Table required]
 */

export const generator_1178f2df = {
  metadata: {
    // id: "1178f2df",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const h = getRandomInt(15, 30);
    const k = getRandomInt(5, 15);
    const spread = getRandomInt(2, 5);
    
    const x1 = h - 2 * spread;
    const x2 = h;
    const x3 = h + 2 * spread;
    
    const y1 = k - 4 * spread * spread;
    const y2 = k;
    const y3 = k - 4 * spread * spread;
    
    // f(x) = -4(x-h)² + k - 4
    const f0 = -4 * h * h + k - 4;
    
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center;">
      <thead>
        <tr>
          <th style="border: 1px solid #ccc; padding: 12px;">$x$</th>
          <th style="border: 1px solid #ccc; padding: 12px;">$y$</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">${x1}</td>
          <td style="border: 1px solid #ccc; padding: 12px;">${y1}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">${x2}</td>
          <td style="border: 1px solid #ccc; padding: 12px;">${y2}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">${x3}</td>
          <td style="border: 1px solid #ccc; padding: 12px;">${y3}</td>
        </tr>
      </tbody>
    </table>`;
    
    return {
      questionText: `The table shows values where $y=f(x)+4$ and $f$ is quadratic. What is the y-coordinate of the y-intercept of $y=f(x)$?`,
      figureCode: tableCode,
      options: null,
      correctAnswer: f0.toString(),
      explanation: `The vertex of $y$ is at $(${h},${k})$, so $f$ has vertex at $(${h},${k-4})$. Using $f(x)=-4(x-${h})^2+${k-4}$, we get $f(0)=-4(${h})^2+${k-4}=${f0}$.`
    };
  }
};

/**
 * Question ID: 84e8cc72
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 10, max: 1034, time to max: 8, find h(10)]
 * - Difficulty factors: [Projectile height model, vertex form evaluation]
 * - Distractor patterns: [A: 234, B: 778, C: 970, D: 1014]
 * - Constraints: [Must compute h(10) using vertex form]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */