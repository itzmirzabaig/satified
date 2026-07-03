import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 932
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 80% (high percentage), faulty items: 88 (double-digit), total: 110]
 * - Difficulty factors: [Solving percent equation for the whole given the part]
 * - Distractor patterns: [N/A - fill in blank, but common errors: wrong equation setup, divide by wrong value]
 * - Constraints: [Part/whole relationship: part = percent * whole]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [No figure - conceptual question]
 */

export const generator_932 = {
  metadata: {
    id: "932",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Answer-first construction so total is always a clean integer.
    // percent is a multiple of 10 in {60,70,80,90}; total is a multiple of 10.
    // faulty = (percent/100) * total = (percent/10) * (total/10) is then an
    // exact integer for every draw, and the answer (total) is an exact integer.
    const percent = getRandomInt(6, 9) * 10;       // 60, 70, 80, 90
    const totalItems = getRandomInt(6, 15) * 10;   // 60, 70, ..., 150
    const faultyItems = (percent / 10) * (totalItems / 10); // exact integer

    // STEP 2: Answer is the total number of items.
    const correctAnswer = totalItems.toString();

    // STEP 3: Return question data
    return {
      questionText: `In a sample, ${percent}\\% of the items are faulty. There are ${faultyItems} faulty items in the sample. How many total items are in the sample?`,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. Let \\( x \\) represent the total number of items in the sample. It's given that ${percent}\\% of the items are faulty and that there are ${faultyItems} faulty items in the sample. Therefore, ${percent}\\% of \\( x \\) is ${faultyItems}. Since ${percent}\\% can be rewritten as \\( \\frac{${percent}}{100} \\), it follows that \\( \\frac{${percent}}{100} x=${faultyItems} \\). Multiplying both sides of this equation by 100 yields \\( ${percent}x=${faultyItems * 100} \\). Dividing both sides of this equation by ${percent} yields \\( x=${correctAnswer} \\). Therefore, there are ${correctAnswer} total items in the sample.`
    };
  }
};
