import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 590f2187
*
* ORIGINAL ANALYSIS:
* - Number ranges: [factor: 2-5, x: 10-20, const1: 10-30]
* - Difficulty factors: [Factoring to find equivalent expression]
* - Distractor patterns: [A: divided wrong, C: added instead of factored, D: added wrong]
* - Constraints: [Result must be integer]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_590f2187 = {
  metadata: {
    // id: "590f2187",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const factor = getRandomInt(2, 5);
    const x = getRandomInt(10, 20);
    const const1 = factor * getRandomInt(5, 10);
    const rightSide = factor * x - const1;
    const result = rightSide / factor;

    const optionsData = [
      { text: "1", isCorrect: false, reason: "might result from dividing incorrectly" },
      { text: result.toString(), isCorrect: true },
      { text: (result + 16).toString(), isCorrect: false, reason: "might result from adding instead of factoring" },
      { text: (result + 27).toString(), isCorrect: false, reason: "might result from conceptual errors" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If $${factor}x - ${const1} = ${rightSide}$, what is the value of $x - ${const1 / factor}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `To find the value of $x - ${const1 / factor}$, we can factor ${factor} from the left side: $${factor}(x - ${const1 / factor}) = ${rightSide}$. Dividing both sides by ${factor} gives $x - ${const1 / factor} = ${result}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: f2b63f49
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 5-12, constant: 50-200]
* - Difficulty factors: [Combining like terms, simple isolation]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/
