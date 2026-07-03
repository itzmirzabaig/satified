import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 123
*
* ORIGINAL ANALYSIS:
* - Number ranges: [result: -5..-1 (answer-first), pAdd: 2-8, const1: 5-12, rightSide: 2-19]
* - Difficulty factors: [Combining constants, simple isolation]
* - Distractor patterns: [sign ignored (|result|), constants added instead of subtracted, only pAdd subtracted]
* - Constraints: [Result is a negative integer; const1 guarded away from 2*|result| so distractors never collide]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_123 = {
  metadata: {
    id: "123",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Answer-first: pick the (negative) solution, then build the equation.
    const result = -getRandomInt(1, 5);
    const pAdd = getRandomInt(2, 8);
    let const1 = getRandomInt(5, 12);
    // Guard: if const1 === 2*|result| the "only subtracted pAdd" distractor
    // (result + const1) would equal the "sign ignored" distractor (-result).
    // Bumping to the next odd value breaks the tie (2*|result| is even).
    if (const1 === 2 * Math.abs(result)) const1 += 1;
    const rightSide = result + pAdd + const1; // 2..19, always positive

    // Distinctness (symbolic): result <= -1 < 0 <= all distractors;
    // distractorB = |result| in 1..5; distractorC = result + 2(pAdd+const1) >= 9 > 5;
    // distractorD = result + const1 differs from B (guard above) and from C
    // (would need 2*pAdd + const1 = 0, impossible).
    const distractorB = Math.abs(result);
    const distractorC = rightSide + pAdd + const1;
    const distractorD = rightSide - pAdd;

    const optionsData = [
      { text: result.toString(), isCorrect: true },
      { text: distractorB.toString(), isCorrect: false, reason: "ignores the negative sign" },
      { text: distractorC.toString(), isCorrect: false, reason: `results from adding ${pAdd + const1} to ${rightSide} instead of subtracting it` },
      { text: distractorD.toString(), isCorrect: false, reason: `results from subtracting only ${pAdd} and forgetting to subtract ${const1}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What value of $p$ is the solution to the given equation? $$(p + ${pAdd}) + ${const1} = ${rightSide}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Simplify: $p + ${pAdd + const1} = ${rightSide}$. Subtract ${pAdd + const1}: $p = ${rightSide} - ${pAdd + const1} = ${result}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
