import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 21e539a0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [88x ounces in 5y minutes, find for 9y minutes]
 * - Difficulty factors: [Proportion with abstract variables, cross-multiplication]
 * - Distractor patterns: [9x/440: inverted/wrong, 440x/9: wrong operation, 5x/792: wrong]
 * - Constraints: [Rate = 88x/5y, new amount = rate × 9y = (88x/5y) × 9y = 792x/5]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_21e539a0 = {
  metadata: {
    // id: "21e539a0",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate coefficients
    const rateNum = getRandomInt(60, 100); // 88 in original
    const time1 = getRandomInt(3, 7); // 5 in original
    const time2 = getRandomInt(7, 12); // 9 in original
    
    // STEP 2: Calculate answer
    // Rate = rateNum × x / (time1 × y)
    // Amount in time2 × y = Rate × time2 × y = (rateNum × x / (time1 × y)) × time2 × y = rateNum × time2 × x / time1
    const numerator = rateNum * time2;
    const correctExpression = `\\frac{${numerator}x}{${time1}}`;
    
    // STEP 3: Distractors
    // A: time2/(rateNum × time1) - inverted
    const distractorA = `\\frac{${time2}x}{${rateNum * time1}}`;
    // B: (rateNum × time1)/time2 - swapped operations
    const distractorB = `\\frac{${rateNum * time1}x}{${time2}}`;
    // C: time1/(rateNum × time2) - completely wrong
    const distractorC = `\\frac{${time1}x}{${rateNum * time2}}`;
    
    // Ensure distractors are unique
    const distractorTexts = [distractorA, distractorB, distractorC];
    const uniqueDistractors = distractorTexts.filter((d, i, arr) => 
      d !== correctExpression && arr.indexOf(d) === i
    );
    
    while (uniqueDistractors.length < 3) {
      const wrongNum = getRandomInt(2, 10);
      const wrongDen = getRandomInt(2, 10);
      const newDistractor = `\\frac{${wrongNum}x}{${wrongDen}}`;
      if (newDistractor !== correctExpression && !uniqueDistractors.includes(newDistractor)) {
        uniqueDistractors.push(newDistractor);
      }
    }
    
    // STEP 4: Create and shuffle options
    const optionsData = [
      { text: uniqueDistractors[0], isCorrect: false, reason: "results from inverting the rate relationship" },
      { text: uniqueDistractors[1], isCorrect: false, reason: "results from swapping the time values in the calculation" },
      { text: uniqueDistractors[2], isCorrect: false, reason: "results from conceptual errors in setting up the proportion" },
      { text: correctExpression, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. The rate is $\\frac{${rateNum}x}{${time1}y}$ ounces per minute. In ${time2}y minutes: $\\frac{${rateNum}x}{${time1}y} \\times ${time2}y = ${correctExpression}$ ounces. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `A landscaper uses a hose that puts $${rateNum}x$ ounces of water in a bucket in $${time1}y$ minutes. Which expression represents the number of ounces of water the hose puts in the bucket in $${time2}y$ minutes at this rate?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctExpression,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 7d093333
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [250 sq ft/hour, conversion 1m = 3.28ft]
 * - Difficulty factors: [Area unit conversion with squared units, time conversion, small result]
 * - Distractor patterns: [0.39: correct, others are various miscalculations]
 * - Constraints: [1 sq m = 10.7584 sq ft, 1 hour = 60 min, result is small ~0.39]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */