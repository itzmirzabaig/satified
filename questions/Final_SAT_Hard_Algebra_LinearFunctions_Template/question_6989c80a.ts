import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 6989c80a
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Functions
 * - Concept: Linear transformation / Rate of change.
 * - Function: F(x) = (9/5)(x - 273.15) + 32.
 * - Logic: The slope is 9/5. A change in x results in a change in F of (9/5) * delta_x.
 * - Fixes: Changed \\\\frac to \\frac to fix LaTeX rendering issues. 
 *          Simplified number generation for clarity.
 */

export const generator_6989c80a = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Kelvin Change
    // Range: 1.10 to 9.90 for a realistic specific increase
    const intPart = getRandomInt(1, 9);
    const decPart = getRandomInt(10, 90); // e.g., 50 -> .50
    const kelvinIncreaseNum = parseFloat(`${intPart}.${decPart}`);
    const kelvinIncreaseStr = kelvinIncreaseNum.toFixed(2);
    
    // 2. Calculate Fahrenheit Change
    // Delta F = (9/5) * Delta K
    // The constants (-273.15 and +32) do not affect the CHANGE (slope only).
    const fahrenheitIncreaseNum = (9/5) * kelvinIncreaseNum;
    const fahrenheitIncreaseStr = fahrenheitIncreaseNum.toFixed(2);
    
    // 3. Create Distractors
    // Distractor A: Adds 32 to the result (Confusing absolute temp conversion with change)
    // Error: Delta F = (9/5)*Delta K + 32
    const distA = (fahrenheitIncreaseNum + 32).toFixed(2);
    
    // Distractor B: No conversion (Delta F = Delta K)
    const distB = kelvinIncreaseStr;
    
    // Distractor C: Wrong conversion (Using reciprocal slope 5/9 or similar)
    const distC = ((5/9) * kelvinIncreaseNum).toFixed(2);

    const optionsData = [
      { text: `$${fahrenheitIncreaseStr}$`, isCorrect: true },
      { text: `$${distA}$`, isCorrect: false },
      { text: `$${distB}$`, isCorrect: false },
      { text: `$${distC}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    
    return {
      questionText: `The function $F(x) = \\frac{9}{5}(x - 273.15) + 32$ gives the temperature, in degrees Fahrenheit, that corresponds to a temperature of $x$ kelvins. If a temperature increased by ${kelvinIncreaseStr} kelvins, by how much did the temperature increase, in degrees Fahrenheit?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `
        Choice ${correctOption.letter} is correct.
        <br/><br/>
        The function $F(x)$ represents a linear relationship between Kelvin ($x$) and Fahrenheit ($F(x)$). We can expand the equation to see the slope clearly:
        $$ F(x) = \\frac{9}{5}x - \\frac{9}{5}(273.15) + 32 $$
        This is a linear equation of the form $y = mx + b$, where the slope $m = \\frac{9}{5}$.
        <br/><br/>
        The slope represents the rate of change. For every 1 unit increase in $x$ (Kelvins), the value of $F(x)$ (Fahrenheit) increases by $\\frac{9}{5}$.
        <br/><br/>
        We are given that the temperature increased by ${kelvinIncreaseStr} kelvins. To find the increase in Fahrenheit:
        $$ \\text{Change in F} = \\text{Slope} \\times (\\text{Change in K}) $$
        $$ \\text{Change in F} = \\frac{9}{5} \\times ${kelvinIncreaseStr} $$
        $$ \\text{Change in F} = ${fahrenheitIncreaseStr} $$
      `
    };
  }
};