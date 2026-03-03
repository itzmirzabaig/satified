import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



export const generator_c4cd5bcc = {
  metadata: {
    // id: "c4cd5bcc",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const questionText = `In the $xy$-plane, the $y$-coordinate of the $y$-intercept of the graph of the function $f$ is $c$. Which of the following must be equal to $c$?`;
    
    const optionsData = [
      { text: `$f(0)$`, isCorrect: true },
      { text: `$f(1)$`, isCorrect: false, reason: "this is the value of the function when $x=1$, not the y-intercept" },
      { text: `$f(2)$`, isCorrect: false, reason: "this is the value of the function when $x=2$" },
      { text: `$f(3)$`, isCorrect: false, reason: "this is the value of the function when $x=3$" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `f(0)`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The $y$-intercept of a graph is the point where the graph crosses the $y$-axis. At any point on the $y$-axis, the $x$-coordinate is $0$. Therefore, the $y$-coordinate of the $y$-intercept is the value of $f(0)$, which equals $c$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};