import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 391
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cosine from a primitive Pythagorean triple]
 * - Difficulty factors: [Similar triangles property, corresponding angles, cosine equality]
 * - Distractor patterns: [cosine of the other acute angle, reciprocal, tangent]
 * - Constraints: [Similar triangles have congruent corresponding angles]
 * - Question type: [No Figure→Multiple Choice Text]
 */

export const generator_391 = {
  metadata: {
    id: "391",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // cos B comes from a primitive Pythagorean triple (a, b, c): cos B = a/c,
    // so the other acute angle has cosine b/c and tan B = b/a. The old version
    // always used 1/q with made-up choices 1/(q + 1), (q - 1)/q, and
    // q/(q + 1).
    const triple = getRandomElement([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [12, 35, 37], [9, 40, 41], [28, 45, 53], [11, 60, 61], [33, 56, 65]]);
    const swap = Math.random() < 0.5;
    const numerator = swap ? triple[1] : triple[0];   // side adjacent to B
    const other = swap ? triple[0] : triple[1];       // side opposite B
    const denominator = triple[2];                    // hypotenuse

    const optionsData = [
      { text: `$\\frac{${numerator}}{${denominator}}$`, isCorrect: true, reason: '' },
      { text: `$\\frac{${other}}{${denominator}}$`, isCorrect: false, reason: `it is the cosine of the other acute angle of triangle $ABC$, angle $A$, which corresponds to angle $D$, not angle $E$` },
      { text: `$\\frac{${denominator}}{${numerator}}$`, isCorrect: false, reason: `it is the reciprocal of $\\cos B$; congruent angles have equal cosines, not reciprocal ones` },
      { text: `$\\frac{${other}}{${numerator}}$`, isCorrect: false, reason: `it is $\\tan B$, the ratio of the side opposite angle $B$ to the side adjacent to it, not the cosine` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Triangle $ABC$ is similar to triangle $DEF$, where angle $A$ corresponds to angle $D$, and angles $C$ and $F$ are right angles. If $\\cos B = \\frac{${numerator}}{${denominator}}$, what is the value of $\\cos E$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. When two triangles are similar, their corresponding angles are congruent. Since angle $A$ corresponds to $D$ and angle $C$ corresponds to $F$, the remaining angle $B$ must correspond to $E$. Therefore, $m\\angle B = m\\angle E$. Since the angles are equal, their cosine values are also equal: $\\cos E = \\cos B = \\frac{${numerator}}{${denominator}}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
