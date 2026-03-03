import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 38a43902
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: -2, result: 40 (double-digit)]
 * - Difficulty factors: [Substitution, straightforward solve for x]
 * - Distractor patterns: [Fill in blank - no distractors to analyze]
 * - Constraints: [Integer answer]
 * - Question type: [Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_38a43902 = {
  metadata: {
    // id: "38a43902",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const coeff = -1 * getRandomInt(1, 4); // Negative coefficient
    const xValue = getRandomInt(10, 60); // Double digit x
    
    // y = coeff*x, 3x + y = result
    const result = 3 * xValue + coeff * xValue;
    
    // STEP 2: Build question text
    const questionText = `The solution to the given system of equations is $(x, y)$. What is the value of $x$?\n\n$$\\begin{cases} y = ${coeff}x \\\\ 3x + y = ${result} \\end{cases}$$`;
    
    // STEP 3: Return fill-in-the-blank
    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: xValue.toString(),
      explanation: `We are given a system of two linear equations: 1.  $y = ${coeff}x$ 2.  $3x + y = ${result}$ We need to find the value of $x$. Since the first equation already expresses $y$ in terms of $x$ ($y = ${coeff}x$), we can substitute this expression into the second equation. Substitute $y = ${coeff}x$ into $3x + y = ${result}$: $$3x + (${coeff}x) = ${result}$$ Simplify the equation: $$3x ${coeff}x = ${result}$$ $$${3 + coeff}x = ${result}$$ $$x = ${xValue}$$ So, the value of $x$ is ${xValue}. To double-check, we can find $y$: $y = ${coeff}(${xValue})$ $y = ${coeff * xValue}$ Let's plug these values back into the second equation: $3(${xValue}) + (${coeff * xValue}) = ${3 * xValue} ${coeff * xValue} = ${result}$. This is correct. The value of $x$ is ${xValue}.`
    };
  }
};

/**
 * Question ID: 6a87902f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2, intercepts: 10 and -1]
 * - Difficulty factors: [Parallel lines recognition, no solution concept]
 * - Distractor patterns: [Zero, Exactly one, Exactly two, Infinitely many]
 * - Constraints: [Same slope, different intercepts = parallel = no solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */