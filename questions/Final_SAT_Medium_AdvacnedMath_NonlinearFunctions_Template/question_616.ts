import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_616 = {
  metadata: {
    id: "616",
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

    // Distractors are pairwise distinct from w and from each other for every
    // w in [6, 15]: 2w, 4w, and w^2 (w^2 = 4w only at w = 4, w^2 = 2w only at
    // w = 2, both outside the range).
    const optionsData = [
      { text: `${w}`, isCorrect: true },
      { text: `${length}`, isCorrect: false, reason: `it is the length of the court (twice the width), not the width` },
      { text: `${2 * length}`, isCorrect: false, reason: `it is twice the length of the court` },
      { text: `${w * w}`, isCorrect: false, reason: `it is the value of $w^2$; the square root was not taken to find the width` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `${w}`;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. Let $w$ be the width of the court, in meters. Since the length is twice the width, the area of the court is $(2w)(w) = 2w^2$ square meters. Setting the area expression equal to ${area} and dividing both sides by 2 gives $w^2 = ${w * w}$, so $w = \\sqrt{${w * w}} = ${w}$. The width of the court is ${w} meters. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
