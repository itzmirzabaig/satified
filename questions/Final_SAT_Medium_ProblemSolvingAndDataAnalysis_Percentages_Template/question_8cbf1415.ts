import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 8cbf1415
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [first percent: 40%, second percent: 30%, result: 12%]
 * - Difficulty factors: [Successive percentage of a percentage, compound percentage calculation]
 * - Distractor patterns: [A: 10% (subtraction), C: 70% (addition), D: 75% (division)]
 * - Constraints: [Must multiply percentages: 0.40 * 0.30 = 0.12 = 12%]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_8cbf1415 = {
  metadata: {
    // id: "8cbf1415",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: 40% and 30% → 12%
    // Generate percentages that multiply to nice results
    const percent1 = getRandomInt(2, 5) * 10; // 20, 30, 40, 50
    const percent2 = getRandomInt(2, 5) * 10; // 20, 30, 40, 50
    
    // STEP 2: Calculate answer
    const result = (percent1 * percent2) / 100; // Compound percentage
    const correctText = `${result}\\%`;
    
    // STEP 3: Create distractors
    const distractorA = Math.abs(percent1 - percent2); // Subtraction error
    const distractorC = percent1 + percent2; // Addition error
    const distractorD = Math.round((percent1 / percent2) * 100); // Division error
    
    const optionsData = [
      { text: `${distractorA}\\%`, isCorrect: false, reason: "results from subtracting the percentages" },
      { text: `${result}\\%`, isCorrect: true },
      { text: `${distractorC}\\%`, isCorrect: false, reason: "results from adding the percentages" },
      { text: `${distractorD}\\%`, isCorrect: false, reason: "unrelated calculation" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Return question data
    return {
      questionText: `In a group, ${percent1}% of the items are red. Of all the red items in the group, ${percent2}% also have stripes. What percentage of the items in the group are red with stripes?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. To find the percentage of items that are both red and have stripes, calculate ${percent2}\\% of ${percent1}\\%. In decimal form: $0.${percent1} \\times 0.${percent2} = 0.${result}$, which equals ${result}\\%. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
/**
 * Question ID: 96a45430
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [increase: 6%, result: 318, original: 300]
 * - Difficulty factors: [Working backwards from increased value to original]
 * - Distractor patterns: [A: 199 (wrong formula), B: 299 (off by 1), D: 337 (increased instead of decreased)]
 * - Constraints: [n = result / (1 + percent/100)]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */
