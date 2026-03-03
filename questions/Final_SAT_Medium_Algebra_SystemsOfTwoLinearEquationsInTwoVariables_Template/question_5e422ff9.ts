import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 5e422ff9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1, 2, 3, 5, -3]
 * - Difficulty factors: [Substitution, solve for y]
 * - Distractor patterns: [-15, -9, 9, 15]
 * - Constraints: [Integer solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_5e422ff9 = {
  metadata: {
    // id: "5e422ff9",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const m = getRandomInt(2, 5);
    const b = -1 * getRandomInt(1, 5);
    const m2 = getRandomInt(3, 8);
    
    // y = mx + b, m2*y = m3*x
    // y = m2/m3 * x
    // mx + b = m2/m3 * x
    // b = (m2/m3 - m) * x
    
    const xValue = getRandomInt(5, 15);
    const m3Raw = m2 * xValue / (m * xValue + b);
    const yValue = m * xValue + b;
    
    // Helper to format number as fraction if it has long decimals
    const formatNumber = (num: number): string => {
      // Check if it's essentially an integer
      if (Number.isInteger(num)) {
        return num.toString();
      }
      
      // Check if it has a simple decimal (1-2 places)
      const rounded = Math.round(num * 100) / 100;
      if (Math.abs(num - rounded) < 0.0001 && rounded.toString().length <= 4) {
        return rounded.toString();
      }
      
      // Convert to fraction using the original calculation components
      // m3 = m2 * xValue / (m * xValue + b)
      // So numerator = m2 * xValue, denominator = m * xValue + b = yValue
      const numerator = m2 * xValue;
      const denominator = yValue;
      
      // Simplify fraction using GCD
      const gcd = (a: number, b: number): number => {
        let num1 = Math.abs(a);
        let num2 = Math.abs(b);
        while (num2 !== 0) {
          const temp = num2;
          num2 = num1 % num2;
          num1 = temp;
        }
        return num1;
      };
      
      const common = gcd(numerator, denominator);
      const simpNum = numerator / common;
      const simpDen = denominator / common;
      
      // Handle negative denominator
      if (simpDen < 0) {
        return `-\\frac{${-simpNum}}{${-simpDen}}`;
      }
      
      return `\\frac{${simpNum}}{${simpDen}}`;
    };
    
    const m3 = formatNumber(m3Raw);
    
    // STEP 2: Build question text
    const signStr = b >= 0 ? '+' : '';
    const absB = Math.abs(b);
    const questionText = `In the solution to the system of equations below, what is the value of $y$?\n\n$$\\begin{cases} y = ${m}x ${signStr}${absB} \\\\ ${m2}y = ${m3}x \\end{cases}$$`;
    
    // STEP 3: Create options
    const optionsData = [
      { text: (-yValue).toString(), isCorrect: false },
      { text: (-xValue).toString(), isCorrect: false },
      { text: xValue.toString(), isCorrect: false },
      { text: yValue.toString(), isCorrect: true }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // STEP 5: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: yValue.toString(),
      explanation: `To find the value of $y$, we need to solve the system of linear equations.\n\nGiven:\n1) $y = ${m}x ${signStr}${absB}$\n2) ${m2}y = ${m3}x$\n\nWe can use the substitution method. Since the first equation already expresses $y$ in terms of $x$ ($y = ${m}x ${signStr}${absB}$), we can substitute this expression for $y$ into the second equation.\n\nSubstitute $(${m}x ${signStr}${absB})$ for $y$ in the second equation:\n$${m2}(${m}x ${signStr}${absB}) = ${m3}x$\n\nDistribute the $${m2}$:\n$${m2 * m}x ${signStr}${m2 * absB} = ${m3}x$\n\nSubtract $${m3}x$ from both sides to isolate the $x$ term:\n$${m2 * m}x - ${m3}x ${signStr}${m2 * absB} = 0$\n$${m2 * m}x - ${m3}x ${signStr}${m2 * absB} = 0$\n\n${b >= 0 ? 'Subtract' : 'Add'} $${Math.abs(m2 * absB)}$ from both sides:\n$${m2 * m}x - ${m3}x = ${-m2 * b}$\n\nCombine like terms and solve for $x$:\n$x = ${xValue}$\n\nNow that we have the value of $x$, we can find $y$ by substituting $x = ${xValue}$ into either of the original equations. Let's use the first one, as it's simpler:\n$y = ${m}(${xValue}) ${signStr}${absB}$\n$y = ${m * xValue} ${signStr}${absB}$\n$y = ${yValue}$\n\nLet's double-check with the second equation:\n$${m2}y = ${m3}x$\n$${m2}(${yValue}) = ${m3}(${xValue})$\n$${m2 * yValue} = ${m3Raw * xValue === Math.round(m3Raw * xValue) ? m3Raw * xValue : formatNumber(m3Raw * xValue)}$\nThe solution works for both equations.\n\nTherefore, the value of $y$ is $${yValue}$.`
    };
  }
};