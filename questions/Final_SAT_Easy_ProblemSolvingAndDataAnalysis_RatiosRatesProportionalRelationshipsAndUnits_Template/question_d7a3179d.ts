import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: d7a3179d
*
* ORIGINAL ANALYSIS:
* - Number ranges: [1116 inches, conversion: 36 inches/yard, answer: 31 yards]
* - Difficulty factors: [Division with larger numbers]
* - Distractor patterns: [None - fill in blank, common errors: division errors, decimal errors]
* - Constraints: [inches must be divisible by 36 for integer yards]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_d7a3179d = {
  metadata: {
    // id: "d7a3179d",
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

/**
* Question ID: 4347a032
*
* ORIGINAL ANALYSIS:
* - Number ranges: [44 tablespoons, conversion: 3 tsp/tbsp, answer: 132 teaspoons]
* - Difficulty factors: [Unit conversion, multiplication]
* - Distractor patterns: [A: 47 (44+3), B: 88 (44×2), C: 132 (correct, 44×3), D: 176 (44×4)]
* - Constraints: [Simple multiplication]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/
