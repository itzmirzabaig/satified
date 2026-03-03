import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: d9d83c02
*
* ORIGINAL ANALYSIS:
* - Number ranges: [b: 2-4, w: -20 to -5, c: 3-8]
* - Difficulty factors: [Distributing, collecting like terms]
* - Constraints: [Integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_d9d83c02 = {
  metadata: {
    // id: "d9d83c02",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const b = getRandomInt(2, 4);
    const w = getRandomInt(-20, -5);
    const c = getRandomInt(3, 8);
    const a = w - b * (w + c);
    const aStr = a >= 0 ? ` - ${a}` : ` + ${Math.abs(a)}`;

    const optionsData = [
      { text: "5", isCorrect: false, reason: "sign error in calculation" },
      { text: "0", isCorrect: false, reason: "incorrectly assumes w=0" },
      { text: "-30", isCorrect: false, reason: "arithmetic error" },
      { text: w.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `For what value of $w$ does $w${aStr} = ${b}(w + ${c})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: w.toString(),
      explanation: `Distribute on the right: $w${aStr} = ${b}w + ${b * c}$. Gather terms with $w$ on one side: $w - ${b}w = ${b * c} - (${a})$. This simplifies to $${1 - b}w = ${b * c - a}$. Dividing by ${1 - b} gives $w = ${w}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: da2e9202
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 10-20, const1: 20-50, result: 50-300]
* - Difficulty factors: [Equivalent equations, subtraction]
* - Distractor patterns: [A: wrong constant, B: wrong sub, D: ignored constant]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
