import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1097
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [p(t) = 90000(1.06)^t, convert to monthly]
 * - Difficulty factors: [Time unit conversion, exponential model adjustment]
 * - Distractor patterns: [Various incorrect conversions]
 * - Constraints: [r(m) = 90000(1.06)^(m/12)]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1097 = {
  metadata: {
    id: "1097",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const P0 = getRandomInt(50, 150) * 1000;
    const rate = (getRandomInt(103, 110) / 100);
    const monthsInYear = 12;
    const rateStr = rate.toFixed(2);
    // Populations of 1,000+ need a comma inside math (was 99000).
    const P0Str = P0.toLocaleString('en-US').replace(/,/g, '{,}');
    const correctText = `$r(m)=${P0Str}(${rateStr})^{\\frac{m}{${monthsInYear}}}$`;

    const optionsData = [
      { text: `$r(m)=\\frac{${P0Str}}{${monthsInYear}}(${rateStr})^m$`, isCorrect: false, reason: `it divides the initial population by $${monthsInYear}$, so $r(0)$ is no longer $${P0Str}$, and it applies the yearly factor $${rateStr}$ every month` },
      { text: `$r(m)=${P0Str}\\left(\\frac{${rateStr}}{${monthsInYear}}\\right)^m$`, isCorrect: false, reason: `it divides the growth factor by $${monthsInYear}$ instead of dividing the exponent, which makes the base less than $1$ and the population shrink` },
      { text: `$r(m)=${P0Str}\\left(\\frac{${rateStr}}{${monthsInYear}}\\right)^{\\frac{m}{${monthsInYear}}}$`, isCorrect: false, reason: `it converts months to years correctly in the exponent but also divides the growth factor by $${monthsInYear}$, which makes the population shrink` },
      { text: correctText, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      // Stem was a sentence fragment ("models population t years after census").
      questionText: `The function $p$, defined by $p(t)=${P0Str}(${rateStr})^t$, models the population of a city $t$ years after a census. Which of the following functions $r$ models the population of the city $m$ months after the census?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Since there are $${monthsInYear}$ months in a year, $m$ months is equal to $\\frac{m}{${monthsInYear}}$ years. Substituting $t=\\frac{m}{${monthsInYear}}$ into $p$ gives $r(m)=p\\left(\\frac{m}{${monthsInYear}}\\right)=${P0Str}(${rateStr})^{\\frac{m}{${monthsInYear}}}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
