import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 650
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients a and c are positive constants (conceptual)]
* - Difficulty factors: [Conceptual understanding of parabola vs horizontal line, vertex analysis]
* - Distractor patterns: [A: Zero (thinks no intersection), B: One (thinks tangent), D: More than two (thinks possible)]
* - Constraints: [a > 0, c > 0 ensures parabola opens up with vertex below x-axis, line y=a+c is above x-axis]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None - conceptual question]
*/

export const generator_650 = {
 metadata: {
   id: "650",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate random positive constants
   const a = getRandomInt(1, 5);
   const c = getRandomInt(1, 5);
   
   // STEP 2: Create options with tracking
   const optionsData = [
     { text: "Zero", isCorrect: false, reason: "thinks the graphs do not intersect" },
     { text: "One", isCorrect: false, reason: "thinks the line is tangent to the vertex, but the vertex is below the line" },
     { text: "Two", isCorrect: true, reason: "a horizontal line above the vertex of an upward-opening parabola intersects in exactly two points" },
     { text: "More than two", isCorrect: false, reason: "thinks a line can intersect a parabola in more than two points, which is impossible" }
   ];
   
   // STEP 3: Shuffle and assign letters
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
   
   // STEP 4: Build explanation
   const explanation = `Choice ${correctLetter} is correct. The graph of $y = ${a}x^2 - ${c}$ is a parabola opening upward with its vertex below the $x$-axis (since $c > 0$). The graph of $y = ${a} + ${c} = ${a + c}$ is a horizontal line above the $x$-axis (since $a, c > 0$). A horizontal line above the vertex of an upward-opening parabola will intersect the parabola in exactly two points. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
   
   return {
     questionText: `In the equation $y = ax^2 - c$, $a$ and $c$ are positive constants. How many times does the graph of the equation above intersect the graph of the equation $y = a + c$ in the $xy$-plane?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: "Two",
     explanation: explanation
   };
 }
};
