import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f5929f7a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractions: 1/9, 1/2 (simple fractions)]
 * - Difficulty factors: [Fractional coefficients, setting equal to solve]
 * - Distractor patterns: [-9, -7, 0, 2]
 * - Constraints: [Clean fraction arithmetic, x=0 solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_f5929f7a = {
  metadata: {
    // id: "f5929f7a",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values - fractions that give x=0
    const num1 = getRandomInt(1, 4);
    const den1 = getRandomInt(5, 10);
    const num2 = getRandomInt(1, 4);
    const den2 = getRandomInt(2, 5);
    
    // Ensure they have different signs for x=0 solution
    const sign1 = getRandomElement([-1, 1]);
    const sign2 = -sign1;
    
    // STEP 2: Build question text
    const frac1 = sign1 === 1 ? `\\frac{${num1}}{${den1}}` : `-\\frac{${num1}}{${den1}}`;
    const frac2 = sign2 === 1 ? `\\frac{${num2}}{${den2}}` : `-\\frac{${num2}}{${den2}}`;
    
    const questionText = `The solution to the given system of equations is $(x, y)$. What is the value of $x$?\n\n$$\\begin{cases} y = ${frac1}x \\\\ y = ${frac2}x \\end{cases}$$`;
    
    // STEP 3: Create options
    const distractor1 = -1 * den1;
    const distractor2 = -1 * getRandomInt(5, 10);
    const distractor3 = getRandomInt(1, 5);
    
    const optionsData = [
      { text: distractor1.toString(), isCorrect: false },
      { text: distractor2.toString(), isCorrect: false },
      { text: "0", isCorrect: true },
      { text: distractor3.toString(), isCorrect: false }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // STEP 5: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "0",
      explanation: `To find the solution $(x, y)$ to the given system of equations, we can set the two expressions for $y$ equal to each other, since they both equal $y$:\n$$${frac1}x = ${frac2}x$$\n\nTo solve for $x$, we can first eliminate the fractions by multiplying the entire equation by the least common multiple of the denominators, which is ${den1 * den2}:\n$$${den1 * den2} \\cdot \\left(${frac1}x\\right) = ${den1 * den2} \\cdot \\left(${frac2}x\\right)$$\n$$${sign1 * num1 * den2}x = ${sign2 * num2 * den1}x$$\n\nNow, we can subtract $${Math.abs(sign2 * num2 * den1)}x$ from both sides (or add $${Math.abs(sign1 * num1 * den2)}x$ to both sides) to gather the $x$ terms on one side:\n$$${sign1 * num1 * den2}x - ${sign2 * num2 * den1}x = 0$$\n$$-${(sign1 * num1 * den2) + (sign2 * num2 * den1)}x = 0$$\n\nFinally, dividing by $-${(sign1 * num1 * den2) + (sign2 * num2 * den1)}$ gives:\n$$x = 0$$\n\nTherefore, the value of $x$ is $0$.\n\nLet's check the options:\nA. $${distractor1}$: Incorrect. Substituting $${distractor1}$ into the equations gives different values for $y$.\nB. $${distractor2}$: Incorrect. Substituting $${distractor2}$ gives different values for $y$.\nC. $0$: Correct. Substituting $x=0$ into both equations gives $y=0$. Thus $(0,0)$ is the intersection point.\nD. $${distractor3}$: Incorrect. Substituting $${distractor3}$ gives different values for $y$.`
    };
  }
};

/**
 * Question ID: 74c03c21
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [speed: 55, 25 (double-digit), distance: 160 (triple-digit), time: 4 (single)]
 * - Difficulty factors: [Word problem, system setup with rate equation]
 * - Distractor patterns: [Various equation combinations]
 * - Constraints: [Rate * time = distance formula]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */