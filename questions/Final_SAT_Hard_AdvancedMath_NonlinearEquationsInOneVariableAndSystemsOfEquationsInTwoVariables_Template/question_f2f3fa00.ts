import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f2f3fa00
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [time: 5 seconds, initial velocity: 12, equation manipulation]
 * - Difficulty factors: [Literal equation solving, isolating variable, identifying coefficient]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Algebraic manipulation, final form vf = xa + y]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_f2f3fa00 = {
  metadata: {
    // id: "f2f3fa00",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: a = (vf - 12)/5, rewrite as vf = xa + y, find x
    // Pattern: a = (vf - v0)/t, find coefficient when solved for vf
    
    const time = getRandomInt(3, 8);
    const initialVelocity = getRandomInt(8, 20);
    
    // a = (vf - v0)/t → ta = vf - v0 → vf = ta + v0
    // So x = t (the time value)
    
    const xValue = time;
    
    // STEP 2: No figure needed
    const figureCode = null;
    
    return {
      questionText: `During a $${time}$-second time interval, the average acceleration $a$, in meters per second squared, of an object with an initial velocity of $${initialVelocity}$ meters per second is defined by the equation $a=\\frac{v_f-${initialVelocity}}{${time}}$, where $v_f$ is the final velocity of the object in meters per second. If the equation is rewritten in the form $v_f=xa+y$, where $x$ and $y$ are constants, what is the value of $x$?`,
      figureCode: figureCode,
      options: null,
      correctAnswer: xValue.toString(),
      explanation: `The correct answer is $${xValue}$. Multiplying both sides by $${time}$: $${time}a=v_f-${initialVelocity}$. Adding $${initialVelocity}$ to both sides: $v_f=${time}a+${initialVelocity}$. Comparing to $v_f=xa+y$, we see $x=${time}$.`
    };
  }
};

/**
 * Question ID: fada6b03
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quadratic: 2x²-8x-7=0, discriminant gives 120]
 * - Difficulty factors: [Quadratic formula, simplifying radical, identifying k in form with radical]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Must simplify to form (8±√k)/4]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/fada6b03.ts