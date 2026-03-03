import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 5240
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quadratic divided by linear, polynomial long division]
 * - Difficulty factors: [Polynomial long division, remainder handling, formatting result]
 * - Distractor patterns: [Wrong quotient, wrong remainder, sign errors]
 * - Constraints: [Must perform division correctly]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_5240 = {
  metadata: {
    // id: "5240",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate division problem
    const d = getRandomInt(2, 5);
    const e = getRandomInt(1, 4);
    
    // (x - d)(x + e) = x² + (e-d)x - de
    // Add remainder r to get final numerator
    const r = -getRandomInt(1, 4);
    
    const b = e - d;
    const c = -d * e + r;
    
    // STEP 2: Format options
    const correctAnswer = `$x+${e}${r >= 0 ? '+' : '-'}\\frac{${Math.abs(r)}}{x-${d}}$`;
    
    const optionsData = [
      { text: `$x-${e+2}${r-3 >= 0 ? '+' : '-'}\\frac{${Math.abs(r-3)}}{x-${d}}$`, isCorrect: false, reason: "suggests a wrong quotient and wrong remainder" },
      { text: `$x-${e+2}${r+2 >= 0 ? '+' : '-'}\\frac{${Math.abs(r+2)}}{x-${d}}$`, isCorrect: false, reason: "suggests a wrong quotient and wrong remainder" },
      { text: `$x+${e+1}${r-6 >= 0 ? '+' : '-'}\\frac{${Math.abs(r-6)}}{x-${d}}$`, isCorrect: false, reason: "suggests the correct quotient plus one but wrong remainder" },
      { text: correctAnswer, isCorrect: true }
    ];
    
    // STEP 3: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Question text
    const signB = b >= 0 ? '+' : '-';
    const absB = Math.abs(b);
    const signC = c >= 0 ? '+' : '-';
    const absC = Math.abs(c);
    
    const questionText = `Which of the following expressions is equivalent to $\\frac{x^{2}${signB}${absB}x${signC}${absC}}{x-${d}}$?`;
    
    // STEP 5: Explanation
    const explanation = `Choice ${correctLetter} is correct. Use polynomial long division:

Divide $x^{2}$ by $x$ to get $x$. Multiply $(x-${d})$ by $x$: $x^{2} - ${d}x$.
Subtract from numerator: $(x^{2}${signB}${absB}x${signC}${absC}) - (x^{2} - ${d}x) = ${b + d}x${signC}${absC}$.

Divide ${b + d}x by $x$ to get ${e}. Multiply $(x-${d})$ by ${e}: ${e}x - ${d*e}$.
Subtract: (${b + d}x${signC}${absC}) - (${e}x - ${d*e}) = ${b + d - e}x${signC}${absC} + ${d*e} = ${r}$.

So the result is $x+${e}+\\frac{${r}}{x-${d}} = x+${e}${r >= 0 ? '+' : '-'}\\frac{${Math.abs(r)}}{x-${d}}$.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 911c415b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [large constants, distribution and combining]
 * - Difficulty factors: [Careful distribution, combining like terms, computing a+b]
 * - Distractor patterns: [Distribution errors, sign errors, arithmetic errors]
 * - Constraints: [Result in form ay² + b, find a+b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */