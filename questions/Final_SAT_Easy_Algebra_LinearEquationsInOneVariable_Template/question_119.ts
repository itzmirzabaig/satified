import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 119
*
* ORIGINAL ANALYSIS:
* - Number ranges: [multiplier: 2-12, addend: 2-10 (never equal to multiplier), result: 10-200]
* - Difficulty factors: [Translating words to equation]
* - Distractor patterns: [constants multiplied, addend on wrong side, swapped coefficients]
* - Constraints: [Proper algebraic translation; addend != multiplier so the swapped-coefficient distractor never duplicates the correct equation]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_119 = {
  metadata: {
    id: "119",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const multiplier = getRandomInt(2, 12);
    // Draw addend from 2..9, then skip over multiplier so addend !== multiplier
    // (keeps addend in 2..10 and guarantees the swapped-coefficient distractor
    // can never duplicate the correct equation).
    let addend = getRandomInt(2, 9);
    if (addend >= multiplier) addend += 1;
    const total = multiplier * getRandomInt(5, 15) + addend;

    const optionsData = [
      { text: `$(${addend})(${multiplier})x = ${total}$`, isCorrect: false, reason: `multiplies the constants ${addend} and ${multiplier} instead of adding ${addend} to the product ${multiplier}x` },
      { text: `$${multiplier}x = ${total} + ${addend}$`, isCorrect: false, reason: `adds ${addend} to the wrong side of the equation` },
      { text: `$${addend}x + ${multiplier} = ${total}$`, isCorrect: false, reason: `swaps the roles of ${multiplier} and ${addend}` },
      { text: `$${multiplier}x + ${addend} = ${total}$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `${addend} more than ${multiplier} times a number $x$ is equal to ${total}. Which equation represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${multiplier}x + ${addend} = ${total}$`,
      explanation: `The phrase "${multiplier} times a number x" translates to $${multiplier}x$, and "${addend} more than" means ${addend} is added to that product. Setting this equal to ${total} gives $${multiplier}x + ${addend} = ${total}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
