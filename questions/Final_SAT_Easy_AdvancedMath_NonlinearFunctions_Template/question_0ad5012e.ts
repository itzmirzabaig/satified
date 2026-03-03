import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 0ad5012e
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [aVal: 1-3, bVal: 1-5, cVal: 20-40]
 * - Difficulty factors: [Interpreting y-intercept in context of deliveries over months]
 * - Distractor patterns: [Incomplete date, wrong month, wrong year]
 * - Constraints: [x=0 represents the start of the study]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_0ad5012e = {
  metadata: {
    // id: "0ad5012e",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const aVal = getRandomInt(1, 3);
    const bVal = getRandomInt(1, 5);
    const cVal = getRandomInt(20, 40);
    const month = ["May", "June", "July", "August"][getRandomInt(0, 3)];
    const year = getRandomInt(2010, 2020);

    // Calculate fraction properly: -1/(4/aVal) = -aVal/4
    // So when aVal=1: -1/4, aVal=2: -2/4=-1/2, aVal=3: -3/4
    const numerator = aVal;
    const denominator = 4;
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const commonDivisor = gcd(numerator, denominator);
    const simplifiedNum = numerator / commonDivisor;
    const simplifiedDen = denominator / commonDivisor;

    // Build the coefficient string
    let coeffStr: string;
    if (simplifiedDen === 1) {
      coeffStr = `${simplifiedNum}`;
    } else {
      coeffStr = `\\frac{${simplifiedNum}}{${simplifiedDen}}`;
    }

    const optionsData = [
      { text: `At the end of ${month} ${year}, the estimated number of scheduled deliveries was ${cVal}.`, isCorrect: true },
      { text: `At the end of ${month}, the estimated number of scheduled deliveries was ${cVal}.`, isCorrect: false },
      { text: `At the end of next month ${year}, the estimated number of scheduled deliveries was ${cVal}.`, isCorrect: false },
      { text: `At the end of ${month} ${year + 1}, the estimated number of scheduled deliveries was ${cVal}.`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The equation $y = -\\frac{${simplifiedNum}}{${simplifiedDen}}x^2 + ${bVal}x + ${cVal}$ models a company's scheduled deliveries over 8 months, where $y$ is the estimated number of scheduled deliveries $x$ months after the end of ${month} ${year}. Which statement is the best interpretation of the y-intercept of the graph?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The y-intercept occurs where $x=0$. Since $x$ is the number of months after the end of ${month} ${year}, $x=0$ represents the end of ${month} ${year}. Substituting 0 for $x$ gives $y=${cVal}$.`
    };
  }
};

/**
 * Question ID: 5a74f696
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 500-1100, doublingPeriod: 5-15]
 * - Difficulty factors: [Constructing an exponential function for doubling periods]
 * - Distractor patterns: [Decay factor, period swapped with base, base swapped with period]
 * - Constraints: [Exponent represents number of periods]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */