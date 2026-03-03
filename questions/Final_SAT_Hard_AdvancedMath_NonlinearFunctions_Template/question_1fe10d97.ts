import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 1fe10d97
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [p(t) = 90000(1.06)^t, convert to monthly]
 * - Difficulty factors: [Time unit conversion, exponential model adjustment]
 * - Distractor patterns: [Various incorrect conversions]
 * - Constraints: [r(m) = 90000(1.06)^(m/12)]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1fe10d97 = {
  metadata: {
    // id: "1fe10d97",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const P0 = getRandomInt(50, 150) * 1000;
    const rate = (getRandomInt(103, 110) / 100);
    const monthsInYear = 12;
    
    const optionsData = [
      { text: `$r(m)=\\frac{${P0}}{${monthsInYear}}(${rate.toFixed(2)})^m$`, isCorrect: false },
      { text: `$r(m)=${P0}\\left(\\frac{${rate.toFixed(2)}}{${monthsInYear}}\\right)^m$`, isCorrect: false },
      { text: `$r(m)=${P0}\\left(\\frac{${rate.toFixed(2)}}{${monthsInYear}}\\right)^{\\frac{m}{${monthsInYear}}}$`, isCorrect: false },
      { text: `$r(m)=${P0}(${rate.toFixed(2)})^{\\frac{m}{${monthsInYear}}}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `$p(t)=${P0}(${rate.toFixed(2)})^t$ models population $t$ years after census. Which models population $m$ months after census?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$r(m)=${P0}(${rate.toFixed(2)})^{\\frac{m}{${monthsInYear}}}$`,
      explanation: `Choice ${correctLetter} is correct. Since $m$ months equals $\\frac{m}{${monthsInYear}}$ years, substitute: $r(m)=p(\\frac{m}{${monthsInYear}})=${P0}(${rate.toFixed(2)})^{\\frac{m}{${monthsInYear}}}$.`
    };
  }
};

/**
 * Question ID: b73ee6cf
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [population 50000, 3% increase, target 60000]
 * - Difficulty factors: [Exponential growth setup, solving for time]
 * - Distractor patterns: [Various incorrect equation setups]
 * - Constraints: [Correct: 60000 = 50000(1.03)^t]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */