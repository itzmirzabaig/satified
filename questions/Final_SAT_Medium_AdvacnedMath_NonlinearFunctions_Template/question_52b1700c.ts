import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



export const generator_52b1700c = {
  metadata: {
    // id: "52b1700c",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const initialAmount = getRandomInt(300, 900);
    const rateDecimal = (getRandomInt(2, 8) / 1000);
    const growthFactor = 1 + rateDecimal;
    
    const year0 = initialAmount.toFixed(2);
    const year1 = (initialAmount * growthFactor).toFixed(2);
    const year2 = (initialAmount * growthFactor * growthFactor).toFixed(2);
    
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">Time (years)</th><th style="border: 1px solid currentColor; padding: 8px;">Total amount (dollars)</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">0</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${year0}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">1</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${year1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">2</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${year2}</td></tr></tbody></table>`;
    
    const questionText = `Rosa opened a savings account at a bank. The table shows the exponential relationship between the time $t$, in years, since Rosa opened the account and the total amount $n$, in dollars, in the account. If Rosa made no additional deposits or withdrawals, which of the following equations best represents the relationship between $t$ and $n$?`;
    
    const rateString = rateDecimal.toFixed(3).replace(/^0\./, '0.');
    
    const optionsData = [
      { text: `$n = (1 + ${initialAmount})^t$`, isCorrect: false, reason: "incorrectly uses the principal as the base of the exponent" },
      { text: `$n = (1 + ${rateString})^t$`, isCorrect: false, reason: "omits the principal amount, starting with $1 instead" },
      { text: `$n = ${initialAmount}(1 + ${rateString})^t$`, isCorrect: true },
      { text: `$n = ${rateString}(1 + ${initialAmount})^t$`, isCorrect: false, reason: "swaps the principal and growth factor values" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$n = ${initialAmount}(1 + ${rateString})^t$`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The problem asks for an exponential equation representing the relationship between time $t$ and amount $n$. The general form of an exponential growth equation is $n = P(1 + r)^t$, where $P$ is the principal (initial amount) and $r$ is the growth rate. From the table, when $t=0$, $n=${initialAmount}$, so $P=${initialAmount}$. The growth rate $r$ is ${rateString}, which represents ${(rateDecimal * 100).toFixed(1)}% interest. Therefore, the equation is $n = ${initialAmount}(1 + ${rateString})^t$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};