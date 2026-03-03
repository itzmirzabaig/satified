import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_02add2d2 = {
  metadata: {
    // id: "02add2d2",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const initial = getRandomInt(8, 20) * 100;
    const rate = getRandomInt(5, 12);
    const growthFactor = (100 + rate) / 100;
    
    const questionText = `A company has a newsletter. In January 2018, there were $${initial.toLocaleString()}$ customers subscribed to the newsletter. For the next $24$ months after January 2018, the total number of customers subscribed to the newsletter each month was ${rate}\\% greater than the total number subscribed the previous month. Which equation gives the total number of customers, $c$, subscribed to the company's newsletter $m$ months after January 2018, where $m \\\\le 24$?`;
    
    const rateDecimal = (rate / 100).toFixed(2).replace(/^0\./, '0.');
    
    const optionsData = [
      { text: `$c = ${initial}(${rateDecimal})^m$`, isCorrect: false, reason: "uses the growth rate as the base, which represents rapid decay (93% decrease per month) rather than 7% growth" },
      { text: `$c = ${initial}(${growthFactor})^m$`, isCorrect: true },
      { text: `$c = ${initial}(${(1 + rate/10).toFixed(1)})^m$`, isCorrect: false, reason: `incorrectly uses a ${rate * 10}% growth rate instead of ${rate}%` },
      { text: `$c = ${initial}(${rate})^m$`, isCorrect: false, reason: "uses the percentage as a multiplier, implying 600% growth per month" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$c = ${initial}(${growthFactor})^m$`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. This is an exponential growth situation. The initial number of subscribers in January 2018 is $${initial}$, so this is the starting value. The number increases by ${rate}\\% each month, so the growth factor is $1 + \\\\frac{${rate}}{100} = ${growthFactor}$. The general form is $c = \\\\text{initial} \\\\times (\\\\text{growth factor})^{\\\\text{time}}$, which gives $c = ${initial}(${growthFactor})^m$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};