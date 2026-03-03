import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9f6f96ff
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [length: 106, parts: x, y (double-digit)]
 * - Difficulty factors: [Word problem, system setup, substitution]
 * - Distractor patterns: [25, 28, 56, 86]
 * - Constraints: [Integer solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_9f6f96ff = {
  metadata: {
    // id: "9f6f96ff",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const totalLength = getRandomInt(80, 150);
    const multiplier = getRandomInt(3, 6);
    const offset = getRandomInt(2, 10);
    
    // y + (multiplier*y + offset) = total
    // (multiplier+1)*y = total - offset
    const yValue = (totalLength - offset) / (multiplier + 1);
    const xValue = multiplier * yValue + offset;
    
    // STEP 2: Build question text
    const questionText = `A wire with a length of $${totalLength}$ inches is cut into two parts. One part has a length of $x$ inches, and the other part has a length of $y$ inches. The value of $x$ is $${offset}$ more than ${multiplier} times the value of $y$. What is the value of $x$?`;
    
    // STEP 3: Create options
    const distractor1 = Math.floor(yValue);
    const distractor2 = Math.floor(xValue / 3);
    const distractor3 = Math.floor(xValue * 0.65);
    
    const optionsData = [
      { text: distractor1.toString(), isCorrect: false },
      { text: distractor2.toString(), isCorrect: false },
      { text: distractor3.toString(), isCorrect: false },
      { text: xValue.toString(), isCorrect: true }
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
      correctAnswer: xValue.toString(),
      explanation: `The problem gives us two pieces of information that can be translated into a system of two linear equations.\n\n1.  **"A wire with a length of $${totalLength}$ inches is cut into two parts... one part... $x$... other part... $y$."**\n    This means the sum of the lengths of the two parts is equal to the total length.\n    Equation 1: $x + y = ${totalLength}$\n\n2.  **"The value of $x$ is $${offset}$ more than ${multiplier} times the value of $y$."**\n    This describes the relationship between $x$ and $y$. "${multiplier} times the value of $y$" is ${multiplier}y. "$${offset}$ more than" that is ${multiplier}y + ${offset}.\n    Equation 2: $x = ${multiplier}y + ${offset}$\n\nNow, we need to solve for $x$. We can use the substitution method since Equation 2 already expresses $x$ in terms of $y$. However, since the question asks for the value of $x$, it might be easier to solve for $y$ first and then find $x$, or substitute $y$ in terms of $x$.\n\nLet's substitute the expression for $x$ from Equation 2 into Equation 1:\n$(${multiplier}y + ${offset}) + y = ${totalLength}$\n\nCombine like terms:\n$${multiplier + 1}y + ${offset} = ${totalLength}$\n\nSubtract $${offset}$ from both sides:\n$${multiplier + 1}y = ${totalLength - offset}$\n\nDivide by $${multiplier + 1}$:\n$y = ${yValue}$\n\nSo the length of the shorter part, $y$, is $${yValue}$ inches. Now we need to find the value of $x$. We can use Equation 2:\n$x = ${multiplier}y + ${offset}$\n$x = ${multiplier}(${yValue}) + ${offset}$\n$x = ${multiplier * yValue} + ${offset}$\n$x = ${xValue}$\n\nLet's double-check with Equation 1:\n$x + y = ${xValue} + ${yValue} = ${totalLength}$. This is correct.\n\nThe value of $x$ is $${xValue}$. This corresponds to option ${correctLetter}.\n\nWhy other options are incorrect:\nA. $${distractor1}$: This value is too small. If $x=${distractor1}$, then $y = ${totalLength} - ${distractor1} = ${totalLength - distractor1}$. But ${multiplier}(${totalLength - distractor1}) + ${offset} = ${multiplier * (totalLength - distractor1) + offset}$, not $${distractor1}$.\nB. $${distractor2}$: If $x=${distractor2}$, then $y = ${totalLength} - ${distractor2} = ${totalLength - distractor2}$. But ${multiplier}(${totalLength - distractor2}) + ${offset} = ${multiplier * (totalLength - distractor2) + offset}$, which is much larger than $${distractor2}$.\nC. $${distractor3}$: If $x=${distractor3}$, then $y = ${totalLength} - ${distractor3} = ${totalLength - distractor3}$. But ${multiplier}(${totalLength - distractor3}) + ${offset} = ${multiplier * (totalLength - distractor3) + offset}$, not $${distractor3}$.`
    };
  }
};

/**
 * Question ID: 6e50ce28
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [operations with x+7 and 2y]
 * - Difficulty factors: [Translating words to equations]
 * - Distractor patterns: [Various equation orderings]
 * - Constraints: [Correct phrase translation]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */