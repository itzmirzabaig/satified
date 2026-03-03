import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 8a87c2c8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [constants: 3, 5, -2, 5, 7 (single digit)]
 * - Difficulty factors: [Addition of equations method, asks for expression value]
 * - Distractor patterns: [-2, 6, 12, 24]
 * - Constraints: [Clean addition eliminates y]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_8a87c2c8 = {
  metadata: {
    // id: "8a87c2c8",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const const1 = getRandomInt(2, 5);
    const const2 = getRandomInt(1, 4);
    const right1 = getRandomInt(3, 8);
    const right2 = getRandomInt(5, 12);
    const yCoeff = getRandomInt(2, 4); // Coefficient of y when equations arranged
    
    // Equations: x + const1 = -yCoeff*y + right1
    //            x - const2 = yCoeff*y + right2
    // Adding: 2x + (const1 - const2) = right1 + right2
    // 2x = right1 + right2 - (const1 - const2)
    
    const targetValue = right1 + right2 - (const1 - const2);
    
    // Calculate y for explanation
    const xValue = targetValue / 2;
    const yValue = (xValue - (right1 - const1)) / (-yCoeff);
    
    // STEP 2: Build question text - use single $ for inline math
    const questionText = `The solution to the given system of equations is $(x, y)$. What is the value of $2x$?
    
$$\\begin{cases} x + ${const1} = -${yCoeff}y + ${right1} \\\\ x - ${const2} = ${yCoeff}y + ${right2} \\end{cases}$$`;
    
    // STEP 3: Create options
    const distractor1 = Math.round(yValue); // y value
    const distractor2 = Math.round(xValue); // x value
    const distractor3 = targetValue * 2; // 4x
    
    const optionsData = [
      { text: distractor1.toString(), isCorrect: false },
      { text: distractor2.toString(), isCorrect: false },
      { text: targetValue.toString(), isCorrect: true },
      { text: distractor3.toString(), isCorrect: false }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // STEP 5: Return question data - use single $ for inline math in explanation
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: targetValue.toString(),
      explanation: `To find the value of $2x$, we first need to solve the given system of equations for $x$. The system is:
      
$\\begin{cases} x + ${const1} = -${yCoeff}y + ${right1} \\\\ x - ${const2} = ${yCoeff}y + ${right2} \\end{cases}$

Let's simplify the equations first.
From equation (1): $x = -${yCoeff}y + ${right1 - const1}$
From equation (2): $x = ${yCoeff}y + ${right2 + const2}$

Notice that both equations are equal to $x$, or we can simply add the two original equations together to eliminate the $y$ variable, which is a very efficient method here.

Let's add the two equations:
$(x + ${const1}) + (x - ${const2}) = (-${yCoeff}y + ${right1}) + (${yCoeff}y + ${right2})$

Combine like terms:
$2x = ${targetValue}$

We have directly found the value of $2x$, which is exactly what the question asks for.
So, $2x = ${targetValue}$.

(If we wanted to find $x$ and $y$:
$2x = ${targetValue} \\Rightarrow x = ${xValue}$
Substitute $x = ${xValue}$ into the first simplified equation: $${xValue} = -${yCoeff}y + ${right1 - const1} \\Rightarrow ${xValue - (right1 - const1)} = -${yCoeff}y \\Rightarrow y = ${yValue}$$.
The solution is $(${xValue}, ${yValue})$.
The question asks for $2x$, so $2(${xValue}) = ${targetValue}$.)

Therefore, the correct option is ${correctLetter}.

Why other options are incorrect:
- ${shuffledOptions[0].letter}. This is the value of $y$ ($y = ${yValue}$).
- ${shuffledOptions[1].letter}. This is the value of $x$ ($x = ${xValue}$).
- ${shuffledOptions[3].letter}. This would be the value of $4x$ or some other miscalculation.`
    };
  }
};