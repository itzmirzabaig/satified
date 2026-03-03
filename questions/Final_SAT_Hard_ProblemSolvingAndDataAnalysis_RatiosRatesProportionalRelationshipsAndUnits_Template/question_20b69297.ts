import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 20b69297
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [first batch: 2 blue, 3 yellow, second batch: 5 blue]
 * - Difficulty factors: [Ratio reasoning, abstract relationship vs concrete calculation]
 * - Distractor patterns: [A: exactly 5 (confusing with blue), B: 3 more (additive error), C: 1.5x first yellow (wrong reference)]
 * - Constraints: [Correct answer D: 1.5x second blue amount]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_20b69297 = {
  metadata: {
    // id: "20b69297",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate ratio values (2:3 in original)
    const blue1 = getRandomInt(2, 4);
    const yellow1 = getRandomInt(3, 6);
    const blue2 = getRandomInt(4, 8); // Different from blue1
    
    // STEP 2: Calculate actual yellow needed
    const yellow2 = (yellow1 * blue2) / blue1;
    const ratio = yellow1 / blue1; // 1.5 in original
    
    // STEP 3: Distractors
    // A: Exactly blue2 amount (nonsensical)
    const distractorA = `Exactly $${blue2}$ ounces`;
    // B: Yellow1 + 3 (additive error based on original 3)
    const distractorB = `$${yellow1}$ ounces more than the amount of yellow paint used in the first batch`;
    // C: 1.5 × first yellow (wrong reference - using concrete calc instead of relationship)
    const distractorC = `$${ratio.toFixed(1)}$ times the amount of yellow paint used in the first batch`;
    
    // Ensure distractors are unique
    const distractorTexts = [distractorA, distractorB, distractorC];
    const uniqueDistractors = distractorTexts.filter((d, i, arr) => 
      arr.indexOf(d) === i
    );
    
    while (uniqueDistractors.length < 3) {
      const randomAmount = getRandomInt(2, 10);
      const newDistractor = `$${randomAmount}$ ounces`;
      if (!uniqueDistractors.includes(newDistractor)) {
        uniqueDistractors.push(newDistractor);
      }
    }
    
    // STEP 4: Create and shuffle options
    const correctText = `$${ratio.toFixed(1)}$ times the amount of blue paint used in the second batch`;
    const optionsData = [
      { text: uniqueDistractors[0], isCorrect: false, reason: "confuses the amount of blue paint with the required yellow paint" },
      { text: uniqueDistractors[1], isCorrect: false, reason: "results from incorrectly adding a fixed amount rather than using the ratio" },
      { text: uniqueDistractors[2], isCorrect: false, reason: "uses the first batch's yellow amount as reference instead of the second batch's blue amount" },
      { text: correctText, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. The ratio of blue to yellow is ${blue1}:${yellow1}, so yellow = $\\frac{${yellow1}}{${blue1}} = ${ratio}$ × blue. For the second batch with ${blue2} ounces blue, yellow = ${ratio} × ${blue2} = ${yellow2} ounces, which is ${ratio} times the blue amount. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `Anita created a batch of green paint by mixing ${blue1} ounces of blue paint with ${yellow1} ounces of yellow paint. She must mix a second batch using the same ratio of blue and yellow paint as the first batch. If she uses ${blue2} ounces of blue paint for the second batch, how much yellow paint should Anita use?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 11b06e35
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [density: 813 kg/m³, edge: 0.60 m, answer: 176 kg]
 * - Difficulty factors: [Density × cube volume, careful calculation]
 * - Distractor patterns: [176: correct, 488: density×edge, 1355: density/edge, 3764: density/volume]
 * - Constraints: [Edge < 1 ensures volume < 1, making mass < density]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */