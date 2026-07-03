import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

export const generator_613 = {
  metadata: {
    id: "613",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Initial value C in [1.25, 2.00] and growth factor a in [1.05, 1.20].
    // The ranges are disjoint, so C.toFixed(2) can never equal a.toFixed(2)
    // and the "swapped" distractor can never collide with the correct answer.
    const C = getRandomInt(125, 200) / 100;
    const a = getRandomInt(105, 120) / 100;
    const aSquared = (a * a).toFixed(4);

    const CStr = C.toFixed(2);
    const aStr = a.toFixed(2);
    const rateStr = (a - 1).toFixed(2);

    const val0 = CStr;
    const val2 = (C * a * a).toFixed(2);
    const val4 = (C * a * a * a * a).toFixed(2);

    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">$x$</th><th style="border: 1px solid currentColor; padding: 8px;">$h(x)$</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">0</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${val0}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">2</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${val2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">4</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${val4}</td></tr></tbody></table>`;

    const questionText = `The table shows the exponential relationship between the number of years, $x$, since a student started training in pole vault, and the estimated height $h(x)$, in meters, of her best pole vault for that year. Which of the following functions best represents this relationship, where $x \\leq 4$?`;

    // All four options are distinct for every draw:
    //  - swap: coefficient aStr (<= 1.20) can never equal CStr (>= 1.25)
    //  - rate: base rateStr (<= 0.20) can never equal aStr (>= 1.05)
    //  - h(2) as initial: val2 = C*a^2 exceeds C by at least 0.12, so val2 != CStr
    const optionsData = [
      { text: `$h(x) = ${aStr}(${CStr})^x$`, isCorrect: false, reason: `it swaps the initial value, ${CStr}, and the growth factor, ${aStr}` },
      { text: `$h(x) = ${CStr}(${rateStr})^x$`, isCorrect: false, reason: `it uses the yearly growth rate, ${rateStr}, instead of the growth factor, ${aStr}` },
      { text: `$h(x) = ${val2}(${aStr})^x$`, isCorrect: false, reason: `it uses the value of $h(2)$ from the table, ${val2}, as the initial value instead of $h(0) = ${CStr}$` },
      { text: `$h(x) = ${CStr}(${aStr})^x$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$h(x) = ${CStr}(${aStr})^x$`;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The table shows an increasing exponential relationship, which can be written as $h(x) = Ca^x$, where $C$ and $a$ are positive constants. When $x = 0$, the table gives $h(0) = ${CStr}$; since $a^0 = 1$, the initial value is $C = ${CStr}$. When $x = 2$, the table gives $h(2) = ${val2}$. Substituting into $h(x) = ${CStr}a^x$ yields $a^2 = \\frac{${val2}}{${CStr}} \\approx ${aSquared}$, so $a \\approx ${aStr}$. Therefore, $h(x) = ${CStr}(${aStr})^x$ best represents the relationship. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    return {
      questionText: questionText,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
