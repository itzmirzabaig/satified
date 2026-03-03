import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 2937ef4f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [24,000 (5-digit), 19,350 (5-digit), 12,840 (5-digit), 5 (single-digit)]
 * - Difficulty factors: [Rate calculation, total vs additional time distinction]
 * - Distractor patterns: [7 = additional hours (not total), 3, 8 = calculation errors]
 * - Constraints: [Rate must be constant, positive values only]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_2937ef4f = {
  metadata: {
    // id: "2937ef4f",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving number magnitude
    // Initial amount: 20,000-30,000 range (5-digit)
    let valid = false;
    let initialAmount: number, hoursPassed: number, rate: number, remainingAfter: number, targetRemaining: number, totalHours: number, additionalHours: number;
    
    while (!valid) {
      initialAmount = getRandomInt(20, 30) * 1000;
      hoursPassed = getRandomInt(3, 7);
      rate = getRandomInt(5, 15) * 100;
      remainingAfter = initialAmount - (rate * hoursPassed);
      
      // Target remaining: somewhere between 0 and remainingAfter
      // Ensure it's a clean number that gives integer total time
      const minTargetHours = hoursPassed + 2;
      const maxTargetHours = hoursPassed + 10;
      const targetHours = getRandomInt(minTargetHours, maxTargetHours);
      targetRemaining = initialAmount - (rate * targetHours);
      
      // Verify target is positive and less than remainingAfter
      if (targetRemaining > 0 && targetRemaining < remainingAfter) {
        // STEP 2: Calculate correct answer (total hours)
        const totalRemoved = initialAmount - targetRemaining;
        totalHours = totalRemoved / rate;
        
        // Ensure totalHours is integer for clean answer
        if (Number.isInteger(totalHours)) {
          additionalHours = totalHours - hoursPassed;
          valid = true;
        }
      }
    }
    
    // STEP 3: Calculate distractors
    // Distractor 1: Additional hours only (total - hoursPassed)
    const distractor2 = totalHours + getRandomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1);
    const distractor3 = Math.floor(totalHours / 2);
    
    // STEP 4: Create options
    const correctText = totalHours.toString();
    const optionsData = [
      { text: additionalHours.toString(), isCorrect: false, reason: "this is the additional hours needed after the first " + hoursPassed + " hours, not the total hours" },
      { text: distractor2.toString(), isCorrect: false, reason: "this results from a miscalculation of the rate or target amount" },
      { text: distractor3.toString(), isCorrect: false, reason: "this results from an incorrect calculation, possibly halving the correct time" },
      { text: correctText, isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 6: Build explanation
    const explanation = `To solve this problem, we need to find the rate at which the auger removes corn and then use that rate to determine the time needed to reach the target amount.

1. **Calculate the amount of corn removed in the first ${hoursPassed} hours:**
   Initial amount = $${initialAmount.toLocaleString()}$ bushels
   Amount remaining after ${hoursPassed} hours = $${remainingAfter.toLocaleString()}$ bushels
   Amount removed = Initial amount - Remaining amount
   Amount removed = $${initialAmount.toLocaleString()} - ${remainingAfter.toLocaleString()} = ${(initialAmount - remainingAfter).toLocaleString()}$ bushels

2. **Calculate the rate of removal:**
   Rate = Amount removed / Time
   Rate = $${(initialAmount - remainingAfter).toLocaleString()} \\text{ bushels} / ${hoursPassed} \\text{ hours} = ${rate}$ bushels per hour

3. **Determine the total amount that needs to be removed to reach $${targetRemaining.toLocaleString()}$ bushels:**
   Target remaining amount = $${targetRemaining.toLocaleString()}$ bushels
   Total amount removed = Initial amount - Target remaining amount
   Total amount removed = $${initialAmount.toLocaleString()} - ${targetRemaining.toLocaleString()} = ${(initialAmount - targetRemaining).toLocaleString()}$ bushels

4. **Calculate the total time required:**
   Time = Total amount removed / Rate
   Time = $${(initialAmount - targetRemaining).toLocaleString()} / ${rate}$
   
   Time = ${totalHours}$ hours

**Analysis of Options:**
Choice ${correctLetter} ($${correctText}$) is correct. The total time to reduce the corn from $${initialAmount.toLocaleString()}$ to $${targetRemaining.toLocaleString()}$ bushels at a rate of ${rate} bushels/hour is ${totalHours} hours.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.

Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.

Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `Hector used a tool called an auger to remove corn from a storage bin at a constant rate. The bin contained $${initialAmount.toLocaleString()}$ bushels of corn when Hector began to use the auger. After $${hoursPassed}$ hours of using the auger, $${remainingAfter.toLocaleString()}$ bushels of corn remained in the bin. If the auger continues to remove corn at this rate, what is the total number of hours Hector will have been using the auger when $${targetRemaining.toLocaleString()}$ bushels of corn remain in the bin?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: f14484a5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [10, 9, 7 (single-digit sizes), 4 (multiplier), 10 (constant), 100 (total)]
 * - Difficulty factors: [Setting up equation from word problem, distinguishing count vs size]
 * - Distractor patterns: [A: multiplies by sizes (perimeter confusion), B: assumes n of each type, C: forgets the n for 9-inch pans]
 * - Constraints: [Must sum to 100 total pans]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/linear-equations-in-one-variable/f14484a5.ts