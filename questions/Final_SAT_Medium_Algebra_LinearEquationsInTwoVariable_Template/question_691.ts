import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 691
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [5 hectares, 24 hectares, 4529 trees]
 * - Difficulty factors: [Interpreting linear equation in context]
 * - Distractor patterns: [Confusing x with y, confusing total with average]
 * - Constraints: [Equation: 5x + 24y = 4529]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_691 = {
  metadata: {
    id: "691",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters.
    // area1 = industrial-park size (coefficient of x), area2 = neighborhood
    // size (coefficient of y). Keep the two areas distinct so the two
    // "trees per hectare" distractors stay unambiguous.
    const area1 = getRandomInt(2, 10);
    let area2 = getRandomInt(15, 35);
    let guard = 0;
    while (area2 === area1 && guard++ < 50) area2 = getRandomInt(15, 35);
    if (area2 === area1) area2 = area1 + 1; // deterministic fallback (ranges don't overlap, but be safe)
    const totalTrees = getRandomInt(2000, 6000);
    const totalTreesLabel = totalTrees.toLocaleString('en-US');

    // STEP 2: Create options. x is the coefficient's partner: area1 * x = trees
    // in the industrial park, so x is the AVERAGE trees per hectare there.
    const optionsData = [
      { text: `The average number of trees per hectare in the industrial park`, isCorrect: true },
      { text: `The average number of trees per hectare in the neighborhood`, isCorrect: false },
      { text: `The total number of trees in the industrial park`, isCorrect: false },
      { text: `The total number of trees in the neighborhood`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: `A certain township consists of a ${area1}-hectare industrial park and a ${area2}-hectare neighborhood. The total number of trees in the township is ${totalTreesLabel}. The equation $${area1}x + ${area2}y = ${totalTrees}$ represents this situation. Which of the following is the best interpretation of x in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. It is given that the township consists of a ${area1}-hectare industrial park and a ${area2}-hectare neighborhood, and that the total number of trees is ${totalTreesLabel}. The equation $${area1}x + ${area2}y = ${totalTrees}$ represents this situation. The number of trees in a region equals its size, in hectares, times the average number of trees per hectare, so the term $${area1}x$ is the number of trees in the industrial park and the term $${area2}y$ is the number of trees in the neighborhood. Because ${area1} is the size of the industrial park, in hectares, x must be the average number of trees per hectare in the industrial park.`
    };
  }
};
