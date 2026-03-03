import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 881ef5f5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [9 consecutive integers]
 * - Difficulty factors: [Algebraic proof that mean=median for consecutive integers]
 * - Distractor patterns: [Non-zero differences based on miscalculation]
 * - Constraints: [For consecutive integers, mean always equals median]
 * - Question type: [Text→Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_881ef5f5 = {
  metadata: {
    // id: "881ef5f5",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate 9 consecutive integers starting from random k
    const k = getRandomInt(1, 50);
    const integers = Array.from({length: 9}, (_, i) => k + i);
    
    // STEP 2: Calculate mean and median
    const sum = integers.reduce((a, b) => a + b, 0);
    const mean = sum / 9; // This equals k + 4
    const median = integers[4]; // 5th value is k + 4
    
    const difference = Math.abs(mean - median);
    
    return {
      questionText: `If $a$ is the mean and $b$ is the median of nine consecutive integers starting from ${k}, what is the value of $|a-b|$?`,
      figureCode: null,
      options: null,
      correctAnswer: difference.toString(),
      explanation: `The correct answer is ${difference}. The nine consecutive integers are ${integers.join(', ')}. The mean is $\\\\frac{${integers.join('+')}}{9} = \\\\frac{${sum}}{9} = ${mean}$. The median is the 5th value: ${median}. Therefore, $|a-b| = |${mean} - ${median}| = ${difference}$. For any set of consecutive integers (or any symmetric distribution), the mean equals the median, so their absolute difference is always 0.`
    };
  }
};

/**
 * Question ID: 9e2bf782
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tank A: <5 oz, tank B: 5-13 oz, tank C: >13 oz]
 * - Difficulty factors: [Finding possible median given grouped constraints]
 * - Distractor patterns: [Values outside possible median range]
 * - Constraints: [Median is 17th of 33 values, must be in tank B range]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */