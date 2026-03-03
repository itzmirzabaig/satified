import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: d41cf4d3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = a√(x+b), through (-24,0), f(24)<0]
 * - Difficulty factors: [Square root function, domain constraints, sign analysis]
 * - Distractor patterns: [A: f(0)=24, B: f(0)=-24, C: a>b, D: a<b]
 * - Constraints: [b=24, a<0, so a<b]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_d41cf4d3 = {
  metadata: {
    // id: "d41cf4d3",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const b = getRandomInt(15, 30);
    const evalPoint = getRandomInt(20, 40);
    
    const optionsData = [
      { text: `$f(0)=${b}$`, isCorrect: false },
      { text: `$f(0)=-${b}$`, isCorrect: false },
      { text: `$a>b$`, isCorrect: false },
      { text: `$a<b$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `$f(x)=a\\sqrt{x+b}$ passes through $(-${b},0)$ and $f(${evalPoint})<0$. Which must be true?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$a<b$`,
      explanation: `Choice ${correctLetter} is correct. Since $f(-${b})=0$, we have $\\sqrt{-${b}+b}=0$, so the domain is valid. Since $f(${evalPoint})<0$ and $\\sqrt{${evalPoint}+b}>0$, we need $a<0$. Since $b=${b}>0$, we have $a<0<${b}$, so $a<b$.`
    };
  }
};

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