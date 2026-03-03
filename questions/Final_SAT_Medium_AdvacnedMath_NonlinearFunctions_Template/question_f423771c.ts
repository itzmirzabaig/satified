import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

export const generator_f423771c = {
  metadata: {
    // id: "f423771c",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const C = (getRandomInt(100, 200) / 100);
    const a = (getRandomInt(105, 120) / 100);
    const aSquared = (a * a).toFixed(4);
    const aFourth = (a * a * a * a).toFixed(4);
    
    const val0 = C.toFixed(2);
    const val2 = (C * a * a).toFixed(2);
    const val4 = (C * a * a * a * a).toFixed(2);
    
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">$x$</th><th style="border: 1px solid currentColor; padding: 8px;">$h(x)$</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">0</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${val0}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">2</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${val2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">4</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${val4}</td></tr></tbody></table>`;
    
    // Fixed: \\leq instead of \\\\leq
    const questionText = `The table shows the exponential relationship between the number of years, $x$, since Hana started training in pole vault, and the estimated height $h(x)$, in meters, of her best pole vault for that year. Which of the following functions best represents this relationship, where $x \\leq 4$?`;
    
    const aStr = a.toFixed(2);
    const CStr = C.toFixed(2);
    
    const optionsData = [
      { text: `$h(x) = ${(a * 0.9).toFixed(2)}(${(C * 0.8).toFixed(2)})^x$`, isCorrect: false, reason: "uses incorrect initial value and base" },
      { text: `$h(x) = ${(a * 0.9).toFixed(2)}(${CStr})^x$`, isCorrect: false, reason: "swaps the initial value with the growth factor coefficient" },
      { text: `$h(x) = ${CStr}(${(a - 1).toFixed(2)})^x$`, isCorrect: false, reason: "uses the rate (a-1) instead of the growth factor (a)" },
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
    // Fixed: \\approx instead of \\\\approx
    const explanation = `Choice ${correctLetter} is correct. The table shows an increasing exponential relationship. The relationship can be written as $h(x)=C a^{x}$, where $C$ and $a$ are positive constants. When $x=0$, $h(x)=${CStr}$, so substituting yields $${CStr}=C a^{0}$, or $C=${CStr}$. When $x=2$, $h(x)=${val2}$. Substituting into $h(x)=${CStr} a^{x}$ yields $${val2}=${CStr} a^{2}$. Dividing by ${CStr}$ gives $a^{2} \\approx ${aSquared}$, so $a \\approx ${aStr}$. Therefore, $h(x)=${CStr}(${aStr})^{x}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};