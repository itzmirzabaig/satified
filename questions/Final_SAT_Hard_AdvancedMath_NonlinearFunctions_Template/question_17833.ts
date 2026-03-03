import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 17833
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (1.84)^(x/4)]
 * - Difficulty factors: [Rewriting exponential, percent change]
 * - Distractor patterns: [A: 16, B: 21, C: 46, D: 96]
 * - Constraints: [(1.84)^(1/4) ≈ 1.16, so p ≈ 16]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_17833 = {
  metadata: {
    // id: "17833",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const base = (getRandomInt(160, 200) / 100);
    const denom = getRandomInt(3, 6);
    
    const newBase = Math.pow(base, 1/denom);
    const p = Math.round((newBase - 1) * 100);
    
    const optionsData = [
      { text: `$${p}$`, isCorrect: true },
      { text: `$${p + 5}$`, isCorrect: false },
      { text: `$${Math.round(base * 25)}$`, isCorrect: false },
      { text: `$${Math.round((base - 1) * 100)}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `$f(x)=(${base.toFixed(2)})^{\\frac{x}{${denom}}}=\\left(1+\\frac{p}{100}\\right)^x$. What is closest to $p$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: p.toString(),
      explanation: `Choice ${correctLetter} is correct. We have $({base.toFixed(2)})^{\\frac{1}{${denom}}}\\approx{newBase.toFixed(3)}=1+\\frac{${p}}{100}$, so $p\\approx${p}$.`
    };
  }
};

/**
 * Question ID: a7711fe8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x-2)² - 4]
 * - Difficulty factors: [Vertex form, minimum value]
 * - Distractor patterns: [A: -4 (correct), B: -2, C: 2, D: 4]
 * - Constraints: [Minimum is k in (x-h)² + k]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */