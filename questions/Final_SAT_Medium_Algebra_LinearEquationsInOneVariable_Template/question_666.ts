import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 666
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total length, one known part, two equal parts]
 * - Difficulty factors: [Word problem, setting up linear equation]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [(adjustedTotal - part1) / 2 = answer, forced even for a clean integer]
 * - Question type: [Fill-in-the-blank]
 */

export const generator_666 = {
  metadata: {
    id: "666",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate values
    const total = getRandomInt(80, 150);
    const part1 = getRandomInt(20, Math.floor(total / 2));
    // Ensure (total - part1) is even so each equal part is a clean integer.
    let remaining = total - part1;
    if (remaining % 2 !== 0) {
      remaining += 1;
    }
    const adjustedTotal = part1 + remaining; // self-consistent total actually shown
    const answer = remaining / 2;            // integer by construction

    const correctAnswer = answer.toString();

    return {
      questionText: `A line segment that has a length of ${adjustedTotal} centimeters (cm) is divided into three parts. One part is ${part1} cm long. The other two parts have lengths that are equal to each other. What is the length, in cm, of one of the other two parts of equal length?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. If \\(x\\) represents the length, in cm, of each of the two parts of equal length, then \\(${part1}+x+x=${adjustedTotal}\\), or \\(${part1}+2x=${adjustedTotal}\\), represents this situation. Subtracting ${part1} from each side of this equation yields \\(2x=${remaining}\\). Dividing each side of this equation by 2 yields \\(x=${answer}\\). Therefore, the length, in cm, of one of the two parts of equal length is ${correctAnswer}.`
    };
  }
};
