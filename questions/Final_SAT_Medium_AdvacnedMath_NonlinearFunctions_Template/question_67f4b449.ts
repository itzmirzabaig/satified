import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 67f4b449
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(w) = 6w², f(14) = 1176 interpretation]
 * - Difficulty factors: [Function notation interpretation in geometric context]
 * - Distractor patterns: [B: confuses area with length, C/D: swapped variables]
 * - Constraints: [f(w) gives area, not length]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - word problem]
 */

export const generator_67f4b449 = {
  metadata: {
    // id: "67f4b449",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: f(w) = 6w², f(14) = 1176
    // Randomize: ratio (4-8), width (10-20)
    const ratio = getRandomInt(4, 8); // length = ratio * width
    const w = getRandomInt(10, 20); // width
    const area = ratio * w * w; // f(w) = ratio * w²
    
    // STEP 2: Calculate derived values
    
    // STEP 3: Build question text
    const questionText = `The function $f(w)=${ratio}w^{2}$ gives the area of a rectangle, in square feet, if its width is $w$ ft and its length is ${ratio} times its width. Which of the following is the best interpretation of $f(${w})=${area}$?`;
    
    // STEP 4: Create options with tracking
    const length = ratio * w;
    
    const optionsData = [
      { text: `If the width of the rectangle is ${w} ft, then the area of the rectangle is ${area} ft².`, isCorrect: true },
      { text: `If the width of the rectangle is ${w} ft, then the length of the rectangle is ${area} ft.`, isCorrect: false, reason: `confuses the area with the length; the length would be ${length} ft, not ${area} ft` },
      { text: `If the width of the rectangle is ${area} ft, then the length of the rectangle is ${w} ft.`, isCorrect: false, reason: "swaps the input (width) and output values" },
      { text: `If the width of the rectangle is ${area} ft, then the area of the rectangle is ${w} ft².`, isCorrect: false, reason: "swaps the input and output, and confuses the meaning of f(w)" }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `If the width of the rectangle is ${w} ft, then the area of the rectangle is ${area} ft².`;
    
    // STEP 6: Build explanation with dynamic letters
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The function $f$ gives the area of the rectangle when the width is $w$ ft. Since $f(${w}) = ${area}$ means $f(w) = ${area}$ when $w = ${w}$, this represents that when the width is ${w} ft, the area is ${area} ft². Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    // STEP 7: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 44076c7d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table: (-1,10), (0,14), (1,20), quadratic f(x) = x² + 5x + 14]
 * - Difficulty factors: [Finding quadratic from three points, testing values]
 * - Distractor patterns: [Various coefficient combinations]
 * - Constraints: [f(0) = 14 gives constant term, test other points]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */