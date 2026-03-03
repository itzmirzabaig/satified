import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 34847f8a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerators: 2,3, denominators: linear factors, result: rx+t]
 * - Difficulty factors: [Rational expression addition, common denominators, distributing]
 * - Distractor patterns: [Wrong sign on r or t, not distributing 2 and 3, calculation errors]
 * - Constraints: [x > 2 to avoid division by zero, r and t must be positive]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_34847f8a = {
  metadata: {
    // id: "34847f8a",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate the equation parameters
    // Pattern: num1/(x-a) + num2/(x+b) = (rx+t)/((x-a)(x+b))
    
    const a = getRandomInt(2, 5);
    const b = getRandomInt(3, 7);
    const num1 = getRandomInt(2, 4);
    const num2 = getRandomInt(2, 5);
    
    // Calculate r and t
    // num1(x+b) + num2(x-a) = num1*x + num1*b + num2*x - num2*a = (num1+num2)x + (num1*b - num2*a)
    const r = num1 + num2;
    const t = num1 * b - num2 * a;
    
    // STEP 2: Calculate correct answer
    const rt = r * t;
    const correctText = rt.toString();
    
    // STEP 3: Create distractors based on SAT patterns
    const distractors = [
      { text: (num1 * b + num2 * a).toString(), isCorrect: false, reason: "results from adding instead of subtracting when finding t" },
      { text: ((-r) * t).toString(), isCorrect: false, reason: "results from using negative r" },
      { text: (r * (-t)).toString(), isCorrect: false, reason: "results from using negative t" },
      { text: (r * t + 10).toString(), isCorrect: false, reason: "results from a calculation error" }
    ];
    
    // Select 3 distractors and add correct answer
    const optionsData = [
      { text: correctText, isCorrect: true },
      ...distractors.slice(0, 3)
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 5: Build question text
    const questionText = `The equation $ \\frac{${num1}}{x-${a}}+\\frac{${num2}}{x+${b}}=\\frac{rx+t}{(x-${a})(x+${b})} $ is true for all $x>${a}$, where $r$ and $t$ are positive constants. What is the value of $rt$?`;
    
    // STEP 6: Build explanation
    const explanation = `Choice ${correctLetter} is correct. To combine the rational expressions on the left side, rewrite each with the common denominator $(x-${a})(x+${b})$.

Multiplying the first expression by $ \\frac{x+${b}}{x+${b}} $ gives $ \\frac{${num1}(x+${b})}{(x-${a})(x+${b})} $.

Multiplying the second expression by $ \\frac{x-${a}}{x-${a}} $ gives $ \\frac{${num2}(x-${a})}{(x-${a})(x+${b})} $.

Adding these: $ \\frac{${num1}(x+${b})+${num2}(x-${a})}{(x-${a})(x+${b})} = \\frac{${num1}x+${num1*b}+${num2}x-${num2*a}}{(x-${a})(x+${b})} = \\frac{${r}x+${t}}{(x-${a})(x+${b})} $.

Therefore, $r = ${r}$ and $t = ${t}$, so $rt = ${r} \\times ${t} = ${rt}$.

Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. 
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. 
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 137cc6fd
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [roots: 5th and 6th, exponents: varied]
 * - Difficulty factors: [Multiple radical operations, rational exponents, solving for x in exponent]
 * - Distractor patterns: [Wrong common denominators, arithmetic errors in fraction simplification]
 * - Constraints: [Must equate exponents correctly, n > 1]
 * - Question type: [Fill-in-the-blank - fraction]
 * - Figure generation: [None]
 */