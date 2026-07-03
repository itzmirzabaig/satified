import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1083
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x values: -27, -9, g(x): 3, 0]
 * - Difficulty factors: [Function composition, linear function from rational, y-intercept]
 * - Distractor patterns: [A: (0,36), B: (0,12), C: (0,4), D: (0,-9)]
 * - Constraints: [f is linear, g(x) = f(x)/(x+3), need to avoid division by zero]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table required]
 */

export const generator_1083 = {
  metadata: {
    id: "1083",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // g(x) = f(x)/(x+3) with f linear. Answer-first construction:
    // f(x) = m(x - r) with integer slope m >= 2 and integer root r <= -6,
    // so the y-intercept f(0) = -m*r = m|r| is always a positive integer.
    const m = getRandomInt(2, 5);       // slope of f
    const r = -getRandomInt(6, 10);     // root of f (f(r) = 0); r <= -6 keeps |r| > m
    const s = -3 - r;                   // distance from the pole x = -3 to r; s in [3, 7]

    // Second table point x1 = -3 + t with t a divisor of s, so that
    // g(x1) = f(x1)/(x1+3) = m(t+s)/t is an integer for every draw.
    // t = s would give x1 = s-3; exclude it when s = 3 so x1 = 0 never
    // hands the student f(0) directly.
    const tChoices = s === 3 ? [1, -1] : [1, -1, s];
    const t = getRandomElement(tChoices);
    const x1 = -3 + t;                  // x1 >= -4 > r, and x1 !== -3
    const c = m + (m * s) / t;          // g(x1); integer and nonzero by construction
    const fX1 = c * t;                  // f(x1) = c(x1+3) = m(x1 - r)
    const yInt = -m * r;                // f(0) = m|r|, in [12, 50]

    // Distractors — pairwise distinct from yInt and each other for every draw:
    // yInt >= 12 > |r| (6..10) > m (2..5) > 0 > r (-10..-6) > -yInt (<= -12).
    const optionsData = [
      { key: 'correct', text: `$(0,${yInt})$`, isCorrect: true },
      { key: 'slope', text: `$(0,${m})$`, isCorrect: false },
      { key: 'sign', text: `$(0,${-yInt})$`, isCorrect: false },
      { key: 'root', text: `$(0,${r})$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const letterOf = (key: string) => shuffledOptions.find(o => o.key === key)!.letter;

    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center;">
      <thead>
        <tr>
          <th style="border: 1px solid #ccc; padding: 12px;">$x$</th>
          <th style="border: 1px solid #ccc; padding: 12px;">$g(x)$</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">${r}</td>
          <td style="border: 1px solid #ccc; padding: 12px;">0</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">${x1}</td>
          <td style="border: 1px solid #ccc; padding: 12px;">${c}</td>
        </tr>
      </tbody>
    </table>`;

    return {
      questionText: `The table gives two values of $x$ and the corresponding values of $g(x)$, where $g(x)=\\frac{f(x)}{x+3}$ and $f$ is a linear function. What is the $y$-intercept of the graph of $y=f(x)$ in the $xy$-plane?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$(0,${yInt})$`,
      explanation: `Choice ${correctLetter} is correct. Because $g(x)=\\frac{f(x)}{x+3}$, it follows that $f(x)=g(x)(x+3)$ for each $x$-value in the table. From the table, $g(${x1})=${c}$, so $f(${x1})=${c}(${x1}+3)=${fX1}$; also $g(${r})=0$, so $f(${r})=0$. The slope of $f$ is therefore $\\frac{${fX1}-0}{${x1}-(${r})}=${m}$, and since $f(${r})=0$, we can write $f(x)=${m}(x+${-r})$. The $y$-intercept occurs where $x=0$: $f(0)=${m}(${-r})=${yInt}$, so the graph of $y=f(x)$ crosses the $y$-axis at $(0,${yInt})$. Choice ${letterOf('slope')} is incorrect; ${m} is the slope of $f$, not the $y$-coordinate of the $y$-intercept. Choice ${letterOf('sign')} is incorrect; it results from a sign error when evaluating $f(0)$. Choice ${letterOf('root')} is incorrect; $x=${r}$ is where $f(x)=0$, which gives the $x$-intercept of the graph, not the $y$-intercept.`
    };
  }
};
