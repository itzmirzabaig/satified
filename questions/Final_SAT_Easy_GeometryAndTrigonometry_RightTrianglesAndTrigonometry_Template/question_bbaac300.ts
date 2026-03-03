import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: bbaac300
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cosine value: 1/22 (simple fraction)]
 * - Difficulty factors: [Similar triangles property, corresponding angles, cosine equality]
 * - Distractor patterns: [B: off-by-one, C: complementary ratio, D: random combination]
 * - Constraints: [Similar triangles have congruent corresponding angles]
 * - Question type: [No Figure→Multiple Choice Text]
 */

export const generator_bbaac300 = {
  metadata: {
    // id: "bbaac300",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const numerator = 1;
    const denominator = getRandomInt(15, 30);

    const optionsData = [
      { text: `$\\frac{${numerator}}{${denominator}}$`, isCorrect: true },
      { text: `$\\frac{${numerator}}{${denominator + 1}}$`, isCorrect: false, reason: "may result from an off-by-one error in identifying the ratio" },
      { text: `$\\frac{${denominator - 1}}{${denominator}}$`, isCorrect: false, reason: "may result from using the complementary angle's ratio" },
      { text: `$\\frac{${denominator}}{${denominator + 1}}$`, isCorrect: false, reason: "may result from a conceptual error in identifying corresponding parts" }
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
      explanation: `Choice ${correctLetter} is correct. When two triangles are similar, their corresponding angles are congruent. Since angle $A$ corresponds to $D$ and angle $C$ corresponds to $F$, the remaining angle $B$ must correspond to $E$. Therefore, $m\\angle B = m\\angle E$. Since the angles are equal, their cosine values are also equal: $\\cos E = \\cos B = \\frac{${numerator}}{${denominator}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: a6097ec2
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [opposite: 63, hypotenuse: 73]
 * - Difficulty factors: [Sine ratio, opposite/hypotenuse]
 * - Distractor patterns: [A: reciprocal, B: difference ratio, D: sum ratio]
 * - Constraints: [Opposite < hypotenuse]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with angle x marked → Mafs code]
 */

// File: generators/right-triangles-and-trigonometry/a6097ec2.ts