import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1099
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Day 1: 2.5×10^5, Day 2: 5.0×10^5, doubling each day]
 * - Difficulty factors: [Exponential growth, scientific notation]
 * - Distractor patterns: [A: Day 5, B: Day 9, C: Day 11, D: Day 12]
 * - Constraints: [Doubling daily, solve 2.5×10^5 × 2^(d-1) = target]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table required]
 */

// Exact scientific notation for a value, using the shortest round-trip
// mantissa (never rounds), rendered as MathJax "m \times 10^{e}".
const toSci = (value: number): string => {
  const [mant, exp] = value.toExponential().split('e');
  return `${mant} \\times 10^{${parseInt(exp, 10)}}`;
};

export const generator_1099 = {
  metadata: {
    id: "1099",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const startExp = getRandomInt(4, 6);
    const startCoeff = getRandomInt(2, 5);

    // The value SHOWN in the table for Day 1. Everything the student can see
    // and the target are derived from this single value, so the two are always
    // on the same scale.
    const day1Coeff = startCoeff / 2;      // 1, 1.5, 2, or 2.5
    const day1 = day1Coeff * Math.pow(10, startExp);

    const daysToReach = getRandomInt(8, 14);
    const doublings = daysToReach - 1;              // 2^(daysToReach-1)
    const target = day1 * Math.pow(2, doublings);   // exact — pure doubling

    const targetSci = toSci(target);
    const day1Sci = toSci(day1);
    const day2Sci = toSci(day1 * 2);
    const day3Sci = toSci(day1 * 4);

    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center;">
      <thead>
        <tr>
          <th style="border: 1px solid #ccc; padding: 12px;">Day</th>
          <th style="border: 1px solid #ccc; padding: 12px;">Bacteria per mL</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">1</td>
          <td style="border: 1px solid #ccc; padding: 12px;">$${day1Sci}$</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">2</td>
          <td style="border: 1px solid #ccc; padding: 12px;">$${day2Sci}$</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">3</td>
          <td style="border: 1px solid #ccc; padding: 12px;">$${day3Sci}$</td>
        </tr>
      </tbody>
    </table>`;

    // Distractors were answer-7, -3, -1 with no reasons, so the answer was always
    // the latest day. Each is now an off-by-some-days slip in the exponent.
    const ratio = Math.pow(2, doublings);
    const ratioStr = ratio.toLocaleString('en-US').replace(/,/g, '{,}');
    const optionsData = [
      { text: `Day $${daysToReach}$`, isCorrect: true, reason: '' },
      { text: `Day $${daysToReach - 1}$`, isCorrect: false, reason: `${daysToReach - 1} is the number of doublings after Day 1, which is $n-1$ rather than the day number $n$` },
      { text: `Day $${daysToReach - 2}$`, isCorrect: false, reason: `${daysToReach - 2} is the number of doublings after Day 2, found by dividing the target by the Day 2 value and not converting back to a day number` },
      { text: `Day $${daysToReach + 1}$`, isCorrect: false, reason: `${daysToReach + 1} results from using the exponent $n-2$ instead of $n-1$, as if the first doubling happened after Day 2` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A culture of bacteria is growing at an exponential rate, as shown in the table. At this rate, on which day would the number of bacteria per milliliter reach $${targetSci}$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `Day $${daysToReach}$`,
      explanation: `Choice ${correctLetter} is correct. The table shows that the number of bacteria doubles each day, so if Day 1 has $${day1Sci}$ bacteria per milliliter, then Day $n$ has $(${day1Sci}) \\cdot 2^{n-1}$. Setting this equal to $${targetSci}$ and dividing both sides by $${day1Sci}$ gives $2^{n-1}=${ratioStr}=2^{${doublings}}$, so $n-1=${doublings}$ and $n=${daysToReach}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
