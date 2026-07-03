import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 803
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 6, -7, -1, 16, 36]
 * - Difficulty factors: [Substitution with negative numbers]
 * - Distractor patterns: [(-4, -8), (-20/13, -80/13), (4, 40), (20, 136)]
 * - Constraints: [Integer solution with negatives]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 *
 * INTENT: Solve a 2x2 linear system by substitution. First equation gives
 * y = m x + b; second equation a2 x - y = c is constructed so the unique
 * solution is x = -4, y = m(-4) + b. Distractors model a sign error on x
 * and a "used +4 instead of -4" arithmetic error.
 */

export const generator_803 = {
  metadata: {
    id: "803",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (answer-first: fix x = -4, derive c)
    const m = getRandomInt(4, 8);       // slope of first line
    const b = getRandomInt(10, 25);     // intercept of first line
    const a2 = -1 * getRandomInt(5, 10); // coefficient of x in second equation, in [-10,-5]

    const xValue = -4;
    const yValue = m * xValue + b;       // correct y = -4m + b, in [-22, 9]
    const yWrong = m * (-xValue) + b;    // "used +4 instead of -4" -> 4m + b (always > yValue)
    const adjustedC2 = a2 * xValue - yValue; // makes a2*x - y = adjustedC2 hold at (xValue,yValue)

    // STEP 2: Build question text (display math, no currency)
    const questionText = `What is the solution $(x, y)$ to the given system of equations?\n\n$$y = ${m}x+${b}$$\n$$${a2}x - y = ${adjustedC2}$$`;

    // STEP 3: Create options — all live-derived, provably distinct across ranges.
    // correct (-4, yValue); (4, yWrong) sign error on x; (-4, yWrong) wrong y; (4, yValue) wrong-sign x.
    const correctText = `(${xValue}, ${yValue})`;
    const optSignX = `(${-xValue}, ${yWrong})`;   // (4, 4m+b)
    const optWrongY = `(${xValue}, ${yWrong})`;    // (-4, 4m+b)
    const optWrongX = `(${-xValue}, ${yValue})`;   // (4, -4m+b)

    const reasons: Record<string, string> = {
      [optSignX]: `results from dropping the negative on \\( x \\) (using \\( x=${-xValue} \\)) and recomputing \\( y \\), which does not satisfy either equation.`,
      [optWrongY]: `has the correct \\( x=${xValue} \\) but substitutes \\( x=${-xValue} \\) into \\( y=${m}x+${b} \\), giving the wrong \\( y \\).`,
      [optWrongX]: `keeps the correct \\( y=${yValue} \\) but uses \\( x=${-xValue} \\), which does not satisfy the second equation.`,
    };

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: optSignX, isCorrect: false },
      { text: optWrongY, isCorrect: false },
      { text: optWrongX, isCorrect: false }
    ];

    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const wrongExplanations = shuffledOptions
      .filter(o => !o.isCorrect)
      .map(o => `Choice ${o.letter} is incorrect; it ${reasons[o.text]}`)
      .join(' ');

    // STEP 5: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The system can be solved by substitution. The first equation defines \\( y \\) as \\( ${m}x+${b} \\). Substituting \\( ${m}x+${b} \\) for \\( y \\) in the second equation gives \\( ${a2}x-(${m}x+${b})=${adjustedC2} \\). Distributing on the left-hand side gives \\( ${a2}x-${m}x-${b}=${adjustedC2} \\), or \\( ${a2 - m}x-${b}=${adjustedC2} \\). Adding \\( ${b} \\) to both sides gives \\( ${a2 - m}x=${adjustedC2 + b} \\). Dividing both sides by \\( ${a2 - m} \\) gives \\( x=${xValue} \\). Substituting \\( ${xValue} \\) for \\( x \\) in \\( y=${m}x+${b} \\) gives \\( y=${m}(${xValue})+${b} \\), or \\( y=${yValue} \\). Therefore the solution \\( (x, y) \\) is \\( (${xValue}, ${yValue}) \\). ${wrongExplanations}`
    };
  }
};
