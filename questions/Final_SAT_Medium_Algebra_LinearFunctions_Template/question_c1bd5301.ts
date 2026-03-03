import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c1bd5301
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial weight: 241 (triple digit), rate: 3 (single digit)]
 * - Difficulty factors: [Interpreting linear model parameters in context]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - straightforward identification]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */

export const generator_c1bd5301 = {
  metadata: {
    // id: "c1bd5301",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Initial weight: triple digit (200-300 range)
    const a = getRandomInt(200, 300);
    // Rate of gain: single digit (2-5)
    const b = getRandomInt(2, 5);
    
    // STEP 2: Return question data
    return {
      questionText: `A model predicts that a certain animal weighed ${a} pounds when it was born and that the animal gained ${b} pounds per day in its first year of life. This model is defined by an equation in the form $f(x)=a+b x$, where $f(x)$ is the predicted weight, in pounds, of the animal $x$ days after it was born, and $a$ and $b$ are constants. What is the value of $a$?`,
      figureCode: null,
      options: null,
      correctAnswer: a.toString(),
      explanation: `The correct answer is ${a}. In the model $f(x) = a + bx$, the constant $a$ represents the initial value (weight at birth, when $x=0$), and $b$ represents the rate of change (pounds gained per day). Since the animal weighed ${a} pounds at birth, $a = ${a}$.`
    };
  }
};

/**
 * Question ID: 620fe971 (620fe971_part2 for the actual question)
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 120, rate: 25, equation y = 120 - 25x]
 * - Difficulty factors: [Interpreting x-intercept in context]
 * - Distractor patterns: [B = rate misinterpretation, C = rate value, D = y-intercept]
 * - Constraints: [None - conceptual interpretation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */