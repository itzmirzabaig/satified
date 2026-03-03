import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



export const generator_15c364bf = {
  metadata: {
    // id: "15c364bf",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const halfLife = getRandomInt(20, 40);
    const initial = getRandomInt(10, 30) * 10;
    const time = 3 * halfLife;
    const remaining = initial / 8;
    
    const questionText = `A sample of a certain isotope takes ${halfLife} years to decay to half its original mass. The function $s(t)=${initial}(0.5)^{\\\\frac{t}{${halfLife}}}$ gives the approximate mass of this isotope, in grams, that remains $t$ years after a ${initial}-gram sample starts to decay. Which statement is the best interpretation of $s(${time})=${remaining}$ in this context?`;
    
    const massDecreased = initial - remaining;
    
    const optionsData = [
      { text: `Approximately ${remaining} grams of the sample remains ${time} years after the sample starts to decay.`, isCorrect: true },
      { text: `The mass of the sample has decreased by approximately ${remaining} grams ${time} years after the sample starts to decay.`, isCorrect: false, reason: `the mass has actually decreased by ${massDecreased} grams, not ${remaining} grams` },
      { text: `The mass of the sample has decreased by approximately ${time} grams ${remaining} years after the sample starts to decay.`, isCorrect: false, reason: "this swaps the time and remaining mass values" },
      { text: `Approximately ${time} grams of the sample remains ${remaining} years after the sample starts to decay.`, isCorrect: false, reason: `this would interpret $s(${remaining})=${time}$, which is not the given statement` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `Approximately ${remaining} grams of the sample remains ${time} years after the sample starts to decay.`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. In the given function, $s(t)$ represents the approximate mass, in grams, of the sample that remains $t$ years after the sample starts to decay. It follows that the best interpretation of $s(${time})=${remaining}$ is that approximately ${remaining} grams of the sample remains ${time} years after the sample starts to decay. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};