import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 702
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [distance: 210 miles, speed1: 60 mph, speed2: 50 mph, x: 1]
 * - Difficulty factors: [Setting up distance equation, substitution]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [y must be positive integer]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_702 = {
  metadata: {
    id: "702",
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
      questionText: `On a ${totalDistance}-mile trip, a driver traveled at an average speed of ${speed1} miles per hour for the first x hours. They then completed the trip, driving at an average speed of ${speed2} miles per hour for the remaining y hours. If x = ${xHours}, what is the value of y?`,
      figureCode: null,
      options: [],
      correctAnswer: yHours.toString(),
      explanation: `The correct answer is ${yHours}. It's given that the driver traveled ${speed1} miles per hour for x hours; therefore, the distance driven at this speed can be represented by ${speed1}x. They then drove ${speed2} miles per hour for y hours; therefore, the distance driven at this speed can be represented by ${speed2}y. Since the driver traveled ${totalDistance} total miles, the equation ${speed1}x + ${speed2}y = ${totalDistance} represents this situation. If x = ${xHours}, substitution yields ${speed1}(${xHours}) + ${speed2}y = ${totalDistance}, or ${speed1 * xHours} + ${speed2}y = ${totalDistance}. Subtracting ${speed1 * xHours} from both sides of this equation yields ${speed2}y = ${totalDistance - speed1 * xHours}. Dividing both sides of this equation by ${speed2} yields y = ${yHours}.`
    };
  }
};
