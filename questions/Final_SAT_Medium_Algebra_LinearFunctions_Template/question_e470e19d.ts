import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e470e19d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 7, intercept: -84]
 * - Difficulty factors: [Finding x-intercept]
 * - Distractor patterns: [A = negative of correct, B = slope as intercept, C = slope value]
 * - Constraints: [Intercept must be divisible by slope for integer answer]
 * - Question type: [Text→Multiple Choice Text with coordinate answers]
 * - Figure generation: [None]
 */

export const generator_e470e19d = {
  metadata: {
    // id: "e470e19d",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Slope: 4-9 (single digit)
    const m = getRandomInt(4, 9);
    // Intercept: negative multiple of slope (ensuring integer x-intercept)
    const multiple = getRandomInt(8, 15);
    const b = -m * multiple; // So x-intercept = -b/m = multiple
    
    // STEP 2: Calculate x-intercept
    const xInt = -b / m; // This equals 'multiple'
    
    // STEP 3: Create coordinate options
    const correctText = `(${xInt}, 0)`;
    const optionsData = [
      { text: `(${-xInt}, 0)`, isCorrect: false, reason: "results from an error in signs" },
      { text: `(${-m}, 0)`, isCorrect: false, reason: "confuses the coefficient with the intercept" },
      { text: `(${m}, 0)`, isCorrect: false, reason: "might be a guess based on the coefficient" },
      { text: correctText, isCorrect: true }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `The function $f$ is defined by $f(x)=${m}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}$. What is the $x$-intercept of the graph of $y=f(x)$ in the $xy$-plane?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. To find the $x$-intercept, set $f(x) = 0$: $0 = ${m}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}$, so ${m}x = ${-b}$, and $x = ${xInt}$. The $x$-intercept is (${xInt}, 0). Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: af711d1b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [distances: 0.32, 0.56, 0.68, times: 8, 14, 17]
 * - Difficulty factors: [Finding rate from table, verifying linearity]
 * - Distractor patterns: [A = inverted slope, B = inverted slope (fraction), D = inverted slope (different fraction)]
 * - Constraints: [Table data must show consistent rate]
 * - Question type: [Table in Question→Multiple Choice Text]
 * - Figure generation: [HTML Table in question]
 */