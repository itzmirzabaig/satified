import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 208626df
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [perimeter limit: 27, test length: 8, test width: 3]
 * - Difficulty factors: [Interpretation of ordered pair in context, perimeter formula]
 * - Distractor patterns: [A=swapped dimensions, B=correct interpretation, C=swapped with wrong sign, D=calculation error]
 * - Constraints: [Must verify 2(8)+2(3) <= 27]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_208626df = {
  metadata: {
    // id: "208626df",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const maxPerimeter = getRandomInt(20, 40);
    const length = getRandomInt(6, 12);
    const width = getRandomInt(2, 6);
    const actualPerimeter = 2 * length + 2 * width;
    const isValid = actualPerimeter <= maxPerimeter;

    const optionsData = [
      { text: `If the rectangle has length ${width} and width ${length}, its perimeter is ${isValid ? 'less than or equal to' : 'greater than'} ${maxPerimeter}.`, isCorrect: false },
      { text: `If the rectangle has length ${length} and width ${width}, its perimeter is ${isValid ? 'less than or equal to' : 'greater than'} ${maxPerimeter}.`, isCorrect: true },
      { text: `If the rectangle has length ${width} and width ${length}, its perimeter is ${!isValid ? 'less than or equal to' : 'greater than or equal to'} ${maxPerimeter}.`, isCorrect: false },
      { text: `If the rectangle has length ${length} and width ${width}, its perimeter is ${!isValid ? 'less than or equal to' : 'greater than or equal to'} ${maxPerimeter}.`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const explanation = `Choice ${correctLetter} is correct. Substituting length = ${length} and width = ${width} into $2\\ell + 2w \\leq ${maxPerimeter}$ gives $2(${length}) + 2(${width}) = ${actualPerimeter} \\leq ${maxPerimeter}$, which is ${isValid ? 'true' : 'false'}.`;

    return {
      questionText: `A rectangle has length $\\ell$ and width $w$. The inequality $2\\ell+2w \\leq ${maxPerimeter}$ gives the possible values of $\\ell$ and $w$ for which the perimeter of this rectangle is less than or equal to ${maxPerimeter}. Which statement is the best interpretation of $(\\ell, w)=(${length},${width})$ in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: b75f7812
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [hourly: $60, course: $10, budget: $280]
 * - Difficulty factors: [Linear inequality solving, discrete whole number constraint]
 * - Distractor patterns: [Fill-in-the-blank, exact calculation vs rounded down]
 * - Constraints: [Must round down to whole number since h <= 4.5]
 * - Question type: [Word Problem→Fill in the blank]
 * - Figure generation: [None]
 */