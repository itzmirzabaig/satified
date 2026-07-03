import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_549 = {
  metadata: {
    id: "549",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const minValue = getRandomInt(30, 80);

    const questionText = `The function $g$ is defined by $g(x) = x^2 + ${minValue}$. What is the minimum value of $g(x)$?`;

    const correctAnswer = `${minValue}`;

    const optionsData = [
      { text: `0`, isCorrect: false, reason: `0 is the minimum value of $x^2$, but the function adds ${minValue} to $x^2$` },
      { text: `${minValue}`, isCorrect: true, reason: '' },
      { text: `${2 * minValue}`, isCorrect: false, reason: `${2 * minValue} results from adding ${minValue} + ${minValue} instead of 0 + ${minValue}` },
      { text: `${minValue * minValue}`, isCorrect: false, reason: `${minValue * minValue} results from squaring ${minValue}, which is not part of finding the minimum value` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The graph of $g(x) = x^2 + ${minValue}$ is a parabola that opens upward, so its minimum value occurs at the vertex. Since $x^2 \\geq 0$ for every real number $x$, with equality when $x = 0$, the smallest possible value of $g(x)$ is $x^2 + ${minValue} = 0 + ${minValue} = ${minValue}$, which occurs at $x = 0$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
