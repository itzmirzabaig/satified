import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 812
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1-3 (simple), results: 12 (double-digit)]
 * - Difficulty factors: [Substitution, asks for expression value not variable]
 * - Distractor patterns: [24, 15, 12, 5 - multiples and nearby values]
 * - Constraints: [Clean arithmetic, integer solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_812 = {
  metadata: {
    id: "812",
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
    // Each option carries a `kind` so its per-option explanation can be looked
    // up by its ACTUAL displayed letter after shuffling.
    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, kind: 'double' },
      { text: distractor2.toString(), isCorrect: false, kind: 'plus3' },
      { text: correctText, isCorrect: true, kind: 'correct' },
      { text: distractor3.toString(), isCorrect: false, kind: 'xOnly' }
    ];

    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;

    // STEP 6: Build the per-distractor analysis in DISPLAYED order, referencing
    // each option by its actual shuffled letter.
    const distractorByKind: Record<string, string> = {
      double: `$${distractor1}$ is twice the required value ($2 \\times ${adjustedSum}$), which corresponds to $${xCoeff * 2}x$, not $${xCoeff}x$.`,
      plus3: `$${distractor2}$ is $3$ more than the correct value of $${xCoeff}x$, so it does not satisfy the system.`,
      xOnly: `$${distractor3}$ is just the value of $x$, not $${xCoeff}x$.`
    };
    const distractorAnalysis = shuffledOptions
      .filter(o => !o.isCorrect)
      .map(o => `${o.letter}. ${distractorByKind[o.kind]}`)
      .join(' ');

    // STEP 7: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `To find the value of $${xCoeff}x$, first solve the system for $x$. The system is: 1) $y = ${coeff}x$ 2) $2x + y = ${adjustedSum}$. Since the first equation gives $y$ in terms of $x$, substitute $${coeff}x$ for $y$ in the second equation: $2x + (${coeff}x) = ${adjustedSum}$. Combine like terms: $${xCoeff}x = ${adjustedSum}$. The question asks for the value of $${xCoeff}x$, and we have found directly that $${xCoeff}x = ${answerValue}$. Therefore, the correct answer is ${correctLetter}. As a check, $${xCoeff}x = ${adjustedSum} \\implies x = ${xValue}$, then $y = ${coeff}(${xValue}) = ${coeff * xValue}$, and $2(${xValue}) + ${coeff * xValue} = ${2 * xValue} + ${coeff * xValue} = ${adjustedSum}$, which confirms the solution. The other options are incorrect: ${distractorAnalysis}`
    };
  }
};
