import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1478
 * 
 * ANALYSIS:
 * - Context: Parallel Lines.
 * - Task: Identify slope of a line parallel to a given equation.
 * - Equation: y = mx + b or Ax + By = C.
 * - Logic: Parallel lines have equal slopes.
 */
export const generator_1478 = {
  metadata: {
    id: "1478",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    // The four options are {a/b, -b/a, b/a, -a/b}. Those are all distinct
    // for nonzero a,b UNLESS a === b (then a/b = b/a = 1 and -b/a = -a/b = -1).
    // Guard by requiring numerator !== denominator, so no distractor can
    // collide with the correct slope or with another distractor for any draw.
    let mNum = getRandomInt(2, 9);
    let mDen = getRandomInt(2, 9);
    let guard = 0;
    while (mNum === mDen && guard++ < 50) {
      mDen = getRandomInt(2, 9);
    }
    if (mNum === mDen) mDen = mNum === 2 ? 3 : 2; // deterministic fallback

    const intercept = getRandomInt(1, 10);

    // Equation: y = (num/den)x + b
    const equation = `y = \\frac{${mNum}}{${mDen}}x + ${intercept}`;
    const slopeStr = `\\frac{${mNum}}{${mDen}}`;

    // 2. Options
    const correctSlope = slopeStr;
    const d1 = `-\\frac{${mDen}}{${mNum}}`; // Perpendicular (negative reciprocal)
    const d2 = `\\frac{${mDen}}{${mNum}}`; // Reciprocal (no sign change)
    const d3 = `-${slopeStr}`; // Negated slope

    const optionsData = [
      { text: correctSlope, isCorrect: true },
      { text: d1, isCorrect: false },
      { text: d2, isCorrect: false },
      { text: d3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `Which of the following is the slope of a line that is parallel to the line with equation $${equation}$ in the $xy$-plane?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Parallel lines have equal slopes. The given equation is in slope-intercept form $y = mx + b$, where $m$ is the slope. For the equation $${equation}$, the slope is $${slopeStr}$, so any parallel line must also have slope $${slopeStr}$. The choices $${d2}$ and $-${d2}$ are reciprocals of the slope (the relationship for perpendicular, not parallel, lines), and $-${slopeStr}$ simply reverses the sign of the slope.`
    };
  }
};
