import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_612 = {
  metadata: {
    id: "612",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Answer-first construction: pick the integer value q(-1) and the base,
    // then derive q(0) and q(1) so every displayed value is an integer.
    const base = getRandomInt(2, 4);
    const valNeg1 = getRandomInt(3, 10);          // q(-1) = initial / base
    const initial = valNeg1 * base;               // q(0), always an integer (6..40)
    const val1 = initial * base;                  // q(1), always an integer

    const questionText = `The function $q$ is defined by $q(x) = ${initial}(${base}^x)$. Which of the following tables gives three values of $x$ and their corresponding values of $q(x)$?`;

    // Distinct for every draw in range:
    //  - correct starts with valNeg1 > 0; distractor 1 starts with -val1 < 0
    //  - distractor 2 starts with val1 = valNeg1*base^2 >= 4*valNeg1 > valNeg1
    //  - distractor 3 starts with initial - base = base(valNeg1 - 1) > valNeg1 for valNeg1 >= 3
    const optionsData = [
      { text: `$x$: -1, 0, 1; $q(x)$: -${val1}, 0, ${val1}`, isCorrect: false, reason: `it wrongly gives $q(0) = 0$ and a negative value at $x = -1$, but $q(x) = ${initial}(${base}^x)$ is positive for every value of $x$` },
      { text: `$x$: -1, 0, 1; $q(x)$: ${val1}, ${initial}, ${valNeg1}`, isCorrect: false, reason: `it reverses the order of the values, showing exponential decay instead of exponential growth` },
      { text: `$x$: -1, 0, 1; $q(x)$: ${initial - base}, ${initial}, ${initial + base}`, isCorrect: false, reason: `it treats the function as linear, adding ${base} for each increase of 1 in $x$ instead of multiplying by ${base}` },
      { text: `$x$: -1, 0, 1; $q(x)$: ${valNeg1}, ${initial}, ${val1}`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$x$: -1, 0, 1; $q(x)$: ${valNeg1}, ${initial}, ${val1}`;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. Substituting $x = -1$ into $q(x) = ${initial}(${base}^x)$ gives $q(-1) = \\frac{${initial}}{${base}} = ${valNeg1}$. Substituting $x = 0$ gives $q(0) = ${initial}(1) = ${initial}$. Substituting $x = 1$ gives $q(1) = ${initial}(${base}) = ${val1}$. The table in Choice ${correctLetter} matches these values. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
