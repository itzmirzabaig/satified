import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: da9ffcf6
*
* ORIGINAL ANALYSIS:
* - Number ranges: [ratio XY:ZV = 6:1, XY = 102 inches, answer: 17]
* - Difficulty factors: [Ratio setup with geometric context, solving proportion]
* - Distractor patterns: [A: 17 (correct), B: 96 (102-6), C: 102 (same as XY), D: 612 (102×6, reversed)]
* - Constraints: [XY must be divisible by 6 for integer ZV]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None - conceptual geometry]
*/

export const generator_da9ffcf6 = {
  metadata: {
    // id: "da9ffcf6",
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

    const optionsData = [
      { text: lengthZV.toString(), isCorrect: true, reason: null },
      { text: distractor1.toString(), isCorrect: false, reason: "This is incorrect. It might be obtained by subtracting $" + ratioXY + "$ from $" + lengthXY + "$, which is not the correct operation for ratios." },
      { text: distractor2.toString(), isCorrect: false, reason: "This is incorrect. It assumes the lengths are equal, ignoring the $" + ratioXY + ":" + ratioZV + "$ ratio." },
      { text: distractor3.toString(), isCorrect: false, reason: "This is incorrect. It results from multiplying $" + lengthXY + "$ by $" + ratioXY + "$, which would be solving for XY if ZV were $" + lengthXY + "$, effectively reversing the ratio." }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `To find the length of line segment $ZV$, we can set up a proportion based on the given ratio. The ratio of $XY$ to $ZV$ is $${ratioXY}$ to $${ratioZV}$. This can be written as the fraction $\\frac{XY}{ZV} = \\frac{${ratioXY}}{${ratioZV}}$. We are given that the length of line segment $XY$ is $${lengthXY}$. We can substitute this value into our proportion: $\\frac{${lengthXY}}{ZV} = \\frac{${ratioXY}}{${ratioZV}}$. To solve for $ZV$, we can cross-multiply: $${lengthXY} \\times ${ratioZV} = ${ratioXY} \\times ZV$, $${lengthXY} = ${ratioXY} \\times ZV$. Divide both sides by $${ratioXY}$: $ZV = \\frac{${lengthXY}}{${ratioXY}}$, $ZV = ${lengthZV}$. Therefore, the length of line segment $ZV$ is $${lengthZV}$ inches. Analysis of other options: Choice ${incorrectOptions[0].letter}: ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter}: ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter}: ${incorrectOptions[2].reason}`;

    return {
      questionText: `The ratio of the length of line segment $XY$ to the length of line segment $ZV$ is $${ratioXY}$ to $${ratioZV}$. If the length of line segment $XY$ is $${lengthXY}$ inches, what is the length, in inches, of line segment $ZV$?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: lengthZV.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: 6310adbc
*
* ORIGINAL ANALYSIS:
* - Number ranges: [ratio t:u = 1:2, t = 10, answer: 20]
* - Difficulty factors: [Basic proportion, solving for unknown]
* - Distractor patterns: [A: 2 (ratio part), B: 5 (if ratio reversed 2:1), C: 10 (value of t), D: 20 (correct)]
* - Constraints: [Simple integer ratio, clean multiplication]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/
