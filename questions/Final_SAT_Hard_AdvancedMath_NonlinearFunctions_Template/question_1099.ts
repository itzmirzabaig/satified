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

    const distractors = [
      daysToReach - 7,
      daysToReach - 3,
      daysToReach - 1,
      daysToReach
    ];

    const optionsData = distractors.map((d, i) => ({
      text: `Day $${d}$`,
      isCorrect: i === 3
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `A culture of bacteria is growing at an exponential rate, as shown in the table. At this rate, on which day would the number of bacteria per milliliter reach $${targetSci}$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `Day $${daysToReach}$`,
      explanation: `Choice ${correctLetter} is correct. The bacteria double each day, so if Day 1 has $${day1Sci}$, then Day $n$ has $${day1Sci} \\cdot 2^{n-1}$. Setting this equal to $${targetSci}$ gives $2^{n-1}=${Math.pow(2, doublings)}$, so $n-1=${doublings}$ and $n=${daysToReach}$.`
    };
  }
};
