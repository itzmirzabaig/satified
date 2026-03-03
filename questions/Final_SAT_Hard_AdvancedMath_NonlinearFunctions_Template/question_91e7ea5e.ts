import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



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

export const generator_91e7ea5e = {
  metadata: {
    // id: "91e7ea5e",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // h(x) = a(x - h)² + k, vertex at (h, k)
    // x-intercepts when a(x-h)² + k = 0, so (x-h)² = -k/a
    // x = h ± √(-k/a)
    // One intercept at (0,0) means h = √(-k/a) or h = -√(-k/a)
    
    const a = getRandomInt(1, 4);
    const h = getRandomInt(3, 6);
    const k = -a * h * h;
    const t = 2 * h;
    
    // Distractors
    const distractor1 = 1;
    const distractor2 = a;
    const distractor3 = h;
    
    const optionsData = [
      { text: `$${distractor1}$`, isCorrect: false },
      { text: `$${distractor2}$`, isCorrect: false },
      { text: `$${distractor3}$`, isCorrect: false },
      { text: `$${t}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `The quadratic function $h$ is defined by $h(x) = ${a}(x-${h})^2 ${k}$. In the $xy$-plane, the graph of $y=h(x)$ intersects the $x$-axis at the points $(0,0)$ and $(t,0)$, where $t$ is a constant. What is the value of $t$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: t.toString(),
      explanation: `Choice ${correctLetter} is correct. Setting $h(x)=0$: $${a}(x-${h})^2 ${k}=0$, so $(x-${h})^2=${-k/a}=${h*h}$. Thus $x-${h}=\\pm ${h}$, giving $x=0$ or $x=${t}$.`
    };
  }
};

/**
 * Question ID: 358f18bc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1, -48, 2304 (large numbers suggest completing square)]
 * - Difficulty factors: [Completing the square, vertex form, minimum value]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must complete square cleanly to get integer/whole number minimum]
 * - Question type: [Fill-in-the-blank quadratic minimum]
 * - Figure generation: [None]
 */