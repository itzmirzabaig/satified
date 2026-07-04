import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 151
*
* ORIGINAL ANALYSIS:
* - Number ranges: [b: 2-4, w: -20 to -5, c: 3-8]
* - Difficulty factors: [Distributing, collecting like terms]
* - Constraints: [Integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_151 = {
  metadata: {
    id: "151",
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
    // The stem shows `w + (-a)` on the left. Moving that constant to the right
    // flips its sign, so the right-hand constant becomes b*c + a.
    const movedConst = a >= 0 ? ` + ${a}` : ` - ${Math.abs(a)}`;
    const rhs = b * c + a;
    const coeff = 1 - b;

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
      explanation: `Distribute on the right: $w${aStr} = ${b}w + ${b * c}$. Subtract ${b}w from both sides and move the constant to the right: $w - ${b}w = ${b * c}${movedConst}$. This simplifies to $${coeff}w = ${rhs}$. Dividing by ${coeff} gives $w = ${w}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
