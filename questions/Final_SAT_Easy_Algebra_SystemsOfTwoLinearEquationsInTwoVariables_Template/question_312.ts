import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 312
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2-9, constants: 9-36]
 * - Difficulty factors: [Understanding proportional systems]
 * - Distractor patterns: [scale factor, unscaled constant, additive instead of multiplicative scaling]
 * - Constraints: [System must have proportional coefficients]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_312 = {
  metadata: {
    id: "312",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a1 = getRandomInt(2, 4);
    const b1 = getRandomInt(3, 8);
    // c1 >= 7 keeps it strictly above scale (<=6), so the "unscaled constant"
    // distractor (c1) can never collide with the "scale factor" distractor.
    const c1 = getRandomInt(7, 12);
    const scale = getRandomInt(3, 6);
    const a2 = a1 * scale;
    const b2 = b1 * scale;
    const correctA = c1 * scale;

    // Distractor distinctness across the full ranges (a1:2-4, b1:3-8, c1:7-12, scale:3-6):
    //   scale (3-6) vs c1 (7-12): disjoint.
    //   correctA = c1*scale >= 21, so it exceeds scale, c1, and differs from correctA+scale by scale.
    //   correctA+scale = scale*(c1+1) >= 24, above c1 and scale. All four are provably distinct.
    // The fourth choice used to be the answer plus the scale factor. It is now
    // the additive slip: the x-coefficient grows by a2 - a1, so add the same
    // amount to the constant. It differs from the answer because a1 < c1.
    const added = a2 - a1;
    const optionsData = [
      { text: scale.toString(), isCorrect: false, reason: `${scale} is the number that each coefficient is multiplied by, not the constant $a$` },
      { text: c1.toString(), isCorrect: false, reason: `${c1} is the constant in the first equation; for the equations to be equivalent, it must also be multiplied by ${scale}` },
      { text: correctA.toString(), isCorrect: true, reason: '' },
      { text: (c1 + added).toString(), isCorrect: false, reason: `it results from adding ${added}, the increase from ${a1} to ${a2}, to ${c1}; the coefficients are multiplied by ${scale}, so the constant must be multiplied by ${scale}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. A system of two linear equations has infinitely many solutions when one equation is a multiple of the other. The coefficients of $x$ and $y$ in the second equation are ${scale} times those in the first, since $${a2} = ${scale}(${a1})$ and $${b2} = ${scale}(${b1})$. Multiplying both sides of the first equation by ${scale} gives $${a2}x + ${b2}y = ${correctA}$, so $a = ${correctA}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `In the given system of equations, $a$ is a constant. If the system has infinitely many solutions, what is the value of $a$?$$\\begin{aligned} ${a1}x + ${b1}y &= ${c1} \\\\ ${a2}x + ${b2}y &= a \\end{aligned}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctA.toString(),
      explanation: explanation
    };
  }
};