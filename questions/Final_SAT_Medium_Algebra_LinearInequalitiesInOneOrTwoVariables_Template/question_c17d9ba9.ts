import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c17d9ba9
 * 
 * ANALYSIS:
 * - Skill: Linear Inequalities in One or Two Variables
 * - Format: Word Problem -> Max Value Calculation
 * - Logic: "x is at most b less than a times y" -> x <= ay - b
 * - Constraints: All inputs and outputs are integers to avoid floating point issues.
 */

export const generator_c17d9ba9 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random integer values
    // Multiplier (a): range 2-9
    const a = getRandomInt(2, 9);
    
    // Subtraction constant (b): range 5-30
    const b = getRandomInt(5, 30);
    
    // Variable value (y): range 2-12
    const yVal = getRandomInt(2, 12);
    
    // STEP 2: Calculate correct maximum value
    // Inequality: x <= ay - b
    // Max x = a * yVal - b
    const maxVal = (a * yVal) - b;
    
    // STEP 3: Create logical distractors
    // Distractor 1: Added instead of subtracted (ay + b)
    const distractorAdd = (a * yVal) + b;
    
    // Distractor 2: Reversed subtraction (b - ay)
    const distractorRev = b - (a * yVal);
    
    // Distractor 3: Forgot the constant term (ay)
    const distractorMultOnly = (a * yVal);
    
    // STEP 4: Build Options
    // Use a Set to ensure uniqueness in case distractors overlap (e.g. if b=0)
    const optionsSet = new Set<number>();
    optionsSet.add(maxVal);
    optionsSet.add(distractorAdd);
    optionsSet.add(distractorRev);
    optionsSet.add(distractorMultOnly);
    
    // If we have fewer than 4 unique options, add random nearby integers
    while (optionsSet.size < 4) {
      const offset = getRandomInt(1, 10) * (Math.random() < 0.5 ? -1 : 1);
      const filler = maxVal + offset;
      if (filler !== maxVal) optionsSet.add(filler);
    }
    
    // Convert to option objects
    const optionsList = Array.from(optionsSet).map(val => ({
      text: val.toString(), // Integer, so no fraction formatting needed
      isCorrect: val === maxVal
    }));
    
    // Shuffle and assign letters A-D
    const shuffledOptions = shuffle(optionsList).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    
    // STEP 5: Construct Explanation
    const explanation = `
      To find the maximum possible value of $x$, we first translate the statement into an inequality.
      
      1. The phrase "at most" translates to the symbol $\\le$.
      2. The phrase "$${b}$ less than $${a}$ times the value of $y$" translates to the expression $${a}y - ${b}$.
      
      Combining these, the inequality is:
      $$x \\le ${a}y - ${b}$$
      
      We are given that $y = ${yVal}$. Substitute this value into the inequality:
      $$x \\le ${a}(${yVal}) - ${b}$$
      $$x \\le ${a * yVal} - ${b}$$
      $$x \\le ${maxVal}$$
      
      Since $x$ must be less than or equal to $${maxVal}$, the maximum possible value of $x$ is $${maxVal}$.
    `.trim();

    // STEP 6: Return Question Data
    return {
      questionText: `The value of $x$ is at most $${b}$ less than $${a}$ times the value of $y$. If $y = ${yVal}$, what is the maximum possible value of $x$?`,
      figureCode: null, // No figure needed for this word problem
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};