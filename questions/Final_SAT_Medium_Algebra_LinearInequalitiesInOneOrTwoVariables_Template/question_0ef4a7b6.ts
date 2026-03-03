import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 0ef4a7b6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [threshold: 100, ranges given in options]
 * - Difficulty factors: [Range interpretation, "more than" threshold]
 * - Distractor patterns: [B/C/D=ranges entirely below threshold]
 * - Constraints: [Range must be entirely > 100]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_0ef4a7b6 = {
  metadata: {
    // id: "0ef4a7b6",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: threshold 100 cm, option A is 106-158
    const threshold = getRandomInt(80, 150); // Threshold for "tall"
    const unit = getRandomInt(0, 1) === 0 ? 'centimeters' : 'inches';
    
    // STEP 2: Create ranges for options
    // Correct: entirely above threshold
    const correctMin = threshold + getRandomInt(5, 15);
    const correctMax = correctMin + getRandomInt(30, 60);
    
    // Wrong options: entirely or partially below threshold
    const wrongMin1 = threshold - getRandomInt(20, 30);
    const wrongMax1 = threshold - getRandomInt(5, 10);
    
    const wrongMin2 = threshold - getRandomInt(40, 60);
    const wrongMax2 = threshold - getRandomInt(15, 25);
    
    const wrongMin3 = threshold - getRandomInt(60, 90);
    const wrongMax3 = threshold - getRandomInt(20, 40);
    
    // STEP 3: Create options
    const optionsData = [
      { text: `$${correctMin} < h < ${correctMax}$`, isCorrect: true },
      { text: `$${wrongMin1} < h < ${wrongMax1}$`, isCorrect: false },
      { text: `$${wrongMin2} < h < ${wrongMax2}$`, isCorrect: false },
      { text: `$${wrongMin3} < h < ${wrongMax3}$`, isCorrect: false }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 5: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. It's given that a species is classified as tall if its typical height when fully grown is more than ${threshold} ${unit}. The inequality $${correctMin} < h < ${correctMax}$ represents possible heights where all values are greater than ${threshold} ${unit}, so this represents a tall plant species. Choice ${incorrectOptions[0].letter} is incorrect because this range is entirely below ${threshold}. Choice ${incorrectOptions[1].letter} is incorrect because this range is also below ${threshold}. Choice ${incorrectOptions[2].letter} is incorrect because this range is well below ${threshold}.`;
    
    // STEP 6: Return question data
    return {
      questionText: `A particular botanist classifies a species of plant as tall if its typical height when fully grown is more than $${threshold}$ ${unit}. Each of the following inequalities represents the possible heights $h$, in ${unit}, for a specific plant species when fully grown. Which inequality represents the possible heights $h$, in ${unit}, for a tall plant species?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${correctMin} < h < ${correctMax}`,
      explanation: explanation
    };
  }
};
/**
 * Question ID: 6daf8d70
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [max bushes: 164, ratio: 3]
 * - Difficulty factors: [System setup from word problem, constraint translation]
 * - Distractor patterns: [A/B=wrong inequality signs, C=swapped ratio]
 * - Constraints: [a + b ≤ 164, a ≤ 3b]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/6daf8d70.ts