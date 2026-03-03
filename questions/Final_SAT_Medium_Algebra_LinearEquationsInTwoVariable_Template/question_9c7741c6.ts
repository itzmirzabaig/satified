import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 9c7741c6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [distance: 210 miles, speed1: 60 mph, speed2: 50 mph, x: 1]
 * - Difficulty factors: [Setting up distance equation, substitution]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [y must be positive integer]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_9c7741c6 = {
  metadata: {
    // id: "9c7741c6",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const speed1 = getRandomInt(40, 70);
    const speed2 = getRandomInt(30, 60);
    const xHours = getRandomInt(1, 4);
    const yHours = getRandomInt(2, 6);
    const totalDistance = speed1 * xHours + speed2 * yHours;
    
    return {
      questionText: `On a ${totalDistance}-mile trip, Cameron drove at an average speed of ${speed1} miles per hour for the first x hours. He then completed the trip, driving at an average speed of ${speed2} miles per hour for the remaining y hours. If x = ${xHours}, what is the value of y?`,
      figureCode: null,
      options: null,
      correctAnswer: yHours.toString(),
      explanation: `The correct answer is ${yHours}. It's given that Cameron drove ${speed1} miles per hour for x hours; therefore, the distance driven at this speed can be represented by ${speed1}x. He then drove ${speed2} miles per hour for y hours; therefore, the distance driven at this speed can be represented by ${speed2}y. Since Cameron drove ${totalDistance} total miles, the equation ${speed1}x + ${speed2}y = ${totalDistance} represents this situation. If x = ${xHours}, substitution yields ${speed1}(${xHours}) + ${speed2}y = ${totalDistance}, or ${speed1 * xHours} + ${speed2}y = ${totalDistance}. Subtracting ${speed1 * xHours} from both sides of this equation yields ${speed2}y = ${totalDistance - speed1 * xHours}. Dividing both sides of this equation by ${speed2} yields y = ${yHours}.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-bbb0359a.ts
/**
 * Question ID: bbb0359a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 1,2,3, y: 11,16,21, slope: 5, intercept: 6]
 * - Difficulty factors: [Finding equation from table]
 * - Distractor patterns: [B: wrong intercept, C/D: wrong slope/intercept combinations]
 * - Constraints: [Linear relationship with clean integer values]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [Mafs plot with points]
 */
