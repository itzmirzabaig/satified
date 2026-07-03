import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1430
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: Rows of birch/maple, tall/short counts per row, 20 ft threshold
 * - Difficulty factors: Conditional probability P(Maple | >=20 ft) over a row-structured
 *   population; requires building the correct sub-population (all tall trees) as the
 *   denominator and the tall maple trees as the numerator.
 * - Distractor patterns:
 *     A: reverses the condition -> P(>=20 ft | Maple) = tallMaple / allMaple
 *     B: selects the wrong species -> P(Birch | >=20 ft) = tallBirch / allTall
 *     D: ignores the differing row counts -> single-row ratio of tall trees
 * - Constraints: integer counts throughout; all four answer choices must be
 *   numerically distinct on every draw (bounded retry guards coincidences).
 * - Question type: Word problem -> Multiple choice text
 * - Figure generation: None (conceptual)
 */

export const generator_1430 = {
  metadata: {
    id: "1430",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    // Render a positive integer ratio p/q as a fully simplified \frac{}{}.
    const frac = (p: number, q: number): string => {
      const g = gcd(p, q) || 1;
      return `\\frac{${p / g}}{${q / g}}`;
    };
    const val = (p: number, q: number): number => p / q;

    // Draw all quantities; re-draw (bounded) until every answer choice is a
    // distinct numeric value, so no distractor can collide with the correct
    // answer or with another distractor for any draw.
    let birchRows = 0, mapleRows = 0;
    let birchTallPerRow = 0, birchShortPerRow = 0;
    let mapleTallPerRow = 0, mapleShortPerRow = 0;
    let totalBirchTall = 0, totalMapleTall = 0, totalTall = 0;
    let totalMaple = 0;
    let cP = 0, cQ = 0;   // correct  numerator/denominator (pre-simplify)
    let aP = 0, aQ = 0;   // distractor A
    let bP = 0, bQ = 0;   // distractor B
    let dP = 0, dQ = 0;   // distractor D

    let tries = 0;
    do {
      birchRows = getRandomInt(4, 8);
      mapleRows = getRandomInt(3, 7);

      birchTallPerRow = getRandomInt(6, 10);
      birchShortPerRow = getRandomInt(5, 9);

      mapleTallPerRow = getRandomInt(7, 12);
      mapleShortPerRow = getRandomInt(6, 10);

      totalBirchTall = birchRows * birchTallPerRow;      // tall birch trees
      totalMapleTall = mapleRows * mapleTallPerRow;      // tall maple trees
      totalTall = totalBirchTall + totalMapleTall;       // all tall trees
      totalMaple = mapleRows * (mapleTallPerRow + mapleShortPerRow); // all maple trees

      // Correct: P(Maple | >= 20 ft) = tall maple / all tall
      cP = totalMapleTall;                cQ = totalTall;
      // A: reverse the condition -> P(>= 20 ft | Maple) = tall maple / all maple
      aP = totalMapleTall;                aQ = totalMaple;
      // B: wrong species -> P(Birch | >= 20 ft) = tall birch / all tall
      bP = totalBirchTall;                bQ = totalTall;
      // D: single-row ratio, ignoring how many rows each species has
      dP = mapleTallPerRow;               dQ = birchTallPerRow + mapleTallPerRow;
    } while (
      (() => {
        const vs = [val(cP, cQ), val(aP, aQ), val(bP, bQ), val(dP, dQ)];
        for (let i = 0; i < vs.length; i++)
          for (let j = i + 1; j < vs.length; j++)
            if (Math.abs(vs[i] - vs[j]) < 1e-9) return true; // collision -> retry
        return false;
      })() && ++tries < 50
    );

    const correctAnswerText = frac(cP, cQ);
    const distractorA = frac(aP, aQ);
    const distractorB = frac(bP, bQ);
    const distractorD = frac(dP, dQ);

    // Simplified correct fraction parts, for the explanation arithmetic.
    const gCorrect = gcd(cP, cQ) || 1;
    const simplifiedNum = cP / gCorrect;
    const simplifiedDen = cQ / gCorrect;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "reverses the condition and finds the probability that a maple tree is $20$ feet or taller, using the number of maple trees as the denominator instead of the number of trees that are $20$ feet or taller" },
      { text: distractorB, isCorrect: false, reason: "finds the probability of selecting a birch tree given that the tree is $20$ feet or taller, which is the complementary event rather than the maple probability asked for" },
      { text: correctAnswerText, isCorrect: true },
      { text: distractorD, isCorrect: false, reason: "compares the tall trees in a single row of each species while ignoring that birch and maple have different numbers of rows" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `A grove has $${birchRows}$ rows of birch trees and $${mapleRows}$ rows of maple trees. Each row of birch trees has $${birchTallPerRow}$ trees $20$ feet or taller and $${birchShortPerRow}$ trees shorter than $20$ feet. Each row of maple trees has $${mapleTallPerRow}$ trees $20$ feet or taller and $${mapleShortPerRow}$ trees shorter than $20$ feet. A tree from one of these rows will be selected at random. What is the probability of selecting a maple tree, given that the selected tree is $20$ feet or taller?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswerText,
      explanation: `Choice ${correctLetter} is correct. Because the selected tree is known to be $20$ feet or taller, restrict attention to the trees that are $20$ feet or taller and use $P(\\text{Maple} \\mid \\ge 20\\text{ ft}) = \\dfrac{\\text{tall maple trees}}{\\text{all tall trees}}$.\n\nThere are $${birchRows}$ rows of birch trees with $${birchTallPerRow}$ tall trees each, for $${birchRows} \\times ${birchTallPerRow} = ${totalBirchTall}$ tall birch trees.\n\nThere are $${mapleRows}$ rows of maple trees with $${mapleTallPerRow}$ tall trees each, for $${mapleRows} \\times ${mapleTallPerRow} = ${totalMapleTall}$ tall maple trees.\n\nThe number of trees that are $20$ feet or taller is $${totalBirchTall} + ${totalMapleTall} = ${totalTall}$, so $P(\\text{Maple} \\mid \\ge 20\\text{ ft}) = \\dfrac{${totalMapleTall}}{${totalTall}} = ${frac(simplifiedNum, simplifiedDen)}$.\n\nChoice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
