import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 775
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [birth weight: 200, gain: 2-3 lbs/day, days: 365]
 * - Difficulty factors: [Compound inequality with multiplication, addition of base value]
 * - Distractor patterns: [A=forgot to multiply by days, B=forgot birth weight, C=added birth weight twice]
 * - Constraints: [birthWeight + days*minGain < w < birthWeight + days*maxGain]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_775 = {
  metadata: {
    id: "775",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const birthWeight = getRandomInt(150, 250); // pounds at birth
    const minGain = getRandomInt(1, 3);         // min daily gain
    const maxGain = minGain + getRandomInt(1, 2); // max daily gain (> minGain)
    const days = getRandomInt(300, 400);          // days after birth

    // STEP 2: Correct compound inequality.
    // The animal gains strictly between minGain and maxGain per day for `days`
    // days, so total gain is between days*minGain and days*maxGain; add the
    // birth weight to both bounds.
    const minWeight = birthWeight + days * minGain;
    const maxWeight = birthWeight + days * maxGain;

    // STEP 3: Distractors — all integer-valued and provably distinct from the
    // correct answer and from each other for every draw in the declared ranges.
    //  correct lower  = birthWeight + days*minGain
    //  A lower        = birthWeight + minGain      (forgot to multiply by days)
    //  B lower        = days*minGain               (forgot the birth weight)
    //  C lower        = 2*birthWeight + days*minGain (added birth weight twice)
    // Since days >= 300 and 150 <= birthWeight <= 250, the four lower bounds are
    // pairwise distinct, so no two options can ever coincide.
    const distA = { lo: birthWeight + minGain, hi: birthWeight + maxGain };
    const distB = { lo: days * minGain, hi: days * maxGain };
    const distC = { lo: 2 * birthWeight + days * minGain, hi: 2 * birthWeight + days * maxGain };

    const fmt = (lo: number, hi: number) => `$${lo} < w < ${hi}$`;

    // STEP 4: Options tagged by kind so the explanation can find each letter
    // after shuffling (letters are only meaningful post-shuffle).
    const optionsData = [
      { text: fmt(minWeight, maxWeight), isCorrect: true, kind: 'correct' },
      { text: fmt(distA.lo, distA.hi), isCorrect: false, kind: 'noDays' },
      { text: fmt(distB.lo, distB.hi), isCorrect: false, kind: 'noBirth' },
      { text: fmt(distC.lo, distC.hi), isCorrect: false, kind: 'doubleBirth' }
    ];

    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const letterOf = (kind: string) => shuffledOptions.find(o => o.kind === kind)!.letter;

    // STEP 6: Build explanation — each distractor is described by its own
    // shuffled letter, so the reasons always match the choices shown.
    const explanation = `Choice ${correctOption.letter} is correct. The animal gains between ${minGain} and ${maxGain} pounds per day for ${days} days, so the total gain is between $${days} \\times ${minGain} = ${days * minGain}$ and $${days} \\times ${maxGain} = ${days * maxGain}$ pounds. Adding the birth weight of ${birthWeight} pounds to each bound gives $${minWeight} < w < ${maxWeight}$. Choice ${letterOf('noDays')} adds only a single day's gain instead of multiplying by ${days} days. Choice ${letterOf('noBirth')} forgets to add the birth weight of ${birthWeight} pounds. Choice ${letterOf('doubleBirth')} adds the birth weight twice.`;

    // STEP 7: Return question data
    return {
      questionText: `A certain animal weighs $${birthWeight}$ pounds at birth and gains more than $${minGain}$ but less than $${maxGain}$ pounds per day during its first year. Which of the following inequalities represents all possible weights $w$, in pounds, of the animal $${days}$ days after birth?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
