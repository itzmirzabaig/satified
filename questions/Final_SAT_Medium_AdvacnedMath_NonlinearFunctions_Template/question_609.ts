import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_609 = {
  metadata: {
    id: "609",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const rate = getRandomInt(3, 8);
    const rateDecimal = rate / 100;
    const growthFactor = 1 + rateDecimal;
    const base = getRandomInt(4, 9) * 10000; // starting salary: 40,000 to 90,000

    const rateStr = rateDecimal.toFixed(2); // "0.03".."0.08"
    const factorStr = growthFactor.toFixed(2); // "1.03".."1.08"

    const questionText = `The function $S(n) = ${base}(a)^n$ models the annual salary, in dollars, of an employee $n$ years after starting a job, where $a$ is a constant. If the employee's salary increases by ${rate}% each year, what is the value of $a$?`;

    // Option values for rate 3..8: 0.03..0.08, 0.3..0.8, 1.03..1.08, 1.3..1.8
    // — the four ranges never overlap, so options are always distinct.
    const optionsData = [
      { text: `$${rateStr}$`, isCorrect: false, reason: "this is the growth rate written as a decimal, not the growth factor $a$" },
      { text: `$${(rateDecimal * 10).toFixed(1)}$`, isCorrect: false, reason: `it results from a decimal-point error when converting ${rate}% to a decimal` },
      { text: `$${factorStr}$`, isCorrect: true },
      { text: `$${(1 + rate / 10).toFixed(1)}$`, isCorrect: false, reason: `this would represent a ${rate * 10}% annual increase, not ${rate}%` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$${factorStr}$`;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. An exponential growth model has the form $S(n) = S_0(a)^n$, where $S_0$ is the starting value and the constant $a$ is the growth factor $a = 1 + r$, with $r$ equal to the annual growth rate written as a decimal. An increase of ${rate}% per year means $r = ${rateStr}$, so $a = 1 + ${rateStr} = ${factorStr}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
