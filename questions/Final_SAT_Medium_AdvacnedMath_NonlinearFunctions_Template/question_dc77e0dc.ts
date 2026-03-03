import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

export const generator_dc77e0dc = {
  metadata: {
    // id: "dc77e0dc",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const initial = getRandomInt(3, 8) * 100;
    const halfLife = getRandomInt(8, 20);
    
    const wrongB = Math.floor(initial / 40);
    const wrongC = Math.floor(initial / 100);
    
    // Fixed: \\frac instead of \\\\frac
    const questionText = `The function $f$ models the intensity of an X-ray beam, in number of particles in the X-ray beam, $t$ millimeters below the surface of a sample of iron. According to the model, what is the estimated number of particles in the X-ray beam when it is at the surface of the sample of iron? $$f(t) = ${initial}(0.5)^{\\frac{t}{${halfLife}}}$$`;
    
    const optionsData = [
      { text: `$${initial}$`, isCorrect: true },
      { text: `$${wrongB}$`, isCorrect: false, reason: "may result from conceptual or calculation errors" },
      { text: `$${wrongC}$`, isCorrect: false, reason: "may result from conceptual or calculation errors" },
      { text: `$2$`, isCorrect: false, reason: "may result from conceptual or calculation errors" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `${initial}`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    // Fixed: \\frac instead of \\\\frac
    const explanation = `Choice ${correctLetter} is correct. When the X-ray beam is at the surface, it is $0$ millimeters below the surface, so $t=0$. Substituting $0$ for $t$: $f(0) = ${initial}(0.5)^{\\frac{0}{${halfLife}}} = ${initial}(0.5)^0 = ${initial}(1) = ${initial}$. Therefore, the estimated number of particles at the surface is ${initial}. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};