import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 042aa429
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x)=x+7, g(x)=7x, evaluate 4f(2)-g(2) = 22]
 * - Difficulty factors: [Function evaluation, order of operations]
 * - Distractor patterns: [A = sign error, B = operation error, D = addition instead of subtraction]
 * - Constraints: [None - straightforward calculation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_042aa429 = {
  metadata: {
    // id: "042aa429",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // f(x) = x + b
    const b = getRandomInt(5, 10);
    // g(x) = m*x
    const m = getRandomInt(4, 8);
    // Evaluation point
    const x = getRandomInt(2, 4);
    // Coefficient for f
    const coef = getRandomInt(3, 5);
    
    // STEP 2: Calculate
    const f_x = x + b;
    const g_x = m * x;
    const result = coef * f_x - g_x;
    
    // STEP 3: Create options
    const optionsData = [
      { text: (result - 27).toString(), isCorrect: false, reason: "results from sign error or arithmetic mistake" },
      { text: (result - 21).toString(), isCorrect: false, reason: "results from operation error" },
      { text: result.toString(), isCorrect: true },
      { text: (coef * f_x + g_x).toString(), isCorrect: false, reason: "adds instead of subtracts" }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `If $f(x)=x+${b}$ and $g(x)=${m}x$, what is the value of $${coef}f(${x})-g(${x})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctLetter} is correct. $f(${x}) = ${x} + ${b} = ${f_x}$. $g(${x}) = ${m}(${x}) = ${g_x}$. Therefore, $${coef}f(${x}) - g(${x}) = ${coef}(${f_x}) - ${g_x} = ${coef * f_x} - ${g_x} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: b2fe7ab6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [g(1)=54, g(2)=51, g(3)=48, g(4)=45, slope=-3, intercept=57]
 * - Difficulty factors: [Finding y-intercept from table with negative slope]
 * - Distractor patterns: [A = slope, B = wrong calculation, C = first value]
 * - Constraints: [Table must show consistent linear decrease]
 * - Question type: [Table in Question→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */