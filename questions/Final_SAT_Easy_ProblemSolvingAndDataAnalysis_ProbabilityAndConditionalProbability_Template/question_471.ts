import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 471
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [29 defective out of 100]
 * - Difficulty factors: [Proportion to probability conversion]
 * - Distractor patterns: [A: 1/2900, B: 1/29, D: 29/10]
 * - Constraints: [Maintain 29/100 ratio, reduce if needed]
 * - Question type: [No figure → Text options]
 * - Figure generation: [None]
 */

export const generator_471 = {
  metadata: {
    id: "471",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const defectiveRate = getRandomInt(15, 40);
    const base = 100;
    const good = base - defectiveRate;

    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    // Every choice is shown in lowest terms, so the correct one does not stand
    // out by being the only reduced fraction.
    const frac = (p: number, q: number) => {
      const g = gcd(p, q);
      return `\\frac{${p / g}}{${q / g}}`;
    };
    const correctText = frac(defectiveRate, base);

    // Wrong choices are real slips: the probability of no defect, defective
    // beads compared with good beads, and 1 over the number of defective
    // beads. They used to be 1/(100k), 1/k, and k/10, each explained only as
    // "conceptual or computational errors."
    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: frac(good, base), isCorrect: false, reason: `$${frac(good, base)}$ is the probability of selecting a bead that does not have a defect, since ${good} out of every ${base} beads have no defect` },
      { text: frac(defectiveRate, good), isCorrect: false, reason: `$${frac(defectiveRate, good)}$ compares the ${defectiveRate} beads with a defect to the ${good} beads without one; the denominator must be all ${base} beads` },
      { text: `\\frac{1}{${defectiveRate}}`, isCorrect: false, reason: `$\\frac{1}{${defectiveRate}}$ treats ${defectiveRate} as the total number of beads; the probability is the ${defectiveRate} beads with a defect out of every ${base} beads` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const g = gcd(defectiveRate, base);
    const explanation = `Choice ${correctOption.letter} is correct. If ${defectiveRate} out of every ${base} beads have a defect, the probability of selecting a bead that has a defect is $\\frac{${defectiveRate}}{${base}}$${g > 1 ? `, which is equivalent to $${correctText}$` : ''}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `For a particular machine that produces beads, ${defectiveRate} out of every ${base} beads it produces have a defect. A bead produced by the machine will be selected at random. What is the probability of selecting a bead that has a defect?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
