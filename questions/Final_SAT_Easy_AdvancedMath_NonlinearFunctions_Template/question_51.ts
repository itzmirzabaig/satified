import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 51
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [aVal: 1-3, bVal: 1-5, cVal: 20-40]
 * - Difficulty factors: [Interpreting y-intercept in context of deliveries over months]
 * - Distractor patterns: [Incomplete date, wrong month, wrong year]
 * - Constraints: [x=0 represents the start of the study]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_51 = {
  metadata: {
    id: "51",
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

    // The end of the 8 month model period, x = 8: always January to April of
    // the following year for these starting months.
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const endMonthIdx = MONTHS.indexOf(month) + 8;
    const endMonth = MONTHS[endMonthIdx % 12];
    const endYear = year + Math.floor(endMonthIdx / 12);
    const bTerm = bVal === 1 ? 'x' : `${bVal}x`;

    // Every distractor is a definite, checkable claim that is false, so the
    // keyed choice is the only true one.
    const optionsData = [
      { key: 'correct', text: `At the end of ${month} ${year}, the estimated number of scheduled deliveries was ${cVal}.`, isCorrect: true },
      { key: 'end', text: `At the end of ${endMonth} ${endYear}, the estimated number of scheduled deliveries was ${cVal}.`, isCorrect: false },
      { key: 'coef', text: `At the end of ${month} ${year}, the estimated number of scheduled deliveries was ${bVal}.`, isCorrect: false },
      { key: 'year', text: `At the end of ${month} ${year + 1}, the estimated number of scheduled deliveries was ${cVal}.`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;
    const letterOf = (k: string) => shuffled.find(o => o.key === k)!.letter;

    return {
      questionText: `The equation $y = -\\frac{${simplifiedNum}}{${simplifiedDen}}x^2 + ${bTerm} + ${cVal}$ models a company's scheduled deliveries over 8 months, where $y$ is the estimated number of scheduled deliveries $x$ months after the end of ${month} ${year}. Which statement is the best interpretation of the y-intercept of the graph?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The y-intercept occurs where $x=0$. Since $x$ is the number of months after the end of ${month} ${year}, $x=0$ represents the end of ${month} ${year}. Substituting 0 for $x$ gives $y=${cVal}$. Choice ${letterOf('end')} is incorrect; the end of ${endMonth} ${endYear} corresponds to $x=8$, not $x=0$. Choice ${letterOf('coef')} is incorrect; ${bVal} is the coefficient of $x$, not the value of $y$ when $x=0$. Choice ${letterOf('year')} is incorrect; the end of ${month} ${year + 1} corresponds to $x=12$, which is outside the 8 months the model covers.`
    };
  }
};
