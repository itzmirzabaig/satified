import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 1a722d7d
 * 
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Functions
 * - Logic: Given p(c)=target, solve for parameter c, then evaluate p(x).
 * - Fix: Restricts generation to divisor pairs of 80. This prevents 'c' from being a repeating decimal,
 *        which previously caused 'evalPt' (e.g., "p(10.333...)") to look broken.
 */

export const generator_1a722d7d = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Setup Parameters
    // Formula: p(c) = (0 + 160) / 2c = 80/c = target
    // We want 'c' and 'target' to both be clean integers.
    // We choose 'c' from divisors of 80.
    const validC = [4, 5, 8, 10, 16, 20];
    const c = getRandomElement(validC);
    
    // Calculate the target value presented in the problem
    // e.g., if c=8, target=10.
    const target = 80 / c;

    // 2. Select Evaluation Point
    // We want the input x to be an integer. 
    // Since c is an integer, we just add a small integer offset.
    const diff = getRandomElement([-4, -2, 2, 4, 5, 6]);
    const evalPt = c + diff;

    // 3. Calculate Correct Answer
    // p(evalPt) = ((evalPt - c)^2 + 160) / (2c)
    // numerator = diff^2 + 160
    // denominator = 2c
    const numerator = Math.pow(diff, 2) + 160;
    const denominator = 2 * c;
    const result = numerator / denominator;

    // 4. Generate Options
    // Result is likely a simple decimal (e.g. 10.5) or integer.
    const correctText = Number.isInteger(result) ? result.toString() : result.toFixed(2);
    
    // Distractors
    // A: The target value itself (student calculates c but forgets to evaluate p(x))
    const optTarget = target.toFixed(2); 
    
    // B: Arithmetic error (missing the +160 maybe? or just random offset)
    const optError1 = (result - 1.5).toFixed(2);
    
    // C: Another offset
    const optError2 = (result + 2.5).toFixed(2);

    const optionsData = [
      { text: optTarget, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: optError1, isCorrect: false },
      { text: optError2, isCorrect: false }
    ];

    // Filter out duplicates (unlikely, but good safety)
    const uniqueOptions = optionsData.reduce((acc, current) => {
        if (!acc.find(item => item.text === current.text)) {
            acc.push(current);
        }
        return acc;
    }, [] as typeof optionsData);

    // If we lost options due to duplication, fill with random offsets
    while (uniqueOptions.length < 4) {
        uniqueOptions.push({
            text: (result + uniqueOptions.length + 1).toFixed(2),
            isCorrect: false
        });
    }

    const shuffledOptions = shuffle(uniqueOptions).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    // 5. Build Explanation
    return {
      questionText: `The function $p$ is defined by $p(x)=\\frac{(x-c)^2+160}{2c}$. If $p(c)=${target}$, what is the value of $p(${evalPt})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `
        Choice ${correctLetter} is correct.
        <br />
        1. <strong>Find $c$:</strong>
        Substitute $x=c$ into the function definition:
        $$p(c) = \\frac{(c-c)^2+160}{2c} = \\frac{0+160}{2c} = \\frac{80}{c}$$
        We are given that $p(c)=${target}$, so:
        $$\\frac{80}{c} = ${target} \\implies c = ${c}$$
        <br />
        2. <strong>Evaluate $p(${evalPt})$:</strong>
        Now substitute $c=${c}$ and $x=${evalPt}$ into the function:
        $$p(${evalPt}) = \\frac{(${evalPt}-${c})^2+160}{2(${c})}$$
        $$p(${evalPt}) = \\frac{(${diff})^2+160}{${denominator}}$$
        $$p(${evalPt}) = \\frac{${diff*diff}+160}{${denominator}} = \\frac{${numerator}}{${denominator}} = ${correctText}$$
      `
    };
  }
};