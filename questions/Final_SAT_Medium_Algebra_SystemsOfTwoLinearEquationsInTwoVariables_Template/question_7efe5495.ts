import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 7efe5495
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1-3 (simple), results: 12 (double-digit)]
 * - Difficulty factors: [Substitution, asks for expression value not variable]
 * - Distractor patterns: [24, 15, 12, 5 - multiples and nearby values]
 * - Constraints: [Clean arithmetic, integer solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_7efe5495 = {
  metadata: {
    // id: "7efe5495",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const coeff = getRandomInt(2, 5); // Coefficient in y = coeff*x
    const xValue = getRandomInt(2, 6);
    const xCoeff = 2 + coeff;
    const adjustedSum = xCoeff * xValue;
    
    // STEP 2: Build question text
    const questionText = `The solution to the given system of equations is $(x, y)$. What is the value of $${xCoeff}x$?\n\n$$\\begin{cases} y = ${coeff}x \\\\ 2x + y = ${adjustedSum} \\end{cases}$$`;
    
    // STEP 3: Calculate answer
    const answerValue = xCoeff * xValue;
    
    // STEP 4: Generate distractors
    const distractor1 = answerValue * 2; // 24 - double
    const distractor2 = xValue * xCoeff + 3; // 15 - close
    const distractor3 = xValue; // 5 - just x
    
    const correctText = answerValue.toString();
    const optionsData = [
      { text: distractor1.toString(), isCorrect: false },
      { text: distractor2.toString(), isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractor3.toString(), isCorrect: false }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // STEP 6: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `To find the value of $${xCoeff}x$, we first need to solve the system of equations for $x$. The system is given by: 1) $y = ${coeff}x$ 2) $2x + y = ${adjustedSum}$. Since the first equation already gives $y$ in terms of $x$, we can substitute $${coeff}x$ for $y$ in the second equation: $2x + (${coeff}x) = ${adjustedSum}$. Combine like terms: $${xCoeff}x = ${adjustedSum}$. The question asks for the value of $${xCoeff}x$. We have found directly that $${xCoeff}x = ${answerValue}$. Therefore, the correct answer is ${correctLetter}. Let's check why other options are incorrect: To find $x$ individually: $${xCoeff}x = ${adjustedSum} \\implies x = ${xValue}$. Then find $y$: $y = ${coeff}(${xValue}) = ${coeff * xValue}$. Check with the second equation: $2(${xValue}) + ${coeff * xValue} = ${2 * xValue} + ${coeff * xValue} = ${adjustedSum}$. The solution is correct. A. $${distractor1}$: This is $2 \\times ${adjustedSum}$ or $${xCoeff * 2}x$, incorrect. B. $${distractor2}$: This would be the value if $x=${xValue + 1}$, which is not the solution. D. $${distractor3}$: This is just the value of $x$, not $${xCoeff}x$.`
    };
  }
};

/**
 * Question ID: 71189542
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [people: 202 (triple-digit), tents: 60 (double-digit), capacities: 2 and 4]
 * - Difficulty factors: [Word problem, system with two variables, substitution]
 * - Distractor patterns: [30, 20, 19, 18 - around the solution]
 * - Constraints: [Integer solution, valid tent counts]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */