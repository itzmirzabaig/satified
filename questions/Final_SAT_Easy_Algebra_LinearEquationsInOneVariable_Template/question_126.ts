import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 126
*
* ORIGINAL ANALYSIS:
* - Number ranges: [factor: 2-4, result: 3-15, k: 5-10 (x = result + k, const1 = factor*k, rightSide = factor*result)]
* - Difficulty factors: [Factoring to find equivalent expression]
* - Distractor patterns: [solved for x instead of x - k, forgot to divide by factor, arithmetic slip]
* - Constraints: [Answer-first so result is an integer; ranges + one k-nudge guard keep all four options distinct for every draw]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_126 = {
  metadata: {
    id: "126",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const factor = getRandomInt(2, 4);
    const result = getRandomInt(3, 15);
    let k = getRandomInt(5, 10);
    // Guard: keep the "solved for x" distractor (result + k) distinct from the
    // "forgot to divide" distractor (factor * result) for every draw.
    if (result + k === factor * result) k += 1;
    const x = result + k;
    const const1 = factor * k;
    const rightSide = factor * result;

    const optionsData = [
      { text: x.toString(), isCorrect: false, reason: "is the value of the variable itself rather than the value of the requested expression" },
      { text: result.toString(), isCorrect: true },
      { text: rightSide.toString(), isCorrect: false, reason: `results from not dividing both sides by ${factor} after factoring` },
      { text: (result + factor).toString(), isCorrect: false, reason: `may result from a calculation error when dividing both sides by ${factor}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If $${factor}x - ${const1} = ${rightSide}$, what is the value of $(x - ${k})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `To find the value of $(x - ${k})$, factor ${factor} from the left side: $${factor}(x - ${k}) = ${rightSide}$. Dividing both sides by ${factor} gives $(x - ${k}) = ${result}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
