import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 808f7d6c
*
* ORIGINAL ANALYSIS:
* - Number ranges: [t = 4u, asks for 2t, answer: 8u]
* - Difficulty factors: [Algebraic substitution, simple multiplication]
* - Distractor patterns: [A: 8u (correct), B: 2u (divided), C: u (confused relationship), D: 1/2u (inverted)]
* - Constraints: [Simple substitution]
* - Question type: [Multiple Choice Text with algebraic expressions]
* - Figure generation: [None]
*/

export const generator_808f7d6c = {
  metadata: {
    // id: "808f7d6c",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coefficient = getRandomInt(3, 6);
    const multiplier = getRandomInt(2, 4);
    const resultCoefficient = multiplier * coefficient;
    const correctAnswer = `${resultCoefficient}u`;

    const distractor1 = `${multiplier}u`;
    const distractor2 = `u`;
    const distractor3 = `\\frac{1}{${multiplier}}u`;

    const optionsData = [
      { text: correctAnswer, isCorrect: true, reason: null },
      { text: distractor1, isCorrect: false, reason: "incorrect multiplication" },
      { text: distractor2, isCorrect: false, reason: "an invalid relationship" },
      { text: distractor3, isCorrect: false, reason: "inversion" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `If $t = ${coefficient}u$, then $${multiplier}t = ${multiplier} \\cdot (${coefficient}u) = ${resultCoefficient}u$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; it results from ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it results from ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it results from ${incorrectOptions[2].reason}.`;

    return {
      questionText: `If $t=${coefficient}u$, which of the following is equivalent to $${multiplier}t$?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
* Question ID: d7a3179d
*
* ORIGINAL ANALYSIS:
* - Number ranges: [1116 inches, conversion: 36 inches/yard, answer: 31 yards]
* - Difficulty factors: [Division with larger numbers]
* - Distractor patterns: [None - fill in blank, common errors: division errors, decimal errors]
* - Constraints: [inches must be divisible by 36 for integer yards]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/
