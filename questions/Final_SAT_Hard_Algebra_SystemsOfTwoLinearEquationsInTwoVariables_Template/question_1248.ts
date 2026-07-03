import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1248
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 6, answer options with various coefficients]
 * - Difficulty factors: [No solution identification from given equation]
 * - Distractor patterns: [Same line, wrong slope, perpendicular]
 * - Constraints: [Correct option must have slope 1/3, different intercept]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_1248 = {
  metadata: {
    id: "1248",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Given equation: a*x + b*y = c, with b = a*m so the slope is -a/b = -1/m
    // and dividing through by a yields clean integer coefficients.
    const a = getRandomInt(2, 5);
    const m = getRandomInt(3, 5);       // y/x coefficient ratio after reducing
    const b = a * m;
    const q = getRandomInt(4, 10);      // c/a, chosen integer so c is divisible by a
    const c = a * q;

    // Correct answer: same slope (x + m*y = ...) but a DIFFERENT constant, so the
    // lines are parallel and the system has no solution. Use a negative constant
    // (always distinct from the positive q of the equivalent line).
    const kB = getRandomInt(2, 12);
    const optCorrect = `x + ${m}y = ${-kB}`;

    // Distractor 1: the equivalent equation (divide given eq by a) -> same line,
    // infinitely many solutions, NOT no solution.
    const optEquiv = `x + ${m}y = ${q}`;

    // Distractor 2: different slope (m instead of -1/m) -> exactly one solution.
    const optSlope1 = `${b}x - ${a}y = 0`;

    // Distractor 3: different slope (-m/k) -> exactly one solution.
    const k = getRandomInt(1, 3);
    const optSlope2 = `${b}x + ${k * a}y = ${c}`;

    const optionsData = [
      { text: optEquiv, isCorrect: false, reason: "is equivalent to the given equation, so the system has infinitely many solutions" },
      { text: optCorrect, isCorrect: true },
      { text: optSlope1, isCorrect: false, reason: "has a different slope, so the system has exactly one solution" },
      { text: optSlope2, isCorrect: false, reason: "has a different slope, so the system has exactly one solution" }
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
      correctAnswer: optCorrect,
      explanation: `Choice ${correctLetter} is correct. The given equation has slope $-\\frac{${a}}{${b}}$, which reduces to $-\\frac{1}{${m}}$. A system has no solution when the two lines are parallel: they must have the same slope but different y-intercepts. Choice ${correctLetter}, $${optCorrect}$, has slope $-\\frac{1}{${m}}$ and a different constant, so the lines never meet. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
