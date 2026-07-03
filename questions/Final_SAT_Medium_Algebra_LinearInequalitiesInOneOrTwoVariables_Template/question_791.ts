import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 791
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [max weight: 4600, trailer: 500, box: 120]
 * - Difficulty factors: [Maximization with constraint, integer solution]
 * - Distractor patterns: [B/C/D=values exceeding weight limit]
 * - Constraints: [500 + 120b ≤ 4600, b ≤ 34.166... → 34]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_791 = {
  metadata: {
    id: "791",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const maxWeight = getRandomInt(4000, 6000);
    const trailerWeight = getRandomInt(300, 700);
    const boxWeight = getRandomInt(80, 150);
    
    // STEP 2: Calculate maximum boxes
    const remainingCapacity = maxWeight - trailerWeight;
    const maxBoxesExact = remainingCapacity / boxWeight;
    const maxBoxes = Math.floor(maxBoxesExact);
    
    // STEP 3: Create distractors (all exceed the limit). Build them strictly
    // increasing above maxBoxes so no two distractors — and none versus the
    // correct answer — can ever collide (guards against DUP_OPTIONS).
    const distractor1 = maxBoxes + 1;
    const distractor2 = distractor1 + getRandomInt(1, 3);
    const distractor3 = distractor2 + getRandomInt(1, 4);

    // STEP 4: Create options. correctAnswer will match one of these exactly.
    const optionsData = [
      { text: `$${maxBoxes}$`, isCorrect: true },
      { text: `$${distractor1}$`, isCorrect: false },
      { text: `$${distractor2}$`, isCorrect: false },
      { text: `$${distractor3}$`, isCorrect: false }
    ];

    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 6: Build explanation. Every math span begins with a letter (w or b),
    // never a bare digit, so there is no currency/math collision (DOLLAR_RISK).
    const explanation = `Choice ${correctOption.letter} is correct. Let $b$ be the number of boxes, so the total weight in pounds is $w = ${trailerWeight} + ${boxWeight}b$ and must satisfy $w \\le ${maxWeight}$. Subtracting the trailer weight leaves at most ${remainingCapacity} pounds for the boxes. Dividing by ${boxWeight} gives $b \\le ${maxBoxesExact.toFixed(2)}$. Since the number of boxes must be a whole number, the maximum is ${maxBoxes}. Choice ${incorrectOptions[0].letter} would make the total weight ${trailerWeight + boxWeight * distractor1} pounds, which exceeds ${maxWeight}; choices ${incorrectOptions[1].letter} and ${incorrectOptions[2].letter} exceed the limit by even more.`;

    // STEP 7: Return question data. Weights carry the unit "pounds", so the
    // numeric magnitudes are plain math spans (no dollar currency involved).
    return {
      questionText: `A moving truck can tow a trailer if the combined weight of the trailer and the boxes it contains is no more than ${maxWeight} pounds. What is the maximum number of boxes this truck can tow in a trailer that weighs ${trailerWeight} pounds if each box weighs ${boxWeight} pounds?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$${maxBoxes}$`,
      explanation: explanation
    };
  }
};
