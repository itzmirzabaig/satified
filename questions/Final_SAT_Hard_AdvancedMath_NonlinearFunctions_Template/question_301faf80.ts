import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 301faf80
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [product: 462, specific integers with relationship]
 * - Difficulty factors: [Systems of equations, quadratic factoring, positive integer constraints]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must yield positive integer solutions, quadratic must factor nicely]
 * - Question type: [Fill-in-the-blank word problem]
 * - Figure generation: [None]
 */

export const generator_301faf80 = {
  metadata: {
    // id: "301faf80",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Generate factor pairs where one factor is 5 more than twice the other
    // Let second integer = n, first integer = 2n + 5
    // Product: n(2n + 5) = 2n² + 5n
    // We need this to equal some target that gives nice integer solutions
    
    const validN = [7, 8, 9, 11, 12, 14, 15, 16, 17, 18];
    const n = getRandomElement(validN);
    const firstInteger = 2 * n + 5;
    const product = n * firstInteger;
    
    const correctAnswer = n.toString();
    
    return {
      questionText: `The product of two positive integers is ${product}. If the first integer is 5 greater than twice the second integer, what is the smaller of the two integers?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `Let the second integer be $x$ and the first integer be $2x + 5$. The product is $x(2x + 5) = ${product}$, which gives $2x^2 + 5x - ${product} = 0$. Factoring yields $(2x + ${firstInteger})(x - ${n}) = 0$ (or equivalent), giving $x = ${n}$ or $x = -${firstInteger}/2$. Since $x$ must be positive, the smaller integer is ${n}.`
    };
  }
};

/**
 * Question ID: 128c75e2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient a: negative, multiples of a: 15 and 7]
 * - Difficulty factors: [Absolute value with negative parameter, function evaluation]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [a < 0, products must yield clean integer]
 * - Question type: [Fill-in-the-blank function evaluation]
 * - Figure generation: [None]
 */