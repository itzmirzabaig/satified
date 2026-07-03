import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 134
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-6, rightSide: 20-180, subtract: 1-5]
* - Difficulty factors: [Expression evaluation with scaling]
* - Distractor patterns: [A: n-1, C: 2n value, D: 4n-1]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_134 = {
  metadata: {
    id: "134",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 6);
    const n = getRandomInt(10, 30);
    const rightSide = coeff * n;
    const subtract = getRandomInt(1, 5);
    const result = rightSide - subtract;

    const distractorA = n - subtract;
    const distractorC = rightSide;
    const distractorD = 2 * rightSide - subtract;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: `it results from first solving for $n$ (which gives $n = ${n}$) and then subtracting ${subtract} from $n$ instead of from $${coeff}n$` },
      { text: result.toString(), isCorrect: true, reason: "" },
      { text: distractorC.toString(), isCorrect: false, reason: `it is the value of $${coeff}n$ itself, without subtracting ${subtract}` },
      { text: distractorD.toString(), isCorrect: false, reason: `it results from doubling $${coeff}n$ to ${2 * rightSide} before subtracting ${subtract}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If $${coeff}n = ${rightSide}$, what is the value of $${coeff}n - ${subtract}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Since $${coeff}n = ${rightSide}$, substitute ${rightSide} for $${coeff}n$ in the expression: $${coeff}n - ${subtract} = ${rightSide} - ${subtract} = ${result}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect because ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because ${incorrectOptions[2].reason}.`
    };
  }
};
