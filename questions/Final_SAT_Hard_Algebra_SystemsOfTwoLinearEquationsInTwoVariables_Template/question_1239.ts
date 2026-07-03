import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1239
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [masses in grams, integer silicon percentages, integer answer]
 * - Difficulty factors: [Word problem, mixture problem, system of equations]
 * - Distractor patterns: [Piece mass, silicon of the other piece, total silicon]
 * - Constraints: [System must have a clean integer solution and answer]
 * - Question type: [Multiple choice text]
 *
 * REBUILD NOTES:
 * The original produced float artifacts (e.g. 45.080000000000005) from
 * `pTotal/100 * totalMass` and rounded silicon values, and its four distractors
 * collided constantly (DUP_OPTIONS). Rebuilt with an all-integer construction:
 * piece masses are multiples of 10 and percentages are multiples of 10, so every
 * silicon quantity is an exact integer. A bounded retry (<=50) keeps only draws
 * where the blended percentage pT is an integer and the four answer choices are
 * pairwise distinct. The correct answer is the silicon MASS in the second piece.
 */

export const generator_1239 = {
  metadata: {
    id: "1239",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    let attempts = 0;
    const maxAttempts = 50;
    let result: QuestionData | null = null;

    while (attempts < maxAttempts && !result) {
      attempts++;

      // Piece masses (grams) as multiples of 10 -> keeps silicon integral.
      const xMass = getRandomInt(3, 7) * 10;             // first piece
      const yMass = getRandomInt(3, 7) * 10;             // second piece
      if (xMass === yMass) continue;                     // want distinct masses

      const totalMass = xMass + yMass;

      // Silicon percentages as multiples of 10; first < second so pT sits between.
      const p1 = getRandomElement([20, 30, 40]);         // first piece %
      const p2 = getRandomElement([60, 70, 80, 90]);     // second piece %

      // Silicon masses (grams) are exact integers because mass and % are tens.
      const siliconFirst = (p1 * xMass) / 100;           // silicon in first piece
      const siliconSecond = (p2 * yMass) / 100;          // silicon in second piece (ANSWER)
      const siliconTotal = siliconFirst + siliconSecond; // silicon in whole sample

      // Blended percentage must be an integer for a clean problem statement.
      const pTotalTimes = siliconTotal * 100;            // = pTotal * totalMass
      if (pTotalTimes % totalMass !== 0) continue;
      const pTotal = pTotalTimes / totalMass;            // integer percent

      // Four answer choices — must be pairwise distinct.
      const correct = siliconSecond;                     // silicon mass in 2nd piece
      const dPieceMass = yMass;                           // trap: the piece's mass
      const dOtherSilicon = siliconFirst;                 // trap: silicon in 1st piece
      const dTotalSilicon = siliconTotal;                 // trap: silicon in sample
      const vals = [correct, dPieceMass, dOtherSilicon, dTotalSilicon];
      if (new Set(vals).size !== 4) continue;            // reject collisions

      const optionsData = [
        { text: String(correct), isCorrect: true },
        { text: String(dPieceMass), isCorrect: false },
        { text: String(dOtherSilicon), isCorrect: false },
        { text: String(dTotalSilicon), isCorrect: false }
      ];

      const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
        ...opt,
        letter: String.fromCharCode(65 + index)
      }));

      const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
      const correctLetter = correctOption.letter;

      result = {
        questionText:
          `A sample of a certain alloy has a total mass of ${totalMass} grams and is ${pTotal}\\% silicon by mass. ` +
          `The sample was formed by combining two pieces of different alloys. ` +
          `The first piece was ${p1}\\% silicon by mass, and the second piece was ${p2}\\% silicon by mass. ` +
          `What was the mass, in grams, of the silicon in the second piece?`,
        figureCode: null,
        options: shuffledOptions.map(o => ({ text: o.text })),
        correctAnswer: String(correct),
        explanation:
          `Choice ${correctLetter} is correct. Let $x$ and $y$ be the masses (in grams) of the first and second pieces. ` +
          `The total mass gives $x + y = ${totalMass}$, and the silicon balance gives $${p1}x + ${p2}y = ${pTotal} \\times ${totalMass} = ${pTotalTimes}$ ` +
          `(after multiplying each percentage-times-mass by 100). Solving the system gives $y = ${yMass}$ grams for the second piece. ` +
          `Its silicon mass is ${p2}\\% of ${yMass}, which is $\\frac{${p2}}{100} \\times ${yMass} = ${correct}$ grams. ` +
          `The choice ${dPieceMass} is the second piece's total mass, ${dOtherSilicon} is the silicon in the first piece, and ${dTotalSilicon} is the silicon in the entire sample.`
      };
    }

    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }

    return result;
  }
};
