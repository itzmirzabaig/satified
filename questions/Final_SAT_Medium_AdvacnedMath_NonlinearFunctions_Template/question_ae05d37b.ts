import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

export const generator_ae05d37b = {
  metadata: {
    // id: "ae05d37b",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const initial = getRandomInt(2, 8) * 10000;
    const doublingTime = getRandomInt(400, 1200);
    
    // Fixed: \\frac instead of \\\\frac
    const questionText = `The function $f(t) = ${initial}(2)^{\\frac{t}{${doublingTime}}}$ gives the number of bacteria in a population $t$ minutes after an initial observation. How much time, in minutes, does it take for the number of bacteria in the population to double?`;
    
    const optionsData = [
      { text: `$2$`, isCorrect: false, reason: "confuses the base (growth factor) with the time" },
      { text: `$${doublingTime}$`, isCorrect: true },
      { text: `$${2 * doublingTime}$`, isCorrect: false, reason: "incorrectly doubles the doubling time, which would be the time to quadruple" },
      { text: `$${initial}$`, isCorrect: false, reason: "confuses the initial population with the doubling time" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `${doublingTime}`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    // Fixed: \\frac instead of \\\\frac throughout
    const explanation = `Choice ${correctLetter} is correct. The function is of the form $f(t) = a(2)^{\\frac{t}{d}}$, where $a$ is the initial amount and $d$ is the doubling time period. The population doubles when the factor $(2)^{\\frac{t}{${doublingTime}}}$ becomes $2^1 = 2$. For the factor to be $2$, the exponent $\\frac{t}{${doublingTime}}$ must equal $1$. Solving $\\frac{t}{${doublingTime}} = 1$ yields $t = ${doublingTime}$. Therefore, it takes ${doublingTime} minutes for the population to double. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};