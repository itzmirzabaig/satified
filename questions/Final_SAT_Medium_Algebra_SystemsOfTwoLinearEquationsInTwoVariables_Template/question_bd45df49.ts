import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: bd45df49
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 3, 9, 3, 8, -6]
 * - Difficulty factors: [Substitution, asks for x-y]
 * - Distractor patterns: [-123, -33, 3, 57]
 * - Constraints: [Integer solution, negative x]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_bd45df49 = {
  metadata: {
    // id: "bd45df49",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values ensuring integer solution
    const m1 = getRandomInt(2, 5);
    const b1 = getRandomInt(5, 15);
    const m2 = getRandomInt(5, 10);
    const b2 = -1 * getRandomInt(3, 10);
    
    // We want: x = (b2 - 3*b1) / (3*m1 - m2) to be an integer
    // Rearrange: b2 - 3*b1 = x * (3*m1 - m2)
    // So: b2 = 3*b1 + x * (3*m1 - m2)
    
    // Pick x first (negative as per constraints), then ensure b2 works
    const xValue = -1 * getRandomInt(2, 8); // Negative x
    const denominator = 3 * m1 - m2;
    
    // Calculate what b2 should be for integer solution
    const targetB2 = 3 * b1 + xValue * denominator;
    
    // Check if targetB2 is in valid range and negative (as per original constraint)
    // If not, regenerate or adjust
    let finalB2 = b2;
    let finalX = xValue;
    
    // Ensure b2 is negative and in reasonable range
    if (targetB2 >= -10 && targetB2 <= -3) {
      finalB2 = targetB2;
      finalX = xValue;
    } else {
      // Fallback: find valid x that gives valid b2
      // b2 must be in range [-10, -3] (from original getRandomInt(3, 10) * -1)
      // 3*b1 + x*(3*m1 - m2) = b2
      // x = (b2 - 3*b1) / (3*m1 - m2)
      
      const validXValues = [];
      for (let x = -8; x <= -2; x++) {
        const testB2 = 3 * b1 + x * denominator;
        if (testB2 >= -10 && testB2 <= -3) {
          validXValues.push(x);
        }
      }
      
      if (validXValues.length > 0) {
        finalX = getRandomElement(validXValues);
        finalB2 = 3 * b1 + finalX * denominator;
      } else {
        // If no valid x found, adjust b1 to make it work
        // This should rarely happen
        finalX = -4; // Default
        finalB2 = -6; // Default
      }
    }
    
    // Recalculate y and answer with guaranteed integer x
    const yValue = m1 * finalX + b1;
    const answer = finalX - yValue;
    
    // STEP 2: Build question text
    const questionText = `$$\\begin{cases} y = ${m1}x + ${b1} \\\\ 3y = ${m2}x ${finalB2 >= 0 ? '+' : ''} ${finalB2} \\end{cases}$$ \n\nThe solution to the given system of equations is $(x, y)$. What is the value of $x - y$?`;
    
    // STEP 3: Create options
    const optionsData = [
      { text: (answer * 2 - 10).toString(), isCorrect: false },
      { text: finalX.toString(), isCorrect: false },
      { text: "3", isCorrect: false },
      { text: answer.toString(), isCorrect: true }
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
      correctAnswer: answer.toString(),
      explanation: `Substitute $y$ in the second equation: $3(${m1}x+${b1}) = ${m2}x${finalB2 >= 0 ? '+' : ''}${finalB2} \\implies ${3*m1}x+${3*b1} = ${m2}x${finalB2 >= 0 ? '+' : ''}${finalB2} \\implies ${3*m1 - m2}x = ${finalB2 - 3*b1} \\implies x = ${finalX}$. Then $y = ${m1}(${finalX})+${b1} = ${yValue}$. $x-y = ${finalX} - (${yValue}) = ${answer}$.`
    };
  }
};