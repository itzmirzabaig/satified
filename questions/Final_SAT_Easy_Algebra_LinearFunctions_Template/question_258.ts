import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 258
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 20-50]
 * - Difficulty factors: [Slope-intercept from point and slope]
 * - Distractor patterns: [negative slope, reciprocal slope, slope as intercept]
 * - Constraints: [Passes through origin]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_258 = {
  metadata: {
    id: "258",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(20, 50);

    const optionsData = [
      { text: `f(x)=-${slope}x`, isCorrect: false, reason: "uses the negative of the slope" },
      { text: `f(x)=\\frac{1}{${slope}}x`, isCorrect: false, reason: "uses the reciprocal of the slope" },
      { text: `f(x)=x-${slope}`, isCorrect: false, reason: "uses slope as intercept with wrong sign" },
      { text: `f(x)=${slope}x`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the linear function $f$, the graph of $y=f(x)$ in the $xy$-plane has a slope of $${slope}$ and passes through the point $(0,0)$. Which equation defines $f$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `f(x)=${slope}x`,
      explanation: `Choice ${correctOption.letter} is correct. Using slope-intercept form with slope $m=${slope}$ and y-intercept $b=0$ (since it passes through origin) gives $f(x)=${slope}x$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
