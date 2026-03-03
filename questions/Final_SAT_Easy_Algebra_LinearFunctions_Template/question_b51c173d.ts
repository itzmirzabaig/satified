import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: b51c173d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, yIntercept: 3-8 negative]
 * - Difficulty factors: [Constructing equation from slope/intercept]
 * - Distractor patterns: [reciprocal slope, negative reciprocal, negative slope]
 * - Constraints: [Ensure negative intercept]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_b51c173d = {
  metadata: {
    // id: "b51c173d",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(2, 5);

    const yIntercept = -getRandomInt(3, 8);

    const correctEquation = `f(x)=${slope}x-${Math.abs(yIntercept)}`;

    const distractorA = `f(x)=\\frac{1}{${slope}}x-${Math.abs(yIntercept)}`;

    const distractorB = `f(x)=-\\frac{1}{${slope}}x-${Math.abs(yIntercept)}`;

    const distractorC = `f(x)=-${slope}x-${Math.abs(yIntercept)}`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "uses the reciprocal of the slope" },
      { text: distractorB, isCorrect: false, reason: "uses the negative reciprocal of the slope" },
      { text: distractorC, isCorrect: false, reason: "uses the negative of the slope" },
      { text: correctEquation, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the linear function $f$, the graph of $y=f(x)$ in the $xy$-plane has a slope of $${slope}$ and has a $y$-intercept at $(0,${yIntercept})$. Which equation defines $f$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. Using slope-intercept form $f(x)=mx+b$ with slope $m=${slope}$ and y-intercept $b=${yIntercept}$ gives $f(x)=${slope}x-${Math.abs(yIntercept)}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 4702da8f
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [intercept: 60-100, slope: 4-8 negative, x: 5-10]
 * - Difficulty factors: [Function evaluation]
 * - Distractor patterns: [arithmetic errors, subtraction error, addition error]
 * - Constraints: [Ensure negative slope]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

