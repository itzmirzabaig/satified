import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 12ee1edc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient leading to undefined: b=2, constant: 8]
 * - Diffactor patterns: [Values that give valid solutions instead of no solution]
 * - Constraints: [For no solution: coefficient of x must be 0 but constant term non-zero]
 * - Question type: [Multiple Choice Text]
 */

export const generator_12ee1edc = {
  metadata: {
    // id: "12ee1edc",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation of form (b - c)x = d
    // For no solution: b - c = 0 but d ≠ 0
    const b = getRandomInt(2, 8);
    const c = 0; // We want (b - something) = 0, so something = b
    // Actually let's use form (x - b)*k = constant where b is the no-solution value
    const k = getRandomInt(2, 5);
    const constant = getRandomInt(5, 20) * k; // Ensures it's divisible
    
    // Correct answer is when coefficient of x becomes 0
    const correctValue = b;
    
    // Distractors: values that give valid solutions
    const distractorB = b + 2;
    const distractorC = b + 4;
    const distractorD = b + 8;
    
    const correctText = `$${correctValue}$`;
    const optionsData = [
      { text: `$${correctValue}$`, isCorrect: true },
      { text: `$${distractorB}$`, isCorrect: false },
      { text: `$${distractorC}$`, isCorrect: false },
      { text: `$${distractorD}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    
    return {
      questionText: `$(x - ${b}) \\cdot ${k} = ${constant}$\n\nIn the given equation, the coefficient of x depends on a constant. If the equation has no solution when the coefficient equals zero, what value of the constant creates this condition?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. This equation has no solution when there is no value of $x$ that produces a true statement. When rearranged to standard form, if the coefficient of $x$ becomes zero while the constant term remains non-zero, no solution exists. For the given structure, when the parameter equals ${correctValue}, the coefficient becomes zero, making the equation unsolvable.`
    };
  }
};

/**
 * Question ID: 018a2704
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 46, constant: 16, result: 30]
 * - Difficulty factors: [Solving for expression rather than variable, direct isolation]
 * - Distractor patterns: [A is the constant term, B is value of x, D is miscalculation]
 * - Constraints: [Equation asks for value of expression 2(x-8), not x itself]
 * - Question type: [Multiple Choice Text]
 */