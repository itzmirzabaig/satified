import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1085
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(1) = k, find form showing k]
 * - Difficulty factors: [Exponential evaluation, form recognition]
 * - Distractor patterns: [Various forms, need f(1) visible as coefficient]
 * - Constraints: [If f(x) = 128(2)^(x-1), then f(1) = 128]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1085 = {
  metadata: {
    id: "1085",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Before: the stem never defined f, so it could not be answered, and the
    // choices were four unrelated functions with rounded coefficients. Now f is
    // given and every choice is a true equivalent form of it. Each wrong choice
    // displays a different output of f (at x = -1, 2 or 3) instead of f(1).
    let base = 2;
    let m = 2;
    do {
      base = getRandomInt(2, 4);
      m = getRandomInt(2, 9);
    } while (m === base || m * base ** 4 > 999);

    const given = m * base;      // coefficient of the form in the stem, f(0)
    const k = m * base ** 2;     // f(1)
    const atTwo = m * base ** 3; // f(2)
    const atThree = m * base ** 4; // f(3)

    const correctText = `$f(x)=${k}(${base})^{x-1}$`;
    const formAtNegOne = `$f(x)=${m}(${base})^{x+1}$`;
    const formAtTwo = `$f(x)=${atTwo}(${base})^{x-2}$`;
    const formAtThree = `$f(x)=${atThree}(${base})^{x-3}$`;

    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: formAtNegOne, isCorrect: false, reason: `${formAtNegOne} is equivalent to $f$, but its coefficient, $${m}$, is the value of $f(-1)$ rather than $f(1)$` },
      { text: formAtTwo, isCorrect: false, reason: `${formAtTwo} is equivalent to $f$, but its coefficient, $${atTwo}$, is the value of $f(2)$ rather than $f(1)$` },
      { text: formAtThree, isCorrect: false, reason: `${formAtThree} is equivalent to $f$, but its coefficient, $${atThree}$, is the value of $f(3)$ rather than $f(1)$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x)=${given}(${base})^x$, and $f(1)=k$, where $k$ is a constant. Which of the following equivalent forms of $f$ shows the value of $k$ as the coefficient or the base?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Substituting $x=1$ into the given function gives $k=f(1)=${given}(${base})=${k}$. Since $(${base})^x=(${base})(${base})^{x-1}$, the function can be rewritten as $f(x)=${given}(${base})(${base})^{x-1}=${k}(${base})^{x-1}$. In this form, the coefficient is $${k}$, which is the value of $k$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
