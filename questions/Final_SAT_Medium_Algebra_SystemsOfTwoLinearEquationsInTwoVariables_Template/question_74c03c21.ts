import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_74c03c21 = {
  metadata: {
    // id: "74c03c21",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const highwaySpeed = getRandomInt(40, 70);
    const localSpeed = getRandomInt(20, 40);
    const totalTime = getRandomInt(3, 6);
    const highwayTime = getRandomInt(1, totalTime - 1);
    const localTime = totalTime - highwayTime;
    const totalDistance = highwaySpeed * highwayTime + localSpeed * localTime;
    
    // STEP 2: Build question text
    const questionText = `A bus traveled on the highway and on local roads to complete a trip of $${totalDistance}$ miles. The trip took $${totalTime}$ hours. The bus traveled at an average speed of $${highwaySpeed}$ miles per hour (mph) on the highway and an average speed of $${localSpeed}$ mph on local roads. If $x$ is the time, in hours, the bus traveled on the highway and $y$ is the time, in hours, it traveled on local roads, which system of equations represents this situation?`;
    
    // STEP 3: Create options
    const optionA = `$${highwaySpeed}x + ${localSpeed}y = ${totalTime}$\n$x + y = ${totalDistance}$`;
    const optionB = `$${highwaySpeed}x + ${localSpeed}y = ${totalDistance}$\n$x + y = ${totalTime}$`;
    const optionC = `$${localSpeed}x + ${highwaySpeed}y = ${totalTime}$\n$x + y = ${totalDistance}$`;
    const optionD = `$${localSpeed}x + ${highwaySpeed}y = ${totalDistance}$\n$x + y = ${totalTime}$`;
    
    const optionsData = [
      { text: optionA, isCorrect: false },
      { text: optionB, isCorrect: true },
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
      correctAnswer: optionB,
      explanation: `To solve this, we need to set up two equations based on the information given: one for total time and one for total distance.\n\n**1. Equation for Total Time:**\n*   The problem states the total trip took $${totalTime}$ hours.\n*   $x$ represents the time spent on the highway.\n*   $y$ represents the time spent on local roads.\n*   Therefore, the sum of the times must equal the total time:\n    $$x + y = ${totalTime}$$\n\n**2. Equation for Total Distance:**\n*   The formula for distance is $\\text{Speed} \\times \\text{Time}$.\n*   The bus traveled at $${highwaySpeed}$ mph on the highway for $x$ hours. So, the distance on the highway is $${highwaySpeed}x$.\n*   The bus traveled at $${localSpeed}$ mph on local roads for $y$ hours. So, the distance on local roads is $${localSpeed}y$.\n*   The total distance of the trip is $${totalDistance}$ miles.\n*   Therefore, the sum of the distances must equal the total distance:\n    $$${highwaySpeed}x + ${localSpeed}y = ${totalDistance}$$\n\n**Combining the equations:**\nThe system of equations that represents the situation is:\n$${highwaySpeed}x + ${localSpeed}y = ${totalDistance}$\n$x + y = ${totalTime}$\n\nThis matches option ${correctLetter}.\n\n**Why other options are incorrect:**\n*   **A:** Incorrectly sets the total distance equation equal to the total time ($${totalTime}$) and the total time equation equal to total distance ($${totalDistance}$).\n*   **C:** Incorrectly swaps the speeds ($${localSpeed}$ with $x$ and $${highwaySpeed}$ with $y$) and incorrectly sets the equations equal to the wrong totals.\n*   **D:** Incorrectly swaps the speeds ($${localSpeed}$ is associated with highway time $x$, and $${highwaySpeed}$ with local road time $y$). It correctly identifies $x+y=${totalTime}$, but the distance equation is wrong.`
    };
  }
};

/**
 * Question ID: 8a87c2c8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [constants: 3, 5, -2, 5, 7 (single digit)]
 * - Difficulty factors: [Addition of equations method, asks for expression value]
 * - Distractor patterns: [-2, 6, 12, 24]
 * - Constraints: [Clean addition eliminates y]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */