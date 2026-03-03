import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_96940 = {
  metadata: {
    // id: "96940",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const initial = getRandomInt(4, 8) * 100;
    const rate = getRandomInt(10, 20);
    const decayFactor = (100 - rate) / 100;
    
    const questionText = `From 2005 through 2014, the number of music CDs sold in the United States declined each year by approximately ${rate}\\% of the number sold the preceding year. In 2005, approximately $${initial.toLocaleString()}$ million CDs were sold in the United States. Of the following, which best models $C$, the number of millions of CDs sold in the United States, $t$ years after 2005?`;
    
    const rateDecimal = (rate / 100).toFixed(2).replace(/^0\./, '0.');
    
    const optionsData = [
      { text: `$C = ${initial}(${rateDecimal})^t$`, isCorrect: false, reason: "uses the decay rate as the base, representing a rapid decrease to near zero" },
      { text: `$C = ${initial}(${decayFactor.toFixed(2)})^t$`, isCorrect: true },
      { text: `$C = ${initial}(${(1 + rate/100).toFixed(2)})^t$`, isCorrect: false, reason: "uses growth factor instead of decay factor" },
      { text: `$C = ${initial}(${rate})^t$`, isCorrect: false, reason: "uses the percentage as a multiplier, implying extreme decay" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$C = ${initial}(${decayFactor.toFixed(2)})^t$`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The model for exponential decay is $C = I(1 - \\\\frac{r}{100})^t$, where $I$ is the initial value and $r$ is the annual decline percentage. With $I = ${initial}$ and $r = ${rate}$, we get $C = ${initial}(1 - \\\\frac{${rate}}{100})^t = ${initial}(${decayFactor.toFixed(2)})^t$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};