import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 0cadb20e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x+15)/5, f(a) = 10, a = 35]
 * - Difficulty factors: [Solving for input given output]
 * - Distractor patterns: [A = result of f(5), B = just the output value, D = wrong calculation]
 * - Constraints: [None - straightforward solving]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_0cadb20e = {
  metadata: {
    // id: "0cadb20e",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Denominator: 3-7
    const d = getRandomInt(3, 7);
    // Numerator constant: 10-20
    const c = getRandomInt(10, 20);
    // Target f(a): 8-15
    const target = getRandomInt(8, 15);
    // Calculate a: (a + c)/d = target → a = target*d - c
    const a = target * d - c;
    
    // STEP 2: Create options
    const optionsData = [
      { text: d.toString(), isCorrect: false, reason: "is just the denominator" },
      { text: target.toString(), isCorrect: false, reason: "is the output value f(a), not the input a" },
      { text: a.toString(), isCorrect: true },
      { text: (a + 30).toString(), isCorrect: false, reason: "results from calculation error" }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 4: Return question data
    return {
      questionText: `The function $f$ is defined by $f(x) = \\frac{x+${c}}{${d}}$, and $f(a) = ${target}$, where $a$ is a constant. What is the value of $a$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: a.toString(),
      explanation: `Choice ${correctLetter} is correct. Since $f(a) = ${target}$, we have $\\frac{a+${c}}{${d}} = ${target}$. Multiplying both sides by ${d}: $a + ${c} = ${target * d}$. Subtracting ${c}: $a = ${target * d} - ${c} = ${a}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

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