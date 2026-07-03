import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 794
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1, 2, 1, -2, results: 6, 4]
 * - Difficulty factors: [Elimination by addition, solve for x]
 * - Distractor patterns: [2.5, 5, 6, 10]
 * - Constraints: [Clean elimination of y]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_794 = {
  metadata: {
    id: "794",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Answer-first construction for a clean, self-consistent system.
    // System: x + k*y = result1 ; x - k*y = result2
    // Adding the equations eliminates y: 2x = result1 + result2, so x = xValue.
    const xValue = getRandomInt(3, 12);        // the answer we solve for
    const yCoeff = getRandomInt(2, 5);         // coefficient of y (>= 2 so it reads as a real system)
    const yValue = getRandomInt(1, 6);         // actual y-solution (integer -> clean results)
    const result1 = xValue + yCoeff * yValue;  // from x + k*y
    const result2 = xValue - yCoeff * yValue;  // from x - k*y
    const sum = result1 + result2;             // = 2 * xValue

    // STEP 2: Build question text (second equation shows "- k y").
    const questionText = `$$\\begin{cases} x + ${yCoeff}y = ${result1} \\\\ x - ${yCoeff}y = ${result2} \\end{cases}$$ \n\nThe solution to the given system of equations is $(x, y)$. What is the value of $x$?`;

    // STEP 3: Build distractors from common misconceptions, guaranteed distinct
    // from the answer and from each other via a Set.
    const seen = new Set<number>([xValue]);
    const distractorValues: number[] = [];
    const candidates = [
      sum,                 // forgot to divide the sum by 2
      result1,             // reported the first constant
      xValue + yValue,     // added the two solution components
    ];
    for (const c of candidates) {
      if (!seen.has(c)) { seen.add(c); distractorValues.push(c); }
    }
    // Fill any remaining slots with nearby offsets (bounded retry).
    let offset = 1;
    let tries = 0;
    while (distractorValues.length < 3 && tries++ < 50) {
      const c = xValue + offset;
      if (!seen.has(c) && c > 0) { seen.add(c); distractorValues.push(c); }
      offset = offset > 0 ? -offset : -offset + 1; // 1,-1,2,-2,...
    }

    // STEP 4: Assemble options and shuffle.
    const optionsData = [
      { text: xValue.toString(), isCorrect: true },
      ...distractorValues.slice(0, 3).map(v => ({ text: v.toString(), isCorrect: false }))
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;

    // Render the right-hand side sum without a "+ -" glitch when result2 < 0.
    const rhsSum = result2 >= 0
      ? `${result1} + ${result2}`
      : `${result1} - ${Math.abs(result2)}`;

    // STEP 5: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: xValue.toString(),
      explanation: `Choice ${correctLetter} is correct. Adding the two equations eliminates the $y$ terms: $(x + ${yCoeff}y) + (x - ${yCoeff}y) = ${rhsSum}$, which gives $(2x = ${sum})$. Dividing both sides by $(2)$ gives $(x = ${xValue})$. The other choices come from stopping at $(2x = ${sum})$ without dividing by $(2)$, or from misreading a constant in the system.`
    };
  }
};
