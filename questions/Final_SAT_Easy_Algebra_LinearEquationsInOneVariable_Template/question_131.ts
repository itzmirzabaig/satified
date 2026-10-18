import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 131
*
* ORIGINAL ANALYSIS:
* - Number ranges: [x: 20-60, addend: 3-12]
* - Difficulty factors: [Simple substitution]
* - Distractor patterns: [A: sub, B: x value, D: wrong add]
* - Constraints: [Simple integer arithmetic]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_131 = {
  metadata: {
    id: "131",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const x = getRandomInt(20, 60);
    const addend = getRandomInt(3, 12);
    const result = x + addend;

    const optionsData = [
      { text: (x - addend).toString(), isCorrect: false, reason: `results from subtracting ${addend} from ${x} instead of adding` },
      { text: x.toString(), isCorrect: false, reason: `is the value of $x$, not the value of $x + ${addend}$` },
      { text: result.toString(), isCorrect: true },
      // x * addend >= 3x > x + addend since x >= 20, so it never collides
      { text: (x * addend).toString(), isCorrect: false, reason: `results from multiplying ${x} by ${addend} instead of adding` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If $x = ${x}$, what is the value of $x + ${addend}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctLetter} is correct. Substituting ${x} for $x$ in the expression $x + ${addend}$ gives $${x} + ${addend} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`).join(' ')}`
    };
  }
};