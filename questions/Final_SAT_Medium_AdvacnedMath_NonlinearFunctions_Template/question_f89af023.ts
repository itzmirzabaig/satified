import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



export const generator_f89af023 = {
  metadata: {
    // id: "f89af023",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const w = getRandomInt(6, 15);
    const area = 2 * w * w;
    const length = 2 * w;
    
    const questionText = `A rectangular volleyball court has an area of ${area} square meters. If the length of the court is twice the width, what is the width of the court, in meters?`;
    
    const optionsData = [
      { text: `${w}`, isCorrect: true },
      { text: `${length}`, isCorrect: false, reason: "this is the length (twice the width), not the width" },
      { text: `${Math.floor(area/6)}`, isCorrect: false, reason: "results from miscalculating the quadratic solution" },
      { text: `${Math.floor(area/3)}`, isCorrect: false, reason: "results from miscalculating the quadratic solution" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `${w}`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. Let $w$ be the width. Since the length is twice the width, the length is $2w$. The area is $\\\\text{length} \\\\times \\\\text{width} = (2w)(w) = 2w^2$. Setting this equal to ${area}: $2w^2 = ${area}$, so $w^2 = ${w*w}$, and $w = ${w}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};