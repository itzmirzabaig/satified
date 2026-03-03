import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 567ac7ab
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 6, answer options with various coefficients]
 * - Difficulty factors: [No solution identification from given equation]
 * - Distractor patterns: [Same line, wrong slope, perpendicular]
 * - Constraints: [Correct option must have slope 1/3, different intercept]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_567ac7ab = {
  metadata: {
    // id: "567ac7ab",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const a = getRandomInt(2, 5);
    const b = a * getRandomInt(3, 5);
    const c = getRandomInt(10, 30);
    
    const slope = -a / b;
    
    const optA = `x + ${b/a}y = ${c/a}`;
    const optB = `x + ${b/a}y = ${-getRandomInt(15, 30)}`;
    const optC = `${b}x - ${a}y = 0`;
    const optD = `${b}x + ${getRandomInt(1, 3) * a}y = ${c}`;
    
    const optionsData = [
      { text: optA, isCorrect: false, reason: "is equivalent to the given equation, giving infinitely many solutions" },
      { text: optB, isCorrect: true },
      { text: optC, isCorrect: false, reason: "has a different slope, giving exactly one solution" },
      { text: optD, isCorrect: false, reason: "has a different slope, giving exactly one solution" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `One of the two equations in a linear system is $${a}x + ${b}y = ${c}$. The system has no solution. Which of the following could be the other equation in the system?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: optB,
      explanation: `Choice ${correctLetter} is correct. The given equation has slope $${slope.toFixed(2)}$. For no solution, the second equation must have the same slope but different y-intercept. Choice ${correctLetter} satisfies this condition. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 3a84f885
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients in grouped form, answer: 1677]
 * - Difficulty factors: [Clever addition without solving, recognizing pattern]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Pattern must give integer answer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 */