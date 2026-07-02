import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 509
*
* ORIGINAL ANALYSIS:
* - Number ranges: [1116 inches, conversion: 36 inches/yard, answer: 31 yards]
* - Difficulty factors: [Division with larger numbers]
* - Distractor patterns: [None - fill in blank, common errors: division errors, decimal errors]
* - Constraints: [inches must be divisible by 36 for integer yards]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_509 = {
  metadata: {
    id: "509",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const yards = getRandomInt(25, 40);
    const inchesPerYard = 36;
    const inches = yards * inchesPerYard;
    const correctYards = inches / inchesPerYard;

    const questionText = `How many yards are equivalent to $${inches.toLocaleString()}$ inches? (1 yard = ${inchesPerYard} inches)`;
    const explanation = `The correct answer is ${correctYards}. Since $1$ yard equals $${inchesPerYard}$ inches, $${inches.toLocaleString()}$ inches is equivalent to $${inches.toLocaleString()} \\div ${inchesPerYard} = ${correctYards}$ yards.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: correctYards.toString(),
      explanation: explanation
    };
  }
};
