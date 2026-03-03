import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 445dd032
 * 
 * ANALYSIS:
 * - Skill: Ratios, Rates, and Proportional Relationships (Interpreting Expressions)
 * - Logic: If Earnings(h) = r * h, then Earnings(k * h) = r * (k * h) = k * (r * h).
 * - Fixes: 
 *   1. Wrapped all math expressions in '$' for proper rendering.
 *   2. Used clean money values (e.g., 12.50 instead of 12.97) for better readability.
 *   3. Escaped currency symbols (\\$) in text.
 */

export const generator_445dd032 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate clean random values
    // Hourly rate: $8.00 - $25.00, in increments of 0.25
    const rateDollars = getRandomInt(8, 25);
    const rateQuarter = getRandomInt(0, 3) * 25; // 0, 25, 50, 75
    const rate = parseFloat(`${rateDollars}.${rateQuarter.toString().padStart(2, '0')}`);
    const rateStr = rate.toFixed(2);
    
    // Multiplier for the variable (e.g., works 3z hours)
    const multiplier = getRandomInt(2, 5); 
    
    // STEP 2: Define Expressions
    // Base earnings for z hours: rate * z
    const baseExpression = `${rateStr}z`;
    
    // Target earnings for (multiplier * z) hours: multiplier * (rate * z)
    // We format it as k(rz) to emphasize the scaling property
    const correctExpression = `${multiplier}(${baseExpression})`;
    
    // STEP 3: Create Distractors
    // Distractor 1: Additive Mistake (Input) -> rate * (z + k)
    // Interpretation: "Working k more hours than z"
    const distractorInputAdd = `${rateStr}(z + ${multiplier})`;
    
    // Distractor 2: Additive Mistake (Output) -> (rate * z) + k
    // Interpretation: "Earning k dollars more than usual"
    const distractorOutputAdd = `${baseExpression} + ${multiplier}`;
    
    // Distractor 3: Additive Terms Mistake -> rate * z + k * z
    // Interpretation: "Summing terms improperly"
    const distractorCombine = `${multiplier}z + ${baseExpression}`;
    
    const optionsData = [
      { text: `$${correctExpression}$`, isCorrect: true },
      { text: `$${distractorOutputAdd}$`, isCorrect: false, reason: "adds the multiplier as a flat bonus rather than multiplying the hours" },
      { text: `$${distractorCombine}$`, isCorrect: false, reason: "incorrectly adds separate terms representing hours and dollars" },
      { text: `$${distractorInputAdd}$`, isCorrect: false, reason: "represents working $z + ${multiplier}$ hours instead of ${multiplier} times $z$ hours" }
    ];
    
    // STEP 4: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 5: Return Data
    return {
      questionText: `Tanya earns \\$${rateStr} per hour at her part-time job. When she works $z$ hours, she earns \\$${rateStr}z. Which of the following expressions gives the amount, in dollars, Tanya will earn if she works $${multiplier}z$ hours?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
      To find the amount Tanya earns, we multiply her hourly rate by the number of hours she works.
      
      1.  **Rate**: \\$${rateStr} per hour.
      2.  **Time**: $${multiplier}z$ hours.
      
      The calculation for earnings is:
      $$\\text{Earnings} = \\text{Rate} \\times \\text{Time}$$
      $$\\text{Earnings} = ${rateStr} \\times ${multiplier}z$$
      
      This can be rewritten by factoring out the ${multiplier}:
      $$\\text{Earnings} = ${multiplier}(${rateStr}z)$$
      
      This expression correctly represents ${multiplier} times the amount she earns in $z$ hours.
      
      Choice ${incorrectOptions[0].letter} is incorrect because it ${incorrectOptions[0].reason}.
      Choice ${incorrectOptions[1].letter} is incorrect because it ${incorrectOptions[1].reason}.
      Choice ${incorrectOptions[2].letter} is incorrect because it ${incorrectOptions[2].reason}.`
    };
  }
};