import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 990
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [d = speed*t; distance after m1*k hours vs m2*k hours]
 * - Difficulty factors: [Proportional reasoning with a shared constant k]
 * - Distractor patterns: [difference m1-m2, inverted ratio m2/m1, sum m1+m2]
 * - Constraints: [k and speed cancel, answer is the pure ratio m1/m2]
 * - Question type: [Text -> Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_990 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

    // Format a positive rational num/den as a whole number or a simplified \frac.
    const formatRatio = (num: number, den: number): string => {
      const g = gcd(num, den);
      const p = num / g;
      const q = den / g;
      return q === 1 ? `${p}` : `\\frac{${p}}{${q}}`;
    };

    // STEP 1: Draw values. m1 > m2 so the ratio m1/m2 is >= 1.
    // Bounded retry guarantees all four option strings are distinct for every draw
    // (the only natural collision is (m1,m2)=(4,2) where ratio 2 == difference 2).
    let speed = 0;
    let m1 = 0;
    let m2 = 0;
    let ratioText = '';
    let recipText = '';
    let diff = 0;
    let sum = 0;
    let options: { text: string; isCorrect: boolean; reason?: string }[] = [];

    let tries = 0;
    do {
      speed = getRandomInt(30, 80);
      m1 = getRandomInt(4, 9);
      m2 = getRandomInt(2, m1 - 1); // strictly smaller than m1

      ratioText = formatRatio(m1, m2);   // correct answer: m1/m2 (>= 1)
      recipText = formatRatio(m2, m1);   // inverted ratio: m2/m1 (< 1), always a proper fraction
      diff = m1 - m2;                    // subtract-instead-of-divide error
      sum = m1 + m2;                     // add-instead-of-divide error

      options = [
        { text: ratioText, isCorrect: true },
        {
          text: `${diff}`,
          isCorrect: false,
          reason: `finds the difference $${m1}k - ${m2}k = ${diff}k$ instead of the ratio`
        },
        {
          text: recipText,
          isCorrect: false,
          reason: `inverts the comparison and computes $\\frac{${m2}}{${m1}}$, the ratio of the shorter time to the longer time`
        },
        {
          text: `${sum}`,
          isCorrect: false,
          reason: `adds the two multipliers ($${m1} + ${m2} = ${sum}$) instead of dividing them`
        }
      ];

      const texts = options.map(o => o.text);
      const allDistinct = new Set(texts).size === texts.length;
      if (allDistinct) break;
    } while (tries++ < 50);

    // STEP 2: Shuffle, then derive letters from the shuffled order.
    const shuffledOptions = shuffle(options).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The equation $d = ${speed}t$ gives the distance $d$, in miles, traveled by a car moving at a constant speed of $${speed}$ miles per hour over a period of $t$ hours. For any positive constant $k$, the distance the car travels in $${m1}k$ hours is how many times the distance it travels in $${m2}k$ hours?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: ratioText,
      explanation: `Choice ${correctLetter} is correct. In $${m1}k$ hours the car travels $d_1 = ${speed}(${m1}k)$ miles, and in $${m2}k$ hours it travels $d_2 = ${speed}(${m2}k)$ miles. The number of times as far is $\\frac{d_1}{d_2} = \\frac{${speed}(${m1}k)}{${speed}(${m2}k)} = \\frac{${m1}}{${m2}} = ${ratioText}$, since the speed $${speed}$ and the constant $k$ cancel. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
