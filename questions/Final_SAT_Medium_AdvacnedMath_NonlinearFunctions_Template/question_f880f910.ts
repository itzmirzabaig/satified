import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: f880f910
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area: 270, base = height + 12, solution: height = 18]
 * - Difficulty factors: [Triangle area formula, setting up quadratic, solving]
 * - Distractor patterns: [A/C/D: various calculation errors]
 * - Constraints: [Area = 0.5 * base * height, base = h + 12]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - word problem]
 */

export const generator_f880f910 = {
  metadata: {
    // id: "f880f910",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: area = 270, difference = 12, solution h = 18
    // Randomize: difference (8-15), solution h (15-25)
    const h = getRandomInt(15, 25); // height
    const diff = getRandomInt(8, 15); // base = height + diff
    const base = h + diff;
    const area = Math.floor(0.5 * base * h);
    
    // STEP 2: Calculate derived values
    // Verify: 0.5 * (h+diff) * h = area
    // h² + diff*h - 2*area = 0
    
    // STEP 3: Build question text
    const questionText = `The area of a triangle is ${area} square centimeters. The length of the base of the triangle is ${diff} centimeters greater than the height of the triangle. What is the height, in centimeters, of the triangle?`;
    
    // STEP 4: Create options with tracking
    const optionsData = [
      { text: `${Math.floor(h/1.2)}`, isCorrect: false, reason: "may result from conceptual or calculation errors" },
      { text: `${h}`, isCorrect: true },
      { text: `${Math.floor(h * 1.7)}`, isCorrect: false, reason: "may result from conceptual or calculation errors" },
      { text: `${h * 2}`, isCorrect: false, reason: "may result from conceptual or calculation errors" }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `${h}`;
    
    // STEP 6: Build explanation with dynamic letters
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. Let $h$ be the height. The base is $h + ${diff}$. Using the area formula $A = \\\\frac{1}{2}bh$: $${area} = \\\\frac{1}{2}(h + ${diff})(h)$. Multiplying by 2: $${2*area} = h^2 + ${diff}h$. Rearranging: $h^2 + ${diff}h - ${2*area} = 0$. Factoring: $(h + ${h + diff})(h - ${h}) = 0$ (or using quadratic formula). Since height must be positive, $h = ${h}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
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