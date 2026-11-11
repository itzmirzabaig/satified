import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 510
*
* ORIGINAL ANALYSIS:
* - Number ranges: [ratio XY:ZV = 6:1, XY = 102 inches, answer: 17]
* - Difficulty factors: [Ratio setup with geometric context, solving proportion]
* - Distractor patterns: [A: 17 (correct), B: 96 (102-6), C: 102 (same as XY), D: 612 (102×6, reversed)]
* - Constraints: [XY must be divisible by 6 for integer ZV]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None - conceptual geometry]
*/

export const generator_510 = {
  metadata: {
    id: "510",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const ratioXY = getRandomInt(4, 8);
    const ratioZV = 1;
    const multiplier = getRandomInt(12, 20);
    const lengthXY = ratioXY * multiplier;
    const lengthZV = multiplier;

    const distractor1 = lengthXY - ratioXY;
    const distractor2 = lengthXY;
    const distractor3 = lengthXY * ratioXY;

    // Reasons used to open with "This is incorrect." and the explanation
    // used a nonstandard "Analysis of other options:" layout with
    // "cross-multiply"; now each reason names the value and the slip.
    const optionsData = [
      { text: lengthZV.toString(), isCorrect: true, reason: '' },
      { text: distractor1.toString(), isCorrect: false, reason: `${distractor1} results from subtracting $${ratioXY}$ from $${lengthXY}$ instead of dividing $${lengthXY}$ by $${ratioXY}$` },
      { text: distractor2.toString(), isCorrect: false, reason: `${distractor2} is the length of $XY$, which assumes the two segments are equal and ignores the ratio of $${ratioXY}$ to $${ratioZV}$` },
      // Can reach 1,280, so it gets a thousands comma.
      { text: distractor3.toLocaleString('en-US'), isCorrect: false, reason: `${distractor3.toLocaleString('en-US')} results from multiplying $${lengthXY}$ by $${ratioXY}$ instead of dividing, which reverses the ratio` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The ratio of $XY$ to $ZV$ is $${ratioXY}$ to $${ratioZV}$, so $\\frac{XY}{ZV} = \\frac{${ratioXY}}{${ratioZV}}$. Substituting $${lengthXY}$ for $XY$ gives $\\frac{${lengthXY}}{ZV} = \\frac{${ratioXY}}{${ratioZV}}$. Multiplying both sides by $ZV$ gives $${lengthXY} = ${ratioXY}ZV$, and dividing both sides by $${ratioXY}$ gives $ZV = \\frac{${lengthXY}}{${ratioXY}} = ${lengthZV}$. Therefore, the length of line segment $ZV$ is $${lengthZV}$ inches. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The ratio of the length of line segment $XY$ to the length of line segment $ZV$ is $${ratioXY}$ to $${ratioZV}$. If the length of line segment $XY$ is $${lengthXY}$ inches, what is the length, in inches, of line segment $ZV$?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: lengthZV.toString(),
      explanation: explanation
    };
  }
};
