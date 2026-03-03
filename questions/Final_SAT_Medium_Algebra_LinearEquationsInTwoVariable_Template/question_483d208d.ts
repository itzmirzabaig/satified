import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 483d208d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 80, 90, total: 1120]
 * - Difficulty factors: [Interpreting coefficients as point values]
 * - Distractor patterns: [Various wrong interpretations]
 * - Constraints: [Simple subtraction for difference]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_483d208d = {
  metadata: {
    // id: "483d208d",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const squareVal = getRandomInt(50, 100);
    const diff = getRandomInt(5, 20);
    const circleVal = squareVal + diff;
    const total = getRandomInt(800, 1500);
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$${total - squareVal - circleVal}$`, isCorrect: false, reason: "random calculation" },
      { text: `$${circleVal}$`, isCorrect: false, reason: "value of circle token, not difference" },
      { text: `$${squareVal}$`, isCorrect: false, reason: "value of square token, not difference" },
      { text: `$${diff}$`, isCorrect: true, reason: "" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `At a state fair, attendees can win tokens that are worth a different number of points depending on the shape. One attendee won $S$ square tokens and $C$ circle tokens worth a total of $${total}$ points. The equation $${squareVal}S + ${circleVal}C = ${total}$ represents this situation. How many more points is a circle token worth than a square token?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `The given equation is $${squareVal}S + ${circleVal}C = ${total}$. In this equation:\n- $S$ represents the number of square tokens.\n- $C$ represents the number of circle tokens.\n- The term $${squareVal}S$ represents the total points from square tokens, which means each square token is worth $${squareVal}$ points.\n- The term $${circleVal}C$ represents the total points from circle tokens, which means each circle token is worth $${circleVal}$ points.\n\nThe question asks for the difference in points between a circle token and a square token.\nValue of a circle token $= ${circleVal}$ points.\nValue of a square token $= ${squareVal}$ points.\n\nDifference $= ${circleVal} - ${squareVal} = ${diff}$.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-e0f59119.ts
/**
 * Question ID: e0f59119
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1/3, 29, 10, 5]
 * - Difficulty factors: [Distributing fraction, combining like terms]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Final slope should be clean fraction]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */
