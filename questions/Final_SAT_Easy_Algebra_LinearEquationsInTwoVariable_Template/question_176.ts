import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 176
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-6]
 * - Difficulty factors: [Perpendicular lines have negative reciprocal slopes]
 * - Distractor patterns: [Using negative without reciprocal, using reciprocal without negative]
 * - Constraints: [Slope cannot be 0]
 * - Question type: [Conceptual → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_176 = {
  metadata: {
    id: "176",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slopeK = getRandomInt(2, 6);
    const interceptK = getRandomInt(10, 30);

    // Correct: negative reciprocal of slopeK. Distractors follow the declared
    // patterns and can never collide with the correct answer or each other for
    // any slopeK in [2, 6]: -k, 1/k, and k are all distinct from -1/k and from
    // one another when k >= 2.
    const slopeJText = `-\\frac{1}{${slopeK}}`;
    const distractor1 = `-${slopeK}`;
    const distractor2 = `\\frac{1}{${slopeK}}`;
    const distractor3 = `${slopeK}`;

    const optionsData = [
      { text: `$${slopeJText}$`, isCorrect: true, reason: "" },
      { text: `$${distractor1}$`, isCorrect: false, reason: "negates the slope of line $k$ but does not take the reciprocal" },
      { text: `$${distractor2}$`, isCorrect: false, reason: "takes the reciprocal of the slope but does not change its sign" },
      { text: `$${distractor3}$`, isCorrect: false, reason: "is the slope of line $k$ itself; perpendicular lines do not have equal slopes" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Line $k$ is defined by $y = ${slopeK}x + ${interceptK}$. Line $j$ is perpendicular to line $k$ in the $xy$-plane. What is the slope of line $j$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${slopeJText}$`,
      explanation: `Choice ${correctLetter} is correct. Perpendicular lines have slopes that are negative reciprocals. Since line $k$ has slope ${slopeK}, line $j$ must have slope $-\\frac{1}{${slopeK}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
