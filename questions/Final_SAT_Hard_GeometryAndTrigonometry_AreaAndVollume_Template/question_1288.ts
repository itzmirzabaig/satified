import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1288
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius A: (smallCoeff)n, radius B: (largeCoeff)n]
 * - Difficulty factors: [Circle area ratio, recognizing (largeCoeff/smallCoeff)² pattern]
 * - Distractor patterns: [linear ratio, 2× linear ratio, larger-radius coefficient, correct area ratio]
 * - Constraints: [Clean perfect-square area ratio; all four options distinct]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1288 = {
  metadata: {
    id: "1288",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate ratio components.
    // radius A = smallCoeff * n, radius B = largeCoeff * n, with
    // largeCoeff = smallCoeff * linearRatio, so radius ratio = linearRatio and
    // area ratio = linearRatio^2.
    // Guard so the correct answer and all three distractors are pairwise
    // distinct. The only collision across the range is
    //   B (2*linearRatio) == C (smallCoeff*linearRatio)  when smallCoeff === 2.
    // (linearRatio, linearRatio^2 and smallCoeff*linearRatio can never equal
    // linearRatio or 2*linearRatio for the given ranges since linearRatio >= 20
    // and smallCoeff <= 5 < linearRatio.) Bounded retry keeps the intended
    // four-value distractor structure intact.
    let smallCoeff = getRandomInt(2, 5);
    let linearRatio = getRandomInt(20, 60); // Large linear ratio like 43
    let tries = 0;
    while (tries++ < 50) {
      const cLinear = linearRatio;
      const cDouble = linearRatio * 2;
      const cCoeff = smallCoeff * linearRatio;
      const cArea = linearRatio * linearRatio;
      if (new Set([cLinear, cDouble, cCoeff, cArea]).size === 4) break;
      smallCoeff = getRandomInt(2, 5);
      linearRatio = getRandomInt(20, 60);
    }

    const largeCoeff = smallCoeff * linearRatio;

    // STEP 2: Calculate area ratio
    const areaRatio = linearRatio * linearRatio;

    // STEP 3: Create distractors
    const distractorLinear = linearRatio;      // Linear (radius) ratio
    const distractorDouble = linearRatio * 2;  // 2x the linear ratio
    const distractorCoeff = largeCoeff;        // Coefficient of the larger radius

    const correctText = areaRatio.toString();

    const optionsData = [
      { text: distractorLinear.toString(), isCorrect: false, kind: 'linear' },
      { text: distractorDouble.toString(), isCorrect: false, kind: 'double' },
      { text: distractorCoeff.toString(), isCorrect: false, kind: 'coeff' },
      { text: correctText, isCorrect: true, kind: 'correct' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const letterOf = (kind: string) => shuffledOptions.find(o => o.kind === kind)!.letter;

    return {
      questionText: `Circle $A$ has a radius of $r_A = ${smallCoeff}n$ and circle $B$ has a radius of $r_B = ${largeCoeff}n$, where $n$ is a positive constant. The area of circle $B$ is how many times the area of circle $A$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The ratio of the radii is $\\frac{r_B}{r_A} = \\frac{${largeCoeff}n}{${smallCoeff}n} = ${linearRatio}$. Since area is proportional to the square of the radius, the area ratio is $\\left(\\frac{r_B}{r_A}\\right)^2 = ${linearRatio}^2 = ${areaRatio}$. Choice ${letterOf('linear')} is incorrect because it gives the ratio of the radii instead of the ratio of the areas. Choice ${letterOf('double')} is incorrect because it doubles the ratio of the radii instead of squaring it. Choice ${letterOf('coeff')} is incorrect because it gives the coefficient of the larger radius instead of the area ratio.`
    };
  }
};
