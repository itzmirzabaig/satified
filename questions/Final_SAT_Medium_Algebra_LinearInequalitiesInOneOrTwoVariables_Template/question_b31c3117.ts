import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b31c3117
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [formula: H=120p+60, p range: 0.5-0.85]
 * - Difficulty factors: [Formula evaluation with range, heart rate calculation]
 * - Distractor patterns: [B=wrong p range, C=partial range, D=wrong range]
 * - Constraints: [H(0.5) = 120, H(0.85) = 162]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_b31c3117 = {
  metadata: {
    // id: "b31c3117",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: H = 120p + 60, p in [0.5, 0.85]
    // Generate similar linear formula H = ap + b
    const multiplier = getRandomInt(100, 150); // 120 in original
    const baseRate = getRandomInt(50, 80); // 60 in original
    
    const minP = getRandomInt(3, 6) / 10; // 0.3 to 0.6
    const maxP = minP + getRandomInt(2, 4) / 10; // 0.2 to 0.4 above min
    
    // STEP 2: Calculate H values
    const minH = multiplier * minP + baseRate;
    const maxH = multiplier * maxP + baseRate;
    
    // Round to integers
    const minHInt = Math.round(minH);
    const maxHInt = Math.round(maxH);
    
    // STEP 3: Create distractors (wrong p ranges)
    // B: Lower range (e.g., 0.35 to 0.5)
    const wrongMinP1 = minP - 0.15;
    const wrongMaxP1 = minP;
    const wrongMinH1 = Math.round(multiplier * wrongMinP1 + baseRate);
    const wrongMaxH1 = Math.round(multiplier * wrongMaxP1 + baseRate);
    
    // C: Full range from 0 to maxP
    const wrongMinH2 = baseRate; // p=0
    const wrongMaxH2 = maxHInt;
    
    // D: Lower range from 0 to something
    const wrongMaxP3 = minP - 0.15;
    const wrongMaxH3 = Math.round(multiplier * wrongMaxP3 + baseRate);
    
    // STEP 4: Create options with tracking
    const optionsData = [
      { text: `$${minHInt} \\le H \\le ${maxHInt}$`, isCorrect: true },
      { text: `$${wrongMinH1} \\le H \\le ${wrongMaxH1}$`, isCorrect: false },
      { text: `$${wrongMinH2} \\le H \\le ${wrongMaxH2}$`, isCorrect: false },
      { text: `$${wrongMinH2} \\le H \\le ${wrongMaxH3}$`, isCorrect: false }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 6: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. When $p=${minP}$, $H=${multiplier}(${minP})+${baseRate}=${minHInt}$. When $p=${maxP}$, $H=${multiplier}(${maxP})+${baseRate}=${maxHInt}$. Therefore, the target training heart rate is $${minHInt} \\le H \\le ${maxHInt}$. Choice ${incorrectOptions[0].letter} is incorrect; this describes the heart rate for a different p range. Choice ${incorrectOptions[1].letter} is incorrect; this describes the heart rate for $0 \\le p \\le ${maxP}$. Choice ${incorrectOptions[2].letter} is incorrect; this describes the heart rate for $0 \\le p \\le ${wrongMaxP3}$.`;
    
    // STEP 7: Return question data
    return {
      questionText: `The Karvonen formula above shows the relationship between Alice's target heart rate $H$, in beats per minute (bpm), and the intensity level $p$ of different activities. When $p=0$, Alice has a resting heart rate. When $p=1$, Alice has her maximum heart rate. It is recommended that $p$ be between $${minP}$ and $${maxP}$ for Alice when she trains. Which of the following inequalities describes Alice's target training heart rate?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${minHInt} \\le H \\le ${maxHInt}`,
      explanation: explanation
    };
  }
};
/**
 * Question ID: c17d9ba9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [multiplier: 5, subtract: 17, y: 3]
 * - Difficulty factors: ["At most" translation, substitution]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [x ≤ 5y - 17, with y=3 gives x ≤ -2]
 * - Question type: [Word Problem→Fill in the Blank]
 * - Figure generation: [None]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/c17d9ba9.ts