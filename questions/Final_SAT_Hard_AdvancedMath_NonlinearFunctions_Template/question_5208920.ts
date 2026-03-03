import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 5208920
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [exponential decay model]
 * - Difficulty factors: [Decay rate interpretation, inequality for r]
 * - Distractor patterns: [A: r<-1, B: -1<r<0, C: 0<r<1, D: r>1]
 * - Constraints: [Decreasing population means 0 < 1+r < 1, so -1 < r < 0]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_5208920 = {
  metadata: {
    // id: "5208920",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const optionsData = [
      { text: `$r < -1$`, isCorrect: false },
      { text: `$-1 < r < 0$`, isCorrect: true },
      { text: `$0 < r < 1$`, isCorrect: false },
      { text: `$r > 1$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `The population $P$ of a city $y$ years after the last census is modeled by $P=P_0(1+r)^y$, where $r$ is a constant. If the population is decreasing, which of the following could be the value of $r$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$-1 < r < 0$`,
      explanation: `Choice ${correctLetter} is correct. For decreasing population, $0 < 1+r < 1$, which means $-1 < r < 0$.`
    };
  }
};

/**
 * Question ID: df71424b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = -3^x - 7, asymptote at y = -7]
 * - Difficulty factors: [Exponential function graph, x-intercepts]
 * - Distractor patterns: [A: Three, B: Two, C: One, D: Zero]
 * - Constraints: [Must have Mafs figure showing graph below x-axis]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs exponential with asymptote]
 */