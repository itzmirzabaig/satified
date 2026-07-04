import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 807
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [operations with x+7 and 2y]
 * - Difficulty factors: [Translating words to equations]
 * - Distractor patterns: [Various equation orderings]
 * - Constraints: [Correct phrase translation]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_807 = {
  metadata: {
    id: "807",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const n1 = getRandomInt(3, 10);
    const n2 = getRandomInt(2, 8);
    const multiplier = getRandomInt(2, 4);
    
    // STEP 2: Build question text
    const questionText = `The sum of a number $x$ and $${n1}$ is ${multiplier} times as large as a number $y$. The number $y$ is $${n2}$ less than the number $x$. Which system of equations describes this situation?`;
    
    // STEP 3: Create options
    const optionA = `$x+${n1}=${multiplier}y$\n$y=x-${n2}$`;
    const optionB = `$x+${n1}=${multiplier}y$\n$y=${n2}-x$`;
    const optionC = `$${multiplier}(x+${n1})=y$\n$y=x-${n2}$`;
    const optionD = `$${multiplier}(x+${n1})=y$\n$y=${n2}-x$`;
    
    const optionsData = [
      { text: optionA, isCorrect: true },
      { text: optionB, isCorrect: false },
      { text: optionC, isCorrect: false },
      { text: optionD, isCorrect: false }
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
      correctAnswer: optionA,
      explanation: `The first sentence states: "The sum of a number $x$ and $${n1}$ is ${multiplier} times as large as a number $y$."\n- "Sum of a number $x$ and $${n1}$" translates to $x+${n1}$.\n- "Is ${multiplier} times as large as a number $y$" translates to $= ${multiplier}y$.\nSo, the first equation is $x+${n1}=${multiplier}y$. This rules out any system whose first equation is $${multiplier}(x+${n1})=y$, which incorrectly multiplies the sum by ${multiplier} instead of setting the sum equal to ${multiplier} times $y$.\n\nThe second sentence states: "The number $y$ is $${n2}$ less than the number $x$."\n- "The number $y$" translates to $y$.\n- "Is" translates to $=$.\n- "${n2} less than the number $x$" translates to $x-${n2}$ (start with $x$ and subtract ${n2}).\nSo, the second equation is $y=x-${n2}$.\n\nCombining these, the correct system is:\n$x+${n1}=${multiplier}y$\n$y=x-${n2}$\n\nThis matches option ${correctLetter}.\n\nThe other options are incorrect:\n- A system with the second equation $y=${n2}-x$ says "$y$ is $x$ less than $${n2}$", which reverses the subtraction.\n- A system with the first equation $${multiplier}(x+${n1})=y$ says "${multiplier} times the sum of $x$ and $${n1}$ is $y$", which multiplies the whole sum instead of equating it to $${multiplier}y$.\n- A system that makes both of these errors is incorrect for both reasons.`
    };
  }
};
