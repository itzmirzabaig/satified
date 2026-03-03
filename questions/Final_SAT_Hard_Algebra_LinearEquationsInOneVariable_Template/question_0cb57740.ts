import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 0cb57740
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [30 sides, 8, 3, 5 (multiplier), 6 (constant) - mixed ranges]
 * - Difficulty factors: [Polygon side counting equation, same structure as frying pan problems]
 * - Distractor patterns: [A: forgets n for 3cm, B: correct, C: multiplies lengths, D: calculates perimeter]
 * - Constraints: [Total must be 30 sides]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_0cb57740 = {
  metadata: {
    // id: "0cb57740",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    let valid = false;
    let totalSides: number, length1: number, length2: number, multiplier: number, constantSides: number, nCoeff: number;
    
    while (!valid) {
      totalSides = getRandomInt(25, 40);
      length1 = getRandomInt(6, 12);
      length2 = getRandomInt(3, 7);
      multiplier = getRandomInt(4, 7);
      constantSides = getRandomInt(4, 10);
      
      nCoeff = multiplier + 1;
      const constSum = totalSides - constantSides;
      
      if (constSum > 0 && constSum % nCoeff === 0) {
        valid = true;
      }
    }
    
    // STEP 3: Build equations
    const correctEquation = `${nCoeff}n + ${constantSides} = ${totalSides}`;
    const distractorA = `${multiplier}n + ${constantSides} = ${totalSides}`;
    const distractorC = `${length1}n + ${length2}n + ${length1}n = ${totalSides}`;
    const distractorD = `${length1}(${multiplier}n) + ${length2}n + ${length1}(${constantSides}) = ${totalSides}`;
    
    // Fixed: Template literals for reasons with ${} variables
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: `this misses the $n$ sides of length ${length2} cm, only counting the ${length1} cm sides (${multiplier}n) and ${constantSides} sides` },
      { text: correctEquation, isCorrect: true, reason: null },
      { text: distractorC, isCorrect: false, reason: `this equation seems to be mixing lengths with counts randomly` },
      { text: distractorD, isCorrect: false, reason: `this calculates the total perimeter (sum of all lengths), not the number of sides` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // Fixed: Removed excessive escaping, plain text for words, $...$ for math only
    const explanation = `The problem asks us to find an equation that represents the total number of sides of a ${totalSides}-sided polygon.

1. **Identify the total number of sides:** The polygon is a ${totalSides}-sided polygon, so the total number of sides is ${totalSides}.

2. **Break down the sides by length:**
   * **Length ${length2} cm:** The problem states there are $n$ sides with length ${length2} cm.
   * **Length ${length1} cm:** The number of sides with length ${length1} cm is "${multiplier} times the number of sides $n$ with length ${length2} cm". So, there are ${multiplier}$n$ sides with length ${length1} cm.
   * **Length constant:** The problem states there are ${constantSides} sides of the third length.

3. **Form the equation:** The sum of the number of sides of each length must equal the total number of sides.
$$(\\text{Number of sides of length } ${length2}) + (\\text{Number of sides of length } ${length1}) + (\\text{Number of constant sides}) = \\text{Total sides}$$
$$n + ${multiplier}n + ${constantSides} = ${totalSides}$$

4. **Simplify the equation:** Combine the like terms involving $n$:
$$1n + ${multiplier}n = ${nCoeff}n$$
So, the equation becomes:
$$${correctEquation}$$

Choice ${correctLetter} is correct.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.

Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.

Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      // Fixed: Plain text for units and numbers, $...$ for math variables only
      questionText: `Each side of a ${totalSides}-sided polygon has one of three lengths. The number of sides with length ${length1} centimeters (cm) is ${multiplier} times the number of sides $n$ with length ${length2} cm. There are ${constantSides} sides with the third length. Which equation must be true for the value of $n$?`,
      figureCode: null,
      // Fixed: Return string array, not object array
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 153ee763
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [-3, 21, 84 (coefficients)]
 * - Difficulty factors: [No solution condition with parameter p]
 * - Distractor patterns: [A: 0 (makes solvable), C: 4/3, D: 4 (both give unique solutions)]
 * - Constraints: [Coefficient of x must be 0, constant must be non-zero]
 * - Question type: [Equation→Multiple Choice Text]
 * - Figure generation: [None]
 */