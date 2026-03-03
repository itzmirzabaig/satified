import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 05417146
*
* ORIGINAL ANALYSIS:
* - Number ranges: [addend: 3-15, result: 200-500]
* - Difficulty factors: [Simple subtraction, word problem context]
* - Distractor patterns: [A: divided instead of subtracted, C: added instead, D: concatenated]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_05417146 = {
  metadata: {
    // id: "05417146",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const addend = getRandomInt(3, 15);
    const result = getRandomInt(200, 500);
    const total = result + addend;

    const distractorA = Math.floor(total / addend);
    const distractorC = total + addend;
    const distractorD = parseInt(`${total}${addend}`);

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "might result from dividing ${total} by ${addend} instead of subtracting" },
      { text: result.toString(), isCorrect: true },
      { text: distractorC.toString(), isCorrect: false, reason: "would be the result if one added ${addend} to ${total}" },
      { text: distractorD.toString(), isCorrect: false, reason: "looks like concatenation of digits" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What value of $w$ is the solution to the given equation? $$w + ${addend} = ${total}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `To find the solution, subtract ${addend} from both sides: $w = ${total} - ${addend} = ${result}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 51aabd93
*
* ORIGINAL ANALYSIS:
* - Number ranges: [pAdd: 2-8, const1: 5-12, rightSide: 5-20]
* - Difficulty factors: [Combining constants, simple isolation]
* - Distractor patterns: [B, C, D: various arithmetic errors]
* - Constraints: [Result is negative integer]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
