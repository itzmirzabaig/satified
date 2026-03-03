import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 02060533
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x values: -27, -9, g(x): 3, 0]
 * - Difficulty factors: [Function composition, linear function from rational, y-intercept]
 * - Distractor patterns: [A: (0,36), B: (0,12), C: (0,4), D: (0,-9)]
 * - Constraints: [f is linear, g(x) = f(x)/(x+3), need to avoid division by zero]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table required]
 */

export const generator_02060533 = {
  metadata: {
    // id: "02060533",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // g(x) = f(x)/(x+3) where f is linear
    // We need f(x1) = c(x1 + 3), f(x2) = 0
    
    const a = getRandomInt(2, 4);
    const b = getRandomInt(5, 10);
    
    const x1 = -3 * a;
    const x2 = -b;
    
    const c = getRandomInt(2, 5);
    const f_x1 = c * (x1 + 3);
    const f_x2 = 0;
    
    // f is linear through (x1, f_x1) and (x2, 0)
    const slope = -f_x1 / (x2 - x1);
    const yIntercept = -slope * x2;
    
    const correctValue = yIntercept;
    
    // Distractors
    const distractor1 = Math.abs(c * x1);
    const distractor2 = Math.abs(slope);
    const distractor3 = x2;
    
    const optionsData = [
      { text: `$(0,${correctValue})$`, isCorrect: true },
      { text: `$(0,${distractor1})$`, isCorrect: false },
      { text: `$(0,${distractor2})$`, isCorrect: false },
      { text: `$(0,${distractor3})$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center;">
      <thead>
        <tr>
          <th style="border: 1px solid #ccc; padding: 12px;">$x$</th>
          <th style="border: 1px solid #ccc; padding: 12px;">$g(x)$</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">${x1}</td>
          <td style="border: 1px solid #ccc; padding: 12px;">${c}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">${x2}</td>
          <td style="border: 1px solid #ccc; padding: 12px;">0</td>
        </tr>
      </tbody>
    </table>`;
    
    return {
      questionText: `The table shows three values of $x$ and their corresponding values of $g(x)$, where $g(x)=\\frac{f(x)}{x+3}$ and $f$ is a linear function. What is the $y$-intercept of the graph of $y=f(x)$ in the $xy$-plane?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$(0,${correctValue})$`,
      explanation: `Choice ${correctLetter} is correct. From the table, $g(${x1})=${c}$ so $f(${x1})=${c}(${x1}+3)=${f_x1}$. Also $g(${x2})=0$ so $f(${x2})=0$. The slope of $f$ is $\\frac{${f_x2}-${f_x1}}{${x2}-${x1}}=${slope}$. The y-intercept is $0-${slope}(${x2})=${correctValue}$.`
    };
  }
};

/**
 * Question ID: 91e7ea5e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a: 2, h: 4, k: -32, leading to t: 8]
 * - Difficulty factors: [Vertex form of parabola, x-intercepts, solving quadratic]
 * - Distractor patterns: [A: 1 (half of something), B: 2 (a), C: 4 (h), D: 8 (correct t)]
 * - Constraints: [Must yield integer solution for t, vertex form h(x)=a(x-h)²+k]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */