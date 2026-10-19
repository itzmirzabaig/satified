import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 271
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, yIntercept: 3-8 negative]
 * - Difficulty factors: [Constructing equation from slope/intercept]
 * - Distractor patterns: [reciprocal slope, negative reciprocal, negative slope]
 * - Constraints: [Ensure negative intercept]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_271 = {
  metadata: {
    id: "271",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(2, 5);

    const yIntercept = -getRandomInt(3, 8);

    const correctEquation = `$f(x) = ${slope}x - ${Math.abs(yIntercept)}$`;

    const distractorA = `$f(x) = \\frac{1}{${slope}}x - ${Math.abs(yIntercept)}$`;

    const distractorB = `$f(x) = -\\frac{1}{${slope}}x - ${Math.abs(yIntercept)}$`;

    const distractorC = `$f(x) = -${slope}x - ${Math.abs(yIntercept)}$`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: `the slope of its graph is the reciprocal of ${slope}, not ${slope}` },
      { text: distractorB, isCorrect: false, reason: `the slope of its graph is the negative reciprocal of ${slope}, not ${slope}; lines with these two slopes are perpendicular` },
      { text: distractorC, isCorrect: false, reason: `the slope of its graph is $-${slope}$, not ${slope}` },
      { text: correctEquation, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the linear function $f$, the graph of $y=f(x)$ in the $xy$-plane has a slope of $${slope}$ and has a $y$-intercept at $(0, ${yIntercept})$. Which equation defines $f$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. A linear function can be written in slope-intercept form, $f(x) = mx + b$, where $m$ is the slope of its graph and $(0, b)$ is its $y$-intercept. Substituting $m = ${slope}$ and $b = ${yIntercept}$ gives $f(x) = ${slope}x - ${Math.abs(yIntercept)}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
