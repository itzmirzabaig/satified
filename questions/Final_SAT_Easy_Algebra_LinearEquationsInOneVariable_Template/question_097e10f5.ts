import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 097e10f5
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficient: 2-9, constants: 100-300, multiplier: 10-50]
* - Difficulty factors: [Two-step equation solving, larger numbers]
* - Distractor patterns: [B: subtraction error, C: added instead of subtracted, D: ignored left side]
* - Constraints: [Result must be positive integer]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_097e10f5 = {
  metadata: {
    // id: "097e10f5",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 9);
    const const1 = getRandomInt(100, 300);
    const total = const1 + coeff * getRandomInt(10, 50);
    const answer = (total - const1) / coeff;

    const distractorB = total - const1 - coeff;
    const distractorC = (total + const1) / coeff;
    const distractorD = total;

    const optionsData = [
      { text: answer.toString(), isCorrect: true },
      { text: distractorB.toString(), isCorrect: false, reason: "might result from incorrectly subtracting ${const1} from ${total} to get ${total - const1} but then subtracting ${coeff} instead of dividing by ${coeff}" },
      { text: distractorC.toString(), isCorrect: false, reason: "could be a result of adding ${const1} to ${total} instead of subtracting (${total}+${const1}=${total + const1}) and then dividing by ${coeff}" },
      { text: distractorD.toString(), isCorrect: false, reason: "is just the value on the right side of the equation" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What value of $p$ satisfies the equation $${coeff}p + ${const1} = ${total}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: answer.toString(),
      explanation: `To determine the value of $p$ that satisfies the equation $${coeff}p + ${const1} = ${total}$, we can solve for $p$. 1. Subtract $${const1}$ from both sides: $$${coeff}p = ${total - const1}$$ 2. Divide by $${coeff}$: $$p = ${answer}$$ The value of $p$ is $${answer}$. Why the other options are incorrect: Choice ${incorrectOptions[0].letter}: ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter}: ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter}: ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 9b886541
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficient: 2-5, constants: 3-12]
* - Difficulty factors: [Solve for expression without finding x, or substitution method]
* - Distractor patterns: [A: sign error, B: value of x, C: arithmetic error]
* - Constraints: [Simple integer arithmetic]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
