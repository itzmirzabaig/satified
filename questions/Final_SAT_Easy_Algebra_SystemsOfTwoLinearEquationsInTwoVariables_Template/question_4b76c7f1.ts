import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4b76c7f1
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2-9, constants: 9-36]
 * - Difficulty factors: [Understanding proportional systems]
 * - Distractor patterns: [First constant, unscaled constant, over-scaled constant]
 * - Constraints: [System must have proportional coefficients]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_4b76c7f1 = {
  metadata: {
    // id: "4b76c7f1",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a1 = getRandomInt(2, 4);
    const b1 = getRandomInt(3, 8);
    const c1 = getRandomInt(5, 12);
    const scale = getRandomInt(3, 6);
    const a2 = a1 * scale;
    const b2 = b1 * scale;
    const correctA = c1 * scale;

    const optionsData = [
      { text: scale.toString(), isCorrect: false, reason: "uses the scale factor instead of the constant" },
      { text: c1.toString(), isCorrect: false, reason: "uses the first equation's constant without scaling" },
      { text: correctA.toString(), isCorrect: true },
      { text: (correctA + scale).toString(), isCorrect: false, reason: "adds the scale factor incorrectly" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. For a system to have infinitely many solutions, the equations must be proportional. The second equation has coefficients $${a2} = ${scale} \\times ${a1}$ and $${b2} = ${scale} \\times ${b1}$, so the constant $a$ must also be $${scale} \\times ${c1} = ${correctA}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `In the given system of equations, $a$ is a constant. If the system has infinitely many solutions, what is the value of $a$?$$\\begin{aligned} ${a1}x + ${b1}y &= ${c1} \\\\ ${a2}x + ${b2}y &= a \\end{aligned}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctA.toString(),
      explanation: explanation
    };
  }
};